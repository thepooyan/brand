// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import TagManagerHead from "./components/tagManager/TagManagerHead";
import TagManagerBody from "./components/tagManager/TagManagerBody";
import { isProd } from "./server/env/private-env";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          {isProd && 
          <TagManagerHead/>}
          {assets}
        </head>
        <body class="dark">
          {isProd && 
          <TagManagerBody/>}
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
