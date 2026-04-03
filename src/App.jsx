import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carImg from './assets/car.png';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const statsRef = useRef([]);
  const carRef = useRef(null);
  const contentRef = useRef(null);

  const stats = [
    { value: '98%', label: 'Client Satisfaction' },
    { value: '150+', label: 'Projects Delivered' },
    { value: '10x', label: 'Performance Boost' },
  ];

  useEffect(() => {
    // Initial Load Animation
    const tl = gsap.timeline();
    
    // Animate WELCOME ITZFIZZ
    tl.fromTo(title1Ref.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(title2Ref.current, 
      { y: 30, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    // Animate Stats
    .fromTo(statsRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.5'
    )
    // Animate Car fading in from right a bit
    .fromTo(carRef.current,
      { x: '10vw', opacity: 0 },
      { x: '0', opacity: 1, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    );

    // Scroll-Based Animation for Car and Text
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.5, // Smooth scrubbing
      }
    });

    // Move the car dramatically from right to left while scaling up
    scrollTl.to(carRef.current, {
      x: '-30vw',
      scale: 1.6,
      ease: 'none',
    }, 0);

    // Fade out text while scrolling down
    scrollTl.to(contentRef.current, {
      y: -150,
      opacity: 0,
      ease: 'none',
    }, 0);

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[250vh] bg-[#0A0A0A] text-white selection:bg-red-500 selection:text-white">
      
      {/* Sticky Header Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-2xl font-bold tracking-[0.3em] ml-4 text-white">ITZFIZZ</div>
        <div className="hidden md:flex space-x-12 text-xs font-semibold tracking-[0.2em] mr-8">
          <a href="#" className="hover:text-red-500 transition-colors duration-300">HOME</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">WORK</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">ABOUT</a>
          <a href="#" className="hover:text-red-500 transition-colors duration-300">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section Container (Sticky to viewport) */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        
        {/* Deep Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-800/30 via-[#0A0A0A] to-[#0A0A0A] -z-20"></div>

        {/* Text Content */}
        <div ref={contentRef} className="relative z-10 flex flex-col items-center w-full px-4 text-center pb-24 md:pb-32">
          <h1 className="flex flex-col items-center justify-center drop-shadow-2xl">
            <span 
              ref={title1Ref} 
              className="text-2xl md:text-4xl lg:text-5xl font-light tracking-[0.8em] md:tracking-[1.2em] text-neutral-300 mb-6 uppercase ml-[0.8em] md:ml-[1.2em]"
            >
              Welcome
            </span>
            <span 
              ref={title2Ref} 
              className="text-5xl md:text-8xl lg:text-[9rem] font-bold tracking-[0.3em] md:tracking-[0.5em] leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-red-100 to-neutral-400 uppercase ml-[0.3em] md:ml-[0.5em]"
            >
              Itzfizz
            </span>
          </h1>

          {/* Stats Bar */}
          <div className="mt-16 md:mt-24 w-full max-w-5xl px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-4 justify-items-center opacity-90 backdrop-blur-sm border-t border-white/5 pt-10">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  ref={el => statsRef.current[i] = el}
                  className="flex flex-col items-center justify-center p-4"
                >
                  <span className="text-4xl md:text-5xl font-light text-white mb-3 tracking-wider drop-shadow-md">{stat.value}</span>
                  <span className="text-[10px] md:text-xs tracking-[0.2em] text-neutral-400 uppercase font-medium">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Floating Car/Main Object */}
        <div className="absolute top-[45%] md:top-[50%] left-0 w-full flex justify-center items-center pointer-events-none z-20">
          <img 
            ref={carRef}
            src={carImg} 
            alt="Main Object" 
            className="w-[90%] md:w-[70%] max-w-6xl object-contain drop-shadow-[0_20px_50px_rgba(255,0,0,0.15)] opacity-0 scale-100 translate-y-12 md:translate-y-24"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-70 z-30 mix-blend-difference">
          <span className="text-[10px] tracking-[0.3em] uppercase mb-3 text-white">Scroll Down</span>
          <div className="w-[1px] h-10 md:h-16 bg-gradient-to-b from-white to-transparent"></div>
        </div>

      </div>
    </div>
  );
}

export default App;
