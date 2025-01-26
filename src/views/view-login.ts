import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@nopwdio/sdk-js/dist/components/np-login.js";
import { showNotification } from "../components/ui-notification.js";
import "../components/ui-timestamp.js";
import {
  InvalidCodeParameterError,
  NetworkError,
  QuotaError,
  NoPwdError,
  InvalidEmailError,
  MissingEmailError,
  AbortError,
} from "@nopwdio/sdk-js/dist/core/errors.js";
import { lockOpen } from "../styles/icon.styles.js";

// Define the global interface for the custom element
declare global {
  interface HTMLElementTagNameMap {
    "view-login": ViewLogin;
  }
}

// Define the custom element
@customElement("view-login")
export class ViewLogin extends LitElement {
  // Apply styles to the component
  static styles = [view, login];

  // Render the component's HTML template
  render() {
    return html`
      <img class="avatar" src="/static/avatar-welcome.webp" />
      <h1>Login to ${document.location.hostname}</h1>
      <!-- the only logic to use magic link or passkey authentication is here -->
      <np-login
        @np:error=${this.onError}
        lifetime="604800"
        placeholder="Enter your email"
      ></np-login>

      <p class="disclaimer">
        By logging in, you agree to our
        <a href="https://dev.nopwd.io/policies/terms">Terms of Service</a> and
        <a href="https://dev.nopwd.io/policies/privacy">Privacy Policy</a>.
      </p>
    `;
  }

  // Handle errors from the np-login component
  onError(e: CustomEvent<NoPwdError>) {
    if (e.detail instanceof MissingEmailError) {
      showNotification(this, {
        header: "Email Address Required",
        description: html`Please enter your email address to proceed.`,
      });
      return;
    }

    if (e.detail instanceof InvalidEmailError) {
      showNotification(this, {
        header: "Invalid Email Address",
        description: html`Please enter a valid email address to proceed.`,
      });
      return;
    }

    if (e.detail instanceof NetworkError) {
      showNotification(this, {
        header: "Network Error",
        description: html`Please check your internet connection and try again.`,
      });
      return;
    }

    if (e.detail instanceof InvalidCodeParameterError) {
      showNotification(this, {
        header: "Invalid or Expired Link",
        description: html`Please enter your email address and try again.`,
      });
      return;
    }

    if (e.detail instanceof QuotaError) {
      const retryAt = e.detail.getRetryAt();
      showNotification(this, {
        header: "Too Many Attempts",
        description: html`Please try again at <ui-timestamp timestamp=${retryAt}></ui-timestamp>.`,
        duration: Math.min(retryAt * 1000 - Date.now(), 6000),
      });
      return;
    }

    if (e.detail instanceof AbortError) {
      return;
    }

    console.log(e.detail);
    showNotification(this, {
      header: "Unexpected Error",
      description: html`An unexpected error occurred. Please try again.`,
    });
  }
}
