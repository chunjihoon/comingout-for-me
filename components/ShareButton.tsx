"use client";

import { useMemo, useState } from "react";

type Props = {
  url?: string;      // 기본: 현재 URL
  title?: string;    // 공유 제목
  text?: string;     // 공유 설명(일부 앱에서만 표시)
  label: string;        // ✅ 추가
  className?: string;
};

export default function ShareButton({
  url,
  title = "Say for me",
  text = "Open this screen",
  label,
  className = "",
}: Props) {
  const [toast, setToast] = useState<string>("");

  const shareUrl = useMemo(() => {
    if (url) return url;
    if (typeof window === "undefined") return "";
    return window.location.href;
  }, [url]);

  const canNativeShare =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    // @ts-ignore
    typeof navigator.share === "function";

  async function copyLink() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        // fallback
        const ta = document.createElement("textarea");
        ta.value = shareUrl;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        ta.remove();
      }
      setToast("Link copied");
      setTimeout(() => setToast(""), 1200);
    } catch {
      setToast("Copy failed");
      setTimeout(() => setToast(""), 1200);
    }
  }

  async function onShare() {
    if (!shareUrl) return;

    if (canNativeShare) {
      try {
        // @ts-ignore
        await navigator.share({ title, text, url: shareUrl });
        return;
      } catch {
        // 사용자가 취소했거나 인앱에서 막힌 경우 → 복사로 폴백
      }
    }
    await copyLink();
  }

  return (
    <div className={"relative " + className}>
      <button
        type="button"
        onClick={onShare}
        className="rounded-2xl px-4 py-3 border border-slate-200 bg-white/80 backdrop-blur-md
                   text-slate-900 shadow-lg active:scale-[0.99] transition"
      >
        {label}
      </button>

      {toast && (
        <div className="absolute left-1/2 -translate-x-1/2 -top-10 text-xs
                        px-3 py-2 rounded-xl border border-slate-200 bg-white/90 shadow">
          {toast}
        </div>
      )}
    </div>
  );
}
