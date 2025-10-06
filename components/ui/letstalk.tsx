'use client';
import React from 'react';
import Image from 'next/image';
import cta from '../../public/cta-1.png';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function LetsTalk() {
  return (
    <>
      <style global jsx>{`
        @keyframes bounceInColor {
          0% {
            transform: translateY(-50px);
            opacity: 0;
          }
          40% {
            transform: translateY(0);
            opacity: 1;
          }
          60% {
            transform: translateY(-10px);
          }
          80% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-heading-1 {
          display: inline-block;
          color: #ffffff;
          animation: bounceInColor 1.2s ease-out forwards;
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animate-heading-1.animate-color {
          animation:
            bounceInColor 1.2s ease-out forwards,
            colorTransition1 0.8s ease-in-out 1.3s forwards;
        }

        .animate-heading-2 {
          display: inline-block;
          color: #ffffff;
          animation: bounceInColor 1.2s ease-out forwards;
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animate-heading-2.animate-color {
          animation:
            bounceInColor 1.2s ease-out forwards,
            colorTransition2 0.8s ease-in-out 1.6s forwards;
        }

        @keyframes colorTransition1 {
          0% {
            color: #ffffff;
          }
          100% {
            background: linear-gradient(to right, #ed356d, #ec4899, #9333ea);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }
        }

        @keyframes colorTransition2 {
          0% {
            color: #ffffff;
          }
          100% {
            background: linear-gradient(to right, #ec4899, #9333ea, #ec4899);
            -webkit-background-clip: text;
            background-clip: text;
            -webkit-text-fill-color: transparent;
            color: transparent;
          }
        }
      `}</style>

      <div className="px-5 pb-5 md:px-8">
        <div className="relative z-10 overflow-hidden rounded-3xl bg-black px-4 pt-[150px] pb-[80px] md:px-8 md:pt-[200px] md:pb-[120px]">
          {/* Lamp Effect - Wide Downward Glow - Opens on view */}
          <div className="absolute top-0 left-0 right-0 h-[400px] pointer-events-none overflow-visible">
            {/* Top light source line */}
            <motion.div
              initial={{ width: '0%', opacity: 0 }}
              whileInView={{ width: '70%', opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 1, ease: 'easeOut' }}
              className="absolute top-8 left-1/2 -translate-x-1/2 h-[3px] bg-gradient-to-r from-transparent via-[#ed356d] to-transparent shadow-[0_0_30px_rgba(237,53,109,1)]"
            />

            {/* Wide radial glow spreading downward */}
            <motion.div
              initial={{ opacity: 0, scale: 0.3 }}
              whileInView={{ opacity: 0.8, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
              className="absolute top-8 left-1/2 -translate-x-1/2 w-[800px] h-[400px]"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(237,53,109,0.6) 0%, rgba(237,53,109,0.3) 40%, transparent 70%)',
              }}
            />

            {/* Secondary wider glow layer */}
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 0.5, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 1.5, ease: 'easeOut' }}
              className="absolute top-8 left-1/2 -translate-x-1/2 w-[1000px] h-[500px]"
              style={{
                background:
                  'radial-gradient(ellipse at top, rgba(237,53,109,0.4) 0%, rgba(237,53,109,0.15) 30%, transparent 60%)',
              }}
            />

            {/* Bright center light source */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
              className="absolute top-6 left-1/2 -translate-x-1/2 w-[300px] h-[80px] bg-[#ed356d] rounded-full blur-3xl"
            />

            {/* Additional top glow */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 0.9 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25, duration: 0.8, ease: 'easeOut' }}
              className="absolute top-4 left-1/2 -translate-x-1/2 w-[200px] h-[60px] bg-[#ed356d] rounded-full blur-2xl"
            />
          </div>

          <div className="relative z-10 container mx-auto px-4">
            <div className="w-full">
              <div className="relative flex flex-col items-center justify-center text-center">
                {/* CTA Image - Top Right */}
                <div className="absolute -top-20 right-0 h-32 w-32 opacity-30 md:-top-32 md:h-48 md:w-48 md:opacity-40 lg:h-56 lg:w-56">
                  <Image
                    alt="cta decoration"
                    className="h-full w-full object-contain"
                    src={cta}
                  />
                </div>

                <div className="mb-12">
                  <h4 className="text-6xl leading-tight font-bold md:text-7xl lg:text-9xl">
                    <span className="animate-heading-1 animate-color">Let's Talk</span>
                    <br />
                    <span className="animate-heading-2 animate-color">About It</span>
                  </h4>
                </div>

                <div className="mb-8">
                  <p className="max-w-2xl text-base text-white md:text-lg">
                    We will collaborate to find the right answer and bring progress to your business
                    and to the world.
                  </p>
                </div>

                <div className="inline-block">
                  <Link className="group relative inline-block" href="/contact">
                    <span className="relative z-20 flex items-center gap-3 rounded-full bg-[#ed356d] px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(237,53,109,0.5)] md:text-base">
                      Get In Touch
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
