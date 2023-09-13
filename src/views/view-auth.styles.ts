import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  h1 {
    color: var(--np-core-color-grey-m);
    font-weight: var(--np-core-font-weight-s);
    margin: 0;
  }

  img {
    width: 100px;
    border: 1px solid white;
    border-radius: 100%;
    margin: var(--np-core-padding-l) 0;
  }

  np-webauthn-signin,
  np-email-signin {
    width: 100%;
  }

  p {
    font-size: var(--np-core-font-size-xs);
    text-align: center;
    color: var(--np-core-color-grey-m);
    margin: var(--np-core-padding-s) 0;
  }
`;
