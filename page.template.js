

const createOpenGraph = (page) => {
  return`
  <title>${page.title}</title>
  <meta name="description" content="${page.desc}">

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

const createFavicon = () => {
  return `
    <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png" />
    <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png" />
    <link rel="icon" type="image/png" sizes="192x192" href="/android-icon-192x192.png" />
    <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
    <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png" />
    <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
    <link rel="manifest" href="/manifest.json" />
    <meta name="msapplication-TileColor" content="#ffffff" />
    <meta name="msapplication-TileImage" content="/ms-icon-144x144.png" />
    <meta name="theme-color" content="#ffffff"/>
  `;
}

const pageDesc = {
  title: "Demo | nopwd.rocks",
  desc: "Integration of Nopwd components to authenticate a user using a link and passkey",
  link: "https://nopwd.rocks",
  img: "https://nopwd.rocks/static/opengraph.png",
};


export const index = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1" />
    <base href="/" />
    
    ${createOpenGraph(pageDesc)}

    <link
      rel="icon"
      type="image/svg+xml"
      href="https://github.githubassets.com/favicons/favicon.svg"
    />
    

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