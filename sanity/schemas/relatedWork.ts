import { defineField, defineType } from "sanity";

export const relatedWork = defineType({
  name: "relatedWork",
  title: "Related Work",
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
      name: "gallery",
      title: "Gallery",
      type: "array",
      of: [
        defineField({
          name: "galleryImage",
          title: "Image",
          type: "reference",
          to: [{ type: "imageAssets" }],
          validation: (rule) => rule.required(),
        }),
      ],
    }),
    defineField({
      name: "files",
      title: "Files",
      type: "array",
      of: [
        defineField({
          name: "pageFile",
          title: "File",
          type: "reference",
          to: [{ type: "fileAssets" }],
        }),
      ],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      of: [
        defineField({
          name: "video",
          title: "Video",
          type: "object",
          fields: [
            defineField({
              name: "title",
              title: "Video Title",
              type: "string",
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: "videoLink",
              title: "Video Link",
              type: "url",
              validation: (rule) => rule.required(),
            }),
          ],
        }),
      ],
    }),
  ],
});
