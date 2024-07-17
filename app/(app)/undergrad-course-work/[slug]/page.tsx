import GallerySecondaryPages from "@/components/GallerySecondaryPages";
import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { Noto_Serif_Display } from "next/font/google";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  params: {
    slug: string;
  };
};

type UndergradCourseWork = {
  heroTitle: string;
  heroSubtitle?: string;
  content: Block[];
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
    content
  }
`;

export default async function UndergradCourseWorkPage({
  params: { slug },
}: Props) {
  const revalidate = 60;

  const galleryData = (await client.fetch(undergradCourseWorkGalleryQuery, {
    slug,
    // @ts-ignore
    next: { revalidate: revalidate },
  })) as Gallery;

  const undergradCourseWorkData = (await client.fetch(
    undergradCourseWorkQuery,
    {
      slug,
      // @ts-ignore
      next: { revalidate: revalidate },
    }
  )) as UndergradCourseWork;

  return (
    <main className="min-h-screen flex-col pl-24 pt-20 pr-24 pb-24 grid grid-cols-3">
      <section className="bg-black/20 backdrop-blur-sm pl-12 pt-8 pr-8 pb-8">
        <div className="max-w-[600px]">
          <h1 className={`${notoSerifDisplay.className} text-6xl font-bold`}>
            {undergradCourseWorkData?.heroTitle}
          </h1>
          <h2 className="text-2xl font-semibold">
            {undergradCourseWorkData?.heroSubtitle}
          </h2>
          {undergradCourseWorkData?.content && (
            <PortableText value={undergradCourseWorkData?.content} />
          )}
        </div>{" "}
      </section>
      <section className="col-span-2">
        {galleryData && <GallerySecondaryPages data={galleryData?.gallery} />}
      </section>
    </main>
  );
}
