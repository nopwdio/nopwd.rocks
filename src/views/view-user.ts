import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import user from "./view-user.styles.js";

import "../components/ui-timestamp.js";

import "@apinet/nopwd-sdk/dist/components/np-email-login.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-login.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-register.js";

import { RegisterEvent } from "@apinet/nopwd-sdk/dist/components/np-passkey-register.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-email-login.js";

@customElement("view-user")
export class ViewUser extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;
  @property({ type: Object }) createdPasskey?: RegisterEvent;

  static styles = [view, user];

  render() {
    if (!this.auth)
      return html`not authenticated (shouldn't occur here cause this view is for authenticated user)`;

    return html`
      <h1>Well done!</h1>
      <img class="avatar" src="/static/avatar-success.webp" alt="well done" />
      <h2>
        You are now authenticated as <strong>${this.auth.access_token_payload.sub}</strong> on
        <strong>${this.auth.access_token_payload.aud}</strong>
      </h2>
      ${this.auth.suggest_passkeys
        ? html`
            <aside class="passkey" @np:register=${this.onPasskeyRegistered}>
              ${!this.createdPasskey
                ? html`
                    <p class="info">
                      Would you like to enable fingerprint or Face ID on this device?
                    </p>
                    <np-passkey-register token=${this.auth.access_token}></np-passkey-register>
                    <button @click=${this.onSkipPasskey}>maybe later</button>
                  `
                : html`
                    <p class="info">
                      Your passkey has been created 🎉! Just log out and try to log in again.
                    </p>
                    <button @click=${this.onLogout}>Log out</button>
                  `}
            </aside>
          `
        : html`
            <details class="token">
              <summary>Access token claims (RFC7519)</summary>
              <ul class="claims">
                <li class="claim">
                  <span class="name">sub:</span
                  ><span class="value">${this.auth.access_token_payload.sub}</span>
                </li>
                <li class="claim">
                  <span class="name">aud:</span
                  ><span class="value">${this.auth.access_token_payload.aud}</span>
                </li>
                <li class="claim">
                  <span class="name">iss:</span
                  ><span class="value">${this.auth.access_token_payload.iss}</span>
                </li>
                <li class="claim">
                  <span class="name">iat:</span
                  ><ui-timestamp
                    class="value"
                    timestamp=${this.auth.access_token_payload.iat}
                    precision="30"
                  ></ui-timestamp>
                </li>
                <li class="claim">
                  <span class="name">exp:</span
                  ><ui-timestamp
                    class="value"
                    timestamp=${this.auth.access_token_payload.exp}
                    precision="30"
                  ></ui-timestamp>
                </li>
                <li class="claim">
                  <span class="name">amr:</span
                  ><span class="value"
                    >${this.auth.access_token_payload.amr.length
                      ? this.auth.access_token_payload.amr[0]
                      : "/"}</span
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

    this.auth.suggest_passkeys = false;
    this.requestUpdate();
  }

  onPasskeyRegistered(e: CustomEvent<RegisterEvent>) {
    this.createdPasskey = e.detail;
  }

  onLogout() {
    this.dispatchEvent(new CustomEvent("np:logout", { bubbles: true }));
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "view-user": ViewUser;
  }
}
