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
    justify-content: space-between;

    padding: var(--np-core-padding-m);
  }

  main {
    display: flex;
    justify-content: center;
  }

  .icon {
    width: var(--np-core-font-size-m);
  }
`;
