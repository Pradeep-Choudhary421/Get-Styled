import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = [
  "https://marketplace.canva.com/EAFWecuevFk/1/0/1600w/canva-grey-brown-minimalist-summer-season-collections-banner-landscape-VXEmg9V800o.jpg",
  "https://marketplace.canva.com/EAFKwirl3N8/1/0/1600w/canva-brown-minimalist-fashion-product-banner-iRHpbHTqh-A.jpg",
  "https://marketplace.canva.com/EAFJyDO5UQs/1/0/1600w/canva-beige-minimal-aesthetic-new-fashion-collection-banner-FXXYhSTS-mc.jpg",
  "https://marketplace.canva.com/EAFoEJMTGiI/1/0/1600w/canva-beige-aesthetic-new-arrival-fashion-banner-landscape-cNjAcBMeF9s.jpg",
  "https://img.freepik.com/free-vector/hand-drawn-texture-boutique-linkedin-banner_23-2149331198.jpg?w=2000",
  "https://img.freepik.com/free-vector/flat-fashion-style-social-media-cover-template_23-2149874261.jpg?w=2000",
  "https://marketplace.canva.com/EAFLU0NpTbE/1/0/1600w/canva-brown-modern-new-brand-fashion-banner-u97g9GPKB4g.jpg",
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

 const Hero = () => {
  const [imgIndex, setImgIndex] = useState(0);

  const dragX = useMotionValue(0);

  useEffect(() => {
    const intervalRef = setInterval(() => {
      const x = dragX.get();

      if (x === 0) {
        setImgIndex((pv) => {
          if (pv === imgs.length - 1) {
            return 0;
          }
          return pv + 1;
        });
      }
    }, AUTO_DELAY);

    return () => clearInterval(intervalRef);
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < imgs.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };

  return (
    <div className="relative overflow-hidden py-8 bg-[#F9F5F0] pt-20">
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing"
      >
        <Images imgIndex={imgIndex} />
      </motion.div>

      <Dots imgIndex={imgIndex} setImgIndex={setImgIndex} />
      
    </div>
  );
};

const Images = ({ imgIndex }) => {
    return (
      <>
        {imgs.map((imgSrc, idx) => {
          return (
            <motion.div
              key={idx} 
              style={{
                backgroundImage: `url(${imgSrc})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
              animate={{
                scale: imgIndex === idx ? 0.95 : 0.85,
              }}
              transition={SPRING_OPTIONS}
              className="relative aspect-video w-[100vw] h-[300px] lg:w-full lg:h-[500px] shrink-0 rounded-xl bg-neutral-600 object-cover"
            >
              <div className="absolute inset-0 flex items-center justify-center  text-white text-2xl">
                
              </div>
            </motion.div>
          );
        })}
      </>
    );
  };
  
const Dots = ({ imgIndex, setImgIndex }) => {
  return (
    <div className="mt-4 flex w-full justify-center gap-2">
      {imgs.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`h-3 w-3 rounded-full transition-colors ${
              idx === imgIndex ? "bg-neutral-900" : "bg-neutral-500"
            }`}
          />
        );
      })}
    </div>
  );
};

export default Hero
