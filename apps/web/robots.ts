import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://orunos.com"
  return {
    rules: {
      userAgent: "*",
      allow: ["/"],
      disallow: [
        "./dashboard/",
        "/api/",
      ]
    },
    sitemap : `${baseUrl}/sitemap.xml`
  }
}
