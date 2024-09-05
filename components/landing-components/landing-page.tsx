import Link from "next/link";
import { Comments } from "./comments";
import { Meteorss } from "./meteors-card";
import ShimmerButton from "./shimmer-button";
import { TypewriterEffectSmooths } from "./typewriterEffectSmooth";
import { WobbleCardShow } from "./wobble";
import Image from "next/image";
import { TypewriterEffectSection2 } from "./typewriterEffectSection2";

export default function LandingPage() {
  return (
    <>
      <section className="h-content w-full px-8">
        <div className="flex flex-col items-center pb-10 w-full ">
          <div className="flex flex-col items-start h-full justify-center">
            <div className="flex flex-col pt-4 z-10 w-full ">
              <div className="mt-6 flex items-center w-full justify-center z-10">
                <Image
                  src="/logo/small-logo.png"
                  width={100}
                  height={100}
                  alt={"logo"}
                  className="h-14 w-14 mb-3 sm:h-20 sm:w-20 mr-4"
                />
                <h1 className="text-left text-2xl font-bold  text-myText sm:text-3xl md:text-4xl xl:text-7xl">
                  Asystent Fachowca
                </h1>
              </div>

              <div className="w-4/5 mt-5 min-h-32  mx-auto text-center">
                <span className="text-myText-muted text-sm sm:text-xl">
                  Twoje centrum dowodzenia dla każdego projektu budowlanego - od
                  planowania po ostatni gwóźdź.
                </span>
                <TypewriterEffectSmooths />
              </div>
              <div className="mt-6 flex sm:flex-row flex-col space-y-4 justify-center sm:space-y-0 sm:space-x-8  mb-4 w-full">
                <ShimmerButton className="flex justify-center mx-auto">
                  <span className="z-10 w-48 whitespace-pre text-center text-sm font-semibold leading-none tracking-tight text-myText ">
                    Wypróbuj demo aplikacji!
                  </span>
                </ShimmerButton>
              </div>
            </div>
          </div>

          <div className="h-full w-full">
            <div className="flex justify-center items-center">
              <Meteorss />
            </div>
          </div>
        </div>
      </section>

      <section className="relative h-fit xl:h-screen w-full px-8">
        <div className="flex flex-col h-full w-full justify-center ">
          <div className="flex w-full flex-col justify-center items-center mb-5">
            <TypewriterEffectSection2 />
            <WobbleCardShow />
          </div>
        </div>
      </section>
      <section className="w-full px-8 pt-10 sm:px-0 xl:px-0 md:px-0 sm:pt-0 xl:pt-0 md:pt-0 ">
        <div className="flex h-screen w-full flex-col items-center pb-[100px] pt-10">
          <div>
            <h1 className="mb-6 text-center relative text-3xl font-bold text-myText z-10 md:text-5xl ">
              Kategorie prac
            </h1>
          </div>
          <div className="mb-6 text-xl text-myText-muted z-10 -zinc-100 md:text-xl text-center">
            Niezależnie od typu prac, mamy dla Ciebie odpowiednią kategorię.
            Znajdziesz tu wszystko, czego potrzebujesz do{" "}
            <span className="font-bold text-first-muted">efektywnego</span>{" "}
            zarządzania swoim projektem budowlanym.
          </div>
          <div className="w-screen flex-1 overflow-x-hidden ">
            <Comments />
          </div>
        </div>
      </section>
    </>
  );
}
