import { orderableDocumentListDeskItem } from "@sanity/orderable-document-list";
import { ConfigContext } from "sanity";
import { StructureBuilder } from "sanity/structure";

export const myStructure = (S: StructureBuilder, context: ConfigContext) =>
  S.list()
    .title("Site")
    .items([
      S.listItem()
        .title("Home Page")
        .id("home")
        .child(
          S.document().schemaType("home").title("Home Page").documentId("home")
        ),
      orderableDocumentListDeskItem({
        type: "firstHand",
        S,
        context,
        title: "First Hand Pages",
      }),
      orderableDocumentListDeskItem({
        type: "costumeConstruction",
        S,
        context,
        title: "Costume Construction Pages",
      }),
      orderableDocumentListDeskItem({
        type: "underGradCourseWork",
        S,
        context,
        title: "Undergraduate Coursework Pages",
      }),
      orderableDocumentListDeskItem({
        type: "relatedWork",
        title: "Related Work Pages",
        S,
        context,
      }),
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
