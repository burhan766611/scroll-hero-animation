import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const statsData = [
  { value: "95%", label: "Customer Satisfaction" },
  { value: "120K+", label: "Active Users" },
  { value: "300%", label: "Growth Rate" },
];

const Hero = () => {
  const containerRef = useRef(null);
  const carRef = useRef(null);
  const [activeStat, setActiveStat] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".headline span", {
        y: 80,
        opacity: 0,
        stagger: 0.05,
        duration: 1,
        ease: "power3.out",
      });

      gsap.fromTo(
        carRef.current,
        { x: "-35vw" },
        {
          x: "50vw",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
            onUpdate: (self) => {
              const progress = self.progress;

              if (progress < 0.33) {
                setActiveStat(0);
              } else if (progress < 0.66) {
                setActiveStat(1);
              } else {
                setActiveStat(2);
              }
            },
          },
        },
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const headline = "WELCOME  ITZFIZZ";

  return (
    <section
      ref={containerRef}
      className="relative h-[250vh] bg-black text-white"
    >
      <div className="sticky top-0 h-screen flex flex-col justify-center items-center overflow-hidden">
        <h1 className="headline text-5xl md:text-7xl font-bold tracking-[0.5em] text-center absolute top-20">
          {headline.split("").map((char, i) => (
            <span key={i} className="inline-block">
              {char}
            </span>
          ))}
        </h1>

        <img
          ref={carRef}
          src="/car.png"
          alt="car"
          className="absolute w-[500px] max-w-[90%] will-change-transform"
        />

        <div className="absolute bottom-20 text-center transition-all duration-500">
          <h2 className="text-4xl font-bold">{statsData[activeStat].value}</h2>
          <p className="opacity-70 mt-2">{statsData[activeStat].label}</p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
