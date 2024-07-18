import GallerySecondaryPages from "@/components/GallerySecondaryPages";
import Header from "@/components/Header";
import { client } from "@/sanity/lib/client";
import { groq, PortableText } from "next-sanity";
import { Noto_Serif_Display } from "next/font/google";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  params: {
    slug: string;
  };
};

type CostumeConstruction = {
  heroTitle: string;
  heroSubtitle?: string;
  content: Block[];
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
  const revalidate = 60;

  const galleryData = (await client.fetch(costumeConstructionGalleryQuery, {
    slug,
    // @ts-ignore
    next: { revalidate: revalidate },
  })) as Gallery;

  const costumeConstructionData = (await client.fetch(
    costumeConstructionQuery,
    {
      slug,
      // @ts-ignore
      next: { revalidate: revalidate },
    }
  )) as CostumeConstruction;

  return (
    <>
      <Header />
      <main className="min-h-screen flex-col pl-24 pt-20 pr-24 pb-24 grid grid-cols-3">
        <section className="bg-black/20 backdrop-blur-sm pl-12 pt-8 pr-8 pb-8">
          <div className="max-w-[600px]">
            <h1 className={`${notoSerifDisplay.className} text-6xl font-bold`}>
              {costumeConstructionData?.heroTitle}
            </h1>
            <h2 className="text-2xl font-semibold">
              {costumeConstructionData?.heroSubtitle}
            </h2>
            {costumeConstructionData?.content && (
              <PortableText value={costumeConstructionData?.content} />
            )}
          </div>
        </section>
        <section className="col-span-2">
          {galleryData && <GallerySecondaryPages data={galleryData?.gallery} />}
        </section>
      </main>
    </>
  );
}
