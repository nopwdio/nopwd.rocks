import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { cross } from "../styles/icon.styles";

export const showNotification = function (
  el: HTMLElement,
  header: string,
  description?: string,
  duration: number = 4000
) {
  el.dispatchEvent(
    new CustomEvent("ui-notification:show", {
      composed: true,
      bubbles: true,
      detail: { header, description, duration },
    })
  );
};

export const hideNotification = function (el: HTMLElement) {
  el.dispatchEvent(
    new CustomEvent("ui-notification:hide", {
      composed: true,
      bubbles: true,
    })
  );
};

@customElement("ui-notification")
export class UiNotification extends LitElement {
  private timeout?: number;
  @property({ type: String }) private header: string = "";
  @property({ type: String }) private description?: string;

  connectedCallback() {
    super.connectedCallback();

    this.onShowEvent = this.onShowEvent.bind(this);
    this.onHideEvent = this.onHideEvent.bind(this);

    document.addEventListener("ui-notification:show", this.onShowEvent, false);
    document.addEventListener("ui-notification:hide", this.onHideEvent, false);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener("ui-notification:show", this.onShowEvent);
    document.removeEventListener("ui-notification:hide", this.onHideEvent);
  }

  private onShowEvent(e: any) {
    this.show(e.detail.duration, e.detail.header, e.detail.description);
  }

  private onHideEvent(e: any) {
    this.hide();
  }

  private show(duration: number, header: string, description?: string) {
    this.header = header;
    this.description = description;

    this.style.display = "flex";
    window.requestAnimationFrame(() => {
      this.setAttribute("show", "");
      window.clearTimeout(this.timeout);

      this.timeout = window.setTimeout(() => {
        this.hide();
      }, duration);
    });
  }

  private hide() {
    window.clearTimeout(this.timeout);
    this.removeAttribute("show");
    this.style.display = "none";
  }

  render() {
    return html`
      <main>
        <h1>${this.header}</h1>
        ${this.description ? html`<p>${this.description}</p>` : html``}
      </main>
      <button @click=${this.hide}>${cross}</button>
    `;
  }

  static styles = css`
    :host {
      position: fixed;
      justify-content: space-between;
      align-items: center;
      width: calc(100% - 2em);
      margin-left: 1em;
      box-sizing: border-box;
      top: -1em;
      transition: ease all 400ms;
      padding: var(--np-core-padding-s) var(--np-core-padding-s);
      border-radius: 0 var(--np-core-padding-xs) var(--np-core-padding-xs) 0;
      border-left: 1px solid var(--np-core-color-grey-s);
    }

    :host {
      color: var(--np-core-color-grey-s);
      background-color: hsl(0, 100%, 100%, 50%);
      -webkit-backdrop-filter: blur(6px);
      backdrop-filter: blur(6px);
      box-shadow: 4px 4px 20px var(--np-core-color-grey-l),
        -8px -8px 40px var(--np-core-color-white);
    }

    @media (min-width: 320px) {
      :host {
        width: 320px;
        margin-left: calc(50% - 160px);
      }
    }

    :host {
      display: none;
      opacity: 0;
    }

    :host([show]) {
      display: flex;
      opacity: 1;
      top: 1em;
    }

    main {
      display: flex;
      flex-flow: column;
      gap: var(--np-core-padding-xs);
    }

    h1,
    p {
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: var(--np-core-font-size-m);
      font-weight: var(--np-core-font-weight-l);
    }

    p {
      font-size: var(--np-core-font-size-s);
      font-weight: var(--np-core-font-weight-m);
    }

    .icon {
      width: 1em;
    }

    button {
      color: var(--np-core-color-grey-m);
      display: flex;
      align-items: center;
      padding: 0;
      margin: 0;
      background: transparent;
      border: none;
      font-size: var(--np-core-font-size-l);
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-notification": UiNotification;
  }
}
