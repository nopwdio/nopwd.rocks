import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  span.avatar {
    color: var(--np-core-color-grey-m);
  }

  np-passkey-conditional,
  np-email-auth {
    width: 100%;
  }

  np-email-auth:not([state])::part(button) {
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
  }
`;
