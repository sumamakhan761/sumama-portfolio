"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, Twitter, Instagram } from "lucide-react";

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Track mouse position for parallax effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Calculate parallax movement
  const calculateParallax = (depth: number = 20) => {
    const x = (window.innerWidth / 2 - mousePosition.x) / depth;
    const y = (window.innerHeight / 2 - mousePosition.y) / depth;
    return { x, y };
  };

  // Social media links
  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/yourusername", color: "#333" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/yourusername", color: "#0077B5" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/yourusername", color: "#1DA1F2" },
    { icon: <Instagram size={20} />, url: "https://instagram.com/yourusername", color: "#E1306C" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden py-20">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-primary/10 rounded-full filter blur-[100px]"
          animate={{
            x: calculateParallax(50).x,
            y: calculateParallax(50).y,
          }}
          transition={{ type: "spring", damping: 15 }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-accent/10 rounded-full filter blur-[120px]"
          animate={{
            x: calculateParallax(40).x,
            y: calculateParallax(40).y,
          }}
          transition={{ type: "spring", damping: 15 }}
        />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[1, 2, 3, 4, 5].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-primary/5 backdrop-blur-sm border border-primary/20"
            style={{
              width: `${Math.random() * 100 + 50}px`,
              height: `${Math.random() * 100 + 50}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              rotate: [0, Math.random() * 360],
            }}
            transition={{
              duration: 3 + Math.random() * 5,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          {/* Text content */}
          <motion.div
            className="md:w-1/2 space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-block px-4 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              👋 Welcome to my portfolio
            </motion.div>

            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <span className="block">Hi, I&apos;m</span>
              <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                John Doe
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-bold text-muted-foreground"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="flex items-center">
                <span className="mr-3">Full Stack Developer</span>
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
              </div>
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              I build modern web applications with cutting-edge technologies.
              Passionate about creating beautiful, functional, and user-friendly
              digital experiences.
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <motion.a
                href="#contact"
                className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
                whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(109, 40, 217, 0.5)" }}
                whileTap={{ scale: 0.95 }}
              >
                Let&apos;s Talk
              </motion.a>
              <motion.a
                href="#projects"
                className="px-6 py-3 bg-transparent hover:bg-primary/10 border border-primary text-primary rounded-full transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Projects
              </motion.a>
            </motion.div>

            {/* Social links */}
            <motion.div
              className="flex items-center gap-4 pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <span className="text-sm text-muted-foreground">Follow me:</span>
              <div className="flex gap-3">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-card hover:bg-primary/10 rounded-full transition-colors border border-border"
                    whileHover={{
                      scale: 1.2,
                      backgroundColor: `${social.color}20`,
                      boxShadow: `0 0 10px ${social.color}40`
                    }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Image/Avatar */}
          <motion.div
            className="md:w-1/2 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <motion.div
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full bg-gradient-to-br from-primary to-accent p-1 animate-glow"
              animate={{
                x: calculateParallax(30).x,
                y: calculateParallax(30).y,
              }}
              transition={{ type: "spring", damping: 15 }}
            >
              <div className="w-full h-full rounded-full overflow-hidden bg-card border-4 border-background">
                {/* Replace with your actual profile image */}
                <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                  <span className="text-6xl font-bold text-primary/50">JD</span>
                </div>
                {/* Uncomment when you have an actual image
                <Image
                  src="/profile.jpg"
                  alt="John Doe"
                  fill
                  className="object-cover"
                />
                */}
              </div>
            </motion.div>

            {/* Tech stack indicators */}
            <motion.div
              className="absolute top-1/4 -left-4 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center animate-float"
              style={{ animationDelay: "0.5s" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <span className="text-primary font-bold">JS</span>
            </motion.div>

            <motion.div
              className="absolute bottom-1/4 -right-4 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center animate-float"
              style={{ animationDelay: "1s" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <span className="text-primary font-bold">TS</span>
            </motion.div>

            <motion.div
              className="absolute top-1/2 right-0 w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center animate-float"
              style={{ animationDelay: "1.5s" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-primary font-bold">R</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll down indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <span className="text-sm text-muted-foreground mb-2">Scroll Down</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            <ArrowDown size={20} className="text-primary" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
} 