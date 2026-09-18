"use client";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaArrowRight } from "react-icons/fa6";
import Link from "next/link";

const Banner = () => {
  return (
    <section suppressHydrationWarning className="relative h-screen overflow-hidden bg-background text-foreground">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 500000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="h-full"
      >
        {/* =========================================
            STYLE 1: 3D CARD DECK & BOLD TEXT (LEFT GRID)
        ========================================= */}
        <SwiperSlide>
          <div
            className="relative h-screen bg-cover "
            style={{ backgroundImage: "url('/images/slider1.png')" }}
          >
            <div className="absolute inset-0  z-10" />
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/0 via-[30%] to-[95%]  z-10" />

            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
              <div className="grid lg:grid-cols-12 w-full items-center gap-12 pt-16">
                {/* Left Side (Text Area) */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 space-y-5 flex flex-col"
                >
                  <span className="text-base sm:text-sm font-bold tracking-widest dark:text-primary text-gray-800/90 uppercase bg-primary/50 dark:bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 inline-block w-fit">
                    Premium Logistics Integrated
                  </span>
                  <span className="text-5xl md:text-6xl font-semibold tracking-tight leading-none italic font-serif">
                    Your Local <br />
                    <span className="text-primary italic font-serif">
                      Library,
                    </span>{" "}
                    Delivered.
                  </span>
                  <p className="text-lg text-muted-foreground/100 max-w-md leading-relaxed">
                    Connect with local libraries and independent book owners.
                    Browse diverse collections and request doorstep delivery
                    seamlessly.
                  </p>
                  <div className="pt-2 flex items-center gap-4">
                    <Link href="/books">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        suppressHydrationWarning
                        className="btn-primary cursor-pointer shadow-xl flex items-center gap-2"
                      >
                        <span>Browse Books</span>
                        <FaArrowRight size={16} />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      suppressHydrationWarning
                      className="btn-secondary bg-white/50 dark:bg-transparent border border-primary text-foreground cursor-pointer"
                    >
                      Learn More
                    </motion.button>
                  </div>
                </motion.div>

                {/* Right Side (3D Floating Showcase) */}
                <div className="hidden lg:flex lg:col-span-5 justify-center relative"></div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* =========================================
           🎬 STYLE 2: SPLIT SCREEN CREATIVE PANEL (RIGHT TEXT)
        ========================================= */}
        <SwiperSlide>
          <div
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/slider2.png')" }}
          >
            <div className="absolute inset-0   z-10" />
            <div className="absolute inset-0 bg-gradient-to-l from-background/90 via-background/80 md:from-background md:via-background/70 to-transparent z-10" />

            <div className="relative z-20 h-full max-w-7xl mx-auto px-6 flex items-center">
              <div className="grid lg:grid-cols-12 w-full items-center gap-10 pt-16">
                {/* Left Side (Visual Visual Gap/Block Effect) */}
                <div className="hidden lg:block lg:col-span-5 w-full"></div>

                {/* Right Side (Clean Minimal Box Alignment) */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7 text-right flex flex-col items-end space-y-6 "
                >
                  <span className="text-base sm:text-sm font-semibold tracking-widest text-primary uppercase">
                    Community Feedback System
                  </span>
                  <span className="text-5xl md:text-6xl font-semibold leading-none tracking-tight italic font-serif">
                    Explore Diverse <br />
                    <span className="text-primary italic  font-serif">
                      Book Collections.
                    </span>
                  </span>
                  <p className="text-lg sm:text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
                    Get secure borrowing privileges, manage personal reading
                    lists, and read verified reviews left by other community
                    readers.
                  </p>
                  <div>
                    <Link href="/books">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        suppressHydrationWarning
                        className="btn-primary cursor-pointer shadow-lg"
                      >
                        Browse Books
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </SwiperSlide>

        {/* =========================================
           🎬 STYLE 3: CENTER ROYAL GRID & NEON COUNTERS
        ========================================= */}
        <SwiperSlide>
          <div
            className="relative h-screen bg-cover bg-center"
            style={{ backgroundImage: "url('/images/slider3.png')" }}
          >
            <div className="absolute inset-0   z-10" />

            <div className="relative z-20 h-full max-w-5xl mx-auto px-6 flex flex-col justify-center items-center text-center pt-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6 flex flex-col items-center"
              >
                <span className="text-base sm:text-sm font-bold tracking-widest text-primary uppercase border-b-2 border-primary pb-1">
                  Democratizing Access to Literature
                </span>

                <span className="text-4xl md:text-6xl font-black tracking-tighter leading-tight max-w-4xl italic font-serif text-white">
                  Empowering Local{" "}
                  <span className="text-primary italic font-serif">
                    Libraries & Owners
                  </span>
                </span>

                {/* 📊 বুক ডেলিভারি প্ল্যাটফর্মের স্ট্যাটস - নিয়ন গ্রিড লেআউট */}
                <div className="grid grid-cols-3 gap-6 md:gap-12 mt-10 border border-border/80 bg-card/80   px-8 py-6 rounded-[24px] w-full max-w-2xl shadow-xl">
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                      12K+
                    </h3>
                    <div className="w-8 h-0.5 bg-primary/40 mx-auto my-1.5" />
                    <p className="text-muted-foreground text-base sm:text-sm md:text-base sm:text-sm font-semibold uppercase tracking-wider">
                      Books
                    </p>
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                      500+
                    </h3>
                    <div className="w-8 h-0.5 bg-primary/40 mx-auto my-1.5" />
                    <p className="text-muted-foreground text-base sm:text-sm md:text-base sm:text-sm font-semibold uppercase tracking-wider">
                      Readers
                    </p>
                  </div>
                  <div>
                    <h3 className="text-3xl md:text-4xl font-black text-primary tracking-tight">
                      99%
                    </h3>
                    <div className="w-8 h-0.5 bg-primary/40 mx-auto my-1.5" />
                    <p className="text-muted-foreground text-base sm:text-sm md:text-base sm:text-sm font-semibold uppercase tracking-wider">
                      Deliveries
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
};

export default Banner;
