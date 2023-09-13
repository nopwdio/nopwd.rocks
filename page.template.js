export const index = `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1" />
    <base href="/" />
    <meta name="title" content="Nopwd demo website" />
    <link
      rel="icon"
      type="image/svg+xml"
      href="https://github.githubassets.com/favicons/favicon.svg"
    />
    <title>Demo | NoPwd</title>

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