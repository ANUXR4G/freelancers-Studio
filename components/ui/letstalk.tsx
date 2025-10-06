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
                    <span className="animate-heading-1 animate-color">Let's talk</span>
                    <br />
                    <span className="animate-heading-2 animate-color">about it</span>
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
                    <span className="relative z-20 flex items-center gap-3 rounded-full bg-gradient-to-r from-[#ed356d] via-pink-500 to-purple-600 px-8 py-4 text-sm font-semibold text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(237,53,109,0.5)] md:text-base">
                      Get In Touch
                      <svg
                        className="inline-block transition-transform group-hover:translate-x-1"
                        fill="none"
                        height="17"
                        viewBox="0 0 16 17"
                        width="16"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M15.7767 8.06743C15.9198 8.21703 16 8.41908 16 8.62965C16 8.84022 15.9198 9.04228 15.7767 9.19189L8.92138 16.2938C8.77516 16.4386 8.58094 16.5198 8.37867 16.5206C8.27759 16.5201 8.17746 16.5002 8.08351 16.4614C7.94489 16.4012 7.8266 16.2996 7.74358 16.1697C7.66056 16.0398 7.61651 15.8873 7.61698 15.7316V9.41876H0.761697C0.559684 9.41876 0.365942 9.33563 0.223096 9.18764C0.0802502 9.03964 0 8.83894 0 8.62965C0 8.42038 0.0802502 8.21966 0.223096 8.07168C0.365942 7.92369 0.559684 7.84056 0.761697 7.84056H7.61698V1.52777C7.61651 1.37198 7.66056 1.21953 7.74358 1.08964C7.8266 0.959746 7.94489 0.858218 8.08351 0.797851C8.2242 0.741 8.37756 0.726577 8.52585 0.756252C8.67412 0.785926 8.81125 0.858486 8.92138 0.965535L15.7767 8.06743Z"
                          fill="currentColor"
                        />
                      </svg>
                    </span>
                    <svg
                      className="animate-spin-slow absolute top-1/2 left-1/2 -z-10 h-[160px] w-[160px] -translate-x-1/2 -translate-y-1/2 opacity-20"
                      fill="none"
                      height="161"
                      viewBox="0 0 160 161"
                      width="160"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M73.023 3.97715C76.6245 -0.442502 83.3755 -0.442502 86.977 3.97715L88.8998 6.33684C91.6265 9.68311 96.3451 10.6222 100.145 8.57493L102.813 7.13788C107.829 4.43534 114.063 7.01587 115.701 12.4734L116.588 15.4276C117.828 19.5569 121.822 22.227 126.111 21.7943L129.147 21.4881C134.809 20.9169 139.573 25.6784 139.005 31.3408L138.693 34.4529C138.263 38.7355 140.926 42.7227 145.046 43.9669L148.008 44.8612C153.449 46.5041 156.024 52.7165 153.34 57.7265L151.854 60.5019C149.824 64.2914 150.757 68.9873 154.082 71.7123L156.507 73.6991C160.9 77.2998 160.9 84.0202 156.507 87.6209L154.082 89.6077C150.757 92.3327 149.824 97.0286 151.854 100.818L153.34 103.593C156.024 108.604 153.449 114.816 148.008 116.459L145.046 117.353C140.926 118.597 138.263 122.585 138.693 126.867L139.005 129.979C139.573 135.642 134.809 140.403 129.147 139.832L126.111 139.526C121.822 139.093 117.828 141.763 116.588 145.892L115.701 148.847C114.063 154.304 107.829 156.885 102.813 154.182L100.145 152.745C96.3451 150.698 91.6265 151.637 88.8998 154.983L86.9769 157.343C83.3755 161.762 76.6245 161.762 73.023 157.343L71.1002 154.983C68.3735 151.637 63.6549 150.698 59.8547 152.745L57.1873 154.182C52.1708 156.885 45.9372 154.304 44.2988 148.847L43.4119 145.892C42.1722 141.763 38.1783 139.093 33.8887 139.526L30.8534 139.832C25.1913 140.403 20.4271 135.642 20.995 129.979L21.3071 126.867C21.7367 122.585 19.0739 118.597 14.9536 117.353L11.9917 116.459C6.55087 114.816 3.97613 108.604 6.65971 103.593L8.14628 100.818C10.1761 97.0286 9.24252 92.3327 5.91763 89.6077L3.49338 87.6209C-0.900073 84.0202 -0.900072 77.2998 3.49338 73.6991L5.91763 71.7123C9.24252 68.9873 10.1761 64.2914 8.14628 60.5019L6.65971 57.7265C3.97613 52.7165 6.55087 46.5041 11.9917 44.8612L14.9536 43.9669C19.0739 42.7227 21.7367 38.7355 21.3071 34.4529L20.995 31.3408C20.4271 25.6784 25.1913 20.9169 30.8534 21.4881L33.8887 21.7943C38.1783 22.227 42.1722 19.5569 43.4119 15.4275L44.2988 12.4734C45.9372 7.01587 52.1708 4.43534 57.1873 7.13788L59.8547 8.57493C63.6549 10.6222 68.3735 9.68311 71.1002 6.33684L73.023 3.97715Z"
                        fill="url(#paint0_linear)"
                      />
                      <defs>
                        <linearGradient
                          gradientUnits="userSpaceOnUse"
                          id="paint0_linear"
                          x1="0"
                          x2="160"
                          y1="0"
                          y2="161"
                        >
                          <stop stopColor="#ed356d" />
                          <stop offset="0.5" stopColor="#ec4899" />
                          <stop offset="1" stopColor="#a855f7" />
                        </linearGradient>
                      </defs>
                    </svg>
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
