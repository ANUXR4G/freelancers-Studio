import { CONTACT, LINKS, SOCIALS } from '@/constants';
import { useShortcut } from '@/hooks/useShortcut';
import { useLanguage } from '@/providers/language.provider';
import { COLORS, ProjectType, TAG_TYPE } from '@/types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import Language from '../shared/Language';
import NewsletterForm, { AnimatedNewsletterFormRef } from '../shared/NewsletterForm';
import Sound from '../shared/Sound';
import Time from '../shared/Time';
import AnimatedLink from '../ui/AnimatedLink';
import Button from '../ui/Button';
import Hint from '../ui/Hint';
import { LogoFull } from '../ui/Icons';
import Tag, { AnimatedTagRef } from '../ui/Tag';
import CutoutWrapper, { AnimatedCutoutWrapperRef } from './CutoutWrapper';
import logo from '@/public/logo-full.png';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const TEXT_BUTTON = {
  fr: {
    open: 'MENU',
    close: 'FERMER',
  },
  en: {
    open: 'MENU',
    close: 'CLOSE',
  },
};

const Menu = ({ projects }: { projects: ProjectType[] }) => {
  const SLICED_PROJECTS = projects.slice(0, 6);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const logoRef = useRef(null);
  const soundRef = useRef(null);
  const headerRef = useRef<HTMLElement>(null);
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef(null);
  const wrapperButtonRef = useRef(null);
  const contactMenuRef = useRef(null);
  const buttonMenuRef = useRef(null);
  const cutoutRef = useRef<AnimatedCutoutWrapperRef>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const titleProjectsRef = useRef(null);
  const projectTagsRefs = useRef<AnimatedTagRef[]>([]);
  const newsletterFormRef = useRef<AnimatedNewsletterFormRef>(null);
  const socialsRef = useRef<HTMLUListElement>(null);
  const infosRef = useRef<HTMLDivElement>(null);

  const timelineRef = useRef<gsap.core.Timeline>(gsap.timeline());

  const { isFrench, getInternalPath } = useLanguage();
  const { contextSafe } = useGSAP();

  const revealAnimation = contextSafe(() => {
    if (!logoRef.current || !soundRef.current || !contactMenuRef.current || !buttonMenuRef.current)
      return;

    gsap.set([logoRef.current, soundRef.current, contactMenuRef.current, buttonMenuRef.current], {
      y: -100,
      scale: 0.7,
    });

    gsap
      .timeline({
        delay: 1.4,
      })
      .to([logoRef.current, soundRef.current, contactMenuRef.current, buttonMenuRef.current], {
        duration: 1.2,
        ease: 'power4.out',
        stagger: 0.05,
        y: 0,
        scale: 1,
      });
  });

  const centerHeaderOnScroll = contextSafe(() => {
    if (!headerInnerRef.current || !logoRef.current || !wrapperButtonRef.current) return;

    ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: '+=1',
      onEnter: () => {
        // Calculate center position
        const headerWidth = headerInnerRef.current.offsetWidth;
        const logoWidth = logoRef.current.offsetWidth;
        const buttonsWidth = wrapperButtonRef.current.offsetWidth;
        
        // Calculate the total width of content
        const totalContentWidth = logoWidth + buttonsWidth;
        
        // Calculate the gap we want between logo and buttons (1rem = 16px)
        const gap = 16;
        
        // Calculate how much we need to move each element
        const centerPoint = headerWidth / 2;
        const contentStartPoint = centerPoint - (totalContentWidth + gap) / 2;
        
        // Get current positions
        const logoRect = logoRef.current.getBoundingClientRect();
        const buttonsRect = wrapperButtonRef.current.getBoundingClientRect();
        const headerRect = headerInnerRef.current.getBoundingClientRect();
        
        // Calculate movement needed (relative to header)
        const logoMove = contentStartPoint - (logoRect.left - headerRect.left);
        const buttonsMove = (contentStartPoint + logoWidth + gap) - (buttonsRect.left - headerRect.left);

        // Animate both elements
        gsap.to(logoRef.current, {
          x: logoMove,
          duration: 0.8,
          ease: 'power3.out',
        });

        gsap.to(wrapperButtonRef.current, {
          x: buttonsMove,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
      onLeaveBack: () => {
        // Reset to original positions
        gsap.to([logoRef.current, wrapperButtonRef.current], {
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
        });
      },
    });
  });

  const openMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !socialsRef.current ||
      !headerRef.current ||
      !infosRef.current
    )
      return;

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current.children, titleProjectsRef.current], {
        scaleY: 0,
        y: 40,
        xPercent: 0,
      })
      .set(socialsRef.current.children, {
        xPercent: 100,
      })
      .set(linksRef.current, {
        overflow: 'visible',
      })
      .set(socialsRef.current, {
        overflow: 'hidden',
      })
      .set(infosRef.current.children, {
        y: 40,
      })
      .set(menuRef.current, { opacity: 1 })
      .addLabel('hide-button')
      .to(
        wrapperButtonRef.current,
        { width: 44, gap: 0, duration: 0.4, ease: 'power2.inOut' },
        'hide-button',
      )
      .addLabel('show-mask')
      .to(
        menuRef.current,
        { backdropFilter: 'blur(10px)', backgroundColor: COLORS.MENU, duration: 0.8 },
        'show-mask',
      )
      .add(() => cutoutRef.current?.openCutoutWrapper(), 'show-mask')
      .to(
        headerRef.current,
        {
          top: 32,
          paddingBlock: gsap.utils.clamp(20, 8 * window.innerHeight * 0.01, 100),
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
      .to(
        headerRef.current.children,
        {
          paddingInline: gsap.utils.clamp(20, 8 * window.innerWidth * 0.01, 100),
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        'show-mask',
      )
      .add(() => setIsMenuOpen(true))
      .to(
        linksRef.current.children,
        {
          scaleY: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          stagger: 0.08,
        },
        '-=0.3',
      )
      .to(
        wrapperButtonRef.current,
        { width: 'auto', gap: 16, duration: 0.3, ease: 'power2.inOut' },
        '-=0.4',
      )
      .to(
        titleProjectsRef.current,
        {
          scaleY: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=1.3',
      )
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.1, () => ref.play());
        });
      }, '-=1')
      .add(() => {
        newsletterFormRef.current?.play();
      }, '-=0.6')
      .to(
        socialsRef.current.children,
        {
          xPercent: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=0.6',
      )
      .to(
        infosRef.current.children,
        {
          y: 0,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '-=1',
      );
  });

  const closeMenu = contextSafe(() => {
    if (
      !cutoutRef.current ||
      !linksRef.current ||
      !headerRef.current ||
      !socialsRef.current ||
      !infosRef.current
    )
      return;

    timelineRef.current = gsap
      .timeline()
      .set([linksRef.current, socialsRef.current], {
        overflow: 'hidden',
      })
      .addLabel('hide-button')
      .to(wrapperButtonRef.current, { width: 44, duration: 0.4 }, 'hide-button')
      .to(
        linksRef.current.children,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
          stagger: 0.05,
        },
        '<',
      )
      .to(
        socialsRef.current.children,
        {
          xPercent: 100,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .add(() => {
        projectTagsRefs.current.map((ref, index) => {
          gsap.delayedCall(index * 0.05, () => ref.reverse());
        });
      }, '<')
      .add(() => {
        newsletterFormRef.current?.reverse();
      }, '<')
      .to(
        infosRef.current.children,
        {
          y: 40,
          duration: 1,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '<',
      )
      .to(
        titleProjectsRef.current,
        {
          xPercent: -100,
          duration: 1,
          ease: 'power2.inOut',
        },
        '-=0.8',
      )
      .add(() => cutoutRef.current?.closeCutoutWrapper(), '<')
      .to(
        headerRef.current.children,
        {
          paddingInline: 0,
          paddingBlock: 32,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        headerRef.current,
        {
          top: 0,
          paddingBlock: 0,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .to(
        menuRef.current,
        {
          backdropFilter: 'blur(0px)',
          backgroundColor: COLORS.MENU_00,
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '<',
      )
      .add(() => setIsMenuOpen(false), '<')
      .to(wrapperButtonRef.current, {
        width: 'auto',
        gap: 16,
        duration: 0.4,
        ease: 'power2.inOut',
      });
  });

  useShortcut('Escape', () => isMenuOpen && closeMenu());

  useGSAP(() => {
    revealAnimation();
    centerHeaderOnScroll();
    
    // Cleanup on unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <>
      <Hint containerId="hint-newsletter-menu" isDark={false} isLeft={true}>
        {isFrench ? (
          <p>
            On ne spamme pas : <strong>1 mail tous les 3 mois</strong>, avec des news et du contenu
            utile !
          </p>
        ) : (
          <p>
            We don't spam: <strong>1 email every 3 months</strong>, with news and useful content!
          </p>
        )}
      </Hint>
      <header ref={headerRef} className="px-x-default fixed z-[900] w-full">
        <div ref={headerInnerRef} className="flex items-center justify-between py-8">
          <Link
            ref={logoRef}
            aria-label="Logo"
            href={getInternalPath('/en')}
            scroll={false}
            onClick={closeMenu}
          >
            <Image src={logo} alt="Metabole Logo" priority height={130} width={160} />
          </Link>
          <div ref={wrapperButtonRef} className="flex gap-4">
            <Sound ref={soundRef} className="shrink-0" isDark={true} />
            <Button
              ref={contactMenuRef}
              href={getInternalPath('/en/contact')}
              scroll={false}
              transformOrigin="right"
              onClick={closeMenu}
            >
              CONTACT
            </Button>
            <Button
              ref={buttonMenuRef}
              isResizable={true}
              transformOrigin="right"
              onClick={isMenuOpen ? closeMenu : openMenu}
            >
              {TEXT_BUTTON[isFrench ? 'fr' : 'en'][isMenuOpen ? 'close' : 'open']}
            </Button>
          </div>
        </div>
      </header>
      <CutoutWrapper ref={cutoutRef}>
        <div
          ref={menuRef}
          className="px-x-default py-y-default gap-y-default bg-[#ed356d]/0 flex h-full w-full flex-col justify-between"
        >
          <div />
          <div className="grid grid-cols-10 gap-5">
            <nav className="col-span-4">
              <ul ref={linksRef} className="flex flex-col gap-5 hover:text-[#ed356d]">
                {LINKS.map((link) => (
                  <li key={link.href} className="translate-y-10 scale-y-0 hover:text-[#ed356d]">
                    <AnimatedLink
                      className="h2 link text-black-70 hover:text-[#ed356d]"
                      href={getInternalPath(link.href)}
                      scroll={false}
                      onClick={closeMenu}
                    >
                      {link.text[isFrench ? 'fr' : 'en']}
                    </AnimatedLink>
                  </li>
                ))}
              </ul>
            </nav>
            <nav className="col-span-3">
              {SLICED_PROJECTS.length > 0 && (
                <ul className="flex flex-col gap-2.5">
                  <li className="overflow-hidden">
                    <Link
                      ref={titleProjectsRef}
                      className="h3 text-black-70 inline-block hover:text-[#ed356d]"
                      href={getInternalPath('/projects')}
                      scroll={false}
                    >
                      {isFrench ? 'Projets' : 'Projects'}
                    </Link>
                  </li>
                  {SLICED_PROJECTS.map((link, index) => (
                    <li key={link.title + index}>
                      <Tag
                        ref={(el) => {
                          if (el) projectTagsRefs.current[index] = el;
                        }}
                        href={link.title}
                        type={TAG_TYPE.WHTIE}
                      >
                        {link.title}
                      </Tag>
                    </li>
                  ))}
                  <li>
                    <Tag
                      ref={(el) => {
                        if (el) projectTagsRefs.current[SLICED_PROJECTS.length + 1] = el;
                      }}
                      href="/projects"
                      type={TAG_TYPE.WHTIE}
                    >
                      {isFrench ? 'Et plus' : 'And more'} ...
                    </Tag>
                  </li>
                </ul>
              )}
            </nav>
            <div className="col-span-3">
              <NewsletterForm
                ref={newsletterFormRef}
                animate={true}
                hintId="hint-newsletter-menu"
                isDark={true}
              />
              <nav className="pt-y-default text-right">
                <ul ref={socialsRef} className="flex flex-col items-end gap-4 overflow-hidden">
                  <li className="p3 text-black hover:text-[#ed356d]">Socials</li>
                  {SOCIALS.map((link, index) => (
                    <li key={link.href + index}>
                      <Link
                        className="p3 text-black-30 inline-block transition-[translate,color] hover:-translate-x-2 hover:text-[#ed356d]"
                        href={link.href}
                        scroll={false}
                        target="_blank"
                      >
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
          <div
            ref={infosRef}
            className="flex w-full items-center justify-between gap-5 overflow-y-hidden whitespace-nowrap xl:grid xl:grid-cols-6"
          >
            <p>Metabole® 2025</p>
            <p className="hidden lg:block">{CONTACT.ADDRESS}</p>
            <Time isDark={false} />
            <a className="col-span-2" href={'mailto:' + CONTACT.EMAIL}>
              {CONTACT.EMAIL}
            </a>
            <div className="flex justify-end xl:w-full">
              <Language onClick={closeMenu} />
            </div>
          </div>
        </div>
      </CutoutWrapper>
    </>
  );
};

export default Menu;
