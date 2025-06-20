"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Github, Linkedin, Twitter, Send } from "lucide-react";

export default function Contact() {

  const socialLinks = [
    { icon: <Github size={20} />, url: "https://github.com/sumamakhan761", color: "#333" },
    { icon: <Linkedin size={20} />, url: "https://linkedin.com/in/sumama-khan", color: "#0077B5" },
    { icon: <Twitter size={20} />, url: "https://twitter.com/sumamakhan761", color: "#1DA1F2" },
  ];

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
            <motion.button
              type="submit"
              className="w-full px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg flex items-center justify-center gap-2 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}

            >
              <Send className="h-5 w-5" />
              <span>
                <a href="mailto:sumamakhan800@gmail.com">
                  Let&apos;s get in touch
                </a>
              </span>
            </motion.button>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="mt-10 bg-gradient-to-br from-primary/20 to-accent/20 rounded-lg p-8 text-center flex flex-col justify-center items-center"
            >
              <h3 className="text-xl font-bold mb-4">Ready to Start a Project?</h3>
              <p className="mb-6 text-muted-foreground">
                I&apos;m currently Open to Work.
              </p>
            </motion.div>
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
          </div>

        </div>
      </div>

    </section >
  );
} 