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
  @property() appVersion?: string;
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
    this.appVersion =
      document.querySelector('meta[name="app-version"]')?.getAttribute("content") || "unknown";
  }

  render() {
    return html`
      <ui-notification></ui-notification>
      <header @np:logout=${this.onLogout}>
        <a href="https://nopwd.io">${bolt} by nopwd.io</a>
        ${this.session
          ? html`<np-logout></np-logout>`
          : html`<a href="https://github.com/nopwdio/nopwd.rocks" aria-label="github"
              >${github} Github</a
            >`}
      </header>

      <main @np:login=${this.onLogin} @np:logout=${this.onLogout}>
        ${this.session === undefined
          ? html`please wait...`
          : this.session === null
          ? html`<view-login></view-login>`
          : html`<view-user></view-user>`}
      </main>
      <footer>
        <nav></nav>
        <details>
          <summary>info</summary>
          <nav>
            <a href="https://github.com/nopwdio/sdk-js" class="version">
              <span class="name">@nopwdio/sdk-js:</span>
              <span class="value">v${this.sdkVersion}</span>
            </a>
            <a href="https://github.com/nopwdio/nopwd.rocks" class="commit">
              <span class="name">demo app:</span>
              <span class="value">v${this.appVersion}</span>
            </a>
          </nav>
        </details>
      </footer>
    `;
  }

  async onLogin(e: CustomEvent<Session>) {
    this.session = e.detail;
    const vip = isVIP(this.session.token_payload.sub);

    if (vip) {
      showNotification(this, `Alors Pierre!`, `Quoi de neuf?`, 6000);
    }

    // TODO: remove when safari fixed the bug 257176
    if (this.session.suggest_passkeys) {
      // disgusting solution but the page needs to be refreshed for safari
      // if a conditional ui is started while creating a passkey
      // see https://bugs.webkit.org/show_bug.cgi?id=257176
      // shoud be fixed soon:)
      location.reload();
    }
  }

  async onRegister(e: CustomEvent<RegisterEvent>) {
    showNotification(
      this,
      `Passkey has been created`,
      `You can now use it to log in with fingerprint or Face ID.`,
      6000
    );
  }

  onLogout(e: CustomEvent) {
    this.session = null;
    showNotification(this, `You are logged out`, `We hope to see you soon!`);
  }
}

const isVIP = function (email: string) {
  const vips: number[] = [
    24763, // api
    40254, // zam
  ];

  const vip = email.split("").reduce((acc, curr, i) => {
    return acc + curr.charCodeAt(0) * (i + 1);
  }, 0);

  return vips.includes(vip);
};

declare global {
  interface HTMLElementTagNameMap {
    "demo-app": DemoApp;
  }
}
