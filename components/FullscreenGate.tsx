"use client";

import { useEffect, useMemo, useState } from "react";

function canFullscreen() {
  if (typeof document === "undefined") return false;
  const el = document.documentElement as any;
  return !!(
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen
  );
}

async function requestFs() {
  const el = document.documentElement as any;
  const fn =
    el.requestFullscreen ||
    el.webkitRequestFullscreen ||
    el.mozRequestFullScreen ||
    el.msRequestFullscreen;

  if (!fn) return false;

  try {
    await fn.call(el);
    return true;
  } catch {
    return false;
  }
}

export default function FullscreenGate() {
  const [tried, setTried] = useState(false);
  const supported = useMemo(() => canFullscreen(), []);

  // 이미 fullscreen이면 오버레이 숨김
  const [isFs, setIsFs] = useState(false);
  useEffect(() => {
    const handler = () => {
      const d: any = document;
      setIsFs(!!(d.fullscreenElement || d.webkitFullscreenElement));
    };
    handler();
    document.addEventListener("fullscreenchange", handler);
    document.addEventListener("webkitfullscreenchange", handler as any);
    return () => {
      document.removeEventListener("fullscreenchange", handler);
      document.removeEventListener("webkitfullscreenchange", handler as any);
    };
  }, []);

  if (isFs) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white/80 backdrop-blur-md shadow-lg p-4 text-center">
        <div className="text-sm font-medium text-slate-900">
          전체 화면으로 보여주기
        </div>
        <div className="mt-1 text-xs text-slate-700">
          카톡/인스타 인앱 브라우저에서는 기기/OS에 따라 전체 화면이 제한될 수 있어요.
        </div>

        <button
          className="mt-3 w-full rounded-2xl px-4 py-3 bg-black text-white font-medium active:scale-[0.99] transition"
          onClick={async () => {
            setTried(true);
            const ok = await requestFs();
            if (!ok) setTried(true);
          }}
        >
          {supported ? "Tap to go full screen" : "브라우저 제한 감지됨"}
        </button>

        {tried && (
          <div className="mt-2 text-xs text-slate-700">
            안 되면 오른쪽 상단 메뉴에서 <b>“브라우저에서 열기”</b> 또는{" "}
            <b>“홈 화면에 추가”</b>를 권장합니다.
          </div>
        )}
      </div>
    </div>
  );
}
