import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import login from "./view-auth.styles.js";
import view from "./view.styles.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-register.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";

declare global {
  interface HTMLElementTagNameMap {
    "view-auth": ViewAuth;
  }
}

@customElement("view-auth")
export class ViewAuth extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;
  static styles = [view, login];

  render() {
    if (!this.auth) return html`not authenticated`;

    return html`
      <h1>Well done!</h1>

      ${this.auth.passkeyAvailable ? html` Your de ` : html``}

      <p></p>
    `;
  }
}
