import ColorThief from "colorthief";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Image } from "@/lib/types";
import { rgbToHexCode } from "@/lib/utils";

type ImageState = {
  images: Image[];
  selectedImage: Image | null;
};

type ImageActions = {
  actions: {
    setImages: (images: Image[]) => void;
    selectImage: (id: Image["id"]) => void;
    addDominantColorToImage: (
      id: Image["id"],
      imageRef: HTMLImageElement,
    ) => void;
    deleteImage: (id: Image["id"]) => void;
  };
};

const colorThief = new ColorThief();

const intialState: ImageState = {
  images: [],
  selectedImage: null,
};

const imageStore = create<ImageState & ImageActions>()(
  persist(
    (set) => ({
      ...intialState,
      actions: {
        setImages: (images) => set({ images }),
        selectImage: (id) =>
          set((state) => {
            const currentSelectedImage = state.selectedImage;
            const selectedImage = state.images.find(
              (image) => image.id === id,
            )!;

            return {
              selectedImage:
                currentSelectedImage === selectedImage ? null : selectedImage,
            };
          }),
        addDominantColorToImage: (id, imageRef) =>
          set((state) => ({
            images: state.images.map((image) => {
              if (image.id === id) {
                const [r, g, b] = colorThief.getColor(imageRef);

                return {
                  ...image,
                  dominantColorHexCode: rgbToHexCode({ r, g, b }),
                };
              }

              return image;
            }),
          })),
        deleteImage: (id) =>
          set((state) => ({
            images: state.images.filter((image) => image.id !== id),
            selectedImage: null,
          })),
      },
    }),
    {
      name: "image-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        images: state.images,
        selectedImage: state.selectedImage,
      }),
    },
  ),
);

export const useImages = () => imageStore((state) => state.images);
export const useSelectedImage = () =>
  imageStore((state) => state.selectedImage);
export const useImageActions = () => imageStore((state) => state.actions);
