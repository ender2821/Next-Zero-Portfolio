"use client";

import Gallery from "./Gallery";
import { useMediaQuery } from "react-responsive";

type Data = {
  data: [
    {
      imageUrl: string;
      imageName: string;
    },
  ];
};

export default function GalleryHome(props: Data) {
  const isBigScreen = useMediaQuery({ query: "(min-width: 1200px)" });

  return <Gallery data={props.data} columns={isBigScreen ? 3 : 5} />;
}
