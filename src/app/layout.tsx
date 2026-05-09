"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Oswald } from "next/font/google";
import "@/app/globals.css";

// Configure Oswald Bold (700) and Regular (400)
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-oswald",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isProductOpen, setIsProductOpen] = useState(false);
  const dropdownRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsProductOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <html lang="en" className={oswald.variable} suppressHydrationWarning>
      <body className="bg-slate-50 antialiased font-sans">
        <div className="fixed top-6 left-1/2 z-100 w-[95%] max-w-4xl -translate-x-1/2">
          <nav className="flex items-center justify-between rounded-full border border-white/20 bg-white/90 px-6 py-2.5 shadow-lg backdrop-blur-md transition-all hover:shadow-xl">
            <img src="/logo_png.png" alt="Logo" className="h-7" />

            <ul className="hidden items-center gap-12 text-sm font-medium text-slate-600 md:flex">
              <li className="relative inline-block" ref={dropdownRef}>
                <button
                  onClick={() => setIsProductOpen(!isProductOpen)}
                  className="flex items-center gap-1 transition-colors hover:text-slate-900 focus:outline-none"
                >
                  สินค้า
                  <svg
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isProductOpen ? "rotate-180" : ""
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* --- CSS Animated Dropdown --- */}
                <div
                  className={`
                  absolute left-0 mt-4 w-60 rounded-xl border border-slate-100 bg-white p-2 shadow-xl 
                  transition-all duration-200 ease-out
                  ${
                    isProductOpen
                      ? "opacity-100 translate-y-0 visible"
                      : "opacity-0 -translate-y-2 invisible pointer-events-none"
                  }
                `}
                >
                  <Link
                    href="/about/software"
                    onClick={() => setIsProductOpen(false)}
                    className="block rounded-lg px-4 py-2 hover:bg-slate-50"
                  >
                    <strong className="font-oswald font-bold text-slate-900">
                      U-MASS BIO HOME DRAIN
                    </strong>
                    <br />
                    <div className="text-[12px]">จุลินทรีย์น้ำ “BACT-MAN”</div>
                  </Link>
                  <hr className="my-1 border-slate-100" />
                  <Link
                    href="/about/software"
                    onClick={() => setIsProductOpen(false)}
                    className="block rounded-lg px-4 py-2 hover:bg-slate-50"
                  >
                    <strong className="font-oswald font-bold text-slate-900">
                      U-MASS BIO AQUA CLEAR
                    </strong>
                    <br />
                    <div className="text-[12px]">จุลินทรีย์ก้อน "Green Magic"</div>
                  </Link>
                  <hr className="my-1 border-slate-100 w-[70%] mx-auto" />
                  <Link
                    href="/about/hardware"
                    onClick={() => setIsProductOpen(false)}
                    className="block rounded-lg px-4 py-2 hover:bg-slate-50"
                  >
                    <strong className="font-oswald font-bold text-slate-900">
                      U-MASS BIO FARM SOIL
                    </strong>
                    <br />
                    <div className="text-[12px]">
                      จุลินทรีย์ผง "Extra GREEN magic+"
                    </div>
                  </Link>
                </div>
              </li>

              <li>
                <Link href="/services" className="hover:text-slate-900">
                  Buy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-slate-900">
                  Contact
                </Link>
              </li>
            </ul>

            <Link
              href="https://www.u-mass.com/"
              className="rounded-full bg-red-700 px-5 py-2 text-sm font-semibold text-white transition-transform hover:scale-105 active:scale-95"
            >
              Back
            </Link>
          </nav>
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}