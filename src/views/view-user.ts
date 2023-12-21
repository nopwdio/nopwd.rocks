import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import user from "./view-user.styles.js";

import "../components/ui-timestamp.js";

import "@nopwdio/sdk-js/dist/components/np-email-auth.js";
import "@nopwdio/sdk-js/dist/components/np-passkey-conditional.js";
import "@nopwdio/sdk-js/dist/components/np-passkey-register.js";

import { RegisterEvent } from "@nopwdio/sdk-js/dist/components/np-passkey-register.js";
import { Session } from "@nopwdio/sdk-js/dist/core/session.js";

@customElement("view-user")
export class ViewUser extends LitElement {
  @property({ type: Object }) session?: Session;
  @property({ type: Object }) createdPasskey?: RegisterEvent;

  static styles = [view, user];

  onRegister(e: CustomEvent<RegisterEvent>) {
    this.createdPasskey = e.detail;
  }

  render() {
    if (!this.session) {
      return html`not authenticated (shouldn't occur here cause this view is for authenticated user)`;
    }

    return html`
      <h1>Hello!</h1>
      <img class="avatar" src="/static/avatar-success.webp" alt="well done" />
      <h2>
        You are now authenticated as <strong>${this.session.token_payload.sub}</strong> on
        <strong>${this.session.token_payload.aud}</strong>
      </h2>
      ${this.session.suggest_passkeys
        ? this.createdPasskey
          ? html`<aside>
              <h3>Congratulation!</h3>
              <p>
                You just have created a brand new passkey. To use it, logout and try to log in
                again. You will be ask to select this passkey to authenticate.
              </p>
            </aside>`
          : html`<aside>
              <h3>Enable fingerprint or Face ID on this device?</h3>
              <p>
                By creating a passkey, you will be able to authenticate with fingerprint or Face ID
                to this website on all your devices. Awesome right?
              </p>
              <np-passkey-register @np:register=${this.onRegister}></np-passkey-register>
            </aside>`
        : html``}

      <details class="token">
        <summary>Session details</summary>
        <ul class="claims">
          <li class="claim">
            <span class="name">user:</span
            ><span class="value">${this.session.token_payload.sub}</span>
          </li>
          <li class="claim">
            <span class="name">domain:</span
            ><span class="value">${this.session.token_payload.aud}</span>
          </li>
          <li class="claim">
            <span class="name">issuer:</span
            ><span class="value">${this.session.token_payload.iss}</span>
          </li>
          <li class="claim">
            <span class="name">created:</span
            ><ui-timestamp
              class="value"
              timestamp=${this.session.created_at}
              precision="10"
            ></ui-timestamp>
          </li>
          <li class="claim">
            <span class="name">expires:</span
            ><ui-timestamp
              class="value"
              timestamp=${this.session.expires_at}
              precision="10"
            ></ui-timestamp>
          </li>
          <li class="claim">
            <span class="name">auth with:</span
            ><span class="value"
              >${this.session.token_payload.amr.length
                ? this.session.token_payload.amr[0]
                : "/"}</span
            >
          </li>
        </ul>
      </details>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "view-user": ViewUser;
  }
}
