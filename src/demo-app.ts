import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";
import "./views/view-auth.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";

const fakeAuth = {
  passkeyAvailable: false,
  payload: {
    amr: ["webauthn"],
    aud: "localhost",
    iat: 1694728519,
    exp: 1694723119,
    iss: "nopwd.io",
    jti: "cS04NUQzMngtbnZJeGhJSEJNY2ZkRVptWEVkWDVBMWM2eTZSLUIyTFNYZw",
    sub: "adrien.pinet@gmail.com",
  },
  token: "",
};

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property({ type: Object }) auth?: AuthEvent = fakeAuth;

  static styles = [core, app];

  render() {
    return html`
      <header>
        <a href="https://github.com/nopwdio" aria-label="github">${github}</a>
      </header>
      <main @np:auth=${this.onAuth} @np:logout=${this.onLogout}>
        ${!this.auth
          ? html`<view-login></view-login>`
          : html`<view-auth .auth=${this.auth}></view-auth>`}
      </main>
      <footer><a href="">${bolt} by nopwd.io</a></footer>
    `;
  }

  onAuth(e: CustomEvent) {
    this.auth = e.detail;
    console.log(this.auth);
  }
  onLogout(e: CustomEvent) {
    this.auth = undefined;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
