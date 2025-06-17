"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";
import { BorderBeam } from "../components/border-beam";

// Define experience data
const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    location: "San Francisco, CA",
    period: "Jan 2021 - Present",
    description:
      "Lead the frontend development team in building and maintaining modern web applications using React, Next.js, and TypeScript. Implemented CI/CD pipelines, improved performance by 40%, and mentored junior developers.",
    skills: ["React", "Next.js", "TypeScript", "CI/CD", "Team Leadership"],
    color: "#9c40ff"
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    location: "New York, NY",
    period: "Mar 2018 - Dec 2020",
    description:
      "Developed and maintained full-stack web applications using the MERN stack. Collaborated with designers and product managers to deliver high-quality features on time. Improved database performance and implemented RESTful APIs.",
    skills: ["React", "Node.js", "MongoDB", "Express", "RESTful APIs"],
    color: "#40a9ff"
  },
  {
    title: "Junior Web Developer",
    company: "WebCraft Agency",
    location: "Boston, MA",
    period: "Jun 2016 - Feb 2018",
    description:
      "Created responsive websites for clients across various industries. Worked with HTML, CSS, JavaScript, and WordPress. Participated in client meetings and implemented feedback effectively.",
    skills: ["HTML/CSS", "JavaScript", "WordPress", "Responsive Design"],
    color: "#ffaa40"
  },
];

export default function Experience() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work Experience
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            My professional journey and career highlights.
          </p>
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Timeline line background */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-border/30"></div>

          {/* Animated timeline progress */}
          <motion.div
            className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-1 bg-primary origin-top"
            style={{ height: lineHeight }}
          />

          {/* Experience items */}
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`relative mb-12 md:mb-24 ${index % 2 === 0
                ? "md:text-right md:pr-12 md:mr-auto md:ml-0"
                : "md:text-left md:pl-12 md:ml-auto md:mr-0"
                } md:w-1/2`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Timeline dot */}
              <motion.div
                className="absolute top-0 left-0 md:left-auto md:right-0 md:translate-x-1/2 w-5 h-5 rounded-full bg-primary border-4 border-background z-10"
                animate={{
                  scale: hoveredCard === index ? 1.5 : 1,
                  boxShadow: hoveredCard === index ? `0 0 15px ${exp.color}` : "none"
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Card with border beam effect */}
              <div className="bg-background p-6 rounded-lg shadow-lg border border-border relative overflow-hidden group">
                {hoveredCard === index && (
                  <BorderBeam
                    colorFrom={exp.color}
                    colorTo="#6d28d9"
                    size={300}
                    duration={10}
                    delay={index}
                  />
                )}

                <motion.div
                  animate={{
                    y: hoveredCard === index ? -5 : 0,
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <motion.div
                      className="p-1 rounded-full bg-primary/10 hidden group-hover:flex items-center justify-center"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredCard === index ? 1 : 0,
                        scale: hoveredCard === index ? 1 : 0.8
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <ArrowUpRight size={14} className="text-primary" />
                    </motion.div>
                  </div>

                  <h4 className="text-primary font-medium mb-3">{exp.company}</h4>

                  <div className="flex flex-wrap items-center text-sm text-muted-foreground mb-4 gap-4">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-1" />
                      {exp.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-1" />
                      {exp.location}
                    </div>
                  </div>

                  <p className="mb-4 text-muted-foreground">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <motion.span
                        key={skill}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(139, 92, 246, 0.2)" }}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#contact"
            className="inline-flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors relative overflow-hidden group"
            whileHover={{ scale: 1.05 }}
          >
            <span className="relative z-10">Let&apos;s Work Together</span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ x: "-100%" }}
              whileHover={{ x: "0%" }}
              transition={{ duration: 0.5 }}
            />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
} 