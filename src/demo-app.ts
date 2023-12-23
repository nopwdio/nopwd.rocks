import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@nopwdio/sdk-js/dist/components/np-logout.js";

import "./components/ui-notification.js";

import core from "./styles/core.styles.js";
import app from "./demo-app.styles.js";
import { bolt, github } from "./styles/icon.styles.js";
import { Session, get } from "@nopwdio/sdk-js/dist/core/session.js";
import { showNotification } from "./components/ui-notification.js";
import { RegisterEvent } from "@nopwdio/sdk-js/dist/components/np-passkey-register.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property() sdkVersion?: string;
  @property() commitHash?: string;
  @property({ type: Object }) session?: Session | null;

  static styles = [core, app];

  async connectedCallback() {
    super.connectedCallback();

    // we preload the view-user
    import("./views/view-user.js");
    import("./views/view-login.js");

    this.session = await get();

    // we get the sdk version
    this.sdkVersion =
      document.querySelector('meta[name="sdk-version"]')?.getAttribute("content") || "unknown";
    this.commitHash =
      document.querySelector('meta[name="commit-hash"]')?.getAttribute("content") || "unknown";
  }

  render() {
    return html`
      <ui-notification></ui-notification>
      <header @np:logout=${this.onLogout}>
        ${this.session
          ? html`<np-logout></np-logout>`
          : html`<a href="https://github.com/nopwdio/nopwd.rocks" aria-label="github"
              >${github}</a
            >`}
      </header>
      <main @np:login=${this.onLogin}>
        ${this.session === undefined
          ? html`please wait...`
          : this.session === null
          ? html`<view-login></view-login>`
          : html`<view-user .session=${this.session}></view-user>`}
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

  async onLogin(e: CustomEvent<Session>) {
    this.session = e.detail;

    showNotification(this, `Welcome ${this.session.token_payload.sub}!`, undefined, 6000);
  }

  async onRegister(e: CustomEvent<RegisterEvent>) {
    showNotification(
      this,
      `Passkey created`,
      `You can now use it to log in with fingerprint or Face ID.`,
      6000
    );
  }

  onLogout(e: CustomEvent) {
    this.session = null;
    showNotification(this, `You are logged out`, `We will be glad to see you again :)`);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
