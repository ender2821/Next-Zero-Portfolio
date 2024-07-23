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
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  const isLargeDesktop = useMediaQuery({ query: "(min-width: 2256px)" });

  let columns;
  if (isSmallScreen) {
    columns = 3;
  } else if (isLargeDesktop) {
    columns = 6;
  } else {
    columns = 5;
  }

  return <Gallery data={props.data} columns={columns} />;
}
