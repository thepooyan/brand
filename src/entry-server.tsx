// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import { nameEn } from "../config/config";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.ico" />
          {assets}
          <title>{nameEn}</title>
        </head>
        <body data-kb-theme="dark">
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
