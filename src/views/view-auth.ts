import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import login from "./view-auth.styles.js";
import view from "./view.styles.js";

import "../components/ui-timestamp.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-register.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-auth": ViewAuth;
  }
}

@customElement("view-auth")
export class ViewAuth extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;
  @property({ type: Boolean }) passkeyCreated: boolean = false;

  static styles = [view, login];

  onLogout() {
    this.dispatchEvent(new CustomEvent("np:logout", { bubbles: true }));
  }

  render() {
    if (!this.auth) return html`not authenticated (shouldn't append here)`;

    return html`
      <h1>Well done!</h1>
      <img class="avatar" src="/static/avatar-success.webp" alt="well done" />
      <h2>
        You are now authenticated as <strong>${this.auth.payload.sub}</strong> on
        <strong>${this.auth.payload.aud}</strong>
      </h2>
      ${this.auth.passkeyAvailable
        ? html`
            <aside class="passkey">
              ${!this.passkeyCreated
                ? html`
                    <p class="info">
                      Would you like to enable fingerprint or Face ID on this device?
                    </p>
                    <np-webauthn-register></np-webauthn-register>
                  `
                : html`
                    <p class="info">
                      Your passkey has been created 🎉! Just
                      <button @click=${this.onLogout}>Sign out here</button> and try to log in
                      again.
                    </p>
                  `}
            </aside>
          `
        : html`
            <details class="token">
              <summary>The access token payload</summary>
              <ul class="claims">
                <li class="claim">
                  <span class="name">sub:</span><span class="value">${this.auth.payload.sub}</span>
                </li>
                <li class="claim">
                  <span class="name">aud:</span><span class="value">${this.auth.payload.aud}</span>
                </li>
                <li class="claim">
                  <span class="name">iat:</span
                  ><ui-timestamp class="value" timestamp=${this.auth.payload.iat}></ui-timestamp>
                </li>
                <li class="claim">
                  <span class="name">exp:</span
                  ><ui-timestamp class="value" timestamp=${this.auth.payload.exp}></ui-timestamp>
                </li>
                <li class="claim">
                  <span class="name">amr:</span
                  ><span class="value"
                    >${this.auth.payload.amr.length ? this.auth.payload.amr[0] : "/"}</span
                  >
                </li>
              </ul>
            </details>
          `}
    `;
  }
}
