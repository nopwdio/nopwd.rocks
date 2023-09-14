import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  np-webauthn-signin,
  np-email-signin {
    width: 100%;
  }
`;
