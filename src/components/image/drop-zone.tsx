"use client";

import { FileUp } from "lucide-react";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";

import { cn, filesToImages, rejectedFilesToFileErrors } from "@/lib/utils";
import { useImageActions, useImages } from "@/store/image";

interface DropZoneProps extends React.HTMLAttributes<HTMLDivElement> {}

const DropZone = forwardRef<HTMLDivElement, DropZoneProps>(
  ({ className, ...props }, ref) => {
    const [rejectedFiles, setRejectedFiles] = useState<FileRejection[]>([]);
    const images = useImages();
    const imageActions = useImageActions();

    const onDrop = useCallback(
      (acceptedFiles: File[], fileRejections: FileRejection[]) => {
        const setImages = async (acceptedFiles: File[]) => {
          if (acceptedFiles && acceptedFiles.length >= 1) {
            const convertedImages = await filesToImages(acceptedFiles);

            imageActions.setImages([...images, ...convertedImages]);
          }

          if (fileRejections && fileRejections.length >= 1) {
            setRejectedFiles(fileRejections);
          }
        };

        setImages(acceptedFiles);
      },
      [images, imageActions],
    );

    const { getRootProps, getInputProps, isDragAccept, isDragReject } =
      useDropzone({
        onDrop,
        maxSize: 100 * 1000, // 100 kB
        maxFiles: 1,
        accept: {
          "image/*": [".png", ".jpg", ".webp", ".svg"],
        },
      });

    useEffect(() => {
      const errors = rejectedFilesToFileErrors(rejectedFiles);

      errors.forEach((error) => {
        toast.error("Uh oh! Something went wrong.", {
          description: `${error}`,
        });
      });
    }, [rejectedFiles]);

    return (
      <div
        {...getRootProps({
          ref,
          className: cn(
            "grid place-content-center max-w-[400px] p-4 rounded-xl shadow-md bg-secondary text-secondary-foreground border-2 border-dashed border-slate-500 cursor-pointer hover:brightness-90 transition-all duration-300",
            isDragAccept && "bg-green-400",
            isDragReject && "bg-red-400",
            className,
          ),
          ...props,
        })}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <FileUp className="size-10 shrink-0" />
          <p className="text-center text-sm font-bold uppercase">
            drop file here
          </p>
          <div className="flex flex-col gap-2 text-center text-xs text-muted-foreground">
            <p>
              Drag and drop your <span className="font-semibold">PNG</span>,{" "}
              <span className="font-semibold">JPG</span>,{" "}
              <span className="font-semibold">WebP</span>, or{" "}
              <span className="font-semibold">SVG</span> images here.
            </p>
            <p>
              Up to <span className="font-semibold">100 kB</span> and dropped{" "}
              <span className="font-semibold">only 1 file at a moment</span>.
            </p>
          </div>
        </div>
      </div>
    );
  },
);
DropZone.displayName = "DropZone";

export default DropZone;
