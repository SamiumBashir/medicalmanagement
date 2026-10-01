"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Phone,
  Calendar,
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
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    // GSAP Heartbeat micro-pulse for emergency hotline
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

  // Do not render public Navbar on internal app, portal, or auth pages
  const isExcluded =
    pathname?.startsWith("/dashboard") ||
    pathname?.startsWith("/patient") ||
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/forgot-password";

  if (isExcluded) return null;

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-300">
      {/* Top Notification / Emergency Bar: Deep Charcoal #171717 */}
      <div className="bg-[#171717] text-[#DDEDE3] text-xs py-2 px-4 border-b border-[#315C4A]/40">
        <div className="w-full px-2 sm:px-4 lg:px-8 xl:px-12 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center space-x-4">
            <span className="flex items-center gap-1.5 text-[#A8D5BA] font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#A8D5BA]" />
              ISO 15189:2022 & CAP Accredited Diagnostic Center
            </span>
            <span className="hidden md:inline-block text-[#70706B]">|</span>
            <span className="hidden md:flex items-center gap-1 text-[#DDEDE3]">
              <Clock className="w-3.5 h-3.5 text-[#A8D5BA]" />
              Sample Collection: 24/7 Open (Emergency Labs)
            </span>
          </div>

          <div className="flex items-center space-x-5">
            <a
              ref={hotlineRef}
              href="tel:10678"
              className="flex items-center gap-1 hover:text-[#A8D5BA] transition-colors origin-center"
            >
              <Phone className="w-3.5 h-3.5 text-[#A8D5BA]" />
              <span className="font-semibold text-white">Hotline: 10678</span>
            </a>
            <span className="text-[#70706B]">|</span>
            <Link
              href="/verify/REP-2026-001"
              className="flex items-center gap-1 text-[#A8D5BA] hover:text-white transition-colors font-medium"
            >
              <FileCheck2 className="w-3.5 h-3.5" />
              Verify Report Online
            </Link>
            <span className="text-[#70706B]">|</span>
            <Link
              href="/login"
              className="flex items-center gap-1 text-[#DDEDE3] hover:text-[#A8D5BA] transition-colors font-medium"
            >
              <User className="w-3 h-3 text-[#A8D5BA]" />
              Portal Sign In
            </Link>
            <span className="text-[#70706B]">|</span>
            <Link
              href="/login"
              className="text-[#70706B] hover:text-white transition-colors text-[11px]"
            >
              Staff Access
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar: Pure White #FFFFFF with Soft Gray #E8E8E3 border */}
      <nav
        className={cn(
          "w-full transition-all duration-300 border-b",
          isScrolled
            ? "bg-[#FFFFFF]/95 backdrop-blur-md border-[#E8E8E3] shadow-sm py-3.5"
            : "bg-[#FFFFFF] border-[#E8E8E3] py-4"
        )}
      >
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12 flex items-center justify-between">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#A8D5BA] flex items-center justify-center text-[#171717] shadow-sm group-hover:bg-[#315C4A] group-hover:text-white transition-all duration-300">
              <Activity className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl tracking-tight text-[#171717] leading-tight">
                Apex Diagnostics
              </span>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#70706B] -mt-0.5">
                Precision Medical Center
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links (Multi-page routes) */}
          <div className="hidden lg:flex items-center space-x-1">
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
                    "px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded-full transition-colors",
                    isActive
                      ? "text-[#315C4A] bg-[#DDEDE3]"
                      : "text-[#171717] hover:text-[#315C4A] hover:bg-[#DDEDE3]/50"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          {/* Desktop Right CTAs */}
          <div className="hidden md:flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              asChild
              className="rounded-full border-[#E8E8E3] text-[#171717] hover:bg-[#DDEDE3] hover:text-[#315C4A] text-xs px-4"
            >
              <a href="tel:10678" className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#315C4A]" />
                <span>10678</span>
              </a>
            </Button>

            <Button
              variant="medical"
              size="default"
              asChild
              className="rounded-full px-6 text-xs font-semibold shadow-sm active:scale-[0.98]"
            >
              <Link href="/book-appointment" className="flex items-center gap-1.5">
                <span>Book online</span>
                <span className="text-xs">→</span>
              </Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center space-x-2">
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

      {/* Mobile Slide-Over Navigation with Motion AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 z-50 bg-[#171717]/60 backdrop-blur-sm"
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed inset-y-0 right-0 w-full max-w-xs bg-[#FFFFFF] shadow-2xl p-6 flex flex-col justify-between overflow-y-auto border-l border-[#E8E8E3]"
            >
              <div>
                {/* Header */}
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

                {/* Navigation links */}
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
                            : "text-[#171717] hover:bg-[#DDEDE3]/50 hover:text-[#315C4A]"
                        )}
                      >
                        <span>{link.label}</span>
                        <ChevronRight className="w-4 h-4 text-[#70706B]" />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
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
                <Button
                  variant="outline"
                  className="w-full justify-center border-[#E8E8E3] text-[#315C4A] hover:bg-[#DDEDE3]"
                  asChild
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Link href="/login">Portal Sign In (Patient & Staff)</Link>
                </Button>
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
