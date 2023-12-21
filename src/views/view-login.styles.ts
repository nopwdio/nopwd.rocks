import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  np-passkey-conditional,
  np-email-auth {
    width: 100%;
  }

  np-email-auth:not([state])::part(button) {
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  }

  np-passkey-conditional[state="verifying"]::part(input) {
    border: #8b5cf6 1px solid;
  }

  np-passkey-conditional[state="loggedin"]::part(input) {
    border: green 1px solid;
  }
`;
