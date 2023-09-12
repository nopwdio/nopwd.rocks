import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import login from "./view-login.styles.js";
import view from "./view-login.styles.js";

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
      <h1>Welcome</h1>

      <np-webauthn-signin></np-webauthn-signin>
      <np-email-signin></np-email-signin>
      <p>By log in, you agree to the</p>
    `;
  }
}
