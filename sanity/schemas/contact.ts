import { defineField, defineType } from "sanity";

export const contact = defineType({
  name: "contact",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle",
      type: "string",
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [{ type: "block" }],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "reference",
      to: [{ type: "imageAssets" }],
      validation: (rule) => rule.required(),
    }),
  ],
});
