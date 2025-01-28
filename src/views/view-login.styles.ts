import { css } from "lit";

export default css`
  :host {
    align-items: center;
  }

  span.avatar {
    color: var(--np-core-color-grey-m);
  }

  np-login {
    display: flex;
    --np-component-border-radius: var(--np-border-radius);
    --np-component-text-color: var(--np-text-color);
    --np-component-border-color: var(--np-border-color);
  }
  np-login:hover {
    --np-component-border-color: var(--np-border-color-emphasis);
  }
`;
