"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";

interface ImagesUploaderProps {
  onChange: (urls: string[]) => void;
  endpoint: keyof typeof ourFileRouter;
}

export const ImagesUploader = ({ onChange, endpoint }: ImagesUploaderProps) => {
  const handleUploadComplete = (res: { url: string }[]) => {
    const urls = res.map((item) => item.url);
    onChange(urls);
  };

  return (
    <UploadDropzone
      config={{
        mode: "auto",
      }}
      className="bg-cardBackground ut-label:text-xl ut-label:text-first ut-allowed-content:text-myText-muted ut-button:bg-first"
      appearance={{ button: "after:bg-[#ff7400]" }}
      endpoint={endpoint}
      onClientUploadComplete={handleUploadComplete}
      onUploadError={(error: Error) => {
        toast(error.message, { position: "top-center" });
      }}
      content={{
        button({ ready, uploadProgress, isUploading }) {
          if (isUploading)
            return (
              <div
                style={{
                  zIndex: 10,
                }}
              >
                {uploadProgress}%
              </div>
            );
          if (ready) return "Prześlij zdjęcia";
          return "Ładowanie...";
        },
        allowedContent({ isUploading }) {
          if (isUploading) return "Ładowanie zdjęć...";
          return `Max 5 zdjęć`;
        },
        label({ ready }) {
          if (ready) return <div>Dodaj zdjęcia do przesłania</div>;

          return "Getting ready...";
        },
      }}
    />
  );
};
