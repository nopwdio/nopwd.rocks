import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;
    gap: var(--np-core-padding-l);

    min-height: 100dvh;
    background-image: linear-gradient(62deg, #8ec5fc 0%, #e0c3fc 100%);
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
    color: var(--np-core-color-black);
    font-size: var(--np-core-font-size-s);
  }

  header {
    justify-content: space-between;
  }

  header np-logout {
    font-size: var(--np-core-font-size-s);
  }

  np-logout::part(button) {
    border: 1px solid transparent;
  }

  np-logout:not([state])::part(button) {
    background: transparent;
    border-color: var(--np-core-color-black);
    color: var(--np-core-color-black);
  }

  np-logout[state="loggingout"]::part(button) {
    background: transparent;
    border-color: transparent;
    color: var(--np-core-color-black);
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
    color: var(--np-core-color-grey-xs);
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
    color: var(--np-core-color-grey-xs);
  }

  a:hover {
    color: var(--np-core-color-black);
  }
`;
