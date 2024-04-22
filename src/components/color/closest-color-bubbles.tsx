"use client";

import { motion } from "framer-motion";
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
    .map((item, index) => {
      const { id, hexCode } = closestColors[index];

      return {
        position: item,
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

  return (
    <section className="grid flex-1 p-4 grid-cols-[repeat(10,_20px)] grid-rows-[repeat(10,_20px)] place-content-center place-items-center gap-2 overflow-hidden">
      {bubbles.map((bubble, index) => (
        <AnimatedLink
          key={bubble.color.id}
          href={`/colors/${bubble.color.id}`}
          style={{
            ...bubble.position,
            backgroundColor: bubble.color.hexCode,
          }}
          className="h-full w-full rounded-full shadow-md transition-transform duration-300 ease-in hover:scale-110 hover:transition-transform hover:duration-500 hover:ease-out"
          initial={{
            opacity: 0,
            ...initialBubbleLocations[index % initialBubbleLocations.length],
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
          }}
          transition={{
            duration: 0.7,
            ease: "easeOut",
            delay: index * 0.05,
          }}
        />
      ))}
    </section>
  );
}
