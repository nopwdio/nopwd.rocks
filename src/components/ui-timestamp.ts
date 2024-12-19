import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("ui-timestamp")
export class UiTimestamp extends LitElement {
  // Define reactive properties
  @property({ type: Number }) timestamp?: number;
  @property({ type: Number }) precision: number = 60;
  private interval?: number;

  // Set up an interval to update the component every second
  connectedCallback() {
    super.connectedCallback();
    this.interval = setInterval(() => this.requestUpdate(), 1000);
  }

  // Clear the interval when the component is disconnected
  disconnectedCallback(): void {
    super.disconnectedCallback();
    clearInterval(this.interval);
  }

  // Render the component's HTML template
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

  // Convert the interval to a human-readable text
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

  // Define styles for the component
  static styles = css`
    .value {
      font-variant-numeric: tabular-nums;
    }
  `;
}

// Define the global interface for the custom element
declare global {
  interface HTMLElementTagNameMap {
    "ui-timestamp": UiTimestamp;
  }
}
