/*
	Installed from https://reactbits.dev/ts/tailwind/
*/

import { useEffect, useState, useRef } from "react";
import { motion, PanInfo, Transition, useMotionValue, useTransform, MotionValue } from "framer-motion";
import React, { JSX } from "react";
import Image from "next/image";
export interface CarouselItem {
  title: string;
  description: string;
  id: number;
  image: string;
}

export interface CarouselProps {
  items?: CarouselItem[];
  baseWidth?: number;
  autoplay?: boolean;
  autoplayDelay?: number;
  pauseOnHover?: boolean;
  loop?: boolean;
  round?: boolean;
}



const DEFAULT_ITEMS: CarouselItem[] = [
  {
    title: "IEM HACKOASIS1.0",
    description: "",
    id: 1,
    image: "/images/bg_1.jpg", // ✅ example from public/images/
  },
  {
    title: "IEM HACKOASIS1.0",
    description: "Smooth animations for your projects.",
    id: 2,
    image: "/images/bg_2.jpg",
  },
  {
    title: "IEM HACKOASIS1.0",
    description: "Reusable components for your projects.",
    id: 3,
    image: "/images/bg_3.jpg",
  },
  {
    title: "IEM HACKOASIS1.0",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    image: "/images/bg_4.jpg",
  },
  {
    title: "IEM HACKOASIS1.0",
    description: "Common UI components are coming soon!",
    id: 5,
    image: "/images/bg_5.jpg",
  },
];




const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;

const SPRING_OPTIONS: Transition = {
  type: "spring", // ✅ this will now be treated as valid
  stiffness: 300,
  damping: 30,
};

const RESET_TRANSITION: Transition = { duration: 0 };

const CarouselCard = ({
  item,
  index,
  x,
  itemWidth,
  trackItemOffset,
  round,
  transition,
}: {
  item: CarouselItem;
  index: number;
  x: MotionValue<number>;
  itemWidth: number;
  trackItemOffset: number;
  round: boolean;
  transition: Transition;
}) => {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  return (
    <motion.div
      key={index}
      className={`relative shrink-0 flex flex-col ${
        round
          ? "items-center justify-center text-center bg-[#2d0175] border-0"
          : "items-start justify-between bg-[#7a2fe3] border border-[#850101] rounded-[12px]"
      } overflow-hidden cursor-grab active:cursor-grabbing`}
      style={{
        width: itemWidth,
        height: round ? itemWidth : "100%",
        rotateY: rotateY,
        ...(round && { borderRadius: "50%" }),
      }}
      transition={transition}
    >
      <div className={`${round ? "p-0 m-0" : "mb-0 p-2"}`}>
        <Image
          height={4000}
          width={6000}
          src={item.image}
          alt={item.title}
          className={`w-full object-cover ${
            round
              ? "h-full rounded-full"
              : "rounded-[12px] h-[200px] sm:h-[250px] md:h-[300px]"
          }`}
        />
      </div>
      <div className="px-4 pt-2 pb-2">
        <div className="mb-0.5 font-semibold text-base text-white truncate">
          {item.title}
        </div>
        <p className="text-xs text-white line-clamp-2">{item.description}</p>
      </div>
    </motion.div>
  );
};


export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
}: CarouselProps): JSX.Element {
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = loop ? [...items, items[0]] : items;
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isResetting, setIsResetting] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1 && loop) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [
    autoplay,
    autoplayDelay,
    isHovered,
    loop,
    items.length,
    carouselItems.length,
    pauseOnHover,
  ]);

  // const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;
  const effectiveTransition: Transition = isResetting ? RESET_TRANSITION : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (loop && currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ): void => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (loop && currentIndex === items.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (loop && currentIndex === 0) {
        setCurrentIndex(items.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const dragProps = loop
    ? {}
    : {
        dragConstraints: {
          left: -trackItemOffset * (carouselItems.length - 1),
          right: 0,
        },
      };

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden p-3 ${
        round
          ? "rounded-full border border-white"
          : "rounded-[24px] border border-[#222]"
      }`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px` }),
      }}
    >
      <motion.div
        className="flex"
        drag="x"
        {...dragProps}
        style={{
          width: itemWidth,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: `${currentIndex * trackItemOffset + itemWidth / 2}px 50%`,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * trackItemOffset) }}
        transition={effectiveTransition}
        onAnimationComplete={handleAnimationComplete}
      >
        {carouselItems.map((item, index) => (
          <CarouselCard
            key={index}
            item={item}
            index={index}
            x={x}
            itemWidth={itemWidth}
            trackItemOffset={trackItemOffset}
            round={round}
            transition={effectiveTransition}
          />
        ))}
      </motion.div>
      <div
        className={`flex w-full justify-center ${
          round ? "absolute z-20 bottom-12 left-1/2 -translate-x-1/2" : ""
        }`}
      >
        <div className="mt-4 flex w-[150px] justify-between px-8">
          {items.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                currentIndex % items.length === index
                  ? round
                    ? "bg-white"
                    : "bg-[#333333]"
                  : round
                    ? "bg-[#555]"
                    : "bg-[rgba(51,51,51,0.4)]"
              }`}
              animate={{
                scale: currentIndex % items.length === index ? 1.2 : 1,
              }}
              onClick={() => setCurrentIndex(index)}
              transition={{ duration: 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
