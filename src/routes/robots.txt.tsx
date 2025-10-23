import type { APIEvent } from "@solidjs/start/server";

export function GET({ request }: APIEvent) {
  const baseUrl = new URL(request.url).origin;

  const robotsTxt = `
    User-agent: *
    Allow: /
    Sitemap: ${baseUrl}/sitemap.xml
  `;

  return new Response(robotsTxt.trim(), {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}
