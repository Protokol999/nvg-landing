import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { useEffect, useRef } from 'react';
import GridScan from '../GridScan';
import './Hero.css';

export default function Hero({ onScrollToContact, onScrollToPortfolio }) {
  const sectionRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    // Parallax background animation
    const section = sectionRef.current;
    const bg = bgRef.current;

    if (!section || !bg) return;

    const handleMouseMove = e => {
      const { clientX, clientY } = e;
      const { width, height } = section.getBoundingClientRect();

      const x = (clientX / width - 0.5) * 30;
      const y = (clientY / height - 0.5) * 30;

      gsap.to(bg, {
        x,
        y,
        duration: 0.5,
        ease: 'power2.out'
      });
    };

    section.addEventListener('mousemove', handleMouseMove);

    return () => section.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.2, 0.8, 0.2, 1]
      }
    }
  };

  return (
    <section ref={sectionRef} className='hero' id='hero'>
      {/* GridScan Effect */}
      <GridScan
        sensitivity={0.55}
        lineThickness={1}
        linesColor='#392e4e'
        gridScale={0.1}
        scanColor='#7A33FF'
        scanOpacity={0.4}
        enablePost
        bloomIntensity={0.6}
        chromaticAberration={0.002}
        noiseIntensity={0.01}
      />

      {/* Animated background */}
      <div ref={bgRef} className='hero__background'>
        <div className='hero__bg-circle hero__bg-circle--1' />
        <div className='hero__bg-circle hero__bg-circle--2' />
        <div className='hero__bg-circle hero__bg-circle--3' />
        <div className='hero__bg-grid' />
      </div>

      {/* Content */}
      <motion.div
        className='container hero__content'
        variants={containerVariants}
        initial={false}
        animate='visible'
      >
        <motion.h1 variants={itemVariants} className='hero__title'>
          We Build Digital Systems That Work While You Sleep
        </motion.h1>

        <motion.p variants={itemVariants} className='hero__subtitle subtitle'>
          From first click to loyal customer — we automate your entire funnel
          with custom landing pages, intelligent bots, and data-driven CRM
          systems. 100+ businesses scaled with us.
        </motion.p>

        <motion.div variants={itemVariants} className='hero__cta'>
          <button
            className='btn btn--primary'
            onClick={onScrollToContact}
            aria-label='Book Free Strategy Call'
          >
            Book Free Strategy Call
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none'>
              <path
                d='M7.5 15L12.5 10L7.5 5'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
          </button>

          <button
            className='btn btn--secondary'
            onClick={onScrollToPortfolio}
            aria-label='View Case Studies'
          >
            View Case Studies
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div variants={itemVariants} className='hero__stats'>
          <div className='hero__stat'>
            <strong>100+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className='hero__stat'>
            <strong>250K+</strong>
            <span>Leads Generated</span>
          </div>
          <div className='hero__stat'>
            <strong>4.9★</strong>
            <span>Client Rating</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
