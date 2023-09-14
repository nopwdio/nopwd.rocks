import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  np-webauthn-signin,
  np-email-signin,
  np-webauthn-register,
  details {
    width: 100%;
  }

  details,
  aside {
    display: flex;
    flex-flow: column;
    margin: var(--np-core-padding-l) 0 0 0;
    gap: var(--np-core-padding-s);
  }

  p button {
    background-color: transparent;
    color: currentColor;
    border: none;
    padding: 0;
    font-size: var(--np-core-font-size-m);
    font-weight: var(--np-core-font-weight-l);
  }

  details {
    font-size: var(--np-core-font-size-s);
  }

  details summary {
    color: var(--np-core-color-grey-s);
    font-size: var(--np-core-font-size-s);
  }

  details ul {
    display: flex;
    flex-flow: column;
    list-style: none;
    gap: var(--np-core-padding-s);
    padding: 0;
  }

  details ul li {
    display: flex;
    justify-content: space-between;
    font-weight: var(--np-core-font-weight-l);
  }

  details ul li .name {
    color: var(--np-core-color-grey-xs);
  }

  details ul li .value {
    padding: var(--np-core-padding-xs) var(--np-core-padding-s);
    color: var(--np-core-color-grey-xl);
    background-color: var(--np-core-color-grey-xs);
    border-radius: var(--np-core-border-radius-s);
  }
`;
