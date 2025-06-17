"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Github, ExternalLink, Code, Layers, Database, Monitor } from "lucide-react";
import Image from "next/image";

// Define project data
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with product listings, cart functionality, user authentication, and payment processing.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
    category: "Full Stack",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "User authentication and authorization",
      "Product search and filtering",
      "Shopping cart and checkout process",
      "Payment processing with Stripe",
      "Order history and tracking",
      "Admin dashboard for product management"
    ],
    color: "#6d28d9"
  },
  {
    id: 2,
    title: "Task Management App",
    description:
      "A responsive task management application with drag-and-drop functionality, user authentication, and real-time updates.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["React", "Firebase", "Tailwind CSS", "React DnD"],
    category: "Frontend",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "Drag-and-drop task organization",
      "Real-time updates with Firebase",
      "Task categorization and filtering",
      "Due date reminders and notifications",
      "Team collaboration features",
      "Dark/light theme toggle"
    ],
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description:
      "An analytics dashboard for social media managers with data visualization, reporting, and scheduling features.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["Next.js", "TypeScript", "Chart.js", "Tailwind CSS"],
    category: "Frontend",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "Real-time analytics visualization",
      "Custom date range reporting",
      "Content scheduling and calendar view",
      "Performance metrics comparison",
      "Audience demographics analysis",
      "Export reports as PDF or CSV"
    ],
    color: "#4c1d95"
  },
  {
    id: 4,
    title: "Booking System API",
    description:
      "A RESTful API for a booking system with authentication, authorization, and resource management.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["Node.js", "Express", "PostgreSQL", "JWT"],
    category: "Backend",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "JWT authentication and role-based access",
      "Resource availability checking",
      "Booking creation and management",
      "Email notifications for bookings",
      "Rate limiting and request validation",
      "Comprehensive API documentation"
    ],
    color: "#047857"
  },
  {
    id: 5,
    title: "Weather App",
    description:
      "A weather application that provides current conditions and forecasts based on user location or search.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["React", "OpenWeather API", "Geolocation API"],
    category: "Frontend",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "Current weather conditions display",
      "5-day forecast with hourly breakdowns",
      "Location-based weather using geolocation",
      "Search for weather by city or zip code",
      "Weather alerts and notifications",
      "Animated weather icons and backgrounds"
    ],
    color: "#0284c7"
  },
  {
    id: 6,
    title: "Blog Platform",
    description:
      "A content management system for blogs with rich text editing, categories, and user management.",
    image: "/placeholder.jpg", // Replace with actual project image
    technologies: ["Next.js", "Sanity.io", "Tailwind CSS"],
    category: "Full Stack",
    liveLink: "https://example.com",
    githubLink: "https://github.com/yourusername/project",
    features: [
      "Rich text editor with markdown support",
      "Content categorization and tagging",
      "User authentication and role management",
      "SEO optimization features",
      "Comment system with moderation",
      "Analytics dashboard for content performance"
    ],
    color: "#b91c1c"
  },
];

// Define categories for filtering
const categories = ["All", "Frontend", "Backend", "Full Stack"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projectRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Filter projects based on selected category
  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((project) => project.category === filter);

  // Handle project click for modal
  const openProjectModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
  };

  // Close modal
  const closeProjectModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

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
            Here are some of my recent projects. Click on a project to learn more.
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
                ref={el => projectRefs.current[index] = el}
                style={{
                  boxShadow: hoveredProject === project.id ? `0 10px 25px ${project.color}30` : undefined
                }}
              >
                <div className="h-48 bg-muted relative overflow-hidden">
                  {/* Project Image Placeholder with gradient overlay */}
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

                  {/* Uncomment when you have actual images
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  */}

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
                  {/* Project Image Placeholder with gradient overlay */}
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

                  {/* Uncomment when you have actual images
                  <Image
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    fill
                    className="object-cover"
                  />
                  */}
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