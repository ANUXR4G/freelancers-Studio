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

const gallery_images = [g_1, g_2, g_3, g_4, g_5, g_6, g_7, g_8, g_9, g_10, g_11, g_12];

export default function GalleryOne() {
  return (
    <>
      <style jsx>{`
        .gallery-section {
          display: flex;
          position: relative;
          align-items: center;
          justify-content: center;
          min-height: 50vh;
          overflow: hidden;
        }
        .banner-img {
          display: block;
          width: 220px;
          height: 120px;
          margin: 0 36px;
          object-fit: contain;
          border-radius: 10px;
          background: #fff;
          box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          transition: transform 0.2s;
        }
        .banner-img:hover {
          transform: scale(1.05);
        }
        @media (max-width: 768px) {
          .banner-img {
            width: 140px;
            height: 80px;
            margin: 0 16px;
          }
        }
      `}</style>

      <div className="gallery-section">
        <Marquee gradient={false} pauseOnHover={true} speed={60}>
          {gallery_images.map((img, idx) => (
            <Image
              alt={`Gallery image ${idx + 1}`}
              key={idx}
              src={img}
              width={160}
              height={120}
              className="banner-img px-4"
              priority={idx < 3}
            />
          ))}
        </Marquee>
      </div>
    </>
  );
}
