"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// 👑 🎯 REACT ICONS INTEGRATION (Turbopack এর জন্য ১০০% সেফ এবং সলিড)
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // 👑 FIXED: ফুটারের মেইন ব্যাকগ্রাউন্ডে কাস্টম থিম গ্রেডিয়েন্ট এবং ডার্ক রেডিয়াল ম্যাশ মাস্ক সিঙ্ক করা হলো
    <footer className="w-full  pt-17 transition-all duration-300 relative bg-gradient-to-b from-card/30 via-card-soft/40 to-card bg-background text-foreground select-none">
      {/* এক্সট্রা ভিজ্যুয়াল লাক্সারি: ডার্ক মোডে ব্যাকগ্রাউন্ড গ্লো মাস্কিং */}
      <div className="absolute inset-0 bg-radial-gradient from-primary/5 via-transparent to-transparent opacity-60 pointer-events-none z-0" />

      <div className="container-custom py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 relative z-10">
        {/* কলাম ১: ব্র্যান্ড আইডেন্টিটি ও সোশ্যাল মিডিয়া */}
        <div className="lg:col-span-4 space-y-5">
          <Link href={"/"} className="flex items-center gap-3 group w-fit">
            <svg
              viewBox="0 0 24 24"
              className="w-9 h-9 text-primary transition-transform duration-300 group-hover:scale-105"
              fill="currentColor"
            >
              <path d="M2 7h5v2H2zm-1 4h7v2H1zm2 4h5v2H3z" />
              <path d="M20 8h-3V4H9v13h2c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM14 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm0-4V7h2v6h-2zm4 3c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z" />
            </svg>
            <span className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Biblio<span>Drop</span>
            </span>
          </Link>
          <p className="text-lg sm:text-base text-muted-foreground leading-relaxed max-w-sm">
            Your premium local library delivery ecosystem. Connecting passionate
            readers with extensive physical catalogs via smart logistics.
          </p>

          {/* 🎯 ডক রিকোয়ারমেন্ট: ওল্ড টুইটার বার্ডের জায়গায় Strictly নতুন X লোগো ও প্রিমিয়াম সোশ্যাল বার */}
          <div className="flex items-center gap-4 pt-2">
            {/* Facebook (React Icons - FontAwesome) */}
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 bg-card-soft/50 transition-all duration-300 shadow-sm"
            >
              <FaFacebookF size={15} />
            </motion.a>

            {/* The New X Logo (Strictly ডক রিকোয়ারমেন্ট - পিওর রেসপন্সিভ SVG) */}
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 bg-card-soft/50 transition-all duration-300 shadow-sm"
            >
              <svg
                className="w-4 h-4 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
              </svg>
            </motion.a>

            {/* Instagram (React Icons - FontAwesome) */}
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 bg-card-soft/50 transition-all duration-300 shadow-sm"
            >
              <FaInstagram size={16} />
            </motion.a>

            {/* Linkedin (React Icons - FontAwesome) */}
            <motion.a
              href="#"
              whileHover={{ y: -3 }}
              className="w-9 h-9 rounded-xl border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/40 bg-card-soft/50 transition-all duration-300 shadow-sm"
            >
              <FaLinkedinIn size={16} />
            </motion.a>
          </div>
        </div>

        {/* কলাম ২: Quick Links */}
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-lg sm:text-base font-bold tracking-widest uppercase text-foreground">
            Quick Links
          </h4>
          <ul className="space-y-2.5 text-lg sm:text-base">
            <li>
              <Link
                href="/about"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/books"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Browse Books
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        {/* কলাম ৩: HQ Contact */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-lg sm:text-base font-bold tracking-widest uppercase text-foreground">
            HQ Contact
          </h4>
          <ul className="space-y-3.5 text-lg sm:text-base text-muted-foreground">
            <li className="flex items-start gap-3">
              <FiMapPin size={16} className="text-primary shrink-0 mt-0.5" />
              <span>Central Library Avenue, Suite 404, Delhi, India</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone size={16} className="text-primary shrink-0" />
              <a
                href="tel:+88012345678"
                className="hover:text-primary transition-colors"
              >
                +910 1234 5678
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiMail size={16} className="text-primary shrink-0" />
              <a
                href="mailto:support@bibliodrop.com"
                className="hover:text-primary transition-colors"
              >
                kamaluddin7908@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* কলাম ৪: Newsletter Placeholder */}
        <div className="lg:col-span-3 space-y-4">
          <h4 className="text-lg sm:text-base font-bold tracking-widest uppercase text-foreground">
            Newsletter
          </h4>
          <p className="text-base sm:text-sm text-muted-foreground leading-relaxed">
            Subscribe to receive real-time updates on newly approved book
            catalogs.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col gap-2"
          >
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="input-field pr-10 !text-base sm:text-sm !h-10 !rounded-lg"
                required
                suppressHydrationWarning
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
                suppressHydrationWarning
              >
                <FiSend size={14} />
              </button>
            </div>
            <button
              suppressHydrationWarning
              type="submit"
              className="btn-primary w-full !py-2 !h-10 !text-base sm:text-sm !rounded-lg font-medium cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/*底部 Copyright Bar */}
      <div className="w-full border-t border-border bg-card-soft/40 py-6 text-center select-none relative z-10">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-base sm:text-sm text-muted-foreground">
          <p>
            © {currentYear}{" "}
            <span className="font-serif italic font-medium">BiblioDrop</span>.
            All rights reserved.
          </p>
          <div className="flex items-center gap-6 font-medium">
            <Link
              href="/terms"
              className="hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/security"
              className="hover:text-primary transition-colors"
            >
              Stripe Security
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
