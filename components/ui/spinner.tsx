import Image from "next/image";
const Spinner = () => {
  return (
    <div className="flex justify-center items-center flex-1 w-full">
      <div
        className="animate-spin rounded-full 
        h-32 w-32 border-t-2 border-b-2
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

export default Spinner;
