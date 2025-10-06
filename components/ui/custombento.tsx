'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

// ---------------- Tags data ----------------
const TAGS = [
  { text: 'Social Media', rotate: -18, baseX: 15, baseY: 28 },
  { text: 'SEO', rotate: 14, baseX: 75, baseY: 22 },
  { text: 'Marketing', rotate: -8, baseX: 35, baseY: 68 },
  { text: 'ADS', rotate: 7, baseX: 86, baseY: 78 },
  { text: 'Web Design', rotate: 90, baseX: 52, baseY: 48 },
];

const clamp = (v: number, a: number, b: number) => Math.max(a, Math.min(v, b));

// ---------------- Calendar ----------------
function CalendarCard(): JSX.Element {
  const days = ['S', 'M', 'T', 'W', 'TH', 'F', 'S'];

  const EventPill = ({
    label,
    icon,
    primary = false,
  }: {
    label: string;
    icon: string;
    primary?: boolean;
  }) => (
    <div
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold whitespace-nowrap shadow-sm ${
        primary ? 'bg-[#ef326c] text-white' : 'bg-gray-100 text-gray-900'
      }`}
    >
      <span className="text-sm leading-none">{icon}</span>
      <span>{label}</span>
    </div>
  );

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-gray-200">
      <div className="flex border-b border-gray-200 bg-gray-50 text-center">
        {days.map((d) => (
          <div key={d} className="flex-1 py-2 text-xs font-semibold text-gray-500">
            {d}
          </div>
        ))}
      </div>

      {[0, 1, 2, 3, 4].map((row) => (
        <div key={row} className="flex min-h-[60px] flex-1 border-t border-gray-200">
          {[0, 1, 2, 3, 4, 5, 6].map((col) => {
            const i = row * 7 + col;
            const day = i + 1 - 2;
            const inMonth = day > 0 && day <= 30;

            const events: JSX.Element[] = [];
            if (inMonth) {
              if (day === 3) events.push(<EventPill key="reel" icon="🎬" label="Reel" />);
              if (day === 13) events.push(<EventPill key="dm" icon="🙌" label="DM" />);
              if (day === 18) events.push(<EventPill key="col" icon="🤝" label="Collab" primary />);
              if (day === 30) events.push(<EventPill key="ln" icon="🔥" label="Launch" />);
            }

            return (
              <div
                key={col}
                className={`relative flex-1 ${col !== 0 ? 'border-l border-gray-200' : ''}`}
              >
                <div className="absolute top-1.5 left-2 text-[11px] font-semibold text-gray-400">
                  {inMonth ? String(day).padStart(2, '0') : ''}
                </div>
                <div className="flex h-full items-center justify-center">
                  <div className="flex flex-wrap items-center justify-center gap-1 px-1">
                    {events}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// ---------------- Steps ----------------
function StepsCardInner(): JSX.Element {
  const steps = [
    { n: '01', t: 'Discuss', i: '💬', h: 90 },
    { n: '02', t: 'Plan', i: '📋', h: 140 },
    { n: '03', t: 'Produce', i: '⚙️', h: 190 },
    { n: '04', t: 'Succeed', i: '🏆', h: 240 },
  ];

  return (
    <div className="flex h-full items-end gap-3 pb-4">
      {steps.map((s, idx) => (
        <motion.div
          key={s.n}
          animate={{ opacity: 1, y: 0 }}
          className="relative flex flex-1 flex-col items-center justify-end rounded-lg border border-gray-200 bg-white hover:bg-[#ed356d] hover:text-white text-center shadow-sm transition-all"
          initial={{ opacity: 0, y: 24 }}
          style={{ height: s.h }}
          transition={{
            type: 'spring',
            stiffness: 120,
            damping: 18,
            delay: idx * 0.1,
          }}
          whileHover={{
            scale: 1.05,
            y: -6,
            transition: { duration: 0.2 },
          }}
        >
          <div className="absolute top-2 left-2.5 text-xs text-gray-400">{s.n}</div>
          <div className="mt-auto mb-2 text-2xl">{s.i}</div>
          <div className="pb-2 text-[15px] font-semibold">{s.t}</div>
        </motion.div>
      ))}
    </div>
  );
}

// ---------------- Magnetic Tags ----------------
function MagneticTagsCard(): JSX.Element {
  const ref = useRef<HTMLDivElement | null>(null);
  const size = useRef({ w: 0, h: 0 });
  const mouse = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const hovered = useRef(false);
  const rafId = useRef<number | null>(null);
  const ticking = useRef(false);

  const [isMounted, setIsMounted] = useState(false);

  const x0 = useMotionValue(0);
  const y0 = useMotionValue(0);
  const x1 = useMotionValue(0);
  const y1 = useMotionValue(0);
  const x2 = useMotionValue(0);
  const y2 = useMotionValue(0);
  const x3 = useMotionValue(0);
  const y3 = useMotionValue(0);
  const x4 = useMotionValue(0);
  const y4 = useMotionValue(0);

  // Slower, smoother springs with lower stiffness and higher damping
  const sx0 = useSpring(x0, { stiffness: 35, damping: 30, mass: 2 });
  const sy0 = useSpring(y0, { stiffness: 35, damping: 30, mass: 2 });
  const sx1 = useSpring(x1, { stiffness: 35, damping: 30, mass: 2 });
  const sy1 = useSpring(y1, { stiffness: 35, damping: 30, mass: 2 });
  const sx2 = useSpring(x2, { stiffness: 35, damping: 30, mass: 2 });
  const sy2 = useSpring(y2, { stiffness: 35, damping: 30, mass: 2 });
  const sx3 = useSpring(x3, { stiffness: 35, damping: 30, mass: 2 });
  const sy3 = useSpring(y3, { stiffness: 35, damping: 30, mass: 2 });
  const sx4 = useSpring(x4, { stiffness: 35, damping: 30, mass: 2 });
  const sy4 = useSpring(y4, { stiffness: 35, damping: 30, mass: 2 });

  const motionValues = [
    { x: x0, y: y0, bx: 0, by: 0 },
    { x: x1, y: y1, bx: 0, by: 0 },
    { x: x2, y: y2, bx: 0, by: 0 },
    { x: x3, y: y3, bx: 0, by: 0 },
    { x: x4, y: y4, bx: 0, by: 0 },
  ];

  const springs = [
    { sx: sx0, sy: sy0 },
    { sx: sx1, sy: sy1 },
    { sx: sx2, sy: sy2 },
    { sx: sx3, sy: sy3 },
    { sx: sx4, sy: sy4 },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const measure = () => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      size.current = { w: r.width, h: r.height };

      TAGS.forEach((t, i) => {
        motionValues[i].bx = (size.current.w * t.baseX) / 100;
        motionValues[i].by = (size.current.h * t.baseY) / 100;
        motionValues[i].x.set(motionValues[i].bx);
        motionValues[i].y.set(motionValues[i].by);
      });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (ref.current) ro.observe(ref.current);
    window.addEventListener('resize', measure, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [isMounted]);

  useEffect(() => {
    // Increased padding to account for larger tag dimensions
    const pad = 80; // Larger padding for bigger tags
    const returnSpeed = 0.02;
    const orbitRadius = 60;
    const magnetStrength = 0.3;

    const loop = () => {
      if (hovered.current && mouse.current.x != null && mouse.current.y != null) {
        const mx = mouse.current.x as number;
        const my = mouse.current.y as number;
        const { w, h } = size.current;

        const angleStep = (Math.PI * 2) / TAGS.length;

        for (let i = 0; i < TAGS.length; i++) {
          const angle = i * angleStep;
          const targetX = mx + Math.cos(angle) * orbitRadius;
          const targetY = my + Math.sin(angle) * orbitRadius;

          // Get current position
          const currentX = motionValues[i].x.get();
          const currentY = motionValues[i].y.get();

          // Smooth interpolation towards target
          const newX = currentX + (targetX - currentX) * magnetStrength;
          const newY = currentY + (targetY - currentY) * magnetStrength;

          // Clamp with larger boundaries to keep tags inside
          motionValues[i].x.set(clamp(newX, pad, w - pad));
          motionValues[i].y.set(clamp(newY, pad, h - pad));
        }
      } else {
        // Smooth return to base position
        for (let i = 0; i < TAGS.length; i++) {
          const it = motionValues[i];
          const cx = it.x.get();
          const cy = it.y.get();

          it.x.set(cx + (it.bx - cx) * returnSpeed);
          it.y.set(cy + (it.by - cy) * returnSpeed);
        }
      }
      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [isMounted]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ticking.current) return;
    ticking.current = true;
    requestAnimationFrame(() => {
      if (!ref.current) return;
      const r = ref.current.getBoundingClientRect();
      mouse.current = { x: e.clientX - r.left, y: e.clientY - r.top };
      ticking.current = false;
    });
  };

  if (!isMounted) {
    return <div className="min-h-[200px]" />;
  }

  return (
    <div
      ref={ref}
      className="relative min-h-[200px] cursor-pointer overflow-hidden"
      style={{ willChange: 'transform' }}
      onMouseEnter={() => (hovered.current = true)}
      onMouseMove={onMove}
      onMouseLeave={() => {
        hovered.current = false;
        mouse.current = { x: null, y: null };
      }}
    >
      {TAGS.map((t, i) => (
        <motion.span
          key={t.text}
          animate={{ opacity: 1, scale: 1, rotate: t.rotate }}
          className="pointer-events-none rounded-lg bg-[#ef326c] px-5 py-2.5 text-base font-bold whitespace-nowrap text-white shadow-xl select-none"
          initial={{ opacity: 0, scale: 0.6, rotate: 0 }}
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            x: springs[i].sx,
            y: springs[i].sy,
            rotate: t.rotate,
          }}
          transition={{
            type: 'spring',
            stiffness: 150,
            damping: 20,
            delay: i * 0.08,
            duration: 0.8,
          }}
        >
          {t.text}
        </motion.span>
      ))}
    </div>
  );
}

// ---------------- Page ----------------
export default function CustomBento(): JSX.Element {
  return (
    <div className="w-full px-8 py-3 lg:px-16" suppressHydrationWarning>
      {/* Row 1 */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Calendar Card */}
        <div className="lg:col-span-5">
          <div className="flex h-full min-h-[300px] flex-col rounded-2xl bg-white p-4 shadow-sm lg:min-h-[420px]">
            <div className="mb-3">
              <h5 className="mb-1 text-lg font-bold">Plan your growth</h5>
              <div className="text-sm text-gray-500">Clear steps to scale smart and fast.</div>
            </div>
            <div className="min-h-0 flex-1">
              <CalendarCard />
            </div>
          </div>
        </div>

        {/* Steps Card */}
        <div className="lg:col-span-7">
          <div className="flex h-full min-h-[300px] flex-col rounded-2xl bg-white p-4 shadow-sm lg:min-h-[420px]">
            <div className="mb-3">
              <h5 className="mb-1 text-lg font-bold">Our 4-step plan</h5>
              <div className="text-sm text-gray-500">A simple path to smart, scalable growth.</div>
            </div>
            <div className="min-h-0 flex-1">
              <StepsCardInner />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {/* Percentage Card */}
        <div className="lg:col-span-5">
          <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl bg-white p-8 shadow-sm lg:min-h-[220px]">
            <div className="flex flex-1 items-center justify-center">
              <motion.span
                animate={{ opacity: 1, scale: 1 }}
                className="leading-none font-extrabold tracking-tight text-[#ef326c]"
                initial={{ opacity: 0, scale: 0.8 }}
                style={{ fontSize: 'min(20vw, 120px)' }}
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              >
                99%
              </motion.span>
            </div>
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-[15px] leading-snug font-semibold text-gray-500"
              initial={{ opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Project Success Rate
            </motion.div>
          </div>
        </div>

        {/* Tags Card */}
        <div className="lg:col-span-7">
          <div className="h-full min-h-[280px] overflow-hidden rounded-2xl bg-white p-4 shadow-sm lg:min-h-[220px]">
            <MagneticTagsCard />
          </div>
        </div>
      </div>
    </div>
  );
}
