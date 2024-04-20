"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import ClientOnly from "@/components/global/client-only";
// import CmykInput from "@/components/hex/cmyx-input";
import HexCodeInput from "@/components/hex/hex-code-input";
import RandomColorTooltip from "@/components/hex/random-color-tooltip";
// import RgbInput from "@/components/hex/rgb-input";
import CmykInput from "@/components/hex/cmyx-input";
import RgbInput from "@/components/hex/rgb-input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import {
  cn,
  getOppositeContrast,
  hexCodeToRgb,
  isHexCode,
  rgbToCmyk,
} from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

const FormSchema = z.object({
  hexCode: z.string().max(7),
  rgb: z.object({
    r: z.number().min(0).max(255),
    g: z.number().min(0).max(255),
    b: z.number().min(0).max(255),
  }),
  cmyk: z.object({
    c: z.number().min(0).max(255),
    m: z.number().min(0).max(255),
    y: z.number().min(0).max(255),
    k: z.number().min(0).max(255),
  }),
});

export default function HexsPage() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      hexCode: DEFAULT_BACKGROUND_COLOR,
      rgb: hexCodeToRgb(DEFAULT_BACKGROUND_COLOR),
      cmyk: rgbToCmyk(hexCodeToRgb(DEFAULT_BACKGROUND_COLOR)),
    },
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {};

  const hexCode = form.watch("hexCode");

  return (
    <ClientOnly>
      <main
        style={{
          backgroundColor: isHexCode(hexCode)
            ? hexCode
            : DEFAULT_BACKGROUND_COLOR,
        }}
        className={cn(
          "flex h-dvh flex-col p-4",
          isHexCode(hexCode) && getOppositeContrast(hexCode),
        )}
      >
        <section className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BubbleContainer>
                <BubbleButton onClick={() => router.back()}>
                  <ArrowLeft className="size-4 shrink-0" />
                </BubbleButton>
              </BubbleContainer>
              <BubbleContainer>
                <BubbleText>Convert A Color</BubbleText>
              </BubbleContainer>
            </div>
            <RandomColorTooltip form={form} />
          </section>
          <Form {...form}>
            <form className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="hexCode"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">Hex Code</FormLabel>
                    <FormControl>
                      <HexCodeInput form={form} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rgb"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">RGB</FormLabel>
                    <FormControl>
                      <RgbInput form={form} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="cmyk"
                render={() => (
                  <FormItem>
                    <FormLabel className="sr-only">CMYK</FormLabel>
                    <FormControl>
                      <CmykInput form={form} />
                    </FormControl>
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </section>
      </main>
    </ClientOnly>
  );
}
