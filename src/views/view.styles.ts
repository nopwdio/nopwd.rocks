import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    max-width: 280px;
    border-radius: var(--np-core-border-radius-l);
    padding: var(--np-core-padding-m);

    box-shadow: 15px 15px 20px var(--np-core-color-grey-l),
      -15px -15px 20px var(--np-core-color-white);
  }

  h1 {
    color: var(--np-core-color-grey-m);
    font-weight: var(--np-core-font-weight-m);
    font-size: var(--np-core-font-size-l);
    margin: 0;
  }

  h2 {
    color: var(--np-core-color-grey-s);
    font-weight: var(--np-core-font-weight-m);
    font-size: var(--np-core-font-size-m);
    margin: 0;
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
    border-radius: 100%;
    margin: var(--np-core-padding-l) 0;
  }

  p {
    font-size: var(--np-core-font-size-s);
    margin: var(--np-core-padding-s) 0;
    color: var(--np-core-color-grey-m);
    text-align: center;
  }

  p.info {
    text-align: left;
    padding-left: var(--np-core-padding-m);
    color: var(--np-core-color-grey-s);
    border-left: 1px solid var(--np-core-color-grey-l);
  }

  p.disclaimer {
    font-size: var(--np-core-font-size-xs);
    padding: 0 var(--np-core-padding-l);
  }

  p.disclaimer a {
    color: currentColor;
    text-decoration: none;
    font-weight: var(--np-core-font-weight-l);
  }

  p.disclaimer a:hover {
    color: var(--np-core-color-grey-s);
  }
`;
