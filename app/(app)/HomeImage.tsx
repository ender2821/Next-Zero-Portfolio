import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

type HomeImage = {
  imageUrl: string;
  imageName?: string;
};

const homeImageQuery = groq`
*[_type == "home"][0]{
  "imageUrl":image->image.asset->url,
  "imageName":image->image.name,
}
`;

export default async function HomeImage() {
  const homeImageData = await client.fetch<HomeImage>(
    homeImageQuery,
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
      {homeImageData?.imageUrl && (
        <Image
          src={homeImageData?.imageUrl}
          alt={homeImageData?.imageName ? homeImageData?.imageName : ""}
          width={500}
          height={800}
          className="relative 2xl:-left-[33%] 2xl:top-24 shadow-[rgba(0,_0,_0,_0.3)_-20px_60px_40px_-7px]"
          style={frame}
        />
      )}
    </>
  );
}
