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
    content
  }
`;

export default async function CostumeConstructionPage({
  params: { slug },
}: Props) {
  const galleryData = await client.fetch<Gallery>(
    costumeConstructionGalleryQuery,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

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
        galleryData={galleryData}
        pageData={costumeConstructionData}
      />
    </>
  );
}
