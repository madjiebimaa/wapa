import { Fragment } from "react";

import BubbleContainer from "@/components/global/bubble-container";
import { Progress } from "@/components/ui/progress";

import { CMYK, RGB } from "@/lib/types";

interface HexDetailsProps {
  rgb: RGB;
  cmyk: CMYK;
}

export default function HexDetails({
  rgb: { r, g, b },
  cmyk: { c, m, y, k },
}: HexDetailsProps) {
  const rgb: { id: string; label: string; value: number }[] = [
    { id: "r", label: "r", value: r },
    { id: "g", label: "g", value: g },
    { id: "b", label: "b", value: b },
  ];

  const cmyk: { id: string; label: string; value: number }[] = [
    { id: "c", label: "c", value: c },
    { id: "m", label: "m", value: m },
    { id: "y", label: "y", value: y },
    { id: "k", label: "k", value: k },
  ];

  return (
    <section className="flex flex-col gap-2">
      <div className="flex flex-col gap-1">
        {rgb.map(({ id, value }) => (
          <BubbleContainer key={id} className="w-full">
            <Progress value={(value / 255) * 100} className="h-2 w-full" />
          </BubbleContainer>
        ))}
      </div>
      <div className="grid grid-cols-6 place-content-between">
        {rgb.map(({ id, label, value }) => (
          <Fragment key={id}>
            <span className="font-medium uppercase">{label}</span>
            <span className="font-medium">{value}</span>
          </Fragment>
        ))}
      </div>
      <section className="flex flex-col items-end gap-3 pr-3">
        {cmyk.map(({ id, label, value }) => (
          <div key={id} className="relative">
            <span className="font-medium">{value}</span>
            <span className="absolute -right-3 -top-3 text-xs font-medium uppercase">
              {label}
            </span>
          </div>
        ))}
      </section>
    </section>
  );
}