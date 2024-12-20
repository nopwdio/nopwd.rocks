import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;
    gap: var(--np-core-padding-l);

    min-height: 100dvh;
    background-image: linear-gradient(62deg, #aee5ff 0%, #f0e3ff 100%);

    background-color: rgb(250, 232, 255);
    background-image: radial-gradient(at 15% 52%, rgb(129, 140, 248) 0, transparent 68%),
      radial-gradient(at 53% 40%, rgb(244, 114, 182) 0, transparent 49%),
      radial-gradient(at 71% 85%, rgb(212, 212, 212) 0, transparent 41%),
      radial-gradient(at 81% 33%, rgb(103, 232, 249) 0, transparent 40%),
      radial-gradient(at 67% 93%, rgb(249, 115, 22) 0, transparent 32%),
      radial-gradient(at 83% 1%, rgb(254, 215, 170) 0, transparent 86%);
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
