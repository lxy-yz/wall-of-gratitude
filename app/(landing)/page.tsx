"use client";

import { SiteFooter } from "@/components/site-footer";
import { Icon } from "@iconify/react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function LandingPage() {
  return (
    <AnimatePresence>
      <div className="font-inter relative flex min-h-[100vh] w-screen flex-col overflow-hidden bg-[#F2F3F5] sm:min-h-screen">
        <main className="static z-[100] flex h-[90%] w-screen grid-rows-[1fr_repeat(3,auto)_1fr] flex-col justify-center overflow-hidden px-4 pb-[320px] pt-[30px] md:fixed md:px-20 md:py-0">
          <motion.img
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="row-start-2 mb-8 block w-[64px] md:mb-6"
            src="/icons/logo.png"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="font-inter relative z-[100] text-[16vw] font-extrabold leading-[0.9] tracking-[-2px] text-[#1E2B3A] md:mb-[37px] md:ml-[-10px] md:text-[100px]"
          >
            Wall Of <br />
            <span className="bg-gradient-to-l from-gray-800 via-orange-800 to-amber-100 bg-clip-text text-transparent caret-pink-600">Gratitude</span>
            <span className="text-gray-800">.</span>
          </motion.h1>
          <motion.p
            className="my-4 md:-mt-4 md:mb-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
          >
            A place where you can share gratitude
            <strong className="ml-1 font-bold text-black">In Public.</strong>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.15,
              duration: 0.95,
              ease: [0.165, 0.84, 0.44, 1],
            }}
            className="z-20 mx-0 mb-0 mt-8 flex max-w-2xl flex-row justify-start gap-4 md:mb-[35px] md:mt-0 md:justify-center md:space-x-8"
          >
            <div className="w-1/2">
              <h2 className="flex items-center text-[1em] font-semibold text-[#1a2b3b]">
                Send & Receive
              </h2>
              <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                Send your genuine appreciation to others, and let them hear it via email or social media.
              </p>
            </div>
            <div className="w-1/2">
              <h2 className="flex items-center text-[1em] font-semibold text-[#1a2b3b]">
                Explore & Customize
              </h2>
              <p className="text-[14px] font-normal leading-[20px] text-[#1a2b3b]">
                Explore the wall of gratitude of others, and customize your own wall to personal preference.
              </p>
            </div>
          </motion.div>

          <div className="mt-8 flex gap-[15px] md:mt-0">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.55,
                duration: 0.55,
                ease: [0.075, 0.82, 0.965, 1],
              }}
            >
              <Link
                href="/discover"
                className="hover:[linear-gradient(0deg, rgba(255, 255, 0.1), rgba(255, 255, 0.1)), #0D2247] group flex min-w-[180px] scale-100 items-center justify-center gap-x-2 rounded-full bg-[#1E2B3A] py-2 pl-[8px] pr-4 text-[13px] font-semibold text-white no-underline  transition-all duration-75 active:scale-95"
                style={{
                  boxShadow:
                    "0px 1px 4px rgba(13, 34, 71, 0.17), inset 0px 0px 0px 1px #061530, inset 0px 0px 0px 2px rgba(255, 255, 255, 0.1)",
                }}
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500">
                  <Icon icon="pajamas:search" />
                </span>
                Discover
              </Link>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.65,
                duration: 0.55,
                ease: [0.075, 0.82, 0.965, 1],
              }}
            >
              <Link
                href="/send-gratitude"
                className="group flex scale-100 items-center justify-center rounded-full bg-[#f5f7f9] px-4 py-2 text-[13px] font-semibold text-[#1E2B3A] no-underline transition-all duration-75 active:scale-95"
                style={{
                  boxShadow: "0 1px 1px #0c192714, 0 1px 3px #0c192724",
                }}
              >
                <span className="mr-2">Send</span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.75 6.75L19.25 12L13.75 17.25"
                    stroke="#1E2B3A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M19 12H4.75"
                    stroke="#1E2B3A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </div>
          <SiteFooter className="mt-10" />
        </main>

        <div
          className="fixed right-0 top-0 h-screen w-[80%] bg-[#1F2B3A]/20 md:w-1/2"
          style={{
            clipPath:
              "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
          }}
        ></div>

        <motion.canvas
          initial={{
            filter: "blur(20px)",
          }}
          animate={{
            filter: "blur(0px)",
          }}
          transition={{
            duration: 1,
            ease: [0.075, 0.82, 0.965, 1],
          }}
          style={{
            clipPath:
              "polygon(100px 0,100% 0,calc(100% + 225px) 100%, 480px 100%)",
          }}
          id="gradient-canvas"
          data-transition-in
          className="fixed right-[-2px] top-0 z-50 h-screen w-[80%] bg-amber-400/75 md:w-1/2"
        ></motion.canvas>
      </div>
    </AnimatePresence>
  );
}