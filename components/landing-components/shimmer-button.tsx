"use client";
import { useLoginForm } from "@/context/LoginFormContext";
import { cn } from "@/lib/utils";
import React, { type CSSProperties } from "react";

interface ShimmerButtonProps {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children?: React.ReactNode;
}

const ShimmerButton = ({
  shimmerColor = "#ff7400",
  shimmerSize = "0.1em",
  shimmerDuration = "2s",
  borderRadius = "100px",
  background = "radial-gradient(ellipse 80% 80% at 60% 120%,#ff7400,#803a00",
  className,
  children,
  ...props
}: ShimmerButtonProps) => {
  const { setLoginModalVisible, setIsTourActive } = useLoginForm();
  return (
    <button
      style={
        {
          "--spread": "90deg",
          "--shimmer-color": shimmerColor,
          "--radius": borderRadius,
          "--speed": shimmerDuration,
          "--cut": shimmerSize,
          "--bg": background,
        } as CSSProperties
      }
      className={cn(
        "group relative flex cursor-pointer overflow-hidden whitespace-nowrap px-6 py-4 text-white [background:var(--bg)] [border-radius:var(--radius)] ",
        "transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_8px_#803a00]",
        className,
      )}
      {...props}
      onClick={() => {
        setLoginModalVisible(true);
        setIsTourActive(true);
      }}
    >
      {/* spark container */}
      <div className="absolute inset-0 overflow-visible [container-type:size]">
        {/* spark */}
        <div className="absolute inset-0 h-[100cqh] animate-slide [aspect-ratio:1] [border-radius:0] [mask:none] ">
          {/* spark before */}
          <div className="absolute inset-[-100%] w-auto rotate-0 animate-spinLinear [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color),_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      {/* backdrop */}
      <div className="absolute [background:var(--bg)] [border-radius:var(--radius)] [inset:var(--cut)]" />
      {/* content */}
      {children}
    </button>
  );
};

export default ShimmerButton;
