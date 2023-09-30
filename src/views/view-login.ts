import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-passkey-signin.js";

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
      <h1>Welcome!</h1>
      <img class="avatar" src="/static/avatar-welcome.webp" alt="welcome" />

      <!-- the only logic to use magic link or passkey authentication is here -->
      <np-passkey-signin @input=${this.onEmailChange}></np-passkey-signin>
      <np-email-signin email=${this.email}></np-email-signin>

      <p class="disclaimer">
        By logging in, you are agreeing to our
        <a href="https://dev.nopwd.io/policies/terms">Terms of Service</a> and
        <a href="https://dev.nopwd.io/policies/privacy">Privacy Policy</a>
      </p>
    `;
  }

  onEmailChange(e: KeyboardEvent) {
    const input = e.target as HTMLInputElement;
    this.email = input.value;
  }
}
