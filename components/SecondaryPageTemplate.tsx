import React from "react";
import { Noto_Serif_Display } from "next/font/google";
import { PortableText } from "next-sanity";
import Flower from "../public/flower.svg";
import dynamic from "next/dynamic";
const GallerySecondary = dynamic(
  () => import("@/components/GallerySecondary"),
  {
    ssr: false,
  }
);

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  pageData: SecondaryPageData;
  galleryData: Gallery;
};

export default async function SecondaryPageTemplate({
  pageData,
  galleryData,
}: Props) {
  return (
    <main className="min-h-screen flex-col pl-24 pt-20 pr-24 pb-24 grid grid-cols-3 gap-4">
      <section className="bg-black/20 backdrop-blur-sm pl-12 pt-8 pr-8 pb-8 relative">
        <div className="max-w-[600px] z-10 relative">
          <h1 className={`${notoSerifDisplay.className} text-6xl font-bold`}>
            {pageData?.heroTitle}
          </h1>
          <h2 className="text-2xl font-semibold">{pageData?.heroSubtitle}</h2>
          {pageData?.content && <PortableText value={pageData?.content} />}
        </div>
        <div className="aspect-square w-full absolute bottom-0 left-0 mt-auto flex justify-center items-center z-0">
          <Flower className="w-[60%] h-[60%]" />
        </div>
      </section>
      <section className="col-span-2">
        {galleryData && <GallerySecondary data={galleryData?.gallery} />}
      </section>
    </main>
  );
}
