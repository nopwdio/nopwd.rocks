import { css } from "lit";

export default css`
  :host {
    gap: var(--np-gap);
    align-items: center;
  }
  span.avatar {
    color: var(--np-core-color-green-m);
  }

  np-passkey-register,
  details {
    width: 100%;
  }

  np-passkey-register::part(button) {
    background-color: var(--np-fill-color-confirm);
    border: none;
  }

  details,
  aside {
    display: flex;
    flex-flow: column;
    margin: var(--np-gap) 0 0 0;
    gap: var(--np-gap);
  }

  details {
    font-size: var(--np-text-size-muted);
  }

  details summary {
    cursor: pointer;

    color: var(--np-text-color-muted);
    font-size: var(--np-text-size-muted);
  }

  details[open] summary {
    font-weight: var(--np-text-weight-emphasis);
  }

  details ul {
    display: flex;
    flex-flow: column;
    list-style: none;
    gap: var(--np-gap);
    padding: 0;
    margin: var(--np-padding) 0 0 0;
  }

  details ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: var(--np-core-font-weight-l);
    font-size: var(--np-text-size-muted);
  }

  details ul li .name {
    color: var(--np-text-color-muted);
  }

  details ul li .value {
    padding: var(--np-padding) var(--np-padding-emphasis);
    color: var(--np-fill-color-accent);
    background-color: var(--np-bg-color-emphasis);
    border-radius: var(--np-border-radius);
  }
`;
