import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import login from "./view-login.styles.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-login": ViewLogin;
  }
}

@customElement("view-login")
export class ViewLogin extends LitElement {
  static styles = [view, login];

  private onPasskey(e: CustomEvent<string>) {
    e.preventDefault();
    alert("aze");
  }

  render() {
    return html`
      <h1>Welcome!</h1>
      <img class="avatar" src="/static/avatar-welcome.webp" alt="welcome" />
      <np-webauthn-signin></np-webauthn-signin>
      <np-email-signin></np-email-signin>
      <p class="disclaimer">
        By logging in, you are agreeing to our <a href="/terms">Terms of Service</a> and
        <a>Privacy Policy</a>
      </p>
    `;
  }
}
