import Button from '@/components/ui/Button';
import { IconCross } from '@/components/ui/Icons';
import { TIMELINE } from '@/constants/timeline.constant';
import { PERFORMANCE_LEVEL } from '@/hooks/usePerformance';
import { useLanguage } from '@/providers/language.provider';
import { usePerformance } from '@/providers/performance.provider';
import { BREAKPOINTS, COLORS } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import { useRef } from 'react';

gsap.registerPlugin(SplitText, ScrollTrigger);

const Hero = () => {
  const { isFrench, getInternalPath } = useLanguage();

  const sectionRef = useRef(null);
  const desktopSpan1Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan2Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan3Ref = useRef<HTMLSpanElement>(null);
  const desktopSpan4Ref = useRef<HTMLSpanElement>(null);
  const mobileTitleRef = useRef<HTMLSpanElement>(null);

  const { isAtLeast } = usePerformance();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    gsap.matchMedia().add(`(min-width: ${BREAKPOINTS.MD}px)`, () => {
      const timeline = gsap.timeline({ delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION });

      const desktopSpans = [
        desktopSpan1Ref.current,
        desktopSpan2Ref.current,
        desktopSpan3Ref.current,
        desktopSpan4Ref.current,
      ];

      const splitTexts = desktopSpans
        .map((span) => {
          if (span) {
            return new SplitText(span, {
              type: 'words',
              mask: 'words',
            });
          }
          return null;
        })
        .filter(Boolean);

      splitTexts.forEach((split) => {
        if (split) {
          gsap.set(split.words, { yPercent: 100 });
        }
      });

      splitTexts.forEach((split, index) => {
        if (split) {
          timeline.to(
            split.words,
            {
              yPercent: 0,
              duration: 1.8,
              stagger: 0.03,
              ease: 'power4.out',
            },
            index * 0.1,
          );
        }
      });
    });

    gsap.matchMedia().add(`(max-width: ${BREAKPOINTS.MD}px)`, () => {
      const timeline = gsap.timeline({ delay: TIMELINE.DELAY_AFTER_PAGE_TRANSITION });

      const split = new SplitText(mobileTitleRef.current, {
        type: 'words',
      });

      gsap.set(split.words, {
        opacity: 0,
        yPercent: 100,
        ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
          filter: 'blur(10px)',
        }),
      });

      timeline.to(split.words, {
        opacity: 1,
        yPercent: 0,
        ...(isAtLeast(PERFORMANCE_LEVEL.MEDIUM) && {
          filter: 'blur(0px)',
        }),
        duration: 1.2,
        stagger: 0.02,
        ease: 'power4.out',
      });
    });
  });

  const scrollAnimation = contextSafe(() => {
    const desktopSpans = [
      desktopSpan1Ref.current?.children,
      desktopSpan2Ref.current?.children,
      desktopSpan3Ref.current?.children,
      desktopSpan4Ref.current?.children,
    ];

    gsap
      .timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
          id: 'hero-scroll',
        },
      })
      .to(desktopSpans, {
        xPercent: (index) => (index % 2 === 0 ? 20 : -20),
        display: 'inline-block',
        duration: 1.2,
        ease: 'power4.out',
      });
  });

  useGSAP(() => {
    scrollAnimation();
    revealAnimation();
  }, [isFrench]);

  return (
    <section
      ref={sectionRef}
      className="px-x-default pb-y-default flex w-screen flex-col justify-evenly pt-[calc(var(--y-default)*3)] md:min-h-[70vh] overflow-x-hidden"
    >
      <h1 className="h0 uppercase max-w-full">
        {isFrench ? (
          <span ref={mobileTitleRef} className="block md:hidden">
            <span className="text-[#ed356d]">Freelancer Studio </span>
            <span>est une entreprise </span>
            <span className="text-[#ed356d]">créative de marketing numérique </span>
            <span>qui conçoit des expériences </span>
            <span className="text-[#ed356d]">interactives, performantes </span>
            <span>et à </span>
            <span className="text-[#ed356d]">fort impact. </span>
            <span>En nous concentrant méticuleusement sur </span>
            <span className="text-[#ed356d]">l'esthétique </span>
            <span>et </span>
            <span className="text-[#ed356d]">l'accessibilité, </span>
            <span>nous créons des interfaces et des campagnes </span>
            <span className="text-[#ed356d]">fluides et innovantes </span>
            <span>conçues pour </span>
            <span className="text-[#ed356d]">élever votre marque.</span>
          </span>
        ) : (
          <span ref={mobileTitleRef} className="block md:hidden">
            <span className="text-[#ed356d]">Freelancer Studio </span>
            <span>is a </span>
            <span className="text-[#ed356d]">creative digital marketing </span>
            <span>company that designs </span>
            <span className="text-[#ed356d]">interactive, high-performance, </span>
            <span>and </span>
            <span className="text-[#ed356d]">high-impact </span>
            <span>experiences. By meticulously focusing on </span>
            <span className="text-[#ed356d]">aesthetics </span>
            <span>and </span>
            <span className="text-[#ed356d]">accessibility, </span>
            <span>we craft </span>
            <span className="text-[#ed356d]">fluid and innovative </span>
            <span>interfaces and campaigns designed to </span>
            <span className="text-[#ed356d]">elevate your brand.</span>
          </span>
        )}
        {isFrench ? (
          <span className="hidden md:block max-w-full overflow-visible">
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross className="absolute -top-10 -right-10 hidden md:block" color="#ed356d" />
              <span ref={desktopSpan1Ref} className="relative block text-left break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">Freelancer Studio </span>
                  <span>est une entreprise </span>
                  <span className="text-[#ed356d]">créative</span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color="#ed356d"
              />
              <span ref={desktopSpan2Ref} className="relative block text-right break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">de marketing numérique </span>
                  <span>qui conçoit des expériences </span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <span ref={desktopSpan3Ref} className="relative block text-left break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">interactives, performantes </span>
                  <span>et à </span>
                  <span className="text-[#ed356d]">fort impact.</span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color="#ed356d"
              />
              <span ref={desktopSpan4Ref} className="relative block text-center break-words">
                <span className="inline-block">
                  <span>Nous créons des interfaces </span>
                  <span className="text-[#ed356d]">innovantes </span>
                  <span>pour </span>
                  <span className="text-[#ed356d]">élever votre marque.</span>
                </span>
              </span>
            </div>
          </span>
        ) : (
          <span className="hidden md:block max-w-full overflow-visible">
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross className="absolute -top-10 -right-10 hidden md:block" color="#ed356d" />
              <span ref={desktopSpan1Ref} className="relative block text-left break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">Freelancer Studio </span>
                  <span>is a </span>
                  <span className="text-[#ed356d]">creative</span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross
                className="absolute top-1/2 -left-10 hidden -translate-y-1/2 md:block"
                color="#ed356d"
              />
              <span ref={desktopSpan2Ref} className="relative block text-right break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">digital marketing </span>
                  <span>company that designs </span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <span ref={desktopSpan3Ref} className="relative block text-left break-words">
                <span className="inline-block">
                  <span className="text-[#ed356d]">interactive, high-performance, </span>
                  <span>and </span>
                  <span className="text-[#ed356d]">high-impact </span>
                  <span>experiences.</span>
                </span>
              </span>
            </div>
            <div className="relative overflow-visible w-full px-4 md:px-8 lg:px-12">
              <IconCross
                className="absolute -right-10 -bottom-10 hidden md:block"
                color="#ed356d"
              />
              <span ref={desktopSpan4Ref} className="relative block text-center break-words">
                <span className="inline-block">
                  <span>We craft </span>
                  <span className="text-[#ed356d]">fluid and innovative </span>
                  <span>interfaces to </span>
                  <span className="text-[#ed356d]">elevate your brand.</span>
                </span>
              </span>
            </div>
          </span>
        )}
      </h1>
      <div className="flex justify-center gap-4 pt-20">
        <Button
          className="bg-gradient-to-r from-[#ed356d] to-[#c92a5a] text-7xl text-white hover:bg-gradient-to-br"
          href={getInternalPath('/en/contact')}
          scroll={false}
        >
          {isFrench ? <span>CONTACT</span> : <span>CONTACT</span>}
        </Button>
        <Button
          className="bg-gradient-to-r from-[#ed356d] to-[#c92a5a] text-white hover:bg-gradient-to-br"
          href={getInternalPath('/en/our-portfolio')}
          scroll={false}
        >
          {isFrench ? <span>OFFRES</span> : <span>portfolio</span>}
        </Button>
      </div>
    </section>
  );
};

export default Hero;
