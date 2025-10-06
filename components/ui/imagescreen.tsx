'use client';

import React from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';

// Images
import g_1 from '../../public/logos/1.png';
import g_2 from '../../public/logos/2.png';
import g_3 from '../../public/logos/3.png';
import g_4 from '../../public/logos/4.png';
import g_5 from '../../public/logos/5.png';
import g_6 from '../../public/logos/6.png';
import g_7 from '../../public/logos/7.png';
import g_8 from '../../public/logos/8.png';
import g_9 from '../../public/logos/9.png';
import g_10 from '../../public/logos/10.png';
import g_11 from '../../public/logos/11.png';
import g_12 from '../../public/logos/12.png';

const gallery_images = [g_1, g_2, g_3, g_4, g_5, g_6, g_7, g_8, g_9, g_10, g_11, g_12]; // <-- Add image here

export default function GalleryOne() {
  return (
    <>
      <style jsx>{`
        .gallery-section {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          overflow: hidden;
        }

        .carousel-3d {
          width: 100%;
          perspective: 1200px;
          perspective-origin: 50% 50%;
        }

        .carousel-wrapper {
          transform-style: preserve-3d;
        }

        .carousel-track {
          display: flex;
          align-items: center;
          transform-style: preserve-3d;
        }

        .carousel-card {
          display: inline-block;
          margin: 0 30px;
          transform-style: preserve-3d;
          transition: transform 0.3s ease-out;
        }

        .carousel-card img {
          display: block;
          width: 380px;
          height: 580px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }

        .carousel-card:hover img {
          transform: scale(1.03);
        }

        @media (max-width: 768px) {
          .carousel-card img {
            width: 300px;
            height: 450px;
          }
        }
      `}</style>

      <div className="gallery-section">
        <div className="carousel-3d">
          <div className="carousel-wrapper">
            <Marquee className="carousel-track" gradient={false} pauseOnHover={true} speed={50}>
              {gallery_images.map((img, idx) => {
                // Calculate the curve rotation for each card
                const rotationAngle = (idx * 12) % 360;
                const yRotation = Math.sin((rotationAngle * Math.PI) / 180) * 18;
                const zTranslation = Math.cos((rotationAngle * Math.PI) / 180) * 100;

                return (
                  <div
                    key={idx}
                    className="carousel-card"
                    style={{
                      transform: `rotateY(${yRotation}deg) translateZ(${zTranslation}px)`,
                    }}
                  >
                    <Image
                      alt={`Gallery image ${idx + 1}`}
                      height={580}
                      placeholder="blur"
                      priority={idx < 3}
                      src={img}
                      width={380}
                    />
                  </div>
                );
              })}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}
