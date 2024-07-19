import Flower from "../public/flower.svg";

export default function Divider() {
  return (
    <div className="items-center justify-center flex mt-8 mb-8">
      <span className="h-[2px] bg-[#27D5E8] w-1/2 mr-1" />
      <Flower className="text-[#27D5E8] w-8 h-8" />
      <span className="h-[2px] bg-[#27D5E8] w-1/2 ml-1" />
    </div>
  );
}
