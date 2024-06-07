import { StructureBuilder } from "sanity/structure";

export const myStructure = (S: StructureBuilder) =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Home Page")
        .id("home")
        .child(
          S.document().schemaType("home").title("Home Page").documentId("home")
        ),
      S.documentTypeListItem("costumeConstruction").title(
        "Costume Construction Pages"
      ),
      S.documentTypeListItem("underGradCourseWork").title(
        "Undergraduate Coursework Pages"
      ),
      S.documentTypeListItem("relatedWork").title("Related Work Pages"),
      S.listItem()
        .title("Contact Page")
        .id("contact")
        .child(
          S.document()
            .schemaType("contact")
            .title("Contact Page")
            .documentId("contact")
        ),
      S.divider(),
      S.documentTypeListItem("imageAssets").title("Image Assets"),
      S.documentTypeListItem("fileAssets").title("File Assets"),
    ]);
