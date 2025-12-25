"use client";

import { useMemo, useState, useRef } from "react";
import PastelRainbowBg from "@/components/PastelRainbowBg";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";



type Lang = "en" | "ko";
type Tone = "direct" | "calm" | "soft" | "humor";
type Flow = "text" | "photo"; // ✅ 추가

function optionBtnClass(active: boolean) {
  return [
    "w-full px-3 py-2 rounded-2xl border transition text-center",
    active
      ? "bg-black text-white border-black shadow-lg -translate-y-[1px]"
      : "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-white/90 transition-all active:scale-[0.98]",
  ].join(" ");
}



export default function Home() {

  const router = useRouter(); // ✅ 추가

  const [lang, setLang] = useState<Lang>("en");
  const [key, setKey] = useState<string>("im_gay");
  const [tone, setTone] = useState<Tone>("calm");
  const [custom, setCustom] = useState<string>("");

  const customActive = custom.trim().length > 0;
  const mode: "preset" | "custom" = customActive ? "custom" : "preset";

  // ✅ 추가: 텍스트/사진 플로우
  const [flow, setFlow] = useState<Flow>("text");

  // ✅ 추가: 사진 플로우 입력값
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [answer4, setAnswer4] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>("");
  const [photoError, setPhotoError] = useState<string>("");

  const hrefText = useMemo(() => {
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

  // ✅ 사진 플로우 진입 링크 (언어만 넘기면 됨)
  const hrefPhoto = useMemo(() => {
    const params = new URLSearchParams();
    params.set("lang", lang);
    return `/photo?${params.toString()}`;
  }, [lang]);

  async function handlePhotoSubmit() {
    if (!photoFile) return;
    if (answer4.trim().length === 0) return;
  
    const dataUrl: string = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(new Error("file_read_error"));
      reader.readAsDataURL(photoFile);
    });
  
    sessionStorage.setItem("quiz_photo", dataUrl);
    sessionStorage.setItem("quiz_answer4", answer4.trim());
  
    router.push(`/quiz?lang=${lang}`);
  }

  function onPickPhoto(f: File | null) {
    setPhotoError("");
    setPhotoFile(f);
  
    if (!f) {
      setPhotoPreview("");
      return;
    }
  
    const reader = new FileReader();
    reader.onload = () => setPhotoPreview(String(reader.result));
    reader.onerror = () => setPhotoError(lang === "en" ? "Failed to load image." : "이미지 로드 실패");
    reader.readAsDataURL(f);
  }

  return (
    <PastelRainbowBg>
      <main className="min-h-[100dvh] p-6 flex justify-center items-start sm:items-center pt-10 sm:pt-6 animate-fade-in">
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
                  {lang === "en" ? "Say for me" : "대신 말해드립니다"}
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

          {/* ✅ 여기 추가: 텍스트/사진 선택 버튼 */}
          <section className="grid grid-cols-2 gap-2">
            <button
              className={optionBtnClass(flow === "text")}
              onClick={() => setFlow("text")}
            >
              {lang === "en" ? "Text" : "텍스트로 말하기"}
            </button>
            <button
              className={optionBtnClass(flow === "photo")}
              onClick={() => setFlow("photo")}
            >
              {lang === "en" ? "Photo" : "사진으로 말하기"}
            </button>
          </section>

          {flow === "text" && (
            <>
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
                href={hrefText}
                className="block text-center px-4 py-3 rounded-2xl text-white font-medium shadow-md
                          bg-black hover:bg-slate-900 transition bg-gradient-to-r from-black via-slate-800 to-black bg-[length:200%_200%] animate-gradient"
              >
                {lang === "en" ? "Show screen" : "화면 띄우기"}
              </Link>
            </section>
            </>
          )}

          {flow === "photo" && (
            <section className="space-y-2">
              <div className="text-sm font-medium text-slate-700">
                {lang === "en" ? "Photo quiz" : "사진 퀴즈"}
              </div>

              {/* 카드 컨테이너: 배경과 분리 + 기존 톤 */}
              <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-lg p-4 space-y-4">
                {/* hidden file input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickPhoto(e.target.files?.[0] ?? null)}
                />

                {/* ✅ 사진찾기 버튼: optionBtnClass 스타일과 톤 맞춤 */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className={[
                    "w-full px-4 py-3 rounded-2xl border transition text-center font-medium",
                    "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-white/90",
                    "shadow-sm active:scale-[0.98]",
                  ].join(" ")}
                >
                  {lang === "en" ? "Find photo" : "사진 찾기"}
                </button>

                {/* 선택 상태(파일명) */}
                <div className="text-xs text-slate-600 text-center">
                  {photoFile
                    ? (lang === "en" ? `Selected: ${photoFile.name}` : `선택됨: ${photoFile.name}`)
                    : (lang === "en" ? "No photo selected" : "선택된 사진 없음")}
                </div>

                {/* ✅ 미리보기: 깔끔한 프레임 */}
                <div
                  className={[
                    "rounded-2xl overflow-hidden border bg-white",
                    photoPreview ? "border-slate-200" : "border-dashed border-slate-300",
                  ].join(" ")}
                >
                  {photoPreview ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={photoPreview} alt="preview" className="w-full h-auto" />
                  ) : (
                    <div className="py-10 text-center text-sm text-slate-500">
                      {lang === "en" ? "Preview will appear here" : "미리보기가 여기에 표시됩니다"}
                    </div>
                  )}
                </div>

                {/* ✅ '이 사람이 누구인지' 입력필드: 기존 input 스타일(중앙정렬/링) 맞춤 */}
                <div className="space-y-2">
                  <div className="text-sm font-medium text-slate-700">
                    {lang === "en"
                      ? "Who is this person? (Answer = option #4)"
                      : "이 사람은 누구인가요? (정답 = 4번 보기)"}
                  </div>

                  <input
                    className={[
                      "w-full px-4 py-3 rounded-2xl border transition text-center",
                      "bg-white text-slate-900 placeholder:text-slate-400",
                      answer4.trim().length > 0 ? "border-black ring-2 ring-black" : "border-slate-300",
                    ].join(" ")}
                    placeholder={
                      lang === "en"
                        ? "e.g., My boyfriend / My ex / My ideal type"
                        : "예: 내 애인 / 전애인 / 이상형"
                    }
                    value={answer4}
                    onChange={(e) => {
                      setPhotoError("");
                      setAnswer4(e.target.value);
                    }}
                  />
                </div>

                {/* 에러 */}
                {photoError && <div className="text-sm text-red-600 text-center">{photoError}</div>}

                {/* ✅ 제출 버튼: 기존 Show screen 버튼 톤(블랙 + 그라디언트 애니) 맞춤 */}
                <button
                  type="button"
                  onClick={async () => {
                    setPhotoError("");

                    if (!photoFile) {
                      setPhotoError(lang === "en" ? "Please choose a photo." : "사진을 선택하세요.");
                      return;
                    }
                    if (answer4.trim().length === 0) {
                      setPhotoError(lang === "en" ? "Please enter the answer." : "정답(4번 보기)을 입력하세요.");
                      return;
                    }

                    // file -> dataURL
                    const dataUrl: string = await new Promise((resolve, reject) => {
                      const reader = new FileReader();
                      reader.onload = () => resolve(String(reader.result));
                      reader.onerror = () => reject(new Error("file_read_error"));
                      reader.readAsDataURL(photoFile);
                    });

                    sessionStorage.setItem("quiz_photo", dataUrl);
                    sessionStorage.setItem("quiz_answer4", answer4.trim());

                    router.push(`/quiz?lang=${lang}`);
                  }}
                  disabled={!photoFile || answer4.trim().length === 0}
                  className={[
                    "w-full text-center px-4 py-3 rounded-2xl text-white font-medium shadow-md transition",
                    "bg-black hover:bg-slate-900",
                    "bg-gradient-to-r from-black via-slate-800 to-black bg-[length:200%_200%] animate-gradient",
                    (!photoFile || answer4.trim().length === 0) && "opacity-50 cursor-not-allowed hover:bg-black",
                  ].filter(Boolean).join(" ")}
                >
                  {lang === "en" ? "Submit" : "제출하기"}
                </button>
              </div>
            </section>
          )}

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

