import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { Noto_Serif_Display } from "next/font/google";
import dynamic from "next/dynamic";
import Header from "@/components/Header";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });
const GalleryHome = dynamic(() => import("@/components/GalleryHome"), {
  ssr: false,
});

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
*[_type == "home"][0]{
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

  const homeData = await client.fetch<Home>(
    homeQuery,
    {},
    {
      next: { revalidate: revalidate },
    }
  );

  const galleryData = await client.fetch<Gallery>(
    homeGalleryQuery,
    {},
    {
      next: { revalidate: revalidate },
    }
  );

  const frame = {
    border: "1rem solid #27D5E8",
    borderImage:
      "repeating-linear-gradient(45deg, transparent, transparent 5px, #27D5E8 6px, #27D5E8 15px, transparent 16px, transparent 20px) 20/1rem",
  };

  return (
    <>
      <Header />
      <main className="min-h-screen flex-col items-center pl-24 pt-20 pr-24 pb-24">
        <section className="grid grid-cols-3">
          <div className="bg-black/20 backdrop-blur-sm pl-12 pt-8 pr-8 pb-8 col-span-2 min-h-[800px] relative">
            <div className="max-w-[600px]">
              <h1
                className={`${notoSerifDisplay.className} text-6xl font-bold`}
              >
                {homeData?.heroTitle}
              </h1>
              <h2 className="text-2xl font-semibold">
                {homeData?.heroSubtitle}
              </h2>
              {homeData?.content && <PortableText value={homeData?.content} />}
            </div>
          </div>
          <div>
            {homeData?.imageUrl && (
              <Image
                src={homeData?.imageUrl}
                alt={homeData?.imageName ? homeData?.imageName : ""}
                width={500}
                height={800}
                className="relative -left-[33%] top-24 shadow-[rgba(0,_0,_0,_0.3)_-20px_60px_40px_-7px]"
                style={frame}
              />
            )}
          </div>
        </section>
        <section className="mt-8">
          {galleryData && <GalleryHome data={galleryData?.gallery} />}
        </section>
      </main>
    </>
  );
}
