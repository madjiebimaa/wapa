"use client";

import { Variants, motion } from "framer-motion";
import Link from "next/link";

import { Bubble, Color } from "@/lib/types";
import { generateGrid, getClosestColors } from "@/lib/utils";

interface ClosestColorBubblesProps {
  color: Color;
  colors: Color[];
}

export default function ClosestColorBubbles({
  color,
  colors,
}: ClosestColorBubblesProps) {
  const numberOfBubbles = 20;
  const bubbleSizes = [4, 3, 2, ...Array(numberOfBubbles - 3).fill(1)];
  const closestColors = getClosestColors({
    color,
    comparedColors: colors,
    n: numberOfBubbles,
  });

  const grid = generateGrid({
    size: 10,
    itemSizes: bubbleSizes,
    numberOfItems: numberOfBubbles,
  });

  const bubbles: Bubble[] = grid
    .sort((a, b) => {
      const sizeA = a.gridRowEnd - a.gridRowStart;
      const sizeB = b.gridRowEnd - b.gridRowStart;
      return sizeA - sizeB;
    })
    .map((bubbleVariants, index) => {
      const { id, hexCode } = closestColors[index];

      return {
        position: bubbleVariants,
        color: {
          id,
          hexCode,
        },
      };
    });

  const AnimatedLink = motion(Link);

  const initialBubbleLocations: { x: number; y: number }[] = [
    { x: -100, y: -100 },
    { x: 0, y: -100 },
    { x: 100, y: -100 },
    { x: 100, y: 0 },
    { x: 100, y: 100 },
    { x: 0, y: 100 },
    { x: -100, y: 100 },
    { x: -100, y: 0 },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        ease: "easeOut",
        duration: 0.7,
        staggerChildren: 0.05,
      },
    },
  };

  const bubbleVariants: Variants = {
    hidden: (index) => ({
      opacity: 0,
      ...initialBubbleLocations[index % initialBubbleLocations.length],
    }),
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        ease: "easeOut",
        duration: 0.7,
      },
    },
  };

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid flex-1 grid-cols-[repeat(10,_20px)] grid-rows-[repeat(10,_20px)] place-content-center place-items-center gap-2 overflow-hidden p-4"
    >
      {bubbles.map((bubble, index) => (
        <AnimatedLink
          key={bubble.color.id}
          href={`/colors/${bubble.color.id}`}
          variants={bubbleVariants}
          whileHover={{
            scale: 1.2,
            transition: {
              type: "spring",
              stiffness: 300,
            },
          }}
          custom={index}
          style={{
            ...bubble.position,
            backgroundColor: bubble.color.hexCode,
          }}
          className="h-full w-full rounded-full shadow-md"
        />
      ))}
    </motion.section>
  );
}
