import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    align-items: stretch;
    justify-content: space-between;

    min-height: 100dvh;

    background-color: var(--np-core-color-grey-xl);
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
    justify-content: flex-start;
    font-size: var(--np-core-font-size-s);
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
    color: var(--np-core-color-grey-m);
  }

  a:hover {
    color: var(--np-core-color-grey-s);
  }
`;
