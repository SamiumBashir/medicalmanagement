"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Phone,
  Menu,
  X,
  FileCheck2,
  Clock,
  ChevronRight,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { gsap } from "gsap";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Tests & Pricing", href: "/tests" },
  { label: "Doctors", href: "/doctors" },
  { label: "Branches", href: "/branches" },
  { label: "About Us", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Health Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const hotlineRef = React.useRef<HTMLAnchorElement>(null);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    const ctx = gsap.context(() => {
      if (hotlineRef.current) {
        gsap.to(hotlineRef.current, {
          scale: 1.05,
          duration: 1.1,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isExcluded =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/patient") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  if (isExcluded) return null;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top bar — compact below 1280px; full copy at xl (≥1280px) */}
      <div className="bg-[#171717] text-[#DDEDE3] text-[10px] sm:text-xs py-2 px-3 sm:px-4 border-b border-[#315C4A]/40">
        <div className="w-full mx-auto px-2 sm:px-4 lg:px-6 xl:px-10 2xl:px-12 flex flex-col lg:flex-row justify-between items-center gap-2">
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-3 gap-y-1 max-w-full">
            <span className="flex items-center gap-1.5 text-[#A8D5BA] font-medium text-center lg:text-left">
              <ShieldCheck className="w-3.5 h-3.5 shrink-0 text-[#A8D5BA]" />
              <span className="xl:hidden">ISO 15189:2022 & CAP Accredited</span>
              <span className="hidden xl:inline">
                ISO 15189:2022 & CAP Accredited Diagnostic Center
              </span>
            </span>
            <span className="hidden xl:inline-block text-[#70706B]">|</span>
            <span className="hidden xl:flex items-center gap-1 text-[#DDEDE3]">
              <Clock className="w-3.5 h-3.5 text-[#A8D5BA]" />
              Sample Collection: 24/7 Open (Emergency Labs)
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <a
              ref={hotlineRef}
              href="tel:10678"
              className="flex items-center gap-1 hover:text-[#A8D5BA] transition-colors origin-center whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#A8D5BA]" />
              <span className="font-semibold text-white xl:hidden">10678</span>
              <span className="font-semibold text-white hidden xl:inline">
                Hotline: 10678
              </span>
            </a>
            <span className="hidden sm:inline text-[#70706B]">|</span>
            <Link
              href="/verify/REP-2026-001"
              className="hidden sm:inline-flex items-center gap-1 text-[#A8D5BA] hover:text-white transition-colors font-medium whitespace-nowrap"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              <span className="xl:hidden">Verify Report</span>
              <span className="hidden xl:inline">Verify Report Online</span>
            </Link>
          </div>
        </div>
      </div>

      <nav
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-[#E8E8E3] shadow-sm py-3 xl:py-3.5"
            : "bg-[#FFFFFF] border-[#E8E8E3] py-3.5 xl:py-4",
        )}
      >
        {/* Below 1280px: drawer. At xl (1280+): single-row grid so links never wrap */}
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-6 xl:px-5 2xl:px-12 flex items-center gap-3 xl:grid xl:grid-cols-[auto_minmax(0,1fr)_auto] xl:items-center xl:gap-x-2 2xl:gap-x-5">
          <Link
            href="/"
            className="flex items-center gap-2 sm:gap-3 group shrink-0 xl:max-w-[11.5rem] 2xl:max-w-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 xl:w-9 xl:h-9 2xl:w-10 2xl:h-10 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] shadow-sm group-hover:bg-[#315C4A] group-hover:text-white transition-all duration-300 shrink-0">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-serif text-lg sm:text-xl xl:text-lg 2xl:text-2xl tracking-tight text-[#171717] leading-tight whitespace-nowrap">
                Apex Diagnostics
              </span>
              <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-widest text-[#70706B] -mt-0.5 hidden 2xl:block">
                Precision Medical Center
              </span>
            </div>
          </Link>

          <div className="hidden xl:flex items-center justify-center flex-nowrap gap-0 min-w-0 overflow-hidden">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "shrink-0 px-1.5 2xl:px-3 py-1.5 text-[10px] 2xl:text-xs font-semibold uppercase tracking-wide 2xl:tracking-wider rounded-full transition-colors whitespace-nowrap",
                    isActive
                      ? "text-[#315C4A] bg-[#DDEDE3]"
                      : "text-[#171717] hover:text-[#315C4A] hover:bg-[#DDEDE3]/50",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex xl:hidden items-center gap-2 shrink-0 ml-auto">
            <Button
              variant="medical"
              size="sm"
              asChild
              className="rounded-full px-4 text-xs font-semibold shadow-sm"
            >
              <Link href="/book-appointment">Book</Link>
            </Button>
          </div>

          <div className="hidden xl:flex items-center gap-1.5 2xl:gap-3 shrink-0 justify-end">
            <Link
              href="/login?portal=patient"
              title="Patient sign in — reports and appointments"
              className="inline-flex items-center gap-1.5 rounded-full px-2 py-1.5 text-[11px] font-medium text-[#70706B] hover:text-[#315C4A] hover:bg-[#DDEDE3]/60 transition-colors whitespace-nowrap"
            >
              <User className="w-3.5 h-3.5 shrink-0" />
              <span className="hidden min-[1400px]:inline">My account</span>
            </Link>
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A] text-xs h-8 px-2.5 2xl:h-9 2xl:px-4"
            >
              <a href="tel:10678" className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-[#315C4A] shrink-0" />
                <span className="hidden min-[1380px]:inline">10678</span>
              </a>
            </Button>

            <Button
              variant="medical"
              size="sm"
              asChild
              className="rounded-full px-3 2xl:px-6 text-[11px] 2xl:text-xs font-semibold shadow-sm h-8 2xl:h-10 active:scale-[0.98]"
            >
              <Link href="/book-appointment" className="flex items-center gap-1 whitespace-nowrap">
                <span>Book online</span>
                <span className="text-[10px] 2xl:text-xs">→</span>
              </Link>
            </Button>
          </div>

          <div className="flex xl:hidden items-center gap-2 shrink-0 ml-auto">
            <Button
              variant="medical"
              size="sm"
              asChild
              className="rounded-full px-3 text-xs font-semibold lg:hidden"
            >
              <Link href="/book-appointment">Book</Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="text-[#171717] hover:bg-[#DDEDE3]"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="xl:hidden fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FFFFFF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#E8E8E3]"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#E8E8E3]">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#A8D5BA] flex items-center justify-center text-[#171717]">
                      <Activity className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-[#171717]">Apex Diagnostics</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <X className="w-5 h-5 text-[#70706B]" />
                  </Button>
                </div>

                <div className="flex flex-col py-6 space-y-1">
                  {NAV_LINKS.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === "/"
                        : pathname.startsWith(link.href);
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          "flex items-center justify-between px-3 py-2.5 rounded-lg font-medium transition-colors",
                          isActive
                            ? "bg-[#DDEDE3] text-[#315C4A] font-semibold"
                            : "text-[#171717] hover:bg-[#DDEDE3]/50 hover:text-[#315C4A]",
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#70706B]" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              <div className="pt-6 border-t border-[#E8E8E3] flex flex-col space-y-3">
                <Button
                  variant="medical"
                  className="w-full justify-center"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/book-appointment">Book Appointment</Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-center border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3]"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/tests">Browse Tests & Prices</Link>
                </Button>
                <p className="text-center text-sm text-[#70706B] pt-1">
                  Already registered?{" "}
                  <Link
                    href="/login?portal=patient"
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-semibold text-[#315C4A] hover:underline"
                  >
                    Sign in
                  </Link>
                </p>
                <div className="pt-2 text-center text-xs text-[#70706B]">
                  Emergency 24/7 Helpline:{" "}
                  <span className="font-semibold text-[#171717]">10678</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
