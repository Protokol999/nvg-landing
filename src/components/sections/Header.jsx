import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import QuickContactForm from '../QuickContactForm';
import './Header.css';

export default function Header({ onScrollToContact }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isQuickFormOpen, setIsQuickFormOpen] = useState(false);
  const ctaButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = id => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.header
      className={`header ${isScrolled ? 'header--scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className='header__container container'>
        <a
          href='#hero'
          className='header__logo'
          onClick={e => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <svg width='40' height='40' viewBox='0 0 100 100' fill='none'>
            <path
              d='M20 80V20L50 50L80 20V80'
              stroke='url(#logo-gradient)'
              strokeWidth='6'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
            <defs>
              <linearGradient
                id='logo-gradient'
                x1='20'
                y1='20'
                x2='80'
                y2='80'
              >
                <stop offset='0%' stopColor='#7A33FF' />
                <stop offset='100%' stopColor='#CBA3FF' />
              </linearGradient>
            </defs>
          </svg>
          <span className='header__logo-text'>NVG</span>
        </a>

        <nav className='header__nav'>
          <a
            href='#services'
            onClick={e => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            Services
          </a>
          <a
            href='#portfolio'
            onClick={e => {
              e.preventDefault();
              scrollToSection('portfolio');
            }}
          >
            Portfolio
          </a>
          <a
            href='#process'
            onClick={e => {
              e.preventDefault();
              scrollToSection('process');
            }}
          >
            Process
          </a>
          <a
            href='#pricing'
            onClick={e => {
              e.preventDefault();
              scrollToSection('pricing');
            }}
          >
            Pricing
          </a>
          <a
            href='#faq'
            onClick={e => {
              e.preventDefault();
              scrollToSection('faq');
            }}
          >
            FAQ
          </a>
        </nav>

        <div style={{ position: 'relative' }}>
          <button
            ref={ctaButtonRef}
            className='btn btn--primary header__cta'
            onClick={() => setIsQuickFormOpen(!isQuickFormOpen)}
            aria-label='Start your project'
          >
            Start Project
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none'>
              <path
                d='M6 12L10 8L6 4'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <QuickContactForm
            isOpen={isQuickFormOpen}
            onClose={() => setIsQuickFormOpen(false)}
            buttonRef={ctaButtonRef}
          />
        </div>

        <button
          className={`header__mobile-toggle ${
            isMobileMenuOpen ? 'active' : ''
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label='Toggle menu'
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <motion.div
        className={`header__mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}
        initial={false}
        animate={{
          height: isMobileMenuOpen ? 'auto' : 0,
          opacity: isMobileMenuOpen ? 1 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        <nav className='header__mobile-nav'>
          <a
            href='#services'
            onClick={e => {
              e.preventDefault();
              scrollToSection('services');
            }}
          >
            Services
          </a>
          <a
            href='#portfolio'
            onClick={e => {
              e.preventDefault();
              scrollToSection('portfolio');
            }}
          >
            Portfolio
          </a>
          <a
            href='#process'
            onClick={e => {
              e.preventDefault();
              scrollToSection('process');
            }}
          >
            Process
          </a>
          <a
            href='#pricing'
            onClick={e => {
              e.preventDefault();
              scrollToSection('pricing');
            }}
          >
            Pricing
          </a>
          <a
            href='#faq'
            onClick={e => {
              e.preventDefault();
              scrollToSection('faq');
            }}
          >
            FAQ
          </a>
          <button className='btn btn--primary' onClick={onScrollToContact}>
            Start Project
          </button>
        </nav>
      </motion.div>
    </motion.header>
  );
}
