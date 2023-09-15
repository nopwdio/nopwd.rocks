import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import authenticated from "./view-authenticated.styles.js";

import "../components/ui-timestamp.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-register.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-passkey-signin.js";
import { CreateEvent } from "@apinet/nopwd-sdk/dist/components/np-passkey-register.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-authenticated": ViewAuthenticated;
  }
}

@customElement("view-authenticated")
export class ViewAuthenticated extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;
  @property({ type: Object }) createdPasskey?: CreateEvent;

  static styles = [view, authenticated];

  render() {
    if (!this.auth)
      return html`not authenticated (shouldn't occur here cause this view is for authenticated user)`;

    return html`
      <h1>Well done!</h1>
      <img class="avatar" src="/static/avatar-success.webp" alt="well done" />
      <h2>
        You are now authenticated as <strong>${this.auth.payload.sub}</strong> on
        <strong>${this.auth.payload.aud}</strong>
      </h2>
      ${this.auth.suggest_passkey
        ? html`
            <aside class="passkey" @np:create=${this.onPasskeyCreated}>
              ${!this.createdPasskey
                ? html`
                    <p class="info">
                      Would you like to enable fingerprint or Face ID on this device?
                    </p>
                    <np-passkey-register token=${this.auth.token}></np-passkey-register>
                    <button @click=${this.onSkipPasskey}>maybe later</button>
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
              <summary>Access token claims (RFC7519)</summary>
              <ul class="claims">
                <li class="claim">
                  <span class="name">sub:</span><span class="value">${this.auth.payload.sub}</span>
                </li>
                <li class="claim">
                  <span class="name">aud:</span><span class="value">${this.auth.payload.aud}</span>
                </li>
                <li class="claim">
                  <span class="name">iss:</span><span class="value">${this.auth.payload.iss}</span>
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

  onSkipPasskey() {
    if (!this.auth) {
      return;
    }

    this.auth.suggest_passkey = false;
    this.requestUpdate();
  }

  onPasskeyCreated(e: CustomEvent<CreateEvent>) {
    this.createdPasskey = e.detail;
  }

  onLogout() {
    this.dispatchEvent(new CustomEvent("np:logout", { bubbles: true }));
  }
}
