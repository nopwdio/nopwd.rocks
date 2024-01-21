import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@nopwdio/sdk-js/dist/components/np-passkey-conditional.js";
import "@nopwdio/sdk-js/dist/components/np-email-auth.js";
import { hideNotification, showNotification } from "../components/ui-notification.js";

import {
  InvalidCodeParameterError,
  NetworkError,
  QuotaError,
  UnexpectedError,
  NoPwdError,
  InvalidEmailError,
  UnknownChallengeOrPasskeyError,
  MissingEmailError,
  AbortError,
} from "@nopwdio/sdk-js/dist/core/errors.js";
import { shieldCheck, shieldExclamation, user } from "../styles/icon.styles.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-login": ViewLogin;
  }
}

@customElement("view-login")
export class ViewLogin extends LitElement {
  @property() email: string = "";
  static styles = [view, login];

  render() {
    return html`
      <span class="avatar">${user}</span>

      <!-- the only logic to use magic link or passkey authentication is here -->
      <np-passkey-conditional
        @input=${this.onEmailChange}
        @np:error=${this.onError}
        lifetime="604800"
      ></np-passkey-conditional>
      <np-email-auth
        email=${this.email}
        @np:error=${this.onError}
        lifetime="604800"
      ></np-email-auth>

      <p class="disclaimer">
        By logging in, you are agreeing to our
        <a href="https://dev.nopwd.io/policies/terms">Terms of Service</a> and
        <a href="https://dev.nopwd.io/policies/privacy">Privacy Policy</a>.
      </p>
    `;
  }

  onEmailChange(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    this.email = input.value;
    hideNotification(this);
  }

  onError(e: CustomEvent<NoPwdError>) {
    if (e.detail instanceof MissingEmailError) {
      showNotification(this, "Missing email address", "Enter your email to authenticate.");
      return;
    }

    if (e.detail instanceof InvalidEmailError) {
      showNotification(
        this,
        "invalid email address",
        "Enter a valid email address to authenticate."
      );
      return;
    }

    if (e.detail instanceof NetworkError) {
      showNotification(this, "No connection", "Find some hotspot and try again.");
      return;
    }

    if (e.detail instanceof InvalidCodeParameterError) {
      showNotification(this, "Expired or malformed link", "Enter your email and try again.");
      return;
    }

    if (e.detail instanceof QuotaError) {
      showNotification(this, "Too many attempts", "Wait a moment and try again.");
      return;
    }

    if (e.detail instanceof AbortError) {
      return;
    }

    console.log(e.detail);
    showNotification(this, "Unexpected error", "Please try again and get lucky :)");
  }
}
