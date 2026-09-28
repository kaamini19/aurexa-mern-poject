import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { scrollToId } from "@/lib/scroll";
import { EASE } from "./reveal";

const LINKS = [
  { label: "About", id: "what-is-aurexa" },
  { label: "Experience", id: "experience" },
  { label: "Glimpse", id: "glimpse" },
  { label: "Auction", id: "auction" },
  { label: "Gallery", id: "gallery" },
  { label: "Details", id: "details" },
  { label: "Journal", id: "journal" },
  { label: "Access", id: "access" },
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
            ? "border-b border-champagne/20 bg-[#07101D]/95 py-3.5 backdrop-blur-md shadow-lg"
            : "bg-transparent py-6"
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-12">
          {/* Brand Logo / Return to Top */}
          <button
            onClick={() => go("intro")}
            className="text-left font-serif text-lg font-light tracking-[0.4em] text-ivory hover:text-champagne transition-colors duration-300"
            aria-label="AUREXA Home"
          >
            AUREXA
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 xl:gap-8 lg:flex">
            {LINKS.map((l) => (
              <button
                key={l.id}
                data-testid={`nav-link-${l.id}`}
                onClick={() => go(l.id)}
                className="text-[10px] uppercase tracking-[0.32em] text-ivory/70 transition-colors duration-300 hover:text-champagne font-light"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* Right Action / Mobile Trigger */}
          <div className="flex items-center justify-end">
            <button
              onClick={() => go("access")}
              className="hidden sm:inline-flex items-center border border-champagne/40 bg-champagne/10 px-4 py-1.5 text-[9px] uppercase tracking-[0.3em] text-champagne hover:bg-champagne hover:text-ink transition-all duration-300 mr-4 lg:mr-0"
            >
              Invitation
            </button>

            <button
              data-testid="nav-menu-btn"
              onClick={() => setOpen(true)}
              className="flex flex-col gap-[5px] p-2 lg:hidden text-ivory"
              aria-label="Open menu"
            >
              <span className="h-px w-6 bg-ivory" />
              <span className="h-px w-6 bg-champagne" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            data-testid="mobile-menu"
            className="fixed inset-0 z-[60] flex flex-col bg-[#07101D] px-8 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <div className="flex items-center justify-between">
              <span className="font-serif text-lg tracking-[0.4em] text-ivory">AUREXA</span>
              <button
                data-testid="mobile-menu-close"
                onClick={() => setOpen(false)}
                className="text-[10px] uppercase tracking-[0.35em] text-ivory/70 hover:text-champagne"
              >
                Close ✕
              </button>
            </div>
            <nav className="flex flex-1 flex-col justify-center gap-1.5 overflow-y-auto py-6">
              {LINKS.map((l, i) => (
                <span key={l.id} className="block overflow-hidden">
                  <motion.button
                    data-testid={`mobile-nav-${l.id}`}
                    onClick={() => go(l.id)}
                    className="block py-1.5 text-left font-serif text-3xl sm:text-4xl font-light text-ivory transition-colors duration-300 hover:text-champagne"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.6, ease: EASE, delay: 0.04 * i }}
                  >
                    {l.label}
                  </motion.button>
                </span>
              ))}
            </nav>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
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

export default Navbar;
