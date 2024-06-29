import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@nopwdio/sdk-js/dist/components/np-passkey-conditional.js";
import "@nopwdio/sdk-js/dist/components/np-email-auth.js";
import { hideNotification, showNotification } from "../components/ui-notification.js";
import "../components/ui-timestamp.js";
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
        id="input"
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
      showNotification(this, {
        header: "Missing email address",
        description: html`Enter your email to authenticate.`,
      });
      return;
    }

    if (e.detail instanceof InvalidEmailError) {
      showNotification(this, {
        header: "invalid email address",
        description: html`Enter a valid email address to authenticate.`,
      });
      return;
    }

    if (e.detail instanceof NetworkError) {
      showNotification(this, {
        header: "No connection",
        description: html`Find some hotspot and try again.`,
      });
      return;
    }

    if (e.detail instanceof InvalidCodeParameterError) {
      showNotification(this, {
        header: "Expired or malformed link",
        description: html`Enter your email and try again.`,
      });
      return;
    }

    if (e.detail instanceof QuotaError) {
      const retryAt = e.detail.getRetryAt();
      showNotification(this, {
        header: "Too many attempts",
        description: html`You must retry <ui-timestamp timestamp=${retryAt}></ui-timestamp>.`,
        duration: Math.min(retryAt * 1000 - Date.now(), 6000),
      });
      return;
    }

    if (e.detail instanceof AbortError) {
      return;
    }

    console.log(e.detail);
    showNotification(this, {
      header: "Unexpected error",
      description: html`Please try again and get lucky :)`,
    });
  }
}
