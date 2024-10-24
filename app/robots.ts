import type { MetadataRoute } from "next";
import config from "@/data/config.json";
import footer from "@/data/footer.json";
import navbar from "@/data/navbar.json";
import sitemap from "@/sitemap.json";
import { getRobotsTxt } from "@opengovsg/isomer-components";

const timeNow = new Date();
const lastUpdated =
  timeNow.getDate().toString().padStart(2, "0") +
  " " +
  timeNow.toLocaleString("default", { month: "short" }) +
  " " +
  timeNow.getFullYear();

export default function robots(): MetadataRoute.Robots {
  return getRobotsTxt({
    // @ts-ignore
    site: {
      ...config.site,
      environment: process.env.NEXT_PUBLIC_ISOMER_NEXT_ENVIRONMENT,
      // @ts-ignore
      siteMap: sitemap,
      navBarItems: navbar,
      // @ts-ignore
      footerItems: footer,
      lastUpdated,
    },
  });
}
