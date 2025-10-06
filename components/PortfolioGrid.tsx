// app/page.tsx or pages/index.tsx
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function PortfolioGrid() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const portfolioItems = [
    {
      id: 1,
      title: 'The Stage',
      category: 'Creative',
      image: '/images/portfolio-1.jpg',
    },
    {
      id: 2,
      title: 'Big dream',
      category: 'Concept',
      image: '/images/portfolio-2.jpg',
    },
    {
      id: 3,
      title: 'Sed Lectus',
      category: 'Branding',
      image: '/images/portfolio-3.jpg',
    },
    {
      id: 4,
      title: 'Art Direction',
      category: 'Branding',
      image: '/images/portfolio-4.jpg',
    },
    {
      id: 5,
      title: 'Petit Navire',
      category: 'Branding',
      image: '/images/portfolio-5.jpg',
    },
    {
      id: 6,
      title: 'Big dream',
      category: 'Branding',
      image: '/images/portfolio-6.jpg',
    },
    {
      id: 7,
      title: 'The Stage',
      category: 'Creative',
      image: '/images/portfolio-7.jpg',
    },
    {
      id: 8,
      title: 'Big dream',
      category: 'Concept',
      image: '/images/portfolio-8.jpg',
    },
    {
      id: 9,
      title: 'Sed Lectus',
      category: 'More',
      image: '/images/portfolio-9.jpg',
    },
  ];

  // Text reveal component
  const TextReveal = ({
    text,
    className = '',
    type = 'chars', // "chars" or "words"
  }: {
    text: string;
    className?: string;
    type?: 'chars' | 'words';
  }) => {
    const items = type === 'chars' ? text.split('') : text.split(' ');

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: type === 'chars' ? 0.02 : 0.06,
          delayChildren: 0.1,
        },
      },
    };

    const itemVariants = {
      hidden: {
        opacity: 0,
        y: 15,
        filter: 'blur(3px)',
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
        },
      },
    };

    return (
      <motion.span
        className={className}
        initial="hidden"
        variants={containerVariants}
        viewport={{ once: true, margin: '-50px' }}
        whileInView="visible"
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            className="inline-block"
            variants={itemVariants}
            style={{
              whiteSpace: type === 'words' ? 'pre' : 'normal',
            }}
          >
            {item}
            {type === 'words' && index !== items.length - 1 ? '\u00A0' : ''}
          </motion.span>
        ))}
      </motion.span>
    );
  };

  // Animation variants for container
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  // Animation variants for individual cards - smoother
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  // Card text reveal variant - SLOWER
  const cardTextVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.2,
        delay: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <div className="min-h-screen">
      <section className="px-6 pt-20 pb-20 lg:px-8">
        <div className="mx-auto max-w-[1600px]">
          <motion.div
            className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10"
            initial="hidden"
            variants={containerVariants}
            viewport={{ once: true, margin: '-100px' }}
            whileInView="visible"
          >
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                className="group relative aspect-[7/9] cursor-pointer overflow-hidden rounded-lg bg-gray-100"
                variants={cardVariants}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Placeholder for image */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
                  {/* Replace with actual images using Next.js Image component */}
                  <div className="flex h-full w-full items-center justify-center text-gray-400">
                    <span className="text-6xl font-bold opacity-20">{item.id}</span>
                  </div>
                </div>

                {/* Overlay */}
                <motion.div
                  animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                  className="absolute inset-0 bg-gradient-to-br from-[#ed356d]/90 to-purple-600/90"
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-white">
                    <motion.span
                      className="mb-4 text-base tracking-wider uppercase opacity-80"
                      initial={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      animate={{
                        y: hoveredIndex === index ? 0 : 20,
                        opacity: hoveredIndex === index ? 0.8 : 0,
                      }}
                    >
                      {item.category}
                    </motion.span>
                    <motion.h3
                      className="text-center text-4xl font-bold"
                      initial={{ y: 20, opacity: 0 }}
                      transition={{ delay: 0.15, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                      animate={{
                        y: hoveredIndex === index ? 0 : 20,
                        opacity: hoveredIndex === index ? 1 : 0,
                      }}
                    >
                      {item.title}
                    </motion.h3>
                  </div>
                </motion.div>

                {/* Bottom label - visible by default with reveal animation */}
                <motion.div
                  animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                  className="absolute right-0 bottom-0 left-0 overflow-hidden p-8"
                  transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                >
                  <motion.div
                    initial="hidden"
                    variants={cardTextVariants}
                    viewport={{ once: true }}
                    whileInView="visible"
                  >
                    <p className="mb-3 text-sm tracking-wider text-gray-600 uppercase">
                      {item.category}
                    </p>
                    <h3 className="text-2xl font-semibold text-gray-900">{item.title}</h3>
                  </motion.div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
