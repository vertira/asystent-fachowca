"use client";

import { UploadButton } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";
import { toast } from "sonner";
import { Pen } from "lucide-react";
import SpinnerCustom from "../ui/spinner-custom";

interface LogoUploaderProps {
  onChange: (url?: string) => void;
  endpoint: keyof typeof ourFileRouter;
  newUrl: string;
}

export const AvatarUploader = ({
  onChange,
  endpoint,
  newUrl,
}: LogoUploaderProps) => {
  return (
    <UploadButton
      endpoint={endpoint}
      appearance={{
        button: `ut-ready:bg-transparent ${
          newUrl.length > 0
            ? "ut-ready:opacity-0 hover:ut-ready:opacity-100"
            : "ut-ready:opacity-100"
        } hover:ut-ready:bg-cardBackground/80 ut-ready:ring-0 ut-ready:border-none transition-all group bg-cardBackgroud/20 h-24 w-24 ut-uploading:cursor-not-allowed ut-uploading:ring-0 rounded-full bg-transparent  focus:outline-none after:bg-first-muted`,
        container: "w-full h-full top-0 flex-1 absolute",
        allowedContent: "hidden",
      }}
      content={{
        button({ ready }) {
          if (ready)
            return (
              <Pen className="text-first rounded-full bg-cardBackground/80 group-hover:bg-myBackground transition-all px-1 py-2 h-10 w-10" />
            );

          return <SpinnerCustom />;
        },
      }}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: Error) => {
        toast(error.message, { position: "top-center" });
      }}
    />
  );
};
