import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    max-width: 300px;
    border-radius: var(--np-core-border-radius-l);
    padding: var(--np-core-padding-m);

    box-shadow: 15px 15px 20px var(--np-core-color-grey-l),
      -15px -15px 20px var(--np-core-color-white);
  }
`;
