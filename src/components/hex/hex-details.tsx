import BubbleContainer from "@/components/global/bubble-container";
import Counter from "@/components/global/counter";
import HexBar from "@/components/hex/hex-bar";

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
    <section className="flex flex-col gap-8 p-4">
      <section className="flex flex-col gap-1">
        {rgb.map(({ id, value }) => (
          <BubbleContainer key={id} className="w-full">
            <HexBar value={value} />
          </BubbleContainer>
        ))}
      </section>
      <div className="flex flex-col gap-4">
        <section className="flex items-center gap-6">
          {rgb.map(({ id, label, value }) => (
            <div key={id} className="relative w-[35px]">
              <Counter
                from={0}
                to={value}
                className="grid h-6 place-content-center font-medium"
              />
              <span className="absolute -right-3 -top-3 text-xs font-medium uppercase">
                {label}
              </span>
            </div>
          ))}
        </section>
        <section className="flex items-center gap-6">
          {cmyk.map(({ id, label, value }) => (
            <div key={id} className="relative w-[35px]">
              <Counter
                from={0}
                to={value}
                className="grid h-6 place-content-center font-medium"
              />
              <span className="absolute -right-3 -top-3 text-xs font-medium uppercase">
                {label}
              </span>
            </div>
          ))}
        </section>
      </div>
    </section>
  );
}
