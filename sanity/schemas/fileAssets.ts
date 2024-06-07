import { defineField, defineType } from "sanity";

export const fileAssets = defineType({
  name: "fileAssets",
  title: "File Assets",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fileUpload",
      title: "File Upload",
      type: "file",
      options: {
        accept:
          ".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.zip,.rar,.7z,.tar,.gz,.tgz,.bz2,.xz,.pdf,.jpg,.jpeg,.png,.gif,.svg,.mp4,.mov,.avi,.mp3,.wav,.flac,.zip,.rar,.7z,.tar,.gz,.tgz,.bz2,.xz",
      },
      validation: (rule) => rule.required(),
    }),
  ],
});
