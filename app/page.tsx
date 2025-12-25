"use client";

import { useMemo, useState } from "react";
import PastelRainbowBg from "@/components/PastelRainbowBg";
import Link from "next/link";
import Image from "next/image";




type Lang = "en" | "ko";
type Tone = "direct" | "calm" | "soft" | "humor";

function optionBtnClass(active: boolean) {
  return [
    "w-full px-3 py-2 rounded-2xl border transition text-center",
    active
      ? "bg-black text-white border-black shadow-lg -translate-y-[1px]"
      : "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-white/90 transition-all active:scale-[0.98]",
  ].join(" ");
}



export default function Home() {
  const [lang, setLang] = useState<Lang>("en");
  const [key, setKey] = useState<string>("im_gay");
  const [tone, setTone] = useState<Tone>("calm");
  const [custom, setCustom] = useState<string>("");

  const customActive = custom.trim().length > 0;
  const mode: "preset" | "custom" = customActive ? "custom" : "preset";

  const href = useMemo(() => {
    const params = new URLSearchParams();
    params.set("lang", lang);
  
    if (mode === "custom") {
      params.set("msg", custom.trim());
    } else {
      params.set("tone", tone);
      params.set("key", key);
    }
    return `/show?${params.toString()}`;
  }, [lang, mode, custom, tone, key]);

  return (
    <PastelRainbowBg>
      <main className="min-h-[100dvh] p-6 flex justify-center items-start sm:items-center pt-10 sm:pt-6">
        <div className="w-full max-w-xl space-y-6">
          <header className="w-full max-w-xl mx-auto flex justify-center">
            <div className="flex flex-col items-center text-center gap-3 md:flex-row md:items-center md:gap-5">

              {/* 로고 */}
              <div className="flex-shrink-0">
                <img
                  src="/logo.png"
                  alt="logo"
                  className="w-28 h-28 md:w-24 md:h-24 object-contain"
                />
              </div>

              {/* 텍스트 */}
              <div className="w-full min-w-0">
                <h1 className="font-semibold text-slate-900 leading-tight break-words text-3xl md:text-5xl">
                  {lang === "en" ? "Say it for me" : "대신 말해드립니다"}
                </h1>

                <p className="mt-2 text-slate-700/80 text-sm break-words">
                  {lang === "en"
                    ? "Pick a style, then show the screen."
                    : "방식 고르고, 화면을 보여주기만 하면 됩니다."}
                </p>
              </div>

            </div>
          </header>

          {/* Language */}
          <section className="grid grid-cols-2 gap-2  ">
            <button className={optionBtnClass(lang === "en")} onClick={() => setLang("en")}>
              English {lang === "en"}
            </button>
            <button className={optionBtnClass(lang === "ko")} onClick={() => setLang("ko")}>
              한국어 {lang === "ko"}
            </button>
          </section>


          {/* Template / Custom */}
          <section className="space-y-2  ">
            <div className="text-sm font-medium text-slate-700">{lang === "en" ? "Message" : "문구"}</div>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={optionBtnClass(key === "im_gay" && !customActive)}
                disabled={customActive}
                onClick={() => {
                  setCustom("");
                  setKey("im_gay");
                }}
              >
                {lang === "en" ? "I’m gay" : "나 게이야"}
              </button>

              <button
                className={optionBtnClass(key === "im_queer" && !customActive)}
                disabled={customActive}
                onClick={() => {
                  setCustom("");
                  setKey("im_queer");
                }}
              >
                {lang === "en" ? "I’m queer" : "난 퀴어야"}
              </button>
            </div>

            <div className="relative">
              <input
                className={[
                  "w-full px-4 py-3 pr-12 rounded-2xl border transition text-center",
                  "bg-white text-slate-900",
                  "placeholder:text-slate-400",
                  customActive
                    ? "border-black ring-2 ring-black"
                    : "border-slate-300",
                ].join(" ")}
                placeholder={lang === "en" ? "Or type your own (optional)..." : "직접 입력 (선택)…"}
                value={custom}
                onChange={(e) => setCustom(e.target.value)}
              />

              {customActive && (
                <button
                  type="button"
                  aria-label="Clear custom message"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9 rounded-xl
                            border border-slate-300 bg-white/90 hover:bg-white text-slate-700"
                  onClick={() => setCustom("")}
                >
                  ✕
                </button>
              )}
            </div>


          </section>

          {/* Tone */}
          <div
            className={[
              "transition-all duration-300 ease-out overflow-hidden  ",
              mode === "preset"
                ? "max-h-40 opacity-100 translate-y-0"
                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none",
            ].join(" ")}
          >
            <section className="space-y-2">
              <div className="text-sm font-medium text-slate-700">
                {lang === "en" ? "Tone" : "톤"}
              </div>
              <div className="grid grid-cols-2 gap-2">
                {(["direct", "calm", "soft", "humor"] as Tone[]).map((t) => (
                  <button
                    key={t}
                    className={optionBtnClass(tone === t)}
                    onClick={() => setTone(t)}
                  >
                    {lang === "en"
                      ? ({ direct: "Direct", calm: "Calm", soft: "Soft", humor: "Humor" } as const)[t]
                      : ({ direct: "직설", calm: "차분", soft: "부드럽게", humor: "유머" } as const)[t]}
                  </button>
                ))}
              </div>
            </section>
          </div>


          {/* Go */}
          <section className=" ">
            <Link
              href={href}
              className="block text-center px-4 py-3 rounded-2xl text-white font-medium shadow-md
                        bg-black hover:bg-slate-900 transition bg-gradient-to-r from-black via-slate-800 to-black bg-[length:200%_200%] animate-gradient"
            >
              {lang === "en" ? "Show screen" : "화면 띄우기"}
            </Link>
          </section>



          <footer className="text-xs opacity-60 flex justify-between">
            <a href="/privacy" className="underline">
              {lang === "en" ? "Privacy" : "개인정보"}
            </a>
            <span>{lang === "en" ? "No login. No saving." : "로그인 없음. 저장 없음."}</span>
          </footer>
        </div>
      </main>
    </PastelRainbowBg>
    
  );
}

