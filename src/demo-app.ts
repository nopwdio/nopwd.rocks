import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import "@nopwdio/sdk-js/dist/components/np-if.js";
import "@nopwdio/sdk-js/dist/components/np-logout.js";

import "./components/ui-notification.js";
import "@nopwdio/ui/dist/components/ui-darkmode.js";
import core from "@nopwdio/ui/dist/styles/core.js";
import sementic from "@nopwdio/ui/dist/styles/sementic.js";
import app from "./demo-app.styles.js";
import { bolt } from "./styles/icon.styles.js";
import { Session } from "@nopwdio/sdk-js/dist/core/session.js";
import { showNotification } from "./components/ui-notification.js";
import { RegisterEvent } from "@nopwdio/sdk-js/dist/components/np-passkey-register.js";

@customElement("demo-app")
export class DemoApp extends LitElement {
  @property() sdkVersion?: string;
  @property() appVersion?: string;

  static styles = [core, sementic, app];

  // Method called when the element is connected to the DOM
  async connectedCallback() {
    super.connectedCallback();

    this.addEventListener(
      "np:theme",
      (e: Event) => {
        this.setAttribute("theme", (e as CustomEvent).detail);
      },
      true
    );

    // Preload secondary component
    import("./views/view-user.js");
    import("./views/view-login.js");
  }

  // Render method for the UI
  render() {
    return html`
      <ui-notification></ui-notification>
      <header @np:logout=${this.onLogout}>
        <a href="https://nopwd.io">${bolt} by <strong>nopwd.io</strong></a>
        <np-if>
          <np-logout slot="authenticated"></np-logout>
          <a slot="unauthenticated" href="https://dev.nopwd.io" class="external">Documentation →</a>
        </np-if>
      </header>

      <np-if @np:login=${this.onLogin} @np:logout=${this.onLogout}>
        <view-login slot="unauthenticated"></view-login>
        <view-user slot="authenticated"></view-user>
        <div slot="unknown">Please wait...</div>
      </np-if>
      <footer>
        <ui-darkmode></ui-darkmode>
      </footer>
    `;
  }

  // Method called on login
  async onLogin(e: CustomEvent<Session>) {
    const session = e.detail;
    const vip = isVIP(session.token_payload.sub);

    if (vip) {
      showNotification(this, {
        header: `What's up bro!`,
        description: html`We're glad to see you again!`,
      });
    }

    console.log(session.token_payload);
  }

  // Method called on register
  async onRegister(e: CustomEvent<RegisterEvent>) {
    showNotification(this, {
      header: `Passkey Created`,
      description: html`You can now log in using your fingerprint or Face ID.`,
    });
  }

  // Method called on logout
  onLogout(e: CustomEvent) {
    showNotification(this, {
      header: `Logged Out`,
      description: html`We hope to see you again soon!`,
    });
  }
}

// Function to check if a user is VIP and display a specific welcome message
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
