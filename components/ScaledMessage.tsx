"use client";

import { useEffect, useState } from "react";

export default function ScaledMessage({
  children,
  basePx = 56, // 기본 폰트 크기(px)
}: {
  children: React.ReactNode;
  basePx?: number;
}) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const onScale = (e: any) => {
      const v = e?.detail?.scale;
      if (typeof v === "number") setScale(v);
    };
    window.addEventListener("cofm-font-scale", onScale as any);
    // 첫 렌더에서 localStorage 값 적용
    const raw = window.localStorage.getItem("cofm_font_scale");
    const n = Number(raw);
    if (Number.isFinite(n) && n > 0) setScale(n);
    return () => window.removeEventListener("cofm-font-scale", onScale as any);
  }, []);

  return (
    <div
      className="font-semibold leading-tight break-words text-slate-900"
      style={{ fontSize: `${basePx * scale}px` }}
    >
      {children}
    </div>
  );
}
