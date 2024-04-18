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

function LoadingSpinner() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <circle className="spinner_DupU" cx="12" cy="3" r="0"/>
      <circle className="spinner_DupU spinner_GWtZ" cx="16.50" cy="4.21" r="0"/>
      <circle className="spinner_DupU spinner_n0Yb" cx="7.50" cy="4.21" r="0"/>
      <circle className="spinner_DupU spinner_dwN6" cx="19.79" cy="7.50" r="0"/>
      <circle className="spinner_DupU spinner_GIL4" cx="4.21" cy="7.50" r="0"/>
      <circle className="spinner_DupU spinner_46QP" cx="21.00" cy="12.00" r="0"/>
      <circle className="spinner_DupU spinner_DQhX" cx="3.00" cy="12.00" r="0"/>
      <circle className="spinner_DupU spinner_PD82" cx="19.79" cy="16.50" r="0"/>
      <circle className="spinner_DupU spinner_tVmX" cx="4.21" cy="16.50" r="0"/>
      <circle className="spinner_DupU spinner_eUgh" cx="16.50" cy="19.79" r="0"/>
      <circle className="spinner_DupU spinner_j38H" cx="7.50" cy="19.79" r="0"/>
      <circle className="spinner_DupU spinner_eUaP" cx="12" cy="21" r="0"/>
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
          {isUploading ? <LoadingSpinner /> : <UploadSvg />}
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

