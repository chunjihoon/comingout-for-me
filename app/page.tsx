"use client";

import { useMemo, useState } from "react";

type Lang = "en" | "ko";
type Tone = "direct" | "calm" | "soft" | "humor";

export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [key, setKey] = useState<string>("im_gay");
  const [tone, setTone] = useState<Tone>("calm");
  const [custom, setCustom] = useState<string>("");

  const href = useMemo(() => {
    const params = new URLSearchParams();
    params.set("lang", lang);
    params.set("tone", tone);

    if (custom.trim().length > 0) {
      params.set("msg", custom.trim());
    } else {
      params.set("key", key);
    }
    return `/show?${params.toString()}`;
  }, [lang, tone, key, custom]);

  return (
    <main className="min-h-screen p-6 flex items-center justify-center">
      <div className="w-full max-w-xl space-y-6">
        <header className="space-y-2">
          <h1 className="text-3xl font-semibold">
            {lang === "en" ? "Say it for me" : "대신 말해드립니다"}
          </h1>
          <p className="text-sm opacity-70">
            {lang === "en"
              ? "Pick a style, then show the screen."
              : "방식 고르고, 화면을 보여주기만 하면 됩니다."}
          </p>
        </header>

        {/* Language */}
        <section className="space-y-2">
          <div className="text-sm font-medium">{lang === "en" ? "Language" : "언어"}</div>
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-xl border ${lang === "en" ? "bg-black text-white" : ""}`}
              onClick={() => setLang("en")}
            >
              English
            </button>
            <button
              className={`px-3 py-2 rounded-xl border ${lang === "ko" ? "bg-black text-white" : ""}`}
              onClick={() => setLang("ko")}
            >
              한국어
            </button>
          </div>
        </section>

        {/* Template / Custom */}
        <section className="space-y-2">
          <div className="text-sm font-medium">{lang === "en" ? "Message" : "문구"}</div>

          <div className="grid grid-cols-2 gap-2">
            <button
              className={`px-3 py-2 rounded-xl border ${key === "im_gay" && custom === "" ? "bg-black text-white" : ""}`}
              onClick={() => {
                setCustom("");
                setKey("im_gay");
              }}
            >
              {lang === "en" ? "I’m gay" : "나 게이야"}
            </button>

            <button
              className={`px-3 py-2 rounded-xl border ${key === "im_queer" && custom === "" ? "bg-black text-white" : ""}`}
              onClick={() => {
                setCustom("");
                setKey("im_queer");
              }}
            >
              {lang === "en" ? "I’m queer" : "난 퀴어야"}
            </button>
          </div>

          <input
            className="w-full px-3 py-2 rounded-xl border"
            placeholder={lang === "en" ? "Or type your own (optional)..." : "직접 입력(선택)…"}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
        </section>

        {/* Tone */}
        <section className="space-y-2">
          <div className="text-sm font-medium">{lang === "en" ? "Tone" : "톤"}</div>
          <div className="grid grid-cols-2 gap-2">
            {(["direct", "calm", "soft", "humor"] as Tone[]).map((t) => (
              <button
                key={t}
                className={`px-3 py-2 rounded-xl border ${tone === t ? "bg-black text-white" : ""}`}
                onClick={() => setTone(t)}
              >
                {lang === "en"
                  ? ({ direct: "Direct", calm: "Calm", soft: "Soft", humor: "Humor" } as const)[t]
                  : ({ direct: "직설", calm: "차분", soft: "부드럽게", humor: "유머" } as const)[t]}
              </button>
            ))}
          </div>
        </section>

        {/* Go */}
        <a
          href={href}
          className="block text-center px-4 py-3 rounded-2xl bg-black text-white font-medium"
        >
          {lang === "en" ? "Show screen" : "화면 띄우기"}
        </a>

        <footer className="text-xs opacity-60 flex justify-between">
          <a href="/privacy" className="underline">
            {lang === "en" ? "Privacy" : "개인정보"}
          </a>
          <span>{lang === "en" ? "No login. No saving." : "로그인 없음. 저장 없음."}</span>
        </footer>
      </div>
    </main>
  );
}
