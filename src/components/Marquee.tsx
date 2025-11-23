import { useEffect, useMemo, useRef } from "react";

export type MarqueeProps = {
  items: string[];
  speedPxPerSecond?: number;
  initialDuplicates?: number;
};

const Marquee = ({ items, speedPxPerSecond = 50, initialDuplicates = 2 }: MarqueeProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const lastTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);
  const gapRef = useRef<number>(0);
  const rafRef = useRef<number | null>(null);

  const seededItems = useMemo(() => {
    const out: string[] = [...items];
    for (let i = 0; i < initialDuplicates; i += 1) {
      out.push(...items);
    }
    return out;
  }, [items, initialDuplicates]);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const styles = getComputedStyle(track);
    const gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
    gapRef.current = gap;

    let running = true;
    const step = (time: number) => {
      if (!running || !track) return;
      const last = lastTimeRef.current || time;
      const dt = (time - last) / 1000;
      lastTimeRef.current = time;

      offsetRef.current -= speedPxPerSecond * dt;
      track.style.transform = `translateX(${offsetRef.current}px)`;

      let first = track.firstElementChild as HTMLElement | null;
      while (first) {
        const firstWidth = first.offsetWidth;
        if (-offsetRef.current >= firstWidth + gapRef.current) {
          offsetRef.current += firstWidth + gapRef.current;
          track.appendChild(first);
          first = track.firstElementChild as HTMLElement | null;
          track.style.transform = `translateX(${offsetRef.current}px)`;
        } else {
          break;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);
    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [speedPxPerSecond]);

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      <div ref={trackRef} className="flex gap-2 whitespace-nowrap will-change-transform">
        {seededItems.map((tech, idx) => (
          <span key={`${tech}-${idx}`} className="px-3 py-1 bg-secondary text-sm rounded">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Marquee;


