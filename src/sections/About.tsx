"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { FileText, Calendar, Briefcase, GraduationCap, ArrowRight } from "lucide-react";

export default function About() {
  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  // Key facts
  const keyFacts = [
    {
      icon: <Calendar className="text-primary" size={24} />,
      count: "1.5+",
      text: "Years of Experience",
    },
    {
      icon: <Briefcase className="text-primary" size={24} />,
      count: "20+",
      text: "Projects Completed",
    },
    {
      icon: <GraduationCap className="text-primary" size={24} />,
      count: "20+",
      text: "Technologies ",
    },
    {
      icon: <GraduationCap className="text-primary" size={24} />,
      count: "600+",
      text: "DSA Problems",
    }
  ];

  return (
    <section id="about" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute bottom-40 left-10 w-64 h-64 bg-primary/10 rounded-full filter blur-[100px]" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-accent/10 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Get to know me better - my background, skills, and what drives me as a developer.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="relative w-full aspect-square max-w-sm mx-auto flex mt-0 md:mt-24">
              {/* Image frame with gradient border */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary to-accent p-1 shadow-xl"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-full h-full rounded-xl overflow-hidden bg-card relative">
                  {/* Replace with your actual image */}
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    {/* <span className="text-6xl font-bold text-primary/50">SK</span> */}
                    <Image
                      src="/profile.png"
                      alt="Sumama"
                      fill
                      className="object-cover absolute top-0 left-0"
                    />
                  </div>


                </div>
              </motion.div>

              {/* Decorative elements */}
              <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-primary/10 rounded-full animate-pulse-slow"></div>
              <div className="absolute -top-6 -left-6 w-16 h-16 bg-accent/10 rounded-full animate-float"></div>
            </div>

            {/* Resume button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-8 text-center md:text-left"
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
                whileHover={{ scale: 1.05, x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <FileText size={18} className="mr-2" />
                Download Resume
                <ArrowRight size={16} className="ml-2" />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Content column */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="space-y-8"
          >
            <motion.div variants={itemVariants} className="space-y-4">
              <h3 className="text-2xl font-bold">Who am I?</h3>
              <p className="text-muted-foreground text-[18px]">
                I&apos;m a passionate Software Development with robust expertise in Data Structures and Algorithms (DSA) using Java,  golang and other languages. over 1.5-year of hands-on experience gained through building and deploying multiple projects in Full Stack development, AI/ML. I have solved more then 600 DSA problems, which has sharpened my problem-solving skills and enabled me to design efficient, scalable solutions.
              </p>
              <p className="text-muted-foreground text-[18px]">
              My technical skills span across the entire software development lifecycle.I am continuously learning and experimenting with emerging technologies.
              </p>
            </motion.div>



            {/* Key Facts */}
            <motion.div variants={itemVariants} className="pt-6">
              <h3 className="text-xl font-bold mb-6">Key Facts</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {keyFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    className="bg-card p-4 rounded-lg border border-border text-center"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="w-12 h-12 mx-auto mb-3 bg-primary/10 rounded-full flex items-center justify-center">
                      {fact.icon}
                    </div>
                    <h4 className="text-2xl font-bold text-primary mb-1">{fact.count}</h4>
                    <p className="text-sm text-muted-foreground">{fact.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
} 