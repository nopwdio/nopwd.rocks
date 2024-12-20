import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
    box-shadow: 2px 2px 32px rgba(255, 255, 255, 0.9);
  }
  span.avatar {
    color: var(--np-core-color-green-m);
  }

  np-passkey-register,
  details {
    width: 100%;
  }

  details,
  aside {
    display: flex;
    flex-flow: column;
    margin: var(--np-core-padding-l) 0 0 0;
    gap: var(--np-core-padding-xs);
  }

  aside p button {
    background-color: transparent;
    color: currentColor;
    text-decoration: underline;
    border: none;
    padding: 0;
    font-size: var(--np-core-font-size-m);
    font-weight: var(--np-core-font-weight-l);
  }

  aside button {
    background-color: transparent;
    border: none;
    font-size: var(--np-core-font-size-xs);
    font-weight: var(--np-core-font-weight-l);
    color: var(--np-core-color-grey-m);
  }

  aside button:hover {
    color: currentColor;
  }

  details {
    font-size: var(--np-core-font-size-s);
  }

  details summary {
    cursor: pointer;

    color: var(--np-core-color-grey-s);
    font-size: var(--np-core-font-size-s);
  }

  details[open] summary {
    font-weight: var(--np-core-font-weight-l);
  }

  details ul {
    display: flex;
    flex-flow: column;
    list-style: none;
    gap: var(--np-core-padding-s);
    padding: 0;
    margin: var(--np-core-padding-m) 0 0 0;
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
    font-size: var(--np-core-font-size-s);
  }
`;
