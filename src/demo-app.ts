import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";
import "./views/view-auth.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { github } from "./styles/icon.styles.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-webauthn-signin.js";

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;
  @property({ type: Boolean }) skipPasskey: boolean = false;

  static styles = [core, app];

  onAuth(e: CustomEvent) {
    this.auth = e.detail;
  }

  render() {
    return html`
      <header>
        <span>nopwd</span><a href="https://github.com/nopwdio" aria-label="github">${github}</a>
      </header>
      <main @np:auth=${this.onAuth}>
        ${!this.auth
          ? html`<view-login></view-login>`
          : html`<view-auth .auth=${this.auth}></view-auth>`}
      </main>
      <footer></footer>
    `;
  }
}
