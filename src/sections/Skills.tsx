"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BorderBeam } from "@/components/border-beam";

// Define skills with categories
const skills = [
  {
    category: "Frontend",
    items: [
      { name: "HTML5", level: 90 },
      { name: "CSS3/SCSS", level: 85 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React", level: 90 },
      { name: "Next.js", level: 85 },
      { name: "Tailwind CSS", level: 80 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 85 },
      { name: "Express", level: 80 },
      { name: "MongoDB", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "RESTful APIs", level: 85 },
      { name: "GraphQL", level: 70 },
    ],
  },
  {
    category: "Tools & Others",
    items: [
      { name: "Git/GitHub", level: 85 },
      { name: "Docker", level: 70 },
      { name: "AWS", level: 65 },
      { name: "Jest", level: 75 },
      { name: "CI/CD", level: 70 },
      { name: "Figma", level: 60 },
    ],
  },
];

// Tech stack for the rotating wheel
const techStack = [
  { name: "JavaScript", icon: "/tech/javascript.svg", color: "#F7DF1E" },
  { name: "React", icon: "/tech/react.svg", color: "#61DAFB" },
  { name: "Node.js", icon: "/tech/nodejs.svg", color: "#339933" },
  { name: "TypeScript", icon: "/tech/typescript.svg", color: "#3178C6" },
  { name: "MongoDB", icon: "/tech/mongodb.svg", color: "#47A248" },
  { name: "HTML5", icon: "/tech/html5.svg", color: "#E34F26" },
  { name: "CSS3", icon: "/tech/css3.svg", color: "#1572B6" },
  { name: "Next.js", icon: "/tech/nextjs.svg", color: "#000000" },
  { name: "GraphQL", icon: "/tech/graphql.svg", color: "#E10098" },
  { name: "Docker", icon: "/tech/docker.svg", color: "#2496ED" },
  { name: "AWS", icon: "/tech/aws.svg", color: "#FF9900" },
  { name: "Firebase", icon: "/tech/firebase.svg", color: "#FFCA28" },
  { name: "Redux", icon: "/tech/redux.svg", color: "#764ABC" },
  { name: "Tailwind CSS", icon: "/tech/tailwindcss.svg", color: "#06B6D4" },
  { name: "Git", icon: "/tech/git.svg", color: "#F05032" },
  { name: "PostgreSQL", icon: "/tech/postgresql.svg", color: "#336791" },
];

export default function Skills() {
  const [selectedTech, setSelectedTech] = useState<string | null>(null);
  const [isClient, setIsClient] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  useEffect(() => {
    setIsClient(true);

    // Start the rotation animation
    const interval = setInterval(() => {
      setRotationAngle(prev => (prev + 1) % 360);
    }, 100);

    return () => clearInterval(interval);
  }, []);



  // Function to position tech icons in a circle
  const getIconPosition = (index: number, total: number, radius: number) => {
    if (!isClient) return { x: 0, y: 0 };

    const angle = ((index / total) * 2 * Math.PI) + (rotationAngle * (Math.PI / 180));
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);

    return { x, y };
  };

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are my technical skills and expertise in various technologies.
          </p>
        </motion.div>

        {/* Tech Stack Wheel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          className="relative h-[500px] mb-20 tech-wheel-container"
        >
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <motion.div
              className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center animate-pulse-slow"
              whileHover={{ scale: 1.1 }}
            >
              <AnimatePresence mode="wait">
                {selectedTech ? (
                  <motion.div
                    key={selectedTech}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <p className="text-white font-bold">{selectedTech}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="default"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-center"
                  >
                    <p className="text-white font-bold">Tech Stack</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {isClient && techStack.map((tech, index) => {
            const position = getIconPosition(index, techStack.length, 180);

            return (
              <motion.div
                key={tech.name}
                className="absolute left-1/2 top-1/2 tech-plate"
                style={{
                  transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
                }}
                whileHover={{ scale: 1.2, zIndex: 10 }}
                onHoverStart={() => setSelectedTech(tech.name)}
                onHoverEnd={() => setSelectedTech(null)}
              >
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center bg-card border-2 border-border p-2"
                  style={{ boxShadow: `0 0 15px ${tech.color}40` }}
                >
                  <Image
                    src={tech.icon}
                    alt={tech.name}
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

         {/* Creative Skill Cards with BorderBeam */}
        <div className="space-y-16">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className={`transition-all duration-300`}
              style={{ display: 'block' }}
            >
              <div className="flex items-center gap-4 mb-8">
                {/* <div className="text-3xl">{skillGroup.icon}</div> */}
                <h3 className="text-2xl font-bold">{skillGroup.category}</h3>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-border to-transparent"></div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {skillGroup.items.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="relative bg-card p-3 rounded-lg border border-border overflow-hidden"
                    whileHover={{ y: -5 }}
                    onHoverStart={() => setHoveredSkill(skill.name)}
                    onHoverEnd={() => setHoveredSkill(null)}
                  >
                    {hoveredSkill === skill.name && (
                      <BorderBeam
                        // colorFrom={skillGroup.color}
                        colorTo="#6d28d9"
                        size={250}
                        duration={10}
                      />
                    )}

                    <div className="items-center justify-center text-center">
                      <h4 className="text-lg font-bold">{skill.name}</h4>
                      {/* <div className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full">
                        {getSkillLevel(skill.level)}
                      </div> */}
                    </div>

                    {/* <div className="relative h-3 bg-muted rounded-full overflow-hidden mb-2">
                      <motion.div
                        className="absolute top-0 left-0 h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${skillGroup.color}, #6d28d9)`,
                          width: `${skill.level}%`
                        }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        transition={{ duration: 1, delay: 0.3 }}
                        viewport={{ once: true }}
                      />
                    </div> */}

                    {/* <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Beginner</span>
                      <span>Expert</span>
                    </div> */}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Redesigned Other Technologies section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Other Technologies</h3>

          <div className="relative p-8 bg-card rounded-xl border border-border overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 z-0"></div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 relative z-10">
              {[
                "Redux",
                "Material UI",
                "Firebase",
                "Vercel",
                "Netlify",
                "Webpack",
                "Vite",
                "Storybook",
                "Cypress",
                "Strapi",
              ].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
                    y: -5
                  }}
                  className="bg-background p-4 rounded-lg border border-border flex flex-col items-center justify-center text-center h-24 shadow-sm"
                >
                  <motion.div
                    className="w-8 h-8 mb-2 bg-primary/20 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 10, 0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                  >
                    <span className="text-primary text-sm font-bold">
                      {tech.charAt(0)}
                    </span>
                  </motion.div>
                  <span className="font-medium">{tech}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}