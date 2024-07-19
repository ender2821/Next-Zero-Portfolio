import { client, revalidate } from "@/sanity/lib/client";
import GallerySecondary from "./GallerySecondary";

export default async function GalleryData({
  query,
  slug,
}: {
  query: string;
  slug: string;
}) {
  const galleryData = await client.fetch<Gallery>(
    query,
    { slug },
    {
      next: { revalidate: revalidate },
    }
  );

  return galleryData && <GallerySecondary data={galleryData?.gallery} />;
}
