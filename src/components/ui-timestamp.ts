import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-timestamp")
export class UiTimestamp extends LitElement {
  @property({ type: Number }) timestamp?: number;
  @property({ type: Number }) precision: number = 60;
  private interval?: number;

  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => this.requestUpdate(), 1000);
  }

  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  render() {
    if (this.timestamp === undefined) {
      return html`--`;
    }

    const now = Date.now() / 1000;
    const delta = Math.round(this.timestamp - now);
    const interval = Math.abs(delta);

    if (interval <= this.precision) {
      return html`just <span class="value">now</span>`;
    }

    const intervalText = this.intervalToText(interval);

    return delta < 0
      ? html`<span class="value">${intervalText}</span> ago`
      : html`in <span class="value">${intervalText}</span>`;
  }

  intervalToText(seconds: number) {
    if (seconds < 60) {
      return `${seconds} seconds`;
    }

    const minutes = Math.round(seconds / 60);
    if (minutes === 1) {
      return `one minute`;
    }
    if (minutes < 60) {
      return `${minutes} minutes`;
    }

    const hours = Math.round(minutes / 60);
    if (hours === 1) {
      return `one hour`;
    }
    if (hours < 24) {
      return `${hours} hours`;
    }

    const days = Math.round(hours / 24);
    if (days === 1) {
      return `one day`;
    }
    if (days < 30.416) {
      return `${days} days`;
    }

    const months = Math.round(days / 30.416);
    if (months === 1) {
      return `one month`;
    }
    if (months < 12) {
      return `${months} months`;
    }

    const years = Math.round(months / 12);
    if (years === 1) {
      return `one year`;
    }
    if (years < 100) {
      return `${years} years`;
    }

    const centuries = Math.round(years / 100);
    if (centuries === 1) {
      return `one century`;
    }

    return `${centuries} centuries`;
  }

  static styles = css`
    .value {
      font-variant-numeric: tabular-nums;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "ui-timestamp": UiTimestamp;
  }
}
