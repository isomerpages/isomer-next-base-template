import { RenderEngine } from "@isomerpages/isomer-components";
import * as Config from "@/config";
import sitemap from "@/sitemap.json";
import Link from "next/link";

import type { GetStaticProps, GetStaticPaths } from "next";

function extractPermalinks(sitemap: any) {
  let result: any = [];

  function traverse(node: any, path = []) {
    if (node.permalink) {
      // Adding the current node's permalink to the path array
      const newPath = path.concat(node.permalink.replace(/^\//, "").split("/"));
      // Only add to the result if there are actual path segments
      if (newPath.length > 0) {
        result.push({
          params: {
            permalink: newPath,
          },
        });
      }
    }
    // If the current node has children ('paths'), recurse on each child
    if (node.paths && node.paths.length > 0) {
      node.paths.forEach((child: any) => traverse(child, path));
    }
  }

  // Start traversing from the root
  traverse(sitemap);
  console.log(`result`, JSON.stringify(result));
  return result;
}

export const getStaticPaths = (async () => {
  return {
    paths: extractPermalinks(sitemap),
    fallback: false, // false or "blocking"
  };
}) satisfies GetStaticPaths;

export const getStaticProps = (async (context) => {
  console.log(`context`, context);
  const permalink = context.params?.permalink;

  if (permalink && permalink.length > 0 && typeof permalink !== "string") {
    const joinedPermalink = permalink.join("/");

    const schema = (await import(`@/schema/${joinedPermalink}/schema`)).schema;

    return { props: { schema } };
  }

  const schema = (await import(`@/schema/schema`)).schema;
  return { props: { schema } };
}) satisfies GetStaticProps<{
  schema: any;
}>;

export default function Page({ schema }: any) {
  const renderSchema = schema;
  return (
    <RenderEngine
      id={renderSchema.id}
      layout={renderSchema.layout}
      config={{ navbar: Config.Navbar, footer: Config.Footer }}
      sitemap={sitemap}
      permalink={renderSchema.permalink}
      components={renderSchema.components}
      LinkComponent={Link}
    />
  );
}
