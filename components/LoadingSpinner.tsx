import Flower from "../public/flower.svg";

export default function LoadingSpinner() {
  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -traslate-y-1/2 z-10">
      <Flower className="text-[#27D5E8] animate-spin" />
    </div>
  );
}
