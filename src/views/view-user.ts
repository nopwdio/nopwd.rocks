import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import view from "./view.styles.js";
import user from "./view-user.styles.js";

import "../components/ui-timestamp.js";

import "@nopwdio/sdk-js/dist/components/np-passkey-register.js";

import { RegisterEvent } from "@nopwdio/sdk-js/dist/components/np-passkey-register.js";
import {
  Session,
  addSessionStateChanged,
  removeSessionStateChanged,
} from "@nopwdio/sdk-js/dist/core/session.js";
import { lockClosed } from "../styles/icon.styles.js";

@customElement("view-user")
export class ViewUser extends LitElement {
  // Define properties for session and createdPasskey
  @property({ type: Object }) session?: Session | null = undefined;
  @property({ type: Object }) createdPasskey?: RegisterEvent;

  // Apply styles to the component
  static styles = [view, user];

  constructor() {
    super();
    // Bind the onSessionChanged method to the current instance
    this.onSessionChanged = this.onSessionChanged.bind(this);
  }

  // Method called when the element is connected to the DOM
  async connectedCallback() {
    super.connectedCallback();
    // Add session state change listener
    addSessionStateChanged(this.onSessionChanged);
  }

  // Method called when the element is disconnected from the DOM
  async disconnectedCallback() {
    super.disconnectedCallback();
    // Remove session state change listener
    removeSessionStateChanged(this.onSessionChanged);
  }

  // Method to handle session state changes
  onSessionChanged(session: Session | null | undefined) {
    this.session = session;
  }

  // Method to handle passkey registration
  onRegister(e: CustomEvent<RegisterEvent>) {
    this.createdPasskey = e.detail;
  }

  // Render method for the UI
  render() {
    // If session is undefined, return an empty template
    if (this.session === undefined) {
      return html``;
    }

    // If session is null, return an unauthenticated message
    if (this.session === null) {
      return html`unauthenticated`;
    }

    // Render authenticated user information and passkey registration options
    return html`
      <img class="avatar" src="/static/avatar-success.webp" />
      <h2>
        You are authenticated as <strong>${this.session.token_payload.sub}</strong> on
        <strong>${this.session.token_payload.aud}</strong>
      </h2>
      ${this.session.suggest_passkeys
        ? this.createdPasskey
          ? html`<aside>
              <h3>Congratulations 🎉</h3>
              <p>
                Your passkey has been created! To use it, log out and log in again. You will be
                prompted to select this passkey for authentication.
              </p>
            </aside>`
          : html`<aside>
              <h3>Enable Fingerprint or Face ID on this device?</h3>
              <p>
                By creating a passkey, you can authenticate with Fingerprint or Face ID on this
                website across all your devices. Awesome, right?
              </p>
              <np-passkey-register @np:register=${this.onRegister}></np-passkey-register>
            </aside>`
        : html``}

      <details class="token">
        <summary>Session Details</summary>
        <ul class="claims">
          <li class="claim">
            <span class="name">User:</span
            ><span class="value">${this.session.token_payload.sub}</span>
          </li>
          <li class="claim">
            <span class="name">Domain:</span
            ><span class="value">${this.session.token_payload.aud}</span>
          </li>
          <li class="claim">
            <span class="name">Issuer:</span
            ><span class="value">${this.session.token_payload.iss}</span>
          </li>
          <li class="claim">
            <span class="name">Created:</span
            ><ui-timestamp
              class="value"
              timestamp=${this.session.created_at}
              precision="60"
            ></ui-timestamp>
          </li>
          <li class="claim">
            <span class="name">Expires:</span
            ><ui-timestamp
              class="value"
              timestamp=${this.session.expires_at}
              precision="60"
            ></ui-timestamp>
          </li>
          <li class="claim">
            <span class="name">Authenticated with:</span
            ><span class="value"
              >${this.session.token_payload.amr.length
                ? this.session.token_payload.amr[0]
                : "/"}</span
            >
          </li>
        </ul>
      </details>
    `;
  }
}

// Define the custom element in the global HTMLElementTagNameMap
declare global {
  interface HTMLElementTagNameMap {
    "view-user": ViewUser;
  }
}
