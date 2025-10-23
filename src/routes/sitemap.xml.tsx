import type { APIEvent } from "@solidjs/start/server";
import { getAllBlogs } from "~/lib/queries";

export async function GET({ request }: APIEvent) {
  const baseUrl = new URL(request.url).origin;

  let blogs = await getAllBlogs()

  const routes = [
    "/",
    "/Services",
    "/Services/Web-design",
    "/Services/AI",
    "/About",
    "/ContactUs",
    "/Blog",
    ...blogs.map(b => `/Blog/${encodeURIComponent(b.slug)}`)
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${routes
      .map(
        (route) => `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>monthly</changefreq>
      <priority>0.8</priority>
    </url>
    `
      )
      .join("")}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
