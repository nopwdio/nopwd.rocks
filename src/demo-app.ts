import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@nopwdio/sdk-js/dist/components/np-if.js";
import "@nopwdio/sdk-js/dist/components/np-logout.js";
import "@nopwdio/sdk-js/dist/components/np-status.js";

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

  static styles = [core, app];

  async connectedCallback() {
    super.connectedCallback();
    // we preload views
    import("./views/view-user.js");
    import("./views/view-login.js");
    //import("@nopwdio/sdk-js/dist/components/np-status");

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
        <np-if>
          <np-logout slot="authenticated"></np-logout>
          <a
            slot="unauthenticated"
            href="https://github.com/nopwdio/nopwd.rocks"
            aria-label="github"
            >${github} Github</a
          >
        </np-if>
      </header>

      <np-if @np:login=${this.onLogin} @np:logout=${this.onLogout}>
        <view-login slot="unauthenticated"></view-login>
        <view-user slot="authenticated"></view-user>
        <div slot="unknown"></div>
      </np-if>
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
            <span class="api">
              <span class="name">Api status:</span>
              <np-status></np-status>
            </span>
          </nav>
        </details>
      </footer>
    `;
  }

  async onLogin(e: CustomEvent<Session>) {
    const session = e.detail;
    const vip = isVIP(session.token_payload.sub);

    if (vip) {
      showNotification(this, {
        header: `Alors Pierre!`,
        description: html`Quoi de neuf?`,
      });
    }

    console.log(session.token_payload);
  }

  async onRegister(e: CustomEvent<RegisterEvent>) {
    showNotification(this, {
      header: `Passkey has been created`,
      description: html`You can now use it to log in with fingerprint or Face ID.`,
    });
  }

  onLogout(e: CustomEvent) {
    showNotification(this, {
      header: `You are logged out`,
      description: html`We hope to see you soon!`,
    });
  }
}

const isVIP = function (email: string) {
  const vips: number[] = [
    //24763, // api
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
