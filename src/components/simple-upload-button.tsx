"use client";

import { useRouter } from "next/navigation";
import { useUploadThing } from "@/utils/uploadthing";
import { toast } from "sonner";

type Input = Parameters<typeof useUploadThing>;

const useUploadThingInputProps = (...args: Input) => {
  const $ut = useUploadThing(...args);

  const onChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const selectedFiles = Array.from(e.target.files);
    const result = await $ut.startUpload(selectedFiles);

    console.log("uploaded files", result);
    // TODO: persist result in state maybe?
  };

  return {
    inputProps: {
      onChange,
      multiple: ($ut.permittedFileInfo?.config?.image?.maxFileCount ?? 1) > 1,
      accept: "image/*",
    },
    isUploading: $ut.isUploading,
  };
};

function UploadSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>

  );
}

export function SimpleUploadButton() {
  const router = useRouter();
  let toastId: string | number;

  const { inputProps, isUploading } = useUploadThingInputProps("imageUploader", {
    onUploadBegin: () => {
      toastId = toast.loading("Uploading...");
    },
    onClientUploadComplete: () => {
      toast.dismiss(toastId);
      toast.success("Upload completed!", {
        duration: 5000,
      });
      router.refresh();
    },
  });

  return (
    <div>
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className={`bg-white p-1 rounded-md text-black ${isUploading ? "bg-white/50" : "" }`}>
          <UploadSvg />
        </div>
      </label>
      <input
        id="file-upload"
        type="file"
        className="sr-only"
        disabled={isUploading}
        {...inputProps}
      />
    </div>
  );
}

