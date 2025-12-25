import { getMessage, Lang, Tone } from "@/lib/templates";

function clampLang(v: unknown): Lang {
  return v === "ko" ? "ko" : "en";
}
function clampTone(v: unknown): Tone {
  const ok = ["direct", "calm", "soft", "humor"];
  return (ok.includes(String(v)) ? v : "calm") as Tone;
}

export default function ShowPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const lang = clampLang(searchParams.lang);
  const tone = clampTone(searchParams.tone);
  const key = typeof searchParams.key === "string" ? searchParams.key : undefined;
  const msg = typeof searchParams.msg === "string" ? searchParams.msg : undefined;

  const message = (() => {
    if (msg && msg.trim().length > 0) return msg.trim();
    if (key) {
      return (
        getMessage(lang, key, tone) ??
        (lang === "en" ? "Message not found." : "문구를 찾을 수 없습니다.")
      );
    }
    return lang === "en" ? "Pick a message first." : "먼저 문구를 선택하세요.";
  })();

  const hint = lang === "en" ? "Show this screen" : "이 화면을 보여주세요";

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
