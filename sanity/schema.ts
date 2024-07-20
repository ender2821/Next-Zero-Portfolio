import { type SchemaTypeDefinition } from "sanity";
import { home } from "./schemas/home";
import { imageAssets } from "./schemas/imageAssets";
import { costumeConstruction } from "./schemas/costumeConstruction";
import { fileAssets } from "./schemas/fileAssets";
import { underGradCourseWork } from "./schemas/undergradCourseWork";
import { relatedWork } from "./schemas/relatedWork";
import { contact } from "./schemas/contact";
import { firstHand } from "./schemas/firstHand";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    imageAssets,
    fileAssets,
    home,
    firstHand,
    costumeConstruction,
    underGradCourseWork,
    relatedWork,
    contact,
  ],
};
