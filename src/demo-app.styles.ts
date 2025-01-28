import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;

    min-height: 100dvh;
    box-sizing: border-box;

    background: var(--np-bg-color);
    color: var(--np-text-color);
    padding: var(--np-padding);
    gap: var(--np-gap);
  }

  div[slot="unauthenticated"] {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: var(--np-gap);
  }

  h1,
  h2 {
    text-align: center;
    padding: 0;
    margin: 0;
  }

  h1 {
    text-align: center;
    font-size: var(--np-text-size-emphasis);
    font-weight: var(--np-text-weight-emphasis);
    margin: 1em;
    color: var(--np-text-color-muted);
  }

  h2 {
    text-align: center;
    font-size: var(--np-text-size);
    font-weight: var(--np-text-weight-emphasis);
    color: var(--np-text-color-muted);
    margin: 1em;
  }

  header,
  footer {
    display: flex;
    align-items: center;
    padding: var(--np-padding);
    color: var(--np-text-color);
    font-size: var(--np-text-size);
  }

  header {
    justify-content: space-between;
  }

  header a.external {
    font-size: var(--np-text-size-muted);
    border: 1px solid var(--np-border-color);
    border-radius: var(--np-border-radius-emphasis);
    padding: var(--np-padding) var(--np-padding-emphasis);
  }

  header a.external:hover {
    border: 1px solid var(--np-border-color-emphasis);
  }
  header np-logout {
    font-size: var(--np-text-size-muted);
  }

  np-logout::part(button) {
    border: 1px solid transparent;
  }

  np-logout:not([state])::part(button) {
    background-color: transparent;
    border-color: var(--np-border-color);
    color: var(--np-text-color);
  }

  np-logout[state="loggingout"]::part(button) {
    background-color: transparent;
    border-color: transparent;
    color: var(--np-text-color-muted);
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }

  np-status::part(link) {
    background-color: transparent;
    font-size: var(--np-text-size-muted);
  }

  np-if {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  a {
    display: flex;
    align-items: center;

    gap: var(--np-gap-muted);

    text-decoration: none;
    color: var(--np-text-color);
  }

  a:hover {
    color: var(--np-text-color-emphasis);
  }
`;
