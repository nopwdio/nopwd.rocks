import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: center;
    background-color: red;
    max-width: 800px;
  }

  np-webauthn-signin {
    box-sizing: border-box;
  }

  p {
    font-size: var(--np-core-font-size-s);
  }
`;
