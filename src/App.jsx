import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const containerRef = useRef(null);
  const title1Ref = useRef(null);
  const title2Ref = useRef(null);
  const statsRef = useRef([]);
  const carRef = useRef(null);

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
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
    )
    .fromTo(title2Ref.current, 
      { y: 50, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
      '-=0.7'
    )
    .fromTo(carRef.current,
      { x: '100vw', opacity: 0 },
      { x: '0', opacity: 1, duration: 1.5, ease: 'power4.out' },
      '-=0.8'
    )
    // Animate Stats
    .fromTo(statsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power2.out' },
      '-=0.5'
    );

    // Scroll-Based Animation for Car
    // The car will move across the screen as we scroll down
    gsap.to(carRef.current, {
      x: '-50vw',
      scale: 1.5,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1, // Smooth scrubbing
      }
    });

    // Animate stats fading out on scroll
    gsap.to('.hero-content', {
      y: -100,
      opacity: 0,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'center top',
        scrub: true,
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative h-[200vh] bg-[#0A0A0A] text-white overflow-hidden">
      
      {/* Sticky Header Navigation */}
      <nav className="fixed top-0 left-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold tracking-widest text-[#E0E0E0]">ITZFIZZ</div>
        <div className="space-x-8 text-sm font-medium tracking-wide">
          <a href="#" className="hover:text-red-500 transition-colors">HOME</a>
          <a href="#" className="hover:text-red-500 transition-colors">WORK</a>
          <a href="#" className="hover:text-red-500 transition-colors">ABOUT</a>
          <a href="#" className="hover:text-red-500 transition-colors">CONTACT</a>
        </div>
      </nav>

      {/* Hero Section Container (Sticky) */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-center items-center overflow-hidden pt-20">
        
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#0A0A0A] to-[#0A0A0A] -z-10"></div>

        {/* Text Content */}
        <div className="hero-content relative z-20 flex flex-col items-center w-full px-4 text-center mt-10">
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-[1em] md:tracking-[1.5em] leading-none ml-[1em] text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-500">
            <span ref={title1Ref} className="block mb-4">WELCOME</span>
            <span ref={title2Ref} className="block text-red-600 bg-none text-red-600 bg-clip-text bg-gradient-to-b from-red-500 to-red-800">ITZFIZZ</span>
          </h1>

          {/* Stats Bar */}
          <div className="mt-20 flex flex-wrap justify-center gap-12 md:gap-24 opacity-80 border-t border-neutral-800 pt-10 w-3/4 max-w-4xl">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                ref={el => statsRef.current[i] = el}
                className="flex flex-col items-center"
              >
                <span className="text-4xl md:text-5xl font-light text-white mb-2">{stat.value}</span>
                <span className="text-xs md:text-sm tracking-widest text-neutral-400 uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Car/Main Object */}
        <div className="absolute top-[50%] left-0 w-full flex justify-center -z-0 pointer-events-none transform translate-y-10">
          <img 
            ref={carRef}
            src="/car.png" 
            alt="Porsche Profile" 
            className="w-[80%] max-w-5xl object-contain drop-shadow-2xl"
          />
        </div>
        
        {/* Decorative elements */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center animate-bounce opacity-50 z-20">
          <span className="text-xs tracking-widest uppercase mb-2">Scroll Down</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white to-transparent"></div>
        </div>

      </div>
    </div>
  );
}

export default App;
