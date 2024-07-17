import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Noto_Serif_Display } from "next/font/google";
import GalleryHome from "@/components/GalleryHome";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

const homeQuery = groq`
*[_type == "home"][0]{
  heroTitle,
  heroSubtitle,
  "imageUrl":image->image.asset->url,
  "imageName":image->image.name,
  content
}
`;

const homeGalleryQuery = groq`
*[_type == "costumeConstruction"][0]{
  gallery[]->{
    "imageUrl": image.asset->url,
    "imageName": name,
  }
}
`;

type Home = {
  heroTitle: string;
  heroSubtitle?: string;
  imageUrl: string;
  imageName?: string;
  content: Block[];
};

type Gallery = {
  gallery: [
    {
      imageUrl: string;
      imageName: string;
    },
  ];
};

export default async function Home() {
  const revalidate = 60;

  const homeData = (await client.fetch(homeQuery, {
    // @ts-ignore
    next: { revalidate: revalidate },
  })) as Home;

  const galleryData = (await client.fetch(homeGalleryQuery, {
    // @ts-ignore
    next: { revalidate: revalidate },
  })) as Gallery;

  return (
    <main className="min-h-screen flex-col items-center p-24">
      <section className="grid grid-cols-2">
        <div>
          <h1 className={`${notoSerifDisplay.className} text-6xl font-bold`}>
            {homeData?.heroTitle}
          </h1>
          <h2 className="text-2xl font-semibold">{homeData?.heroSubtitle}</h2>
          {homeData?.content && <PortableText value={homeData?.content} />}
        </div>
        <div>
          {homeData?.imageUrl && (
            <Image
              src={homeData?.imageUrl}
              alt={homeData?.imageName ? homeData?.imageName : ""}
              width={500}
              height={800}
            />
          )}
        </div>
      </section>
      <section>
        {galleryData && <GalleryHome data={galleryData?.gallery} />}
      </section>
    </main>
  );
}
