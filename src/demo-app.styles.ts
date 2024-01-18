import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;
    gap: var(--np-core-padding-l);

    min-height: 100dvh;
    background: linear-gradient(45deg, #3b82f6, #8b5cf6);
    background-image: url("/static/bg.svg");
    --webkit-background-size: cover;
    background-size: cover;
  }

  h1 {
    text-align: center;
    color: var(--np-core-color-grey-s);
    font-size: var(--np-core-font-size-l);
    font-weight: var(--np-core-font-weight-l);
    padding: 0;
    margin: 0;
  }

  header,
  footer {
    display: flex;
    padding: var(--np-core-padding-m);
    color: var(--np-core-color-white);
  }

  header {
    justify-content: space-between;
    font-size: var(--np-core-font-size-s);
  }

  header np-logout {
    font-size: var(--np-core-font-size-s);
  }

  np-logout::part(button) {
    border: 1px solid transparent;
  }

  np-logout:not([state])::part(button) {
    background: transparent;
    border-color: var(--np-core-color-white);
    color: var(--np-core-color-white);
  }

  np-logout[state="loggingout"]::part(button) {
    background: transparent;
    border-color: transparent;
    color: var(--np-core-color-white);
  }

  footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: var(--np-core-font-size-s);
  }

  footer nav {
    display: flex;
    gap: var(--np-core-padding-m);
  }

  footer :is(.version, .commit) {
    display: flex;
    justify-content: space-between;
    gap: var(--np-core-padding-m);
  }
  footer :is(.version, .commit) .value {
    font-weight: var(--np-core-font-weight-m);
    padding: var(--np-core-padding-xs) var(--np-core-padding-s);
    color: var(--np-core-color-grey-xl);
    background-color: var(--np-core-color-grey-xs);
    border-radius: var(--np-core-border-radius-s);
  }

  footer details {
    display: flex;
    font-size: var(--np-core-font-size-s);
  }

  footer details summary {
    cursor: pointer;
    text-align: right;
  }

  footer details nav {
    margin-top: var(--np-core-padding-m);
    flex-flow: column;
    gap: var(--np-core-padding-s);
  }

  main {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    color: white;
  }

  .icon {
    width: var(--np-core-font-size-m);
  }

  a {
    display: flex;
    align-items: center;

    gap: var(--np-core-icon-gap);

    text-decoration: none;
    color: var(--np-core-color-grey-xl);
  }

  a:hover {
    color: var(--np-core-color-white);
  }
`;
