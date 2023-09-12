import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import login from "./view-login.styles.js";
import view from "./view-login.styles.js";

import "@apinet/nopwd-sdk/dist/components/np-email-signin.js";
import "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";
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
    return this.auth
      ? html` <h1>Well done ${this.auth.payload.sub}!</h1> `
      : html`not authenticated.`;
  }
}
