import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import { PortableText } from "@portabletext/react";
import { Noto_Serif_Display } from "next/font/google";
import dynamic from "next/dynamic";
import Header from "@/components/Header";
import Divider from "@/components/Divider";
import { Suspense } from "react";
import LoadingSpinner from "@/components/LoadingSpinner";
import HomeImage from "./HomeImage";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });
const GalleryHome = dynamic(() => import("@/components/GalleryHome"), {
  ssr: false,
});

const homeQuery = groq`
*[_type == "home"][0]{
  heroTitle,
  heroSubtitle,
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

  return (
    <>
      <Header />
      <main className="min-h-screen flex-col items-center md:pl-24 pb-24 md:pt-24 md:pr-24 lgMax:peer-has-[:checked]:fixed">
        <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 pageContent gap-4">
          <div className="bg-black/20 backdrop-blur-sm md:pl-8 p-8 min-h-[800px] relative flex justify-center">
            <div className="max-w-[600px]">
              <h1
                className={`${notoSerifDisplay.className} text-6xl font-bold`}
              >
                {homeData?.heroTitle}
              </h1>
              <h2 className="text-2xl font-semibold">
                {homeData?.heroSubtitle}
              </h2>
              <Divider />
              {homeData?.content && <PortableText value={homeData?.content} />}
            </div>
          </div>
          <div className="bg-black/20 backdrop-blur-sm md:col-span-2 lg:col-span-1 p-8 2xl:pt-0 2xl:pr-0 2xl:backdrop-blur-0 2xl:bg-transparent 2xl:pl-0 flex md:block justify-center md:p-0">
            <Suspense fallback={<LoadingSpinner />}>
              <HomeImage />
            </Suspense>
          </div>
        </section>
        <section className="mt-4">
          {galleryData && <GalleryHome data={galleryData?.gallery} />}
        </section>
      </main>
    </>
  );
}
