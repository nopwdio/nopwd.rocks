import { css } from "lit";

export default css`
  :host {
    display: flex;
    flex-flow: column;
    max-width: 280px;
    box-sizing: border-box;
    border-radius: var(--np-border-radius-emphasis);

    padding: var(--np-padding-emphasis);
    gap: var(--np-gap-emphasis);
    background: var(--np-bg-color-muted);
    -webkit-backdrop-filter: blur(2px);
    backdrop-filter: blur(2px);
  }

  h1 {
    margin-top: var(--np-gap);
    font-size: var(--np-text-size-emphasis);
    font-weight: var(--np-text-weight-emphasis);
    text-align: left;
  }

  h2 {
    margin-top: var(--np-gap);
    font-size: var(--np-text-size);
    font-weight: var(--np-text-weight-emphasis);
    text-align: left;
  }

  h3 {
    margin-top: var(--np-gap);
    font-size: var(--np-text-size-muted);
    font-weight: var(--np-text-weight-emphasis);
    text-align: left;
  }

  .avatar {
    position: relative;
    top: -50px;
    width: 100px;
    border-radius: 5em;
    background-color: var(--np-bg-color);
  }

  span.avatar .icon {
    width: var(--np-core-font-size-xl);
    height: var(--np-core-font-size-xl);
  }

  p {
    font-size: var(--np-core-font-size-s);
    margin: var(--np-core-padding-s) 0;
    color: var(--np-text-color-muted);
    text-align: left;
  }

  p.info {
    text-align: left;
    padding-left: var(--np-core-padding-m);
    border-left: 1px solid var(--np-core-color-grey-l);
  }

  p.disclaimer {
    font-weight: var(--np-text-weight);
    text-align: center;
  }

  p.disclaimer a {
    color: currentColor;
    text-decoration: none;
    font-weight: var(--np-text-weight-emphasis);
  }

  p.disclaimer a:hover {
    color: var(--np-text-color);
  }
`;
