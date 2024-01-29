import { RenderEngine } from "@isomerpages/isomer-components";
import schema from "../../schema/schema";

export default function Page() {
  return (
    <>
      <RenderEngine
        id={schema.id}
        layout={schema.layout}
        path={schema.permalink}
        components={schema.components}
      />
    </>
  );
}
