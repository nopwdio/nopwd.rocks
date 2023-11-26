

const createOpenGraphTags = (page) => {
  return`
    <title>${page.title}</title>
    <meta name="description" content="${page.desc}">
    <meta name="author" content="Adrien Pinet">

    <meta property="og:url" content="${page.link}">
    <meta property="og:type" content="website">
    <meta property="og:title" content="${page.title}">
    <meta property="og:description" content="${page.desc}">
    <meta property="og:image" content="${page.img}">

    <meta name="twitter:card" content="summary_large_image">
    <meta property="twitter:url" content="${page.link}">
    <meta name="twitter:title" content="${page.title}">
    <meta name="twitter:description" content="${page.desc}">
    <meta name="twitter:image" content="${page.img}">  
  `;
}

const createFaviconTags = () => {
  return `
    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32x32.png"/>
    <link rel="icon" type="image/png" sizes="16x16" href="/static/favicon-16x16.png"/>
    <link rel="icon" type="image/svg+xml" href="/static/favicon.ico"/>
    <link rel="apple-touch-icon" type="image/png" sizes="180x180" href="/static/apple-touch-icon.png"/>
    <link rel="mask-icon" href="/static/safari-pinned-tab.svg" color="#7928ca"/>
  `;
}

export const index = (pageDesc, sdkVersion, commitHash) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1" />
    <meta name="sdk-version" content="${sdkVersion}" />
    <meta name="commit-hash" content="${commitHash}" />

    <base href="/" />
    ${createOpenGraphTags(pageDesc)}
    ${createFaviconTags()}

    <style>
      @font-face {
        font-family: inter;
        src: url("/static/Inter.var.woff2") format("woff2 supports variations"),
          url("/static/Inter.var.woff2") format("woff2-variations");
        font-weight: 100 900;
        font-stretch: 75% 125%;
        font-display: swap;
      }
  
      html,
      body {
        margin: 0;
        padding: 0;
        font-family: inter, system-ui, sans-serif;
      }
    </style>
    <script type="module" src="./demo-app.js"></script>
  </head>

  <body>
    <demo-app></demo-app>
  </body>
</html>
`;