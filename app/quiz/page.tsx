"use client";

import { useEffect, useMemo, useState } from "react";
import PastelRainbowBg from "@/components/PastelRainbowBg";
import { useRouter } from "next/navigation";

type Lang = "en" | "ko";

function optionBtnClass(active: boolean) {
  return [
    "w-full px-3 py-3 rounded-2xl border transition text-center font-medium",
    active
      ? "bg-black text-white border-black shadow-lg -translate-y-[1px]"
      : "bg-white text-slate-800 border-slate-300 hover:border-slate-400 hover:bg-white/90 transition-all active:scale-[0.98]",
  ].join(" ");
}

export default function QuizPage() {
  const [lang, setLang] = useState<Lang>("en");
  const [photo, setPhoto] = useState<string>("");
  const [answer4, setAnswer4] = useState<string>("");
  const [revealed, setRevealed] = useState<boolean>(false);
  const [picked, setPicked] = useState<number | null>(null);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayTick, setOverlayTick] = useState(0); // 애니메이션 재트리거용\

  const router = useRouter();

  useEffect(() => {
    // lang: querystring에서 가져와도 되고, 없으면 저장값/기본값 사용
    const url = new URL(window.location.href);
    const qLang = url.searchParams.get("lang");
    setLang(qLang === "ko" ? "ko" : "en");

    // Home에서 저장한 값
    setPhoto(sessionStorage.getItem("quiz_photo") ?? "");
    setAnswer4(sessionStorage.getItem("quiz_answer4") ?? "");
  }, []);

  const choices = useMemo(() => {
    // 1~3 고정 보기(원하는 문구로 바꿔도 됨)
    if (lang === "ko") {
      return ["내 친구", "내 동료", "아는 사람", answer4 || "내 애인"];
    }
    return ["My friend", "My coworker", "Someone I know", answer4 || "My boyfriend"];
  }, [lang, answer4]);

  const resultText = lang === "ko" ? "정답은"+answer4+"입니다!" : "The correct answer is #4!";

  return (
    <PastelRainbowBg>
      <main className="min-h-[100dvh] p-6 flex justify-center items-start sm:items-center pt-10 sm:pt-6 animate-fade-in">
        <div className="w-full max-w-xl space-y-4">
          {/* 상단 타이틀(상대에게 보여줄 화면) */}
          <header className="text-center">
            <h1 className="text-3xl md:text-4xl font-semibold text-slate-900">
              {lang === "ko" ? "누구게?" : "Guess who?"}
            </h1>
            <p className="mt-2 text-slate-700/80 text-sm">
              {lang === "ko"
                ? "아래 보기 중 하나를 눌러보세요."
                : "Tap one option below."}
            </p>
          </header>

          {/* 카드 컨테이너 */}
          <div className="rounded-3xl border border-white/60 bg-white/70 backdrop-blur-md shadow-lg p-4 space-y-4">
            {/* 사진 */}
            <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
              {photo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={photo} alt="quiz" className="w-full h-auto" />
              ) : (
                <div className="py-10 text-center text-sm text-slate-500">
                  {lang === "ko" ? "사진이 없습니다. 다시 생성해주세요." : "No photo found. Please create again."}
                </div>
              )}
            </div>

            {/* 보기 4개 */}
            <div className="grid grid-cols-2 gap-2">
              {choices.map((c, idx) => {
                const n = idx + 1;
                return (
                  <button
                    key={n}
                    className={optionBtnClass(picked === n)}
                    onClick={() => {
                      setPicked(n);
                      // 오버레이 애니메이션 재시작
                      setOverlayTick((x) => x + 1);
                      setShowOverlay(true);
                    }}
                  >
                    {n}. {c}
                  </button>
                );
              })}
            </div>

            {/* 결과 표출 */}
            <div
              className={[
                "transition-all duration-300 ease-out overflow-hidden",
                revealed ? "max-h-24 opacity-100 translate-y-0" : "max-h-0 opacity-0 -translate-y-2",
              ].join(" ")}
            >
              <div className="mt-2 rounded-2xl border border-black bg-black text-white text-center py-3 font-semibold shadow-lg">
                {resultText}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showOverlay && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center"
          role="dialog"
          aria-modal="true"
          onClick={() => setShowOverlay(false)}
        >
          {/* 배경 딤 */}
          <div className="absolute inset-0 bg-white/40 backdrop-blur-sm" />

          {/* 중앙 카드(클릭 버블링 방지) */}
          <div
            key={overlayTick}
            className={[
              "relative mx-6 w-full max-w-xl rounded-3xl border border-slate-300/50",
              "bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200",
              "text-slate-900 shadow-2xl",
              "px-6 py-10 text-center",
              "animate-[overlayPop_420ms_ease-out_forwards]",
            ].join(" ")}
          >
            <div className="text-3xl md:text-5xl font-extrabold tracking-tight">
              {lang === "en" ? "The correct answer is" : "정답은"}
            </div>
            <div className="mt-3 text-6xl md:text-8xl font-black">
              {lang === "en" ? answer4+"!!" : answer4+"입니다!"}
            </div>

            <div className="mt-6 text-sm text-black/40">
              {lang === "en" ? "Tap anywhere to close." : "아무 곳이나 눌러 닫기"}
            </div>
          </div>

          {/* keyframes 정의 */}
          <style jsx global>{`
            @keyframes overlayPop {
              0% {
                opacity: 0;
                transform: scale(0.85) translateY(12px) rotate(-3deg);
                filter: blur(6px);
              }
              60% {
                opacity: 1;
                transform: scale(1.04) translateY(0) rotate(5deg);
                filter: blur(0);
              }
              100% {
                opacity: 1;
                transform: scale(1) translateY(0) rotate(0deg);
              }
            }
          `}</style>
        </div>
      )}

      <div className="pt-4 flex justify-center">
        <button
          onClick={() => router.push("/")}
          className="text-slate-500 font-medium transition active:scale-[0.98]"
        >
          {lang === "en" ? "Back to home" : "홈으로 돌아가기"}
        </button>
      </div>

    </PastelRainbowBg>
  );
}
