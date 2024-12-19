import { css } from "lit";

export default css`
  :host {
    gap: var(--np-core-padding-s);
    align-items: center;
  }

  span.avatar {
    color: var(--np-core-color-grey-m);
  }

  np-login {
    border-color: var(--np-core-color-grey-m);
  }
  np-login:hover {
    border-color: var(--np-core-color-grey-s);
  }

  np-login:focus {
    border-color: var(--np-core-color-grey-xs);
  }
`;
