"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { getMessage, Lang, Tone } from "@/lib/templates";

function clampLang(v: string | null): Lang {
  return v === "ko" ? "ko" : "en";
}
function clampTone(v: string | null): Tone {
  const ok = ["direct", "calm", "soft", "humor"];
  return (ok.includes(v ?? "") ? v : "calm") as Tone;
}

export default function ShowPage() {
  const sp = useSearchParams();

  const lang = clampLang(sp.get("lang"));
  const tone = clampTone(sp.get("tone"));
  const key = sp.get("key");
  const msg = sp.get("msg");

  const message = useMemo(() => {
    if (msg && msg.trim().length > 0) return msg.trim();
    if (key) return getMessage(lang, key, tone) ?? (lang === "en" ? "Message not found." : "문구를 찾을 수 없습니다.");
    return lang === "en" ? "Pick a message first." : "먼저 문구를 선택하세요.";
  }, [msg, key, lang, tone]);

  const hint = lang === "en" ? "Tap to hide/show controls" : "탭해서 안내 숨기기/보이기";

  return (
    <main
      className="min-h-screen flex items-center justify-center p-6 select-none"
      style={{ background: "black", color: "white" }}
    >
      <div className="w-full max-w-4xl text-center space-y-6">
        <div className="text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight break-words">
          {message}
        </div>

        <div className="opacity-70 text-sm">
          {hint} ·{" "}
          <a className="underline" href="/">
            {lang === "en" ? "Back" : "뒤로"}
          </a>
        </div>
      </div>
    </main>
  );
}
