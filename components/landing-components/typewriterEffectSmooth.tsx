"use client";

import { TextGenerateEffect } from "./typewriter-effect";

export function TypewriterEffectSmooths() {
  const words = [
    {
      text: "Buduj",
    },
    {
      text: "marzenia",
    },
    {
      text: "i",
    },
    {
      text: "zarządzaj",
    },
    {
      text: "rzeczywistością",
    },
    {
      text: "z",
    },
    {
      text: "Asystentem",
      className: "text-first-muted",
    },
    {
      text: "Fachowca.",
      className: "text-first-muted",
    },
  ];
  return (
    <div className="max-w-[42rem] leading-normal sm:text-xl sm:leading-8">
      <TextGenerateEffect words={words} />
    </div>
  );
}
