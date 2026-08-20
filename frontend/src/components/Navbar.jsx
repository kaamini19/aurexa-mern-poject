import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "./reveal";

const LINKS = [
  { label: "Collection", id: "collection" },
  { label: "Exhibition", id: "exhibition" },
  { label: "Auction", id: "auction" },
  { label: "Experience", id: "experience" },
  { label: "Journal", id: "journal" },
];

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const go = (id) => {
    setOpen(false);
    setTimeout(() => scrollToId(id), open ? 350 : 0);
  };

  return (
    <>
      <header
        data-testid="navbar"
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "border-b border-ivory/10 bg-ink/90 py-3 backdrop-blur-md"
            : "bg-transparent py-6 mix-blend-difference"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          <button
            data-testid="nav-logo"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-serif text-lg font-medium tracking-[0.4em] text-ivory"
          >
            AUREXA
          </button>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="text-[10px] uppercase tracking-[0.35em] text-ivory/70 transition-colors duration-300 hover:text-ivory"
              >
                {l.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <button
              data-testid="nav-access-btn"
              onClick={() => go("access")}
              className="border border-current px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-ivory transition-colors duration-300 hover:bg-ivory hover:text-ink"
            >
              Access
            </button>
            <button
              data-testid="nav-menu-btn"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] p-1 lg:hidden"
              aria-label="Open menu"
            >
              <span className="h-px w-6 bg-ivory" />
              <span className="h-px w-6 bg-ivory" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col bg-ink px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg tracking-[0.4em]">AUREXA</span>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="text-[10px] uppercase tracking-[0.35em] text-ivory/70"
              >
                Close
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-2">
              {[...LINKS, { label: "Access", id: "access" }].map((l, i) => (
                <span key={l.id} className="block overflow-hidden">
                  <motion.button
                    data-testid={`mobile-nav-${l.id}`}
                    onClick={() => go(l.id)}
                    className="block py-2 text-left font-serif text-5xl font-light text-ivory transition-colors duration-300 hover:text-champagne"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.7, ease: EASE, delay: 0.06 * i }}
                  >
                    {l.label}
                  </motion.button>
                </span>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] uppercase tracking-[0.45em] text-champagne"
            >
              By Invitation Only — MMXXVI
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
