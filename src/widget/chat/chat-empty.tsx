import { ChatInput } from "@/features/chat/ui/chat-input";
import { useTranslation } from "react-i18next";
import { motion, type Transition } from "motion/react";
import { useEffect, useRef, useState, useMemo } from "react";

export const ChatEmpty = () => {
  const { t } = useTranslation();

  return (
    <div
      className={`w-full overflow-auto transition-all h-[calc(100dvh-304px)] ease-out duration-75 flex flex-col font-inter`}
    >
      <div className="flex max-w-5xl m-auto flex-col flex-grow w-full justify-center px-4">
        <header className="flex justify-center text-center mb-8">
          <BlurText
            text={t("home_title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="md:text-4xl  text-2xl font-semibold text-gray-500 dark:text-neutral-300"
          />
        </header>

        <ChatInput isMessageExist={false} />
      </div>
    </div>
  );
};

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
  delay?: number; // in ms
  className?: string;
  animateBy?: "words" | "letters";
  direction?: "top" | "bottom";
  threshold?: number;
  rootMargin?: string;
  animationFrom?: Keyframes;
  animationTo?: Keyframes[];
  easing?: (t: number) => number;
  onAnimationComplete?: () => void;
  stepDuration?: number; // in seconds
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
      {
        filter: "blur(5px)",
        opacity: 0.5,
        y: direction === "top" ? 5 : -5,
      },
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

  return (
    <p
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {elements.map((segment, index) => {
        const animateKeyframes = buildKeyframes(fromSnapshot, toSnapshots);

        const spanTransition: Transition = {
          duration: totalDuration,
          times,
          delay: (index * delay) / 1000,
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
