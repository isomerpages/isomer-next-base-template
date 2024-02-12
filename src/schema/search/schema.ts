import schemaJson from "./schema.json";
import searchIndex from "@/searchIndex.json";
schemaJson.components[0].props = {
  index: searchIndex,
};
export const schema = schemaJson;
