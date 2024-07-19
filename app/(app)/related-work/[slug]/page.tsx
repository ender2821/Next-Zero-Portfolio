import Header from "@/components/Header";
import SecondaryPageTemplate from "@/components/SecondaryPageTemplate";
import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type Props = {
  params: {
    slug: string;
  };
};

const relatedWorkGalleryQuery = groq`
  *[_type == "relatedWork" && slug.current == $slug][0]{
    gallery[]->{
      "imageUrl": image.asset->url,
      "imageName": name,
    }
  }
`;

const RelatedWorkQuery = groq`
  *[_type == "relatedWork" && slug.current == $slug][0]{
    heroTitle,
    heroSubtitle,
    content
  }
`;

export default async function RelatedWorkPage({ params: { slug } }: Props) {
  const galleryData = await client.fetch<Gallery>(
    relatedWorkGalleryQuery,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

  const relatedWorkData = await client.fetch<SecondaryPageData>(
    RelatedWorkQuery,
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
        pageData={relatedWorkData}
      />
    </>
  );
}
