"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Send, Mail, MapPin, Github, Linkedin, Twitter } from "lucide-react";
import { BorderBeam } from "../components/border-beam";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  
  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/sumamakhan761", color: "#333" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/sumama-khan", color: "#0077B5" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/sumamakhan761", color: "#1DA1F2" },
  ];

  // const [isSubmitting, setIsSubmitting] = useState(false);
  // const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setIsSubmitting(true);

  //   try {
  //     const response = await fetch("/api/contact", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formState),
  //     });

  //     if (response.ok) {
  //       setIsSubmitted(true);
  //       setFormState({ name: "", email: "", message: "" });
  //       setTimeout(() => {
  //         setIsSubmitted(false);
  //       }, 5000);
  //     } else {
  //       console.error("Form submission failed");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting form:", error);
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  const contactMethods = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email",
      value: "sumamakhan800@gmail.com",
      delay: 0.1,
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Location",
      value: "Mumbai, India",
      delay: 0.3,
    },
  ];

  const inputVariants = {
    focus: {
      scale: 1.02,
      boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)",
      borderColor: "rgba(139, 92, 246, 0.8)",
    },
    blur: {
      scale: 1,
      boxShadow: "0 0 0px rgba(139, 92, 246, 0)",
      borderColor: "rgba(39, 39, 42, 0.2)",
    },
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-40 left-10 w-64 h-64 bg-primary/5 rounded-full filter blur-[100px]" />
        <div className="absolute bottom-40 right-10 w-72 h-72 bg-accent/5 rounded-full filter blur-[100px]" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or want to collaborate? Feel free to reach out!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="relative"
          >
            <div className="bg-background border border-border rounded-lg p-8 relative overflow-hidden">
              {/* <AnimatePresence>
                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-background z-10 p-8"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring" }}
                      className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4"
                    >
                      <Check className="h-8 w-8 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2">Message Sent!</h3>
                    <p className="text-center text-muted-foreground">
                      Thank you for reaching out. I&apos;ll get back to you as soon as possible.
                    </p>
                  </motion.div>
                ) : null}
              </AnimatePresence> */}

              <h3 className="text-xl font-bold mb-6">Send Me a Message</h3>
              <form ref={formRef}className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={activeField === "name" ? "focus" : "blur"}
                    className="relative"
                  >
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      onFocus={() => setActiveField("name")}
                      onBlur={() => setActiveField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:outline-none"
                      required
                    />
                    {activeField === "name" && (
                      <BorderBeam
                        colorFrom="#9c40ff"
                        colorTo="#ffaa40"
                        size={200}
                        duration={8}
                      />
                    )}
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Your Email
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={activeField === "email" ? "focus" : "blur"}
                    className="relative"
                  >
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onFocus={() => setActiveField("email")}
                      onBlur={() => setActiveField(null)}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:outline-none"
                      required
                    />
                    {activeField === "email" && (
                      <BorderBeam
                        colorFrom="#40a9ff"
                        colorTo="#9c40ff"
                        size={200}
                        duration={8}
                      />
                    )}
                  </motion.div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Your Message
                  </label>
                  <motion.div
                    variants={inputVariants}
                    animate={activeField === "message" ? "focus" : "blur"}
                    className="relative"
                  >
                    <textarea
                      id="message"
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      onFocus={() => setActiveField("message")}
                      onBlur={() => setActiveField(null)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:outline-none resize-none"
                      required
                    ></textarea>
                    {activeField === "message" && (
                      <BorderBeam
                        colorFrom="#ffaa40"
                        colorTo="#40a9ff"
                        size={300}
                        duration={10}
                      />
                    )}
                  </motion.div>
                </div>

                <motion.button
                  type="submit"
                  className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 relative overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : ( */}
                    {/* <> */}
                      <Send className="h-5 w-5" />
                      <span>Send Message</span>
                    {/* </> */}
                  {/* )} */}
                  {/* <motion.span
                    className="absolute bottom-0 left-0 h-1 bg-accent"
                    initial={{ width: 0 }}
                    animate={isSubmitting ? { width: "100%" } : { width: 0 }}
                    transition={{ duration: 2 }}
                  /> */}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-background border border-border rounded-lg p-8"
            >
              <h3 className="text-xl font-bold mb-6">Contact Information</h3>
              <div className="space-y-6">
                {contactMethods.map((method) => (
                  <motion.div
                    key={method.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: method.delay }}
                    viewport={{ once: true }}
                    className="flex items-start"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="p-3 bg-primary/10 rounded-full text-primary mr-4"
                    >
                      {method.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-medium">{method.title}</h4>
                      <p className="text-muted-foreground">{method.value}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            viewport={{ once: true, amount: 0.2 }}
            className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 text-center"
          >
            <h3 className="text-xl font-bold mb-4">Ready to Start a Project?</h3>
            <p className="mb-6 text-muted-foreground">
              I&apos;m currently Open to Work.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
    </section >
  );
} 