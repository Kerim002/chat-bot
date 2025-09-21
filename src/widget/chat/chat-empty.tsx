// ChatEmpty.tsx
import { ChatInput } from "@/features/chat/ui/chat-input";
import { useTranslation } from "react-i18next";
import { motion, type Transition } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/shared/ui/button";
import { Pointer, Star, Check } from "lucide-react";
import { usePromptMutation } from "@/features/chat/api/use-prompt-mutation";
import { tempReturner } from "@/shared/lib/temp-returner";
import { useQueryParam } from "@/shared";
import type { QualityKey } from "@/shared/constants/quality";
import { MessageItem } from "@/features/chat/ui/message";
import { Skeleton } from "@/shared/ui/skeleton";
import { useChatStore } from "@/entities/room/hooks/use-chat-store";

const staticTexts = [
  "Zähmet kodeksiniň maksady we wezipesi näme?",
  "Esasy düşünjeleri düşündir: iş beriji, işçi, iş şertnamasy.",
  "Zähmet gatnaşyklaryny düzgünleşdirýän çeşmeleri görkez.",
  "Zähmet şertnamasynyň ýazma görnüşiniň hökmanylygyny düşündir.",
  "Şertnamanyň möhletli we möhletsiz görnüşleriniň tapawudyny görkez.",
  "Işe kabul etmegiň düzgünleri barada maglumat ber.",
  "Şertnamanyň ýatyrylmagynyň sebäplerini düşündir.",
  "Iş wagtynyň kadalaşdyrylan dowamlylygyny görkez.",
  "Gysga iş güni haçan ulanylýar?",
  "Arakesme we dynç alyş günleri barada maglumat ber.",
  "Ýyllyk zähmet rugsatynyň dowamlylygyny düşündir.",
  "Aýlyklaryň töleniş tertibini düşündir.",
  "Zähmet haklarynyň iň az möçberi barada maglumat ber.",
  "Aýlyklaryň gijikdirilmegi ýagdaýynda işçiniň hukugy näme?",
  "Aýal maşgalalaryň zähmetdäki goraglylygyny düşündir.",
  "Ýetginjekleriň işini düzgünleşdirýän maddany görkez.",
  "Maýyplaryň zähmet hukugyny düşündir.",
  "Işçiniň esasy hukuklaryny görkez.",
  "Iş berijiniň borçlaryny düşündir.",
  "Zähmet kodeksindäki jogapkärçilik çärelerini seljer.",
];

