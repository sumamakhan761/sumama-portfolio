import Link from "next/link";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-background py-12 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <Link href="#hero" className="text-xl font-bold text-primary">
              Portfolio
            </Link>
            <p className="mt-2 text-muted-foreground">
              Creating beautiful web experiences.
            </p>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {["github", "linkedin", "twitter", "instagram"].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com/yourusername`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 hover:text-primary transition-colors"
                  aria-label={`Visit my ${social} profile`}
                >
                  <span className="sr-only">{social}</span>
                  {/* Replace with actual social icons */}
                  <div className="w-5 h-5 flex items-center justify-center">
                    {social.charAt(0).toUpperCase()}
                  </div>
                </a>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Your Name. All rights reserved.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-8 flex justify-center">
          <a
            href="#hero"
            className="p-3 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={20} className="text-primary" />
          </a>
        </div>
      </div>
    </footer>
  );
} 