import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;
    gap: var(--np-core-padding-l);

    min-height: 100dvh;

    background-color: rgb(55, 48, 163);
    background-image: radial-gradient(at 72% 1%, rgb(147, 51, 234) 0, transparent 7%),
      radial-gradient(at 52% 17%, rgb(217, 70, 239) 0, transparent 85%),
      radial-gradient(at 2% 26%, rgb(127, 29, 29) 0, transparent 68%),
      radial-gradient(at 32% 51%, rgb(23, 23, 23) 0, transparent 70%),
      radial-gradient(at 13% 40%, rgb(216, 180, 254) 0, transparent 43%),
      radial-gradient(at 97% 79%, rgb(30, 58, 138) 0, transparent 54%);
  }

  div[slot="unauthenticated"] {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
    gap: var(--np-core-padding-m);
  }

  h1,
  h2 {
    text-align: center;
    color: var(--np-core-color-white);
    font-size: var(--np-core-font-size-l);
    font-weight: var(--np-core-font-weight-s);
    padding: 0;
    margin: 0;
  }

  h1 {
    text-align: center;
    color: var(--np-core-color-white);
    font-size: var(--np-core-font-size-l);
    font-weight: var(--np-core-font-weight-s);
    padding: 0;
    margin: 1em;
  }

  header,
  footer {
    display: flex;
    padding: var(--np-core-padding-m);
    color: var(--np-core-color-white);
    font-size: var(--np-core-font-size-s);
  }

  header {
    justify-content: right;
  }

  header a.external {
    border: 1px solid var(--np-core-color-white);
    border-radius: var(--np-core-padding-l);
    padding: var(--np-core-padding-s) var(--np-core-padding-m);
  }

  header np-logout {
    font-size: var(--np-core-font-size-s);
  }

  np-logout::part(button) {
    border: 1px solid transparent;
  }

  np-logout:not([state])::part(button) {
    background-color: transparent;
    border-color: var(--np-core-color-white);
    color: var(--np-core-color-white);
  }

  np-logout[state="loggingout"]::part(button) {
    background-color: transparent;
    border-color: transparent;
    color: var(--np-core-color-white);
  }

  footer {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  footer nav {
    display: flex;
    gap: var(--np-core-padding-m);
  }

  footer :is(.version, .commit, .api) {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--np-core-padding-xl);
  }

  np-status::part(link) {
    background-color: transparent;
  }

  footer .api {
    padding-top: var(--np-core-padding-s);
  }

  footer .value {
    font-weight: var(--np-core-font-weight-l);
    color: var(--np-core-color-white);
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

  np-if {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
  }

  .icon {
    width: var(--np-core-font-size-m);
  }

  a {
    display: flex;
    align-items: center;

    gap: var(--np-core-icon-gap);

    text-decoration: none;
    color: var(--np-core-color-white);
  }

  a:hover {
    color: var(--np-core-color-white);
  }
`;