// Rastgele 4 öğe seçen fonksiyon
const getRandomStaticTexts = (texts: string[], count: number = 4) => {
  const shuffled = [...texts].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

// Dinamik ikon dizisi
const icons = [Pointer, Star, Check];

export const ChatEmpty = () => {
  const { t } = useTranslation();
  const { getQuery } = useQueryParam();
  const { oldText, setOldText } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);

  const { isPending, promptMutation } = usePromptMutation();
  const randomTexts = useMemo(() => getRandomStaticTexts(staticTexts), []);
  const handleSendMessage = (inputValue: string) => {
    setIsLoading(true);
    setOldText(inputValue);
    if (!isPending && inputValue.trim() !== "") {
      const qualityParam = (getQuery("temp") as QualityKey) || "normal";
      promptMutation({
        userPrompt: inputValue,
        temperature: tempReturner(qualityParam).temp,
        maxTokens: tempReturner(qualityParam).maxTokens,
        topK: tempReturner(qualityParam).topK,
        similarityThreshold: tempReturner(qualityParam).simlarityThreshold,
      });
    }
  };

  return (
    <div
      // className="w-full  h-[calc(100dvh-304px)] overflow-auto flex flex-col font-inter transition-all ease-out duration-75"
      className={`w-full ${
        isLoading ? "h-[calc(100dvh-64px)]" : "h-[calc(100dvh-304px)]"
      }  overflow-auto flex flex-col font-inter transition-all ease-out duration-75`}
    >
      {isLoading ? (
        <div
          className={`flex max-w-4xl  pb-4 m-auto h-full flex-col flex-grow w-full justify-center mx-auto px-4`}
        >
          <div className="flex-grow overflow-y-auto transition-all ease-in duration-300 scrollbar-hide mb-4 space-y-4 md:p-4 p-0 rounded-lg">
            <MessageItem
              roomId={0}
              createdAt="test"
              prompt={oldText}
              isStreaming={false}
              id={0}
              isUser={true}
            />
            <div className="">
              <Skeleton className="sm:w-lg w-full h-10 rounded-xl" />
            </div>
          </div>
          <ChatInput isMessageExist={false} />
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow max-w-5xl mx-auto px-4">
          <header className="mb-8 text-center">
            <BlurText
              text={t("home_title")}
              delay={150}
              animateBy="words"
              direction="top"
              className="text-2xl md:text-4xl font-semibold text-gray-500 dark:text-neutral-300"
            />
          </header>

          <ChatInput setIsLoading={setIsLoading} isMessageExist={false} />

          <div className="w-full flex justify-center mt-6">
            <div className="flex flex-wrap gap-3 max-w-3xl w-full justify-center">
              {randomTexts.map((item, index) => {
                const IconComponent = icons[index % icons.length];
                return (
                  <Button
                    key={item}
                    variant="secondary"
                    className="flex truncate sm:w-fit w-80 items-center md:text-base break-words text-xs gap-2 px-4 py-2  hover:bg-blue-100 dark:hover:bg-neutral-700 transition-colors rounded-xl active:scale-95"
                    onClick={() => handleSendMessage(item)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span className="truncate">{item}</span>
                  </Button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* -------- BlurText Component --------- */
type Keyframes = Record<string, any>;

const buildKeyframes = (from: Keyframes, steps: Keyframes[]): Keyframes => {
  const keys = new Set([
    ...Object.keys(from),
    ...steps.flatMap((s) => Object.keys(s)),
  ]);
  const keyframes: Keyframes = {};
  keys.forEach((k) => {
    keyframes[k] = [from[k], ...steps.map((s) => s[k])];
  });
  return keyframes;
};

interface BlurTextProps {
  text?: string;
  delay?: number;
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Keyframes;
  animationTo?: Keyframes[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number;
}

const BlurText = ({
  text = "",
  delay = 200,
  className = "",
  animateBy = "words",
  direction = "top",
  threshold = 0.1,
  rootMargin = "0px",
  animationFrom,
  animationTo,
  easing = (t) => t,
  onAnimationComplete,
  stepDuration = 0.35,
}: BlurTextProps) => {
  const elements = animateBy === "words" ? text.split(" ") : text.split("");
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(ref.current!);
        }
      },
      { threshold, rootMargin }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  const defaultFrom: Keyframes = useMemo(
    () =>
      direction === "top"
        ? { filter: "blur(10px)", opacity: 0, y: -50 }
        : { filter: "blur(10px)", opacity: 0, y: 50 },
    [direction]
  );

  const defaultTo: Keyframes[] = useMemo(
    () => [
      { filter: "blur(5px)", opacity: 0.5, y: direction === "top" ? 5 : -5 },
      { filter: "blur(0px)", opacity: 1, y: 0 },
    ],
    [direction]
  );

  const fromSnapshot = animationFrom ?? defaultFrom;
  const toSnapshots = animationTo ?? defaultTo;

  const stepCount = toSnapshots.length + 1;
  const totalDuration = stepDuration * (stepCount - 1);
  const times = Array.from({ length: stepCount }, (_, i) =>
    stepCount === 1 ? 0 : i / (stepCount - 1)
  );

  const animateKeyframes = useMemo(
    () => buildKeyframes(fromSnapshot, toSnapshots),
    [fromSnapshot, toSnapshots]
  );

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {elements.map((segment, index) => {
        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay:
            animateBy === "words" && segment === " "
              ? 0
              : (index * delay) / 1000,
          ease: easing,
        };

        return (
          <motion.span
            className="inline-block text-center will-change-[transform,filter,opacity]"
            key={index}
            initial={fromSnapshot}
            animate={inView ? animateKeyframes : fromSnapshot}
            transition={spanTransition}
            onAnimationComplete={
              index === elements.length - 1 ? onAnimationComplete : undefined
            }
          >
            {segment === " " ? "\u00A0" : segment}
            {animateBy === "words" && index < elements.length - 1 && "\u00A0"}
          </motion.span>
        );
      })}
    </p>
  );
};
