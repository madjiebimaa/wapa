"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Variants, motion } from "framer-motion";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

import BubbleButton from "@/components/global/bubble-button";
import BubbleContainer from "@/components/global/bubble-container";
import BubbleText from "@/components/global/bubble-text";
import ClientOnly from "@/components/global/client-only";
import CmykInput from "@/components/hex/cmyx-input";
import HexCodeInput from "@/components/hex/hex-code-input";
import RandomColorTooltip from "@/components/hex/random-color-tooltip";
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
  isValidHexCode,
  rgbToCmyk,
} from "@/lib/utils";

const FormSchema = z.object({
  hexCode: z
    .string()
    .length(7)
    .regex(/^#[0-9a-fA-F]{6}$/, {
      message:
        "Please enter a valid 6-character hex color code followed by 6 characters from 0-9 or A-F.",
    }),
  rgb: z.object({
    r: z.number().min(0).max(255).nullable(),
    g: z.number().min(0).max(255).nullable(),
    b: z.number().min(0).max(255).nullable(),
  }),
  cmyk: z.object({
    c: z.number().min(0).max(255).nullable(),
    m: z.number().min(0).max(255).nullable(),
    y: z.number().min(0).max(255).nullable(),
    k: z.number().min(0).max(255).nullable(),
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

  const hexCode = form.watch("hexCode");

  const AnimatedBubbleContainer = motion(BubbleContainer);

  const labelVariants: Variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const inputVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <ClientOnly>
      <main
        style={{
          backgroundColor: isValidHexCode(hexCode)
            ? hexCode
            : DEFAULT_BACKGROUND_COLOR,
        }}
        className={cn(
          "flex h-dvh flex-col p-4 transition-colors duration-500",
          isValidHexCode(hexCode) && getOppositeContrast(hexCode),
        )}
      >
        <section className="mx-auto flex w-full max-w-md flex-1 flex-col gap-8">
          <section className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BubbleContainer>
                <BubbleButton onClick={() => router.push("/")}>
                  <Home className="size-4 shrink-0" />
                </BubbleButton>
              </BubbleContainer>
              <BubbleContainer>
                <BubbleText>Convert a Color</BubbleText>
              </BubbleContainer>
            </div>
            <RandomColorTooltip form={form} />
          </section>
          <Form {...form}>
            <form className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="hexCode"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 md:flex-row">
                    <AnimatedBubbleContainer
                      variants={labelVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <BubbleText className="size-full">
                        <FormLabel htmlFor="hexCode" className="uppercase">
                          hex
                        </FormLabel>
                      </BubbleText>
                    </AnimatedBubbleContainer>
                    <motion.div
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FormControl>
                        <HexCodeInput form={form} field={field} />
                      </FormControl>
                    </motion.div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="rgb"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 md:flex-row">
                    <AnimatedBubbleContainer
                      variants={labelVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <BubbleText className="size-full">
                        <FormLabel htmlFor="rgb.r" className="uppercase">
                          rgb
                        </FormLabel>
                      </BubbleText>
                    </AnimatedBubbleContainer>
                    <motion.div
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FormControl>
                        <RgbInput form={form} field={field} />
                      </FormControl>
                    </motion.div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="cmyk"
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-2 space-y-0 md:flex-row">
                    <AnimatedBubbleContainer
                      variants={labelVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <BubbleText className="size-full">
                        <FormLabel htmlFor="cmyk.c" className="uppercase">
                          cmyk
                        </FormLabel>
                      </BubbleText>
                    </AnimatedBubbleContainer>
                    <motion.div
                      variants={inputVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      <FormControl>
                        <CmykInput form={form} field={field} />
                      </FormControl>
                    </motion.div>
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
