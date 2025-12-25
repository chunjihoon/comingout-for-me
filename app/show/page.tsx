import PastelRainbowBg from "@/components/PastelRainbowBg";
import { getMessage, Lang, Tone } from "@/lib/templates";
import FullscreenGate from "@/components/FullscreenGate";
import ShareButton from "@/components/ShareButton";



export const dynamic = "force-dynamic";

function getFirst(v: string | string[] | undefined) {
  return Array.isArray(v) ? v[0] : v;
}

function clampLang(v: string | undefined): Lang {
  return v === "ko" ? "ko" : "en";
}

function clampTone(v: string | undefined): Tone {
  const ok: Tone[] = ["direct", "calm", "soft", "humor"];
  return ok.includes(v as Tone) ? (v as Tone) : "calm";
}

type SearchParams = Record<string, string | string[] | undefined>;

export default async function ShowPage(props: {
  searchParams: Promise<SearchParams> | SearchParams;
}) {
  // ✅ Next 16: searchParams may be Promise
  const sp = (await props.searchParams) as SearchParams;

  const lang = clampLang(getFirst(sp.lang));
  const tone = clampTone(getFirst(sp.tone));
  const key = getFirst(sp.key)?.trim() || undefined;
  const msg = getFirst(sp.msg)?.trim() || undefined;

  const message = (() => {
    if (msg) return msg;
    if (key) {
      return (
        getMessage(lang, key, tone) ??
        (lang === "en" ? "Message not found." : "문구를 찾을 수 없습니다.")
      );
    }
    return lang === "en" ? "Pick a message first." : "먼저 문구를 선택하세요.";
  })();

  // ✅ Debug (임시로 확인 후 지워도 됨)
  const debug = JSON.stringify(sp);

  return (
    <PastelRainbowBg>
      <FullscreenGate />
      <main className="min-h-screen flex items-center justify-center p-6 select-none">
        <div className="w-full max-w-4xl text-center space-y-4">
          {/* <div className="text-xs text-slate-600 break-all">{debug}</div> */}

          <div className="animate-appear text-4xl sm:text-6xl md:text-7xl font-semibold leading-tight break-words text-slate-900">
            {message}
          </div>

          <div className="text-sm text-slate-700/80">
            {lang === "en" ? "Show this screen" : "이 화면을 보여주세요"} ·{" "}
            <a className="underline" href="/">
              {lang === "en" ? "Back" : "뒤로"}
            </a>
          </div>
        </div>
      </main>
      {/* ✅ 하단 플로팅 공유 버튼 */}
      <div className="fixed bottom-4 left-0 right-0 z-40 flex justify-center">
        <ShareButton
            title="Say it for me"
            text="Open this screen"
            className=""
            label={lang === "en" ? "Share this service" : "이 서비스 공유하기"}
        />
      </div>
    </PastelRainbowBg>
  );

  
}