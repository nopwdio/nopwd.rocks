import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;
    gap: var(--np-core-padding-l);

    min-height: 100dvh;

    background-color: var(--np-core-color-grey-xl);
  }

  h1 {
    text-align: center;
    color: var(--np-core-color-grey-s);
    font-weight: var(--np-core-font-weight-l);
    padding: 0;
    margin: 0;
  }

  header,
  footer {
    display: flex;

    padding: var(--np-core-padding-m);
  }

  header {
    justify-content: flex-end;
    font-size: var(--np-core-font-size-l);
  }

  footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: var(--np-core-font-size-s);
    color: var(--np-core-color-grey-s);
  }

  footer nav {
    display: flex;
    gap: var(--np-core-padding-m);
  }
  footer :is(.version, .commit) {
    font-size: var(--np-core-font-size-s);
  }
  footer :is(.version, .commit) .value {
    font-weight: var(--np-core-font-weight-m);
  }

  main {
    display: flex;
    justify-content: center;
  }

  .icon {
    width: var(--np-core-font-size-m);
    height: var(--np-core-font-size-m);
  }

  a {
    display: flex;
    align-items: center;

    gap: var(--np-core-icon-gap);

    text-decoration: none;
    color: var(--np-core-color-grey-s);
  }

  a:hover {
    color: var(--np-core-color-grey-xs);
  }
`;
