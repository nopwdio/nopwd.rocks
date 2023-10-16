import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@nopwdio/sdk-js/dist/components/np-email-login.js";
import "@nopwdio/sdk-js/dist/components/np-passkey-login.js";
import {
  InvalidCodeParameterError,
  NetworkError,
  QuotaError,
  UnexpectedError,
  NoPwdError,
  InvalidEmailError,
  UnknownChallengeOrPasskeyError,
  MissingEmailError,
} from "@apinet/nopwd-sdk/dist/flows/errors.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-login": ViewLogin;
  }
}

@customElement("view-login")
export class ViewLogin extends LitElement {
  @property() email: string = "";
  @property({ type: Object }) error?: NoPwdError;
  private errorTimeout?: number;

  static styles = [view, login];

  render() {
    return html`
      <h1>Welcome!</h1>
      <img class="avatar" src="/static/avatar-welcome.webp" alt="welcome" />

      <!-- the only logic to use magic link or passkey authentication is here -->
      <np-passkey-login @input=${this.onEmailChange} @np:error=${this.onError}></np-passkey-login>
      <np-email-login
        email=${this.email}
        @np:error=${this.onError}
        resetduration="5000"
      ></np-email-login>

      ${this.error instanceof MissingEmailError
        ? html` <p class="error">Enter your email and click on the button to authenticate.</p> `
        : this.error instanceof InvalidEmailError
        ? html`
            <p class="error">
              Enter a valid email address and click on the button to authenticate.
            </p>
          `
        : this.error instanceof UnknownChallengeOrPasskeyError
        ? html`
            <p class="error">
              This access key has been revoked. This can happen when it has not been used for a long
              time.
            </p>
          `
        : this.error instanceof InvalidCodeParameterError
        ? html`
            <p class="error">
              This link has expired or is invalid. Enter your email and try again.
            </p>
          `
        : this.error instanceof QuotaError
        ? html`
            <p class="error">
              Too many authentication attempts. Please retry
              <ui-timestamp timestamp=${this.error.getRetryAt()}></ui-timestamp>.
            </p>
          `
        : this.error instanceof NetworkError
        ? html`
            <p class="error">You don't have internet access. Find some hotspot and try again.</p>
          `
        : this.error instanceof UnexpectedError
        ? html` <p class="error">An unexpected error has occured (${this.error.message}).</p> `
        : html`
            <p class="disclaimer">
              By logging in, you are agreeing to our
              <a href="https://dev.nopwd.io/policies/terms">Terms of Service</a> and
              <a href="https://dev.nopwd.io/policies/privacy">Privacy Policy</a>.
            </p>
          `}
    `;
  }

  onEmailChange(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    this.email = input.value;

    // we reset error if email changed.
    this.error = undefined;
    clearTimeout(this.errorTimeout);
  }

  onError(e: CustomEvent<NoPwdError>) {
    this.error = e.detail;
    clearTimeout(this.errorTimeout);

    // default error duration
    let duration = 5000;

    if (this.error instanceof QuotaError) {
      duration = this.error.getRetryAt() * 1000 - Date.now();
    }

    this.errorTimeout = setTimeout(() => (this.error = undefined), duration);
  }
}
