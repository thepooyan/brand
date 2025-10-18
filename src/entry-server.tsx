// @refresh reload
import { createHandler, StartServer } from "@solidjs/start/server";
import TagManagerHead from "./components/tagManager/TagManagerHead";
import TagManagerBody from "./components/tagManager/TagManagerBody";

export default createHandler(() => (
  <StartServer
    document={({ assets, children, scripts }) => (
      <html lang="en">
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="/favicon.png" />
          <TagManagerHead/>
          {assets}
        </head>
        <body data-kb-theme="dark">
          <TagManagerBody/>
          <div id="app">{children}</div>
          {scripts}
        </body>
      </html>
    )}
  />
));
