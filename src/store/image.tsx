import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { Image } from "@/lib/types";

type ImageState = {
  images: Image[];
  selectedImage: Image | null;
};

type ImageActions = {
  actions: {
    setImages: (images: Image[]) => void;
  };
};

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
      },
    }),
    {
      name: "image-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        images: state.images,
      }),
    },
  ),
);

export const useImages = () => imageStore((state) => state.images);
export const useSelectedImage = () =>
  imageStore((state) => state.selectedImage);
export const useImageActions = () => imageStore((state) => state.actions);
