import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";
import "./views/view-authenticated.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-passkey-signin.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;

  static styles = [core, app];

  render() {
    return html`
      <header>
        <a href="https://github.com/nopwdio/nopwd.rocks" aria-label="github">${github}</a>
      </header>
      <main @np:auth=${this.onAuth} @np:logout=${this.onLogout}>
        ${!this.auth
          ? html`<view-login></view-login>`
          : html`<view-authenticated .auth=${this.auth}></view-authenticated>`}
      </main>
      <footer><a href="">${bolt} by nopwd.io</a></footer>
    `;
  }

  onAuth(e: CustomEvent) {
    this.auth = e.detail;
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
