import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    width: 260px;
    border-radius: var(--np-core-border-radius-m);
    padding: var(--np-core-padding-m);

    box-shadow: 8px 8px 30px var(--np-core-color-grey-l), -8px -8px 30px var(--np-core-color-white);
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
    text-align: center;
  }

  img.avatar {
    width: 100px;
    border: 2px solid white;
    border-radius: 2em;
    margin: var(--np-core-padding-l) 0;
  }

  p {
    font-size: var(--np-core-font-size-s);
    margin: var(--np-core-padding-s) 0;
    color: var(--np-core-color-grey-s);
    text-align: center;
  }

  p.info {
    text-align: left;
    padding-left: var(--np-core-padding-m);
    border-left: 1px solid var(--np-core-color-grey-l);
  }

  p.error {
    padding: 0 var(--np-core-padding-l);
    font-weight: var(--np-core-font-weight-m);
    color: var(--np-core-color-red-m);
  }

  p.error ui-timestamp {
    font-weight: var(--np-core-font-weight-l);
  }

  p.disclaimer {
    font-weight: var(--np-core-font-weight-s);
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
