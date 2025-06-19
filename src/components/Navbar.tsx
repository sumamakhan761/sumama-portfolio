"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import Link from "next/link";
import { BorderBeam } from "./border-beam";

// Define navigation items
const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Set isClient to true when component mounts
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Check if device is mobile
  useEffect(() => {
    if (!isClient) return;

    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkIsMobile();

    // Add resize listener
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, [isClient]);

  // Handle scroll event to change navbar appearance and track active section
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const sections = navItems.map((item) => item.href.substring(1));

      // Update scrolled state for navbar background (only apply fancy effects on desktop)
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Find the current active section
      for (const section of sections.reverse()) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isClient]);

  // Function to scroll to a section
  const scrollToSection = (sectionId: string) => {
    if (!isClient) return;

    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = isMobile ? -60 : -80; // Smaller offset for mobile
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // Prevent body scrolling when mobile menu is open
  useEffect(() => {
    if (!isClient) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, isClient]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 md:top-3.5 left-0 md:left-1/2 w-full md:-translate-x-1/2 z-50 transition-all duration-300 ${isMobile
        ? "bg-gray-950/95 backdrop-blur-xl border-b border-border/30"
        : scrolled
          ? "rounded-full h-14 bg-gray-950 backdrop-blur-xl border border-border/30 scale-95 max-w-xl"
          : "rounded-full h-14 bg-background/80 w-[100%] max-w-2xl"
        }`}
    >
      <div className={`relative h-full w-full overflow-hidden ${!isMobile ? "rounded-full" : ""}`}>
        {scrolled && !isMobile && (
          <BorderBeam
            colorFrom="var(--primary)"
            colorTo="var(--accent)"
            duration={10}
            size={300}
            borderWidth={1}
          />
        )}

        <div className="mx-auto h-full px-4 md:px-6">
          <nav className="flex items-center justify-between h-14">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Command className="w-5 h-5 text-primary" />
              <span className="font-bold text-base text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                Portfolio
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href.substring(1));
                  }}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${activeSection === item.href.substring(1)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                    }`}
                >
                  {item.label}
                  {activeSection === item.href.substring(1) && (
                    <motion.span
                      layoutId="navbar-active-indicator"
                      className="absolute inset-0 rounded-full bg-primary/10 -z-10"
                      transition={{ type: "spring", duration: 0.6 }}
                    />
                  )}
                </Link>
              ))}

              {!scrolled && (
                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="ml-2 px-4 py-1.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full text-sm font-medium transition-colors"
                >
                  Get in Touch
                </Link>
              )}
            </div>

            {/* Mobile Navigation Button */}
            <div className="md:hidden">
              <button
                aria-label={isOpen ? "Close menu" : "Open menu"}
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 bg-gray-950/98 backdrop-blur-xl z-50 overflow-auto"
          >
            <div className="p-4 flex flex-col h-full">
              <div className="flex flex-col gap-4 mt-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(item.href.substring(1));
                      setIsOpen(false);
                    }}
                    className={`px-4 py-4 rounded-lg text-center text-lg ${activeSection === item.href.substring(1)
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-primary/5 hover:text-primary"
                      } transition-colors`}
                  >
                    {item.label}
                  </Link>
                ))}

                <Link
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                    setIsOpen(false);
                  }}
                  className="mt-4 px-4 py-4 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg text-center text-lg transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}