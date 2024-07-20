import React, { Suspense } from "react";
import { Noto_Serif_Display } from "next/font/google";
import { PortableText } from "next-sanity";
import Flower from "../public/flower.svg";
import File from "../public/file.svg";
import Divider from "./Divider";
import Link from "next/link";
import VideoPlayer from "./VideoPlayer";
import LoadingSpinner from "./LoadingSpinner";
import GalleryData from "./GalleryData";

const notoSerifDisplay = Noto_Serif_Display({ subsets: ["latin"] });

type Props = {
  pageData: SecondaryPageData;
  galleryQuery: string;
  slug: string;
};

export default async function SecondaryPageTemplate({
  pageData,
  galleryQuery,
  slug,
}: Props) {
  return (
    <main className="min-h-screen flex-col pl-24 pt-20 pr-24 pb-24 grid grid-cols-3 gap-4">
      <section className="bg-black/20 backdrop-blur-sm pl-8 pt-8 pr-8 pb-8 relative">
        <div className="max-w-[600px] z-10 relative">
          <h1 className={`${notoSerifDisplay.className} text-6xl font-bold`}>
            {pageData?.heroTitle}
          </h1>
          <h2 className="text-2xl font-semibold">{pageData?.heroSubtitle}</h2>
          <Divider />
          {pageData?.content && <PortableText value={pageData?.content} />}
          {pageData?.files && (
            <div className="grid grid-cols-3 mt-12 gap-2">
              {pageData?.files.map((file, i) => (
                <Link
                  href={file?.fileUrl}
                  key={file?.name ? file?.name + i : i}
                  target="_blank"
                  className="border-[1px] text-center p-2 flex flex-wrap justify-center items-center [&>svg]:hover:text-[#27D5E8] [&>svg]:focus:text-[#27D5E8] border-[#5f6368] hover:border-[#27D5E8] focus:border-[#27D5E8] text-[#5f6368] hover:text-[#27D5E8] focus:text-[#27D5E8]"
                >
                  <File className="w-full h-12 text-[#5f6368]" />
                  {file?.name}
                </Link>
              ))}
            </div>
          )}
          {pageData?.videos &&
            pageData?.videos.map((video, i) => (
              <VideoPlayer
                videoLink={video?.videoLink}
                title={video?.title}
                key={video?.title ? video?.title + i : i}
              />
            ))}
        </div>
        <div className="aspect-square w-full absolute bottom-0 left-0 mt-auto flex justify-center items-center z-0">
          <Flower className="text-[#2B2D3B] w-[60%] h-[60%]" />
        </div>
      </section>
      <section className="col-span-2 relative">
        <Suspense fallback={<LoadingSpinner />}>
          <GalleryData query={galleryQuery} slug={slug} />
        </Suspense>
      </section>
    </main>
  );
}
