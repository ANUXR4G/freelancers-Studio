import Button from '@/components/ui/Button';
import { IconCheck } from '@/components/ui/Icons';
import { useLanguage } from '@/providers/language.provider';
import { Offer, OFFER_TYPE } from '@/types';
import clsx from 'clsx';
import Link from 'next/link';

const CardOffer = ({
  offer,
  id,
  className,
  hoveredIndex,
  setHoveredIndex,
}: {
  offer: Offer;
  id: string;
  className?: string;
  hoveredIndex: number | null;
  setHoveredIndex: (index: number | null) => void;
}) => {
  const { type, title, options, delivery, href } = offer;
  const { isFrench } = useLanguage();
  const { getInternalPath } = useLanguage();
  return (
    <div
      id={id}
      className={clsx(
        'flex h-fit w-full max-w-[340px] min-w-[300px] shrink-0 flex-col items-center rounded-2xl border-[1px] text-center backdrop-blur-lg md:min-w-[280px]',
        type === OFFER_TYPE.SIMPLE
          ? 'bg-menu/50 border-[#ed356d]/70'
          : 'border-[#ed356d]/30 bg-white',
        className,
      )}
      style={{
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        padding: '24px 20px',
        gap: '20px',
      }}
    >
      <h2 className="p1 text-[#ed356d] uppercase" style={{ fontSize: '18px' }}>
        {title[isFrench ? 'fr' : 'en']}
      </h2>
      
      {/* Pricing Section */}
      <div style={{ marginBottom: '4px' }}>
        <p className="font-bold text-[#ed356d]" style={{ fontSize: '24px' }}>
          {isFrench ? "Discutons-en" : "Let's talk"}
        </p>
      </div>

      <div>
        <ul className="flex flex-col text-[#ed356d]" style={{ gap: '8px' }}>
          {options.map((option, index) => (
            <li
              key={index}
              className={clsx(
                'p3 flex items-center text-left transition-colors',
                hoveredIndex === index ? 'text-[#ed356d]' : 'text-black-30',
                hoveredIndex === null && 'text-black-70',
              )}
              style={{ gap: '12px', padding: '6px 0', fontSize: '14px' }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <IconCheck className="shrink-0" style={{ fill: '#ed356d', color: '#ed356d', width: '16px', height: '16px' }} />
              <span>{option.title[isFrench ? 'fr' : 'en']}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div style={{ marginTop: '4px' }}>
        <h3 className="p3 uppercase" style={{ marginBottom: '6px', fontSize: '14px' }}>
          {delivery.title[isFrench ? 'fr' : 'en']}
        </h3>
        <p className="p3 text-[#ed356d]" style={{ fontSize: '14px' }}>
          {delivery.description[isFrench ? 'fr' : 'en']}
        </p>
      </div>
      
      <Button
        color={type === OFFER_TYPE.SIMPLE ? 'secondary' : 'primary'}
        href={getInternalPath(href)}
        scroll={false}
      >
        {isFrench ? <span>Contactez-nous</span> : <span>Contact us</span>}
      </Button>
      
      {type === OFFER_TYPE.CUSTOM && (
        <p className="text-black-70 p3" style={{ marginTop: '4px', fontSize: '13px' }}>
          {isFrench ? 'ou configurez votre site avec notre ' : 'or configure your site with our '}
          <Link
            className="underline"
            href={getInternalPath('/offer/project-studio')}
            scroll={false}
          >
            project studio
          </Link>
        </p>
      )}
    </div>
  );
};

export default CardOffer;
