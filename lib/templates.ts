export type Lang = "en" | "ko";
export type Tone = "direct" | "calm" | "soft" | "humor";

export const templates: Record<Lang, Record<string, Record<Tone, string>>> = {
  en: {
    im_gay: {
      direct: "I’m gay.",
      calm: "I want to share something important. I’m gay.",
      soft: "This is hard for me to say, but I’m gay.",
      humor: "Plot twist: I’m gay.",
    },
    im_queer: {
      direct: "I’m queer.",
      calm: "I want to share something important. I’m queer.",
      soft: "This is hard for me to say, but I’m queer.",
      humor: "Surprise: I’m queer.",
    },
  },
  ko: {
    im_gay: {
      direct: "나 게이야.",
      calm: "중요한 얘기가 있어. 나 게이야.",
      soft: "말하기 어렵지만… 나 게이야.",
      humor: "두둥- 탁! 반전: 나 게이야...^^",
    },
    im_queer: {
      direct: "난 퀴어야.",
      calm: "중요한 얘기가 있어. 난 퀴어야.",
      soft: "말하기 어렵지만… 난 퀴어야.",
      humor: "두둥- 탁! 반전: 난 퀴어야...^^",
    },
  },
};

export function getMessage(lang: Lang, key: string, tone: Tone) {
  return templates[lang]?.[key]?.[tone] ?? null;
}
