import { RenderEngine } from "@isomerpages/isomer-components";
import { schema } from "@/schema/search/schema";
import * as Config from "@/config";
import sitemap from "@/sitemap.json";

export default function Page() {
  const renderSchema = schema;
  return (
    <RenderEngine
      id={renderSchema.id}
      layout={renderSchema.layout}
      config={{ navbar: Config.Navbar, footer: Config.Footer }}
      sitemap={sitemap}
      permalink={renderSchema.permalink}
      components={renderSchema.components}
    />
  );
}
