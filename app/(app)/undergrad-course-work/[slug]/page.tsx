import Header from "@/components/Header";
import SecondaryPageTemplate from "@/components/SecondaryPageTemplate";
import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";

type Props = {
  params: {
    slug: string;
  };
};

const undergradCourseWorkGalleryQuery = groq`
  *[_type == "underGradCourseWork" && slug.current == $slug][0]{
    gallery[]->{
      "imageUrl": image.asset->url,
      "imageName": name,
    }
  }
`;

const undergradCourseWorkQuery = groq`
  *[_type == "underGradCourseWork" && slug.current == $slug][0]{
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

export default async function UndergradCourseWorkPage({
  params: { slug },
}: Props) {
  const galleryData = await client.fetch<Gallery>(
    undergradCourseWorkGalleryQuery,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

  const undergradCourseWorkData = await client.fetch<SecondaryPageData>(
    undergradCourseWorkQuery,
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
        pageData={undergradCourseWorkData}
      />
    </>
  );
}
