"use client";

import { ImageList, ImageListItem, Modal, Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";

type Gallery = {
  data: [
    {
      imageUrl: string;
      imageName: string;
    },
  ];
  columns: number;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  minHeight: "90vh",
  minWidth: "90vw",
  outline: "none",
};

export default function Gallery(props: Gallery) {
  const { data, columns } = props;
  const [open, setOpen] = useState(false);
  const [modalImage, setModalImage] = useState(0);

  const handleOpen = (i: number) => {
    setOpen(true);
    setModalImage(i);
  };
  const handleClose = () => setOpen(false);

  const lastImage = data?.length - 1;

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="gallery-modal-title"
        aria-describedby="gallery-modal-description"
      >
        <Box sx={style}>
          {modalImage !== 0 ? (
            <button
              className="bg-black z-10 absolute w-8 h-8 top-1/2 -translate-y-1/2 left-8 cursor-pointer"
              onClick={() => {
                setModalImage(modalImage - 1);
              }}
            >
              <ArrowBackIcon className="w-5/6 h-5/6" />
            </button>
          ) : null}
          {data?.length > 0 && (
            <Image
              alt={data ? data[modalImage]?.imageName : ""}
              src={data ? data[modalImage]?.imageUrl : ""}
              sizes="100vw"
              style={{
                objectFit: "contain",
                zIndex: 0,
              }}
              fill
            ></Image>
          )}
          {modalImage !== lastImage ? (
            <button
              className="bg-black z-10 absolute w-8 h-8 top-1/2 -translate-y-1/2 right-8 cursor-pointer"
              onClick={() => {
                setModalImage(modalImage + 1);
              }}
            >
              <ArrowForwardIcon className="w-5/6 h-5/6" />
            </button>
          ) : null}{" "}
          <button
            onClick={handleClose}
            className="bg-black z-10 absolute w-8 h-8 top-8 right-8 cursor-pointer"
          >
            <CloseIcon className="w-5/6 h-5/6" />
          </button>
        </Box>
      </Modal>
      {data?.length > 0 && (
        <ImageList
          variant="masonry"
          cols={columns}
          gap={16}
          className="!overflow-y-visible"
        >
          {data.map((item, i) => (
            <ImageListItem key={i}>
              <button
                onClick={() => handleOpen(i)}
                className="focus:outline-0 hover:scale-105 focus:scale-105 transform transition-transform shadow-[rgba(0,_0,_0,_0.3)_-5px_12px_5px_-3px]"
              >
                <img
                  src={`${item?.imageUrl}?w=400&fit=crop&auto=format`}
                  alt={item?.imageName}
                  loading="lazy"
                  className=""
                />
              </button>
            </ImageListItem>
          ))}
        </ImageList>
      )}
    </div>
  );
}
