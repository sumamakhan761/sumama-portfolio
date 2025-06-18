"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, ExternalLink, Code, Layers, Database, Monitor } from "lucide-react";
import Image from "next/image";

// Define Project interface
interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  liveLink: string;
  githubLink: string;
  features: string[];
  color: string;
}

// Define project data
const projects: Project[] = [
  {
    id: 1,
    title: "SafeReport",
    description:
      "A secure, full-stack web application for anonymous crime reporting, designed to protect user privacy and facilitate quick incident submission.",
    image: "/project/safereport.png", // Replace with actual project image
    technologies: ["Next.js", "GeminiAI", "Mapbox", "TypeScript", "TailwindCSS", "Postgres", "Prisma"],
    category: "Full Stack",
    liveLink: "https://crime-report-eight.vercel.app/",
    githubLink: "https://github.com/sumamakhan761/crime-report",
    features: [
      "Modern, responsive UI with Mapbox geolocation tracking",
      "Gemini AI integration for smart incident detection from images and auto-generated report content",
      "Unique report IDs for user tracking and status updates (pending/resolved/rejected)",
      "Secure, role-based admin dashboard and a blog for emergency awareness"
    ],
    color: "#6d28d9"
  },
  {
    id: 2,
    title: "WireCode",
    description:
      "A full-stack web app that transforms wireframe images into responsive React + Tailwind components using AI.",
    image: "/project/wireframe.png", // Updated path
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "Postgres", "FireBase", "Blob", "OpenRouter.ai", "Sandpack"],
    category: "Full Stack",
    githubLink: "https://github.com/sumamakhan761/wirecode",
    liveLink: "https://wirecode.vercel.app/",
    features: [
      "AI-powered wireframe-to-code conversion via OpenRouter",
      "Firebase Auth, Drizzle ORM, and Vercel Blob for secure user, image, and code storage",
      "Real-time, streamed code generation with live editing (Sandpack)",
      "Conversion history tracking and a credit-based usage syste"
    ],
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Resume Builder",
    description:
      "A full-stack, ATS-friendly resume builder for seamless resume creation and management.",
    image: "/project/resumeBuilder.png", // Updated path
    technologies: ["Next.js", "TypeScript", "TailwindCSS", "JavaScript", "Postgres", "Prisma", "Clerk", "Dnd-kit"],
    category: "Full Stack",
    liveLink: "https://resume-builder-six-blush.vercel.app/",
    githubLink: "https://github.com/sumamakhan761/resume-builder",
    features: [
      "Live form editing with real-time preview",
      "Drag-and-drop section reordering (dnd-kit) for personalized layouts",
      "Clerk for secure user authentication",
      "Professional PDF export and cross-device compatibility"
    ],
    color: "#4c1d95"
  },
  {
    id: 4,
    title: "Build Own Cache",
    description:
      "A Redis-compatible in-memory cache server implemented in Go that provides basic key-value storage functionality with concurrent client handling",
    image: "/project/cache.png", // Updated path
    technologies: ["Go", "Redis"],
    category: "Backend",
    liveLink: "deepwiki.com/sumamakhan761/Build-Own-Cache/",
    githubLink: "https://github.com/sumamakhan761/Build-Own-Cache",
    features: [
      "Basic key-value storage functionality with concurrent client handling",
      "Each client connection runs in its own goroutine",
      "Uses Go channels for thread-safe message passing between components",
      "In-memory storage with automatic eviction of expired items",
      "Support for basic commands like GET, SET, DEL",
    ],
    color: "#0000FF"
  },
  {
    id: 5,
    title: "Zentry",
    description:
      "Build a visually captivating website inspired by Zentry, featuring scroll-triggered animations, geometric transitions, and engaging video storytelling.",
    image: "/project/zentry.png", // Updated path
    technologies: ["React", "TailwindCSS", "JavaScript", "TypeScript"],
    category: "Frontend",
    liveLink: "https://zentry-web.onrender.com",
    githubLink: "https://github.com/sumamakhan761/zentry-web3",
    features: [
      "Scroll-triggered animations and geometric transitions",
      "Engaging video storytelling with smooth transitions",
      "Responsive design for optimal viewing on all devices",
      "Focusing on engaging UI/UX and smooth responsiveness",
      "Using Framer Motion for smooth animations and transitions",
    ],
    color: "#047857"
  },
  {
    id: 6,
    title: "Brain Tumor Detection",
    description:
      "Developed a deep learning model to detect and classify brain tumors from MRI scans, enhancing diagnostic accuracy and efficiency. The system processes medical images through preprocessing and advanced analysis to provide reliable predictions.",
    image: "/project/brainTumor.png", // Updated path
    technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "OpenCV", "Matplotlib", "Seaborn", "Pandas", "Numpy"],
    category: "AI/ML",
    liveLink: "https://github.com/sumamakhan761/Brain-tumor-classification",
    githubLink: "https://github.com/sumamakhan761/Brain-tumor-classification",
    features: [
      "Preprocessing Pipeline: Cropping, resizing, and data augmentation to optimize model performance and robustness",
      "Grad-CAM Integration: Visualizes tumor locations by highlighting affected areas in MRI scans for interpretable diagnostics",
      "Multi-Tool Framework: Leveraged TensorFlow for model training, OpenCV for image processing, and Scikit-learn for feature extraction and analysis",
      "Rigorous Validation: Evaluated using accuracy metrics, confusion matrices, and classification reports to ensure clinically viable predictions"
    ],
    color: "#b91c1c"
  },
  {
    id: 7,
    title: "Chat with SQL Database",
    description:
      "Developed an interactive chatbot that allows users to query SQL databases using natural language, streamlining data access and analysis for non-technical users. The application links Python, Streamlit, LangChain, GroqAI, MySQL, and NLP technologies to deliver a seamless, secure, and efficient user experience.",
    image: "/project/chatsql.png", // Updated path
    technologies: ["Python", "Streamlit", "LangChain", "GroqAI", "MySQL", "NLP"],
    category: "AI/ML",
    liveLink: "https://github.com/sumamakhan761/database-helper",
    githubLink: "https://github.com/sumamakhan761/database-helper",
    features: [
      "Natural Language to SQL: Uses LangChain's SQL Agent and Groq's AI models to translate user-friendly English queries into efficient SQL commands.",
      "Dynamic Database Configuration: Supports seamless switching between local SQLite and remote MySQL databases.",
      "Secure Authentication: Implements API key validation and secure credential inputs to protect data privacy.",
      "Performance Optimization: Built-in caching mechanism reduces query latency and enhances database performance.",
      "User-Friendly Interface: Developed with Streamlit for an intuitive, interactive chatbot experience."
    ],
    color: "#0000FF"
  },
];

