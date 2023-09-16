import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { AuthEvent } from "@apinet/nopwd-sdk/dist/components/np-passkey-signin.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property({ type: Object }) auth?: AuthEvent;

  static styles = [core, app];

  connectedCallback(): void {
    super.connectedCallback();
    // we preload the view-user
    import("./views/view-user.js");
  }

  render() {
    return html`
      <header>
        <nav>
          <a href="https://github.com/nopwdio/nopwd.rocks" aria-label="github">${github}</a>
        </nav>
      </header>
      <main @np:auth=${this.onAuth} @np:logout=${this.onLogout}>
        ${!this.auth
          ? html`<view-login></view-login>`
          : html`<view-user .auth=${this.auth}></view-user>`}
      </main>
      <footer>
        <nav><a href="">${bolt} by nopwd.io</a></nav>
      </footer>
    `;
  }

  async onAuth(e: CustomEvent) {
    // we ensure view-user is loaded
    await import("./views/view-user.js");
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
