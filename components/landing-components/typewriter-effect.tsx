"use client";

import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { motion, stagger, useAnimate, useInView } from "framer-motion";

import { cn } from "@/lib/utils";

const TypewriterEffectImpl = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
  cursorClassName?: string;
}) => {
  const wordsArray = words.map((word) => {
    return {
      ...word,
      text: word.text.split(""),
    };
  });

  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  useEffect(() => {
    if (isInView) {
      void animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
          width: "fit-content",
        },
        {
          duration: 0.1,
          delay: stagger(0.05),
          ease: "easeInOut",
        },
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.span ref={scope} className="inline">
        {wordsArray.map((word, idx) => (
          <React.Fragment key={`word-${idx}`}>
            {word.text.map((char, index) => (
              <motion.span
                initial={{}}
                key={`char-${index}`}
                className={cn(
                  `hidden text-myText-muted opacity-0`,
                  word.className,
                )}
              >
                {char}
              </motion.span>
            ))}
            &nbsp;
          </React.Fragment>
        ))}
      </motion.span>
    );
  };

  return <p className={cn("", className)}>{renderWords()}</p>;
};

export const TextGenerateEffect = dynamic(
  () => Promise.resolve(TypewriterEffectImpl),
  {
    ssr: false,
  },
);
