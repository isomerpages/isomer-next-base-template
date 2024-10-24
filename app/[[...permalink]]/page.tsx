import type { IsomerPageSchemaType } from "@opengovsg/isomer-components";
import type { Metadata, ResolvingMetadata } from "next";
import Link from "next/link";
import Script from "next/script";
import config from "@/data/config.json";
import footer from "@/data/footer.json";
import navbar from "@/data/navbar.json";
import sitemap from "@/sitemap.json";
import {
  getMetadata,
  getSitemapXml,
  RenderEngine,
} from "@opengovsg/isomer-components";

interface DynamicPageProps {
  params: {
    permalink: string[];
  };
}

const timeNow = new Date();
const lastUpdated =
  timeNow.getDate().toString().padStart(2, "0") +
  " " +
  timeNow.toLocaleString("default", { month: "short" }) +
  " " +
  timeNow.getFullYear();

// NOTE: This function is slightly different from the one in the monorepo's
// tooling/template, as we are NOT using the _index.json as the index page here
// START OF DIFFERENCE
const getSchema = async (
  permalink: DynamicPageProps["params"]["permalink"]
) => {
  if (permalink && permalink.length > 0 && typeof permalink !== "string") {
    const joinedPermalink = permalink.join("/");

    const schema = (await import(`@/schema/${joinedPermalink}.json`).then(
      (module) => module.default
    )) as IsomerPageSchemaType;

    const lastModified =
      // @ts-ignore
      getSitemapXml(sitemap).find(
        ({ url }) => permalink.join("/") === url.replace(/^\//, "")
      )?.lastModified || new Date().toISOString();

    schema.page.permalink = "/" + joinedPermalink;
    schema.page.lastModified = lastModified;

    return schema;
  }

  const schema = (await import(`@/schema/index.json`).then(
    (module) => module.default
  )) as IsomerPageSchemaType;

  const lastModified =
    // @ts-ignore
    getSitemapXml(sitemap).find(({ url }) => url === "/")?.lastModified ||
    new Date().toISOString();

  schema.page.permalink = "/";
  schema.page.lastModified = lastModified;

  return schema;
};
// END OF DIFFERENCE

export const generateStaticParams = () => {
  // @ts-ignore
  return getSitemapXml(sitemap).map(({ url }) => ({
    permalink: url.replace(/^\//, "").split("/"),
  }));
};

export const generateMetadata = async (
  { params }: DynamicPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { permalink } = params;
  const schema = await getSchema(permalink);
  schema.site = {
    ...config.site,
    environment: process.env.NEXT_PUBLIC_ISOMER_NEXT_ENVIRONMENT,
    // @ts-ignore
    siteMap: sitemap,
    navBarItems: navbar,
    // @ts-ignore
    footerItems: footer,
    lastUpdated,
    assetsBaseUrl: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
  };
  return getMetadata(schema);
};

const Page = async ({ params }: DynamicPageProps) => {
  const { permalink } = params;
  const renderSchema = await getSchema(permalink);

  return (
    <>
      <RenderEngine
        {...renderSchema}
        site={{
          ...config.site,
          environment: process.env.NEXT_PUBLIC_ISOMER_NEXT_ENVIRONMENT,
          // @ts-ignore
          siteMap: sitemap,
          navBarItems: navbar,
          // @ts-ignore
          footerItems: footer,
          lastUpdated,
          assetsBaseUrl: process.env.NEXT_PUBLIC_ASSETS_BASE_URL,
        }}
        LinkComponent={Link}
        ScriptComponent={Script}
      />
    </>
  );
};

export default Page;
