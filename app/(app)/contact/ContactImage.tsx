import { client, revalidate } from "@/sanity/lib/client";
import { groq } from "next-sanity";
import Image from "next/image";

type ContactImage = {
  imageUrl: string;
  imageName?: string;
};

const contactImageQuery = groq`
*[_type == "contact"][0]{
  "imageUrl":image->image.asset->url,
  "imageName":image->image.name,
}
`;

export default async function ContactImage() {
  const contactImageData = await client.fetch<ContactImage>(
    contactImageQuery,
    {},
    {
      next: { revalidate: revalidate },
    }
  );

  return (
    <>
      {contactImageData?.imageUrl && (
        <Image
          src={contactImageData?.imageUrl}
          alt={contactImageData?.imageName ? contactImageData?.imageName : ""}
          width={500}
          height={800}
          className="relative 2xl:-left-[33%] 2xl:top-24 shadow-[rgba(0,_0,_0,_0.3)_-20px_60px_40px_-7px]"
        />
      )}
    </>
  );
}
