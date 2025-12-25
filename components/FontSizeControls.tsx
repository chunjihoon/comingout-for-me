"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  lang: "en" | "ko";
  storageKey?: string; // 기본: "cofm_font_scale"
  className?: string;
};

export default function FontSizeControls({
  lang,
  storageKey = "cofm_font_scale",
  className = "",
}: Props) {
  const isClient = typeof window !== "undefined";

  const [scale, setScale] = useState(1);

  // load
  useEffect(() => {
    if (!isClient) return;
    const v = window.localStorage.getItem(storageKey);
    if (!v) return;
    const n = Number(v);
    if (!Number.isFinite(n)) return;
    setScale(clamp(n));
  }, [isClient, storageKey]);

  // save
  useEffect(() => {
    if (!isClient) return;
    window.localStorage.setItem(storageKey, String(scale));
  }, [isClient, storageKey, scale]);

  function clamp(n: number) {
    return Math.max(0.8, Math.min(1.8, Math.round(n * 10) / 10)); // 0.8x ~ 1.8x (0.1 step)
  }

  function dec() {
    setScale((s) => clamp(s - 0.1));
  }
  function inc() {
    setScale((s) => clamp(s + 0.1));
  }
  function reset() {
    setScale(1);
  }

  const label = useMemo(() => {
    return lang === "ko"
      ? { bigger: "글자 크게", smaller: "글자 작게", reset: "기본" }
      : { bigger: "Bigger text", smaller: "Smaller text", reset: "Reset" };
  }, [lang]);

  // 외부에서 메시지에 적용할 수 있게 이벤트로 broadcast
  useEffect(() => {
    if (!isClient) return;
    window.dispatchEvent(new CustomEvent("cofm-font-scale", { detail: { scale } }));
  }, [isClient, scale]);

  return (
    <div
      className={[
        "fixed bottom-4 right-4 z-40",
        "flex items-center gap-2",
        className,
      ].join(" ")}
    >
      <button
        type="button"
        onClick={dec}
        aria-label={label.smaller}
        className="h-12 w-12 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg
                   text-slate-900 text-lg font-semibold active:scale-[0.98] transition"
      >
        A−
      </button>

      <button
        type="button"
        onClick={inc}
        aria-label={label.bigger}
        className="h-12 w-12 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg
                   text-slate-900 text-lg font-semibold active:scale-[0.98] transition"
      >
        A+
      </button>

      <button
        type="button"
        onClick={reset}
        aria-label={label.reset}
        className="h-12 px-3 rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg
                   text-slate-900 text-sm font-medium active:scale-[0.98] transition"
      >
        {label.reset}
      </button>
    </div>
  );
}
