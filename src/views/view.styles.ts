import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    width: 260px;
    border-radius: var(--np-core-border-radius-m);
    padding: var(--np-core-padding-m);

    background: linear-gradient(-45deg, transparent 60%, white);
    box-shadow: 0px 0px 20px var(--np-core-color-white);
  }

  h1 {
    margin: 0;
    font-size: var(--np-core-font-size-l);
    font-weight: var(--np-core-font-weight-m);
    color: var(--np-core-color-grey-m);
  }

  h2 {
    margin: 0;
    color: var(--np-core-color-grey-s);
    font-size: var(--np-core-font-size-m);
    font-weight: var(--np-core-font-weight-m);
    text-align: center;
  }

  h3 {
    color: var(--np-core-color-grey-xs);
    font-weight: var(--np-core-font-weight-m);
    font-size: var(--np-core-font-size-m);
    margin: 0;
    text-align: left;
  }

  img.avatar {
    width: 100px;
    border-radius: 100%;
    background: transparent;

    margin: var(--np-core-padding-l) 0;
    box-shadow: 0px 0px 20px var(--np-core-color-white);
  }

  p {
    font-size: var(--np-core-font-size-s);
    margin: var(--np-core-padding-s) 0;
    color: var(--np-core-color-grey-s);
    text-align: left;
  }

  p.info {
    text-align: left;
    padding-left: var(--np-core-padding-m);
    border-left: 1px solid var(--np-core-color-grey-l);
  }

  p.disclaimer {
    font-weight: var(--np-core-font-weight-s);
    text-align: center;
  }

  p.disclaimer a {
    color: currentColor;
    text-decoration: none;
    font-weight: var(--np-core-font-weight-m);
  }

  p.disclaimer a:hover {
    color: var(--np-core-color-grey-s);
  }
`;
