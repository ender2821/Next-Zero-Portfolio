"use client";

import ReactPlayer from "react-player";

export default function VideoPlayer({
  videoLink,
  title,
}: {
  videoLink: string;
  title?: string;
}) {
  return (
    <div className="mt-12">
      <div className="player-wrapper aspect-video w-full relative">
        <ReactPlayer
          url={videoLink}
          className="absolute top-0 left-0 !w-full !h-full"
          config={{
            youtube: {
              playerVars: { showinfo: 1, constols: true },
            },
          }}
        />
      </div>
      {title && <p className="text-center pt-2">{title}</p>}
    </div>
  );
}
