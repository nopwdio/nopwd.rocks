import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { AuthEvent } from "@nopwdio/sdk-js/dist/components/np-email-login.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property() sdkVersion?: string;
  @property({ type: Object }) auth?: AuthEvent;

  static styles = [core, app];

  connectedCallback(): void {
    super.connectedCallback();
    // we preload the view-user
    import("./views/view-user.js");

    // we get the sdk version
    this.sdkVersion =
      document.querySelector('meta[name="sdk-version"]')?.getAttribute("content") || "unknown";
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
        <nav><a href="https://nopwd.io">${bolt} by nopwd.io</a></nav>
        <span class="version">
          <span class="name">@nopwdio/sdk-js:</span>
          <span class="value">v${this.sdkVersion}</span>
        </span>
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
