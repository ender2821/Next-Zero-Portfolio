import { StructureBuilder } from "sanity/structure";

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Home Page")
        .child(
          S.document().schemaType("home").title("Home Page").documentId("home")
        ),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (listItem) => !["home"].includes(listItem.getId() as string)
      ),
    ]);
