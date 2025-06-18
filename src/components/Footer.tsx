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

          <div className="mt-8  pt-8 flex justify-center">
            <a
              href="#hero"
              className="p-3 bg-primary/10 hover:bg-primary/20 rounded-full transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp size={20} className="text-primary" />
            </a>
          </div>

          <div className="flex flex-col items-center md:items-end">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} Sumama Khan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 