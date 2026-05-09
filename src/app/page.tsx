"use client";

import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { motion, AnimatePresence } from 'framer-motion';

const IMAGES: string[] = ['/bg-1.jpg', '/bg-2.jpg', '/bg-3.jpg'];
const CHANGE_INTERVAL_MS = 7000;

export default function Home(): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, CHANGE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const products = [
    { src: "/product/product-1.png", label: "จุลินทรีย์น้ำ" },
    { src: "/product/product-2.png", label: "จุลินทรีย์ก้อน" },
    { src: "/product/product-3.png", label: "จุลินทรีย์ผง" },
  ];

  return (
    <main className="relative w-full bg-white">
      {/* SECTION 1: HERO */}
      <section className="relative h-screen w-full overflow-hidden bg-black">
        <AnimatePresence mode="popLayout">
          {mounted && (
            <motion.div
              key={IMAGES[index]}
              initial={{ opacity: 0, filter: 'blur(25px) brightness(1.2)', scale: 1.05 }}
              animate={{ opacity: 1, filter: 'blur(15px) brightness(1.5)', scale: 1 }}
              exit={{ opacity: 0, filter: 'blur(25px) brightness(1.2)', scale: 1.05 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${IMAGES[index]})` }}
            />
          )}
        </AnimatePresence>

        {/* Content Layer */}
        <div className="relative z-[30] flex h-full flex-col items-center justify-center bg-black/20 text-white p-6 pb-20 text-center">
          <span 
            className="text-[100px] md:text-[250px] lg:text-[300px] font-oswald tracking-tight leading-none font-bold select-none"
            style={{ textShadow: `0 0 10px rgba(255, 255, 255, 0.4), 0 5px 30px rgba(0, 0, 0, 0.6)` }}
          >
            <span className="text-[#010000]">U-</span><span className="text-[#ed1c24]">mass</span>
          </span>

          <p className="mt-4 text-lg md:text-2xl font-medium text-gray-100 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            จัดการกลิ่น น้ำเสีย และดินเสื่อม ด้วย โซลูชันชีวภาพ
          </p>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-10 md:gap-16 lg:gap-24 px-4">
            {products.map((product, idx) => (
              <Link 
                key={idx} 
                href="/products" 
                className="group flex flex-col items-center transition-transform active:scale-95"
                suppressHydrationWarning
              >
                <div className="relative mb-6 h-40 w-40 md:h-60 md:w-60 lg:h-72 lg:w-72 transition-transform duration-500 group-hover:scale-110">
                  <img 
                    src={product.src} 
                    alt={product.label} 
                    className="h-full w-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)]" 
                  />
                </div>
                <div className="inline-block whitespace-nowrap bg-red-700 text-white font-bold px-8 py-4 text-xl md:text-3xl md:px-12 md:py-6 rounded-xl transition-all duration-300 shadow-xl group-hover:bg-red-600 group-hover:shadow-red-600/50">
                  {product.label}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* --- THE SMOOTH TRANSITION GRADIENT --- */}
        <div 
          className="absolute bottom-0 left-0 w-full h-96 z-20 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, 
              rgba(255, 255, 255, 0) 0%, 
              rgba(255, 255, 255, 0.1) 20%, 
              rgba(255, 255, 255, 0.4) 50%, 
              rgba(255, 255, 255, 0.8) 80%, 
              rgba(255, 255, 255, 1) 100%)`
          }}
        />
      </section>

      {/* SECTION 2: CONTENT */}
      {/* -mt-2 pulls this section up to overlap the end of the gradient perfectly */}
      <section className="relative z-[25] -mt-2 min-h-screen w-full bg-white px-10">
         <div className="pt-24 max-w-7xl mx-auto">
            <h2 className="text-black text-4xl md:text-6xl font-bold font-prompt">รายละเอียดเพิ่มเติม</h2>
            <div className="mt-10 h-1 w-20 bg-red-600" />
            
            {/* Added extra content to demonstrate scrolling smooth connection */}
            <div className="mt-20 space-y-8 text-gray-800 text-lg max-w-3xl">
              <p>ยินดีต้อนรับสู่เทคโนโลยีชีวภาพที่ล้ำสมัยที่สุด...</p>
              <div className="h-screen" />
            </div>
         </div>
      </section>
    </main>
  );
}