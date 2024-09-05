import Image from "next/image";

const SpinnerSmall = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <div
        className="animate-spin relative rounded-full 
        h-32 w-32 border-t border-b
        border-[#ff7400]
        "
      ></div>
      <div className="absolute flex flex-col justify-center items-center">
        <Image src="/logo/small-logo.png" width={50} height={50} alt="logo" />
        <span className="text-myText-muted text-sm">Ładuję...</span>
      </div>
    </div>
  );
};

export default SpinnerSmall;
