import Header from "@/components/Header";
import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import SecondaryPageTemplate from "@/components/SecondaryPageTemplate";

type Props = {
  params: {
    slug: string;
  };
};

const firstHandGalleryQuery = groq`
  *[_type == "firstHand" && slug.current == $slug][0]{
    gallery[]->{
      "imageUrl": image.asset->url,
      "imageName": name,
    }
  }
`;

const firstHandQuery = groq`
  *[_type == "firstHand" && slug.current == $slug][0]{
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

export default async function FirstHandPage({ params: { slug } }: Props) {
  const firstHandData = await client.fetch<SecondaryPageData>(
    firstHandQuery,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

  return (
    <>
      <Header />
      <SecondaryPageTemplate
        pageData={firstHandData}
        galleryQuery={firstHandGalleryQuery}
        slug={slug}
      />
    </>
  );
}
