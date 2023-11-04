import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "./views/view-login.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { AuthEvent } from "@nopwdio/sdk-js/dist/components/np-email-auth.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property() sdkVersion?: string;
  @property() commitHash?: string;
  @property({ type: Object }) auth?: AuthEvent;

  static styles = [core, app];

  connectedCallback(): void {
    super.connectedCallback();
    // we preload the view-user
    import("./views/view-user.js");

    // we get the sdk version
    this.sdkVersion =
      document.querySelector('meta[name="sdk-version"]')?.getAttribute("content") || "unknown";
    this.commitHash =
      document.querySelector('meta[name="commit-hash"]')?.getAttribute("content") || "unknown";
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
          ? html`
              <h1>
                <strong>Magic-link</strong> and <strong>Passkeys</strong> <br />
                authentication demo.
              </h1>
              <view-login></view-login>
            `
          : html`<view-user .auth=${this.auth}></view-user>`}
      </main>
      <footer>
        <nav><a href="https://nopwd.io">${bolt} by nopwd.io</a></nav>
        <details>
          <summary>stack</summary>
          <nav>
            <a href="https://github.com/nopwdio/sdk-js" class="version">
              <span class="name">@nopwdio/sdk-js:</span>
              <span class="value">v${this.sdkVersion}</span>
            </a>
            <a href="https://github.com/nopwdio/nopwd.rocks" class="commit">
              <span class="name">demo app:</span>
              <span class="value">${this.commitHash}</span>
            </a>
          </nav>
        </details>
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
