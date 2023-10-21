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

  np-email-login::part(button) {
    background-color: black;
    background: linear-gradient(90deg, #4300c7, #8a0ccf, #ce1ad7, #df28af);
  }
`;
