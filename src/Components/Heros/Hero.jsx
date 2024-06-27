import React, { useEffect, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const imgs = [
  "https://www.shutterstock.com/image-photo/cheerful-african-american-family-enjoying-260nw-2230019949.jpg",
  "https://www.shutterstock.com/image-photo/close-business-suit-formal-shirt-600nw-1162746760.jpg",
  "https://www.shutterstock.com/image-photo/close-business-suit-formal-shirt-600nw-1162746760.jpg",
  "https://img.freepik.com/premium-photo/red-sneakers-hanging-lace-copy-space-empty-purple-background_780608-9514.jpg",
  "https://i.pinimg.com/564x/e9/4b/83/e94b83a6c821a70cc862e3f6de92cabc.jpg",
  "https://i.pinimg.com/564x/71/fd/23/71fd23342399df17eb618ece7fbd00a2.jpg",
  "https://i.pinimg.com/564x/cf/8a/48/cf8a48dfae67901c58e5ae3d9660fb88.jpg",
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
    <div className="relative overflow-hidden py-8 bg-[#F9F5F0] ">
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
              className="relative aspect-video w-full h-[500px] shrink-0 rounded-xl bg-neutral-600 object-cover"
            >
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-2xl">
                
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
