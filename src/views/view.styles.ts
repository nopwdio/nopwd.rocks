import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    max-width: 280px;
    box-sizing: border-box;
    border-radius: var(--np-core-border-radius-m);
    border: 1px solid var(--np-core-color-white);
    padding: var(--np-core-padding-m);

    box-shadow: 2px 2px 32px rgba(255, 255, 255, 0.9);

    background-color: rgba(255, 255, 255, 0.5);

    -webkit-backdrop-filter: blur(4px);
    backdrop-filter: blur(4px);
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

  span.avatar {
    margin-top: var(--np-core-padding-m);
    padding: var(--np-core-padding-m);
    border: 2px solid transparent;
    border-radius: var(--np-core-padding-s);
  }

  span.avatar .icon {
    width: var(--np-core-font-size-xl);
    height: var(--np-core-font-size-xl);
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
