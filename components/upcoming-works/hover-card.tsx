"use client";
import { useMotionValue } from "framer-motion";
import React, { useState, useEffect } from "react";
import { useMotionTemplate, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const EvervaultCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  let mouseX = useMotionValue(0);
  let mouseY = useMotionValue(0);

  function onMouseMove({ currentTarget, clientX, clientY }: any) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={cn(
        "bg-transparent flex items-center justify-center w-full h-full relative",
        className,
      )}
    >
      <div
        onMouseMove={onMouseMove}
        className="group/card rounded-2xl w-full relative overflow-hidden bg-transparent borderColor flex items-center justify-start h-full border"
      >
        <CardPattern mouseX={mouseX} mouseY={mouseY} />
        <div className="relative z-10 flex items-center justify-center w-full">
          <div className="relative h-full w-full  rounded-full flex items-center justify-center  font-bold text-3xl">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

function CardPattern({ mouseX, mouseY }: any) {
  let maskImage = useMotionTemplate`radial-gradient(2500px at ${mouseX}px ${mouseY}px, white, transparent)`;
  let style = { maskImage, WebkitMaskImage: maskImage };

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-xl  [mask-image:linear-gradient(white,transparent)]  group-hover/card:opacity-50"></div>
      <motion.div
        className="absolute inset-0 rounded-xl glassPattern5 opacity-30 lg:opacity-0  group-hover/card:opacity-100 backdrop-blur-xl transition duration-500"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-xl opacity-0 mix-blend-overlay   group-hover/card:opacity-100"
        style={style}
      ></motion.div>
    </div>
  );
}
