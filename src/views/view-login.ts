import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@apinet/nopwd-sdk/dist/components/np-email-login.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-login.js";
import {
  InvalidLinkError,
  NpEmailLoginError,
  QuotaError,
} from "@apinet/nopwd-sdk/dist/components/np-email-login.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-login": ViewLogin;
  }
}

@customElement("view-login")
export class ViewLogin extends LitElement {
  @property() email: string = "";
  @property({ type: Object }) error?: NpEmailLoginError;

  static styles = [view, login];

  render() {
    return html`
      <h1>Welcome!</h1>
      <img class="avatar" src="/static/avatar-welcome.webp" alt="welcome" />

      <!-- the only logic to use magic link or passkey authentication is here -->
      <np-passkey-login @input=${this.onEmailChange} @np:error=${this.onError}></np-passkey-login>
      <np-email-login email=${this.email}></np-email-login>

      ${this.error instanceof QuotaError
        ? html`
            <p class="disclaimer">
              Too many attempts. Please wait
              <ui-timestamp
                timestamp=${Date.now() / 1000 + this.error.getTimeToWait()}
              ></ui-timestamp>
              and try again.
            </p>
          `
        : html`
            <p class="disclaimer">
              By logging in, you are agreeing to our
              <a href="https://dev.nopwd.io/policies/terms">Terms of Service</a> and
              <a href="https://dev.nopwd.io/policies/privacy">Privacy Policy</a>
            </p>
          `}
    `;
  }

  onEmailChange(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    this.email = input.value;
  }

  onError(e: CustomEvent<NpEmailLoginError>) {
    alert(e.detail);
    this.error = e.detail;
  }
}
