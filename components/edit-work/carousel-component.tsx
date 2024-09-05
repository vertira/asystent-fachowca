import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import DeleteImageButton from "./delete-image-button";
import { ImageUploader } from "./image-upload";

interface CarouselProps {
  work: any;
  isEdit: boolean;
  setIsEdit: any;
}

const CarouselComponent: React.FC<CarouselProps> = ({ work, isEdit }) => {
  const workImages = work.images.map((img: any) => ({
    id: img.id,
    url: img.url,
  }));

  return (
    <>
      {workImages.length === 0 ? (
        <div className="w-full py-4 flex flex-col items-center">
          <span className="text-2xl">
            Niestety nie masz żadnych dodanych zdjęć 😥
          </span>
          <ImageUploader endpoint="workImage" workId={work.id} />
        </div>
      ) : (
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-3/4 mx-auto md:mt-10"
        >
          <CarouselContent className="flex shrink-0">
            {workImages.map((image: any) => (
              <CarouselItem key={image.id} className="relative pl-6">
                <Image
                  priority
                  src={image.url}
                  alt="product-image"
                  width={400}
                  height={400}
                  className="my-auto mx-auto rounded-md object-contain"
                />
                {isEdit && (
                  <>
                    <div className="w-full bg-black/80 absolute top-0 right-0 h-full z-10" />
                    <DeleteImageButton imageId={image.id} />
                  </>
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      )}
    </>
  );
};

export default CarouselComponent;