// Define categories for filtering
const categories = ["All", "Frontend", "Backend", "Full Stack", "AI/ML"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Handle project click for modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
  };

  // Close modal
  const closeProjectModal = () => {
    setSelectedProject(null);
  };

  // Handle document body overflow when modal opens/closes
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
    } else {
      document.body.style.overflow = "auto"; // Re-enable scrolling
    }

    // Cleanup function to ensure we re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedProject]);

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Frontend":
        return <Monitor size={18} className="mr-2" />;
      case "Backend":
        return <Database size={18} className="mr-2" />;
      case "Full Stack":
        return <Layers size={18} className="mr-2" />;
      default:
        return <Code size={18} className="mr-2" />;
    }
  };

  return (
    <section id="projects" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="absolute top-40 right-10 w-96 h-96 bg-primary/10 rounded-full filter blur-[120px]" />
        <div className="absolute bottom-40 left-10 w-80 h-80 bg-accent/10 rounded-full filter blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of my few recent projects. Click on a project to learn more.
          </p>
        </motion.div>

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-2 rounded-full transition-colors ${filter === category
                ? "bg-primary text-primary-foreground"
                : "bg-card hover:bg-primary/20 text-foreground"
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-card rounded-lg overflow-hidden shadow-lg border border-border cursor-pointer group"
                onClick={() => openProjectModal(project)}
                onMouseEnter={() => setHoveredProject(project.id)}
                onMouseLeave={() => setHoveredProject(null)}
                ref={(el) => {
                  if (el) {
                    projectRefs.current[index] = el;
                  }
                }}
                style={{
                  boxShadow: hoveredProject === project.id ? `0 10px 25px ${project.color}30` : undefined
                }}
              >
                <div className="h-48 bg-muted relative overflow-hidden p-20">
                  {/* Project Image with gradient overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center bg-gradient-to-br"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${project.color}40, ${project.color}80)`
                    }}
                  >
                    <motion.div
                      initial={{ scale: 1 }}
                      animate={{
                        scale: hoveredProject === project.id ? 1.2 : 1,
                        rotate: hoveredProject === project.id ? 10 : 0
                      }}
                      transition={{ duration: 0.5 }}
                      className="text-5xl font-bold text-white/80"
                    >
                      {project.title.charAt(0)}
                    </motion.div>
                  </div>

                 <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover px-7 pt-7"
                  />

                  {/* Category badge */}
                  <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center">
                    {getCategoryIcon(project.category)}
                    <span className="text-xs font-medium">{project.category}</span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                        +{project.technologies.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="text-right">
                    <motion.span
                      className="text-primary text-sm inline-flex items-center"
                      initial={{ x: 0 }}
                      animate={{ x: hoveredProject === project.id ? 5 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      View Details <motion.span animate={{ x: hoveredProject === project.id ? 5 : 0 }}>→</motion.span>
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={closeProjectModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 20 }}
                className="bg-card w-full max-w-4xl rounded-lg shadow-xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
                style={{
                  boxShadow: `0 10px 30px ${selectedProject.color}40`
                }}
              >
                <div className="h-64 bg-muted relative">
                  {/* Project Image with gradient overlay */}
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      backgroundImage: `linear-gradient(to bottom right, ${selectedProject.color}40, ${selectedProject.color}80)`
                    }}
                  >
                    <span className="text-6xl font-bold text-white/80">
                      {selectedProject.title.charAt(0)}
                    </span>
                  </div>

                  {/* Project Image */}
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {selectedProject.title}
                      </h3>
                      <div className="flex items-center mt-2">
                        {getCategoryIcon(selectedProject.category)}
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                          {selectedProject.category}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <motion.a
                        href={selectedProject.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-card hover:bg-muted rounded-full transition-colors border border-border"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Github size={20} />
                      </motion.a>

                      <motion.a
                        href={selectedProject.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-card hover:bg-muted rounded-full transition-colors border border-border"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => e.stopPropagation()}
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>

                  <p className="mb-6 text-muted-foreground">
                    {selectedProject.description}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Key Features</h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedProject.features.map((feature, i) => (
                        <motion.li
                          key={i}
                          className="flex items-start"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary mt-2 mr-2"></span>
                          <span className="text-muted-foreground">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6">
                    <h4 className="text-lg font-semibold mb-3">Technologies</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.technologies.map((tech) => (
                        <motion.span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                          whileHover={{ scale: 1.05, backgroundColor: "rgba(109, 40, 217, 0.2)" }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <motion.button
                      onClick={closeProjectModal}
                      className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
} 