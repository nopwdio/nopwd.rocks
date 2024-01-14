import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";
import { bell, cross } from "../styles/icon.styles";

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
      ${bell}
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
      border: 1px solid var(--np-core-color-white);
      border-radius: var(--np-core-padding-l);
      gap: var(--np-core-padding-s);

      color: var(--np-core-color-grey-s);
      background-color: var(--np-core-color-white);
      box-shadow: 0px 0px 10px var(--np-core-color-white);
    }

    :host {
    }

    @media (min-width: 280px) {
      :host {
        width: 280px;
        margin-left: calc(50% - 140px);
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

    .icon {
      width: 1em;
    }

    .icon--bell {
      font-size: var(--np-core-font-size-l);
    }

    main {
      display: flex;
      flex: 1;
      flex-flow: column;
      gap: var(--np-core-padding-xs);
    }

    h1,
    p {
      margin: 0;
      padding: 0;
    }

    h1 {
      font-size: var(--np-core-font-size-s);
      font-weight: var(--np-core-font-weight-l);
    }

    p {
      font-size: var(--np-core-font-size-xs);
      font-weight: var(--np-core-font-weight-m);
    }

    button {
      color: var(--np-core-color-grey-l);
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
