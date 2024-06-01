import { defineField, defineType } from "sanity";

export default defineType({
  name: "imageAssets",
  title: "Image Assets",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Caption",
        },
      ],
    }),
  ],
});
