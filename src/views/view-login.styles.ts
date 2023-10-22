import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  np-passkey-login,
  np-email-login {
    width: 100%;
  }

  np-email-login:not([state])::part(button) {
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  }
`;
