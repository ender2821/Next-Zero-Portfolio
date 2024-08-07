import Header from "@/components/Header";
import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import SecondaryPageTemplate from "@/components/SecondaryPageTemplate";

type Props = {
  params: {
    slug: string;
  };
};

const costumeConstructionGalleryQuery = groq`
  *[_type == "costumeConstruction" && slug.current == $slug][0]{
    gallery[]->{
      "imageUrl": image.asset->url,
      "imageName": name,
    }
  }
`;

const costumeConstructionQuery = groq`
  *[_type == "costumeConstruction" && slug.current == $slug][0]{
    heroTitle,
    heroSubtitle,
    content,
    files[]->{
      "fileUrl": fileUpload.asset->url,
      name
    },
    videos[]{
      videoLink,
      title
    }
  }
`;

export default async function CostumeConstructionPage({
  params: { slug },
}: Props) {
  const costumeConstructionData = await client.fetch<SecondaryPageData>(
    costumeConstructionQuery,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

  return (
    <>
      <Header />
      <SecondaryPageTemplate
        pageData={costumeConstructionData}
        galleryQuery={costumeConstructionGalleryQuery}
        slug={slug}
      />
    </>
  );
}
