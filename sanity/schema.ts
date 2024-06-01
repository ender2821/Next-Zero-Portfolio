import { type SchemaTypeDefinition } from "sanity";
import home from "./schemas/home";
import imageAssets from "./schemas/imageAssets";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [imageAssets, home],
};
