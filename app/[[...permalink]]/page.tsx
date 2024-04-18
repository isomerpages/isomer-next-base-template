import {
  type IsomerPageSchema,
  type IsomerSitemap,
  RenderEngine,
  getMetadata,
  getSitemapXml,
} from "@isomerpages/isomer-components";
import config from "@/data/config.json";
import navbar from "@/data/navbar.json";
import footer from "@/data/footer.json";
import sitemap from "@/sitemap.json";
import Link from "next/link";
import type { Metadata, ResolvingMetadata } from "next";

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

const getSchema = async (
  permalink: DynamicPageProps["params"]["permalink"]
) => {
  if (permalink && permalink.length > 0 && typeof permalink !== "string") {
    const joinedPermalink = permalink.join("/");

    const schema = (await import(`@/schema/${joinedPermalink}.json`).then(
      (module) => module.default
    )) as IsomerPageSchema;

    schema.page.permalink = "/" + joinedPermalink;

    return schema;
  }

  const schema = (await import(`@/schema/index.json`).then(
    (module) => module.default
  )) as IsomerPageSchema;

  schema.page.permalink = "/";

  return schema;
};

export const generateStaticParams = () => {
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
    siteMap: sitemap,
    navBarItems: navbar,
    // @ts-expect-error blah
    footerItems: footer,
    lastUpdated,
  };
  return getMetadata(schema);
};

const Page = async ({ params }: DynamicPageProps) => {
  const { permalink } = params;
  const renderSchema = await getSchema(permalink);

  return (
    <>
      <RenderEngine
        version={renderSchema.version}
        site={{
          ...config.site,
          environment: process.env.NEXT_PUBLIC_ISOMER_NEXT_ENVIRONMENT,
          siteMap: sitemap,
          navBarItems: navbar,
          // @ts-expect-error blah
          footerItems: footer,
          lastUpdated,
        }}
        layout={renderSchema.layout}
        page={renderSchema.page}
        content={renderSchema.content}
        LinkComponent={Link}
      />
    </>
  );
};

export default Page;
