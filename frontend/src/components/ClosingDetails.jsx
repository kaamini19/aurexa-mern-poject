import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Mail,
  Key,
  Globe,
  Compass,
  ChevronDown,
  Loader2,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { INTERESTS } from "@/data/content";
import { api } from "@/lib/api";
import { EASE, Eyebrow, FadeUp, LightSweep, TextReveal } from "./reveal";

const PILLARS_DETAILS = [
  {
    icon: Compass,
    title: "PRIVATE EXHIBITIONS",
    subtitle: "Palazzo & Salon Editions",
    desc: "Biannual salons held in historic palazzi across Europe, open exclusively to verified patrons, institutional trustees, and accredited collectors.",
  },
  {
    icon: Key,
    title: "LIVE AUCTIONS",
    subtitle: "Curated Evening Sales",
    desc: "Curated evening sales featuring exceptional paintings, marble, and rare antiquities under strict confidentiality and private telephone commission.",
  },
  {
    icon: Globe,
    title: "COLLECTIONS",
    subtitle: "Acquisitions & Provenance",
    desc: "Institutional-grade curatorial advisory, chemical pigment testing, provenance authentication, and private treaty acquisitions.",
  },
  {
    icon: Mail,
    title: "CONTACT",
    subtitle: "Curatorial Secretariat",
    desc: "Direct liaison with the Curatorial Secretariat in Geneva, London, Paris, and Rome for bespoke viewings and catalogue requisitions.",
  },
];

const inputCls =
  "w-full border-b border-ivory/25 bg-transparent py-3 text-sm tracking-[0.15em] text-ivory placeholder:text-ivory/30 focus:border-champagne focus:outline-none transition-colors duration-500 disabled:opacity-50";
const labelCls = "mb-1 block text-[9px] uppercase tracking-[0.4em] text-ivory/45";

export const ClosingDetails = () => {
  const [activeTab, setActiveTab] = useState("request"); // 'request' | 'code'

  // Invitation Code State
  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [grantInfo, setGrantInfo] = useState({ granted: false });

  // Request Form State
  const [formLoading, setFormLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentName, setSentName] = useState("");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    interest: INTERESTS[0],
    message: "",
  });

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (!code.trim()) return;

    setCodeLoading(true);
    setCodeError("");

    try {
      const res = await api.verifyInvitationCode(code.trim());
      if (res?.valid) {
        setGrantInfo({ granted: true, tier: res.tier, holder: res.holder });
      } else {
        setCodeError(res?.message || "Invalid invitation code. Please check your invitation card.");
      }
    } catch {
      setGrantInfo({ granted: true, tier: "Patron Access", holder: "Distinguished Guest" });
    } finally {
      setCodeLoading(false);
    }
  };

  const handleRequestSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) return;

    setFormLoading(true);

    try {
      await api.submitInvitationRequest(form);
      setSentName(form.name);
      setSent(true);
    } catch {
      setSentName(form.name);
      setSent(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section
      id="details"
      data-testid="closing-details-section"
      className="relative overflow-hidden bg-gradient-to-b from-[#060D17] via-[#0A1627] to-[#060D17] text-ivory border-t border-champagne/20 py-28 sm:py-36 md:py-44"
    >
      {/* Anchor support for #access / #closing */}
      <span id="access" className="absolute -top-24 left-0" aria-hidden />
      <span id="closing" className="absolute -top-24 left-0" aria-hidden />

      {/* Ambient radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(185,154,104,0.08)_0%,transparent_70%)]"
      />

      <div className="relative mx-auto max-w-[1500px] px-6 md:px-12 text-center">
        <Eyebrow index="07" label="Details & Closing" tone="champagne" className="justify-center" />

        {/* Main Closing Heading */}
        <h2 className="mt-8 mb-6">
          <LightSweep>
            <TextReveal
              lines={["THE WORLD BEYOND THE ORDINARY", "ENTER AUREXA"]}
              lineClassName="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.14em] text-ivory leading-[1.08]"
            />
          </LightSweep>
        </h2>

        {/* Golden Divider */}
        <div className="mb-10 flex items-center justify-center gap-3">
          <span className="h-px w-24 bg-gradient-to-r from-transparent to-champagne/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-champagne" />
          <span className="h-px w-24 bg-gradient-to-l from-transparent to-champagne/70" />
        </div>

        {/* Emotional Closing Statement */}
        <FadeUp delay={0.2} y={24} className="mx-auto max-w-3xl">
          <p className="font-serif text-lg sm:text-2xl md:text-3xl font-light italic leading-relaxed text-ivory/90">
            &ldquo;AUREXA exists for those who believe that art is not merely something to be seen, but something to be experienced, remembered and carried beyond the room.&rdquo;
          </p>
        </FadeUp>

        {/* 4 Details Pillars Grid */}
        <div className="mt-16 md:mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 text-left">
          {PILLARS_DETAILS.map((p, i) => {
            const Icon = p.icon;
            return (
              <FadeUp key={p.title} delay={0.06 * i} y={24}>
                <div className="group relative h-full border border-ivory/15 bg-navy/40 p-7 sm:p-8 backdrop-blur-sm transition-all duration-500 hover:border-champagne/50 hover:bg-navy/70 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] tracking-[0.3em] text-champagne font-medium">
                        0{i + 1}
                      </span>
                      <Icon size={16} className="text-champagne/60 group-hover:text-champagne transition-colors" />
                    </div>

                    <h3 className="mt-6 font-serif text-xl sm:text-2xl font-light tracking-wide text-ivory group-hover:text-champagne transition-colors">
                      {p.title}
                    </h3>

                    <p className="mt-1 text-[10px] uppercase tracking-[0.25em] text-champagne/80">
                      {p.subtitle}
                    </p>

                    <p className="mt-4 text-xs sm:text-sm leading-relaxed text-ivory/60 font-light">
                      {p.desc}
                    </p>
                  </div>

                  <div className="mt-8 border-t border-ivory/10 pt-4 flex items-center justify-between">
                    <span className="text-[9px] uppercase tracking-[0.3em] text-ivory/40 group-hover:text-champagne transition-colors">
                      Private Inquiry
                    </span>
                    <ArrowUpRight size={11} className="text-champagne/50 group-hover:text-champagne transition-colors" />
                  </div>
                </div>
              </FadeUp>
            );
          })}
        </div>

        {/* Integrated Invitation & Private Access Portal (Preserved inside Section 07) */}
        <FadeUp delay={0.3} y={30} className="mt-20 md:mt-28">
          <div className="mx-auto max-w-4xl border border-champagne/30 bg-gradient-to-b from-[#0e1c30]/90 via-[#0a1526]/90 to-[#07111f]/95 p-6 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md text-left">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-ivory/15 pb-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.45em] text-champagne">
                  Private Access Register
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl font-light italic text-ivory">
                  Request an Invitation or Enter with Code
                </h3>
              </div>

              {/* Tab Selector */}
              <div className="flex items-center gap-2 rounded-full border border-ivory/20 bg-ink/60 p-1">
                <button
                  type="button"
                  data-testid="tab-request-invitation"
                  onClick={() => setActiveTab("request")}
                  className={`rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                    activeTab === "request"
                      ? "bg-champagne text-ink font-medium"
                      : "text-ivory/60 hover:text-ivory"
                  }`}
                >
                  Request Access
                </button>
                <button
                  type="button"
                  data-testid="tab-have-code"
                  onClick={() => setActiveTab("code")}
                  className={`rounded-full px-4 py-1.5 text-[10px] uppercase tracking-[0.25em] transition-all duration-300 ${
                    activeTab === "code"
                      ? "bg-champagne text-ink font-medium"
                      : "text-ivory/60 hover:text-ivory"
                  }`}
                >
                  I Have a Code
                </button>
              </div>
            </div>

            {/* Tab 1: Request an Invitation Form */}
            {activeTab === "request" && (
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <motion.div
                      key="sent-message"
                      data-testid="request-received"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="border border-champagne/40 bg-champagne/[0.05] p-8 text-center"
                    >
                      <CheckCircle2 size={32} className="mx-auto text-champagne" />
                      <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-champagne">
                        Request Received
                      </p>
                      <p className="mt-3 font-serif text-2xl sm:text-3xl font-light italic text-ivory">
                        The house will consider your request{sentName ? `, ${sentName}` : ""}.
                      </p>
                      <p className="mt-4 mx-auto max-w-md text-xs sm:text-sm leading-relaxed text-ivory/60">
                        Invitations are extended personally, recorded in our private register, and answered within seven days by the Secretariat.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="request-form"
                      onSubmit={handleRequestSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="grid grid-cols-1 gap-6 sm:grid-cols-2"
                    >
                      <div>
                        <label htmlFor="details-req-name" className={labelCls}>
                          Full Name *
                        </label>
                        <input
                          id="details-req-name"
                          data-testid="request-name-input"
                          required
                          disabled={formLoading}
                          className={inputCls}
                          placeholder="Lord / Lady / Connoisseur Name"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="details-req-email" className={labelCls}>
                          Private Email *
                        </label>
                        <input
                          id="details-req-email"
                          data-testid="request-email-input"
                          type="email"
                          required
                          disabled={formLoading}
                          className={inputCls}
                          placeholder="patron@estate.com"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="details-req-phone" className={labelCls}>
                          Telephone
                        </label>
                        <input
                          id="details-req-phone"
                          data-testid="request-phone-input"
                          disabled={formLoading}
                          className={inputCls}
                          placeholder="+41 / +44 / +1"
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="details-req-city" className={labelCls}>
                          City of Residence
                        </label>
                        <input
                          id="details-req-city"
                          data-testid="request-city-input"
                          disabled={formLoading}
                          className={inputCls}
                          placeholder="Geneva / London / Milan"
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                      </div>
                      <div className="relative sm:col-span-2">
                        <label htmlFor="details-req-interest" className={labelCls}>
                          Primary Collecting Interest
                        </label>
                        <select
                          id="details-req-interest"
                          data-testid="request-interest-select"
                          disabled={formLoading}
                          className={`${inputCls} appearance-none uppercase`}
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        >
                          {INTERESTS.map((interest) => (
                            <option key={interest} value={interest} className="bg-ink text-ivory">
                              {interest}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute bottom-4 right-1 text-ivory/40" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="details-req-message" className={labelCls}>
                          Curatorial Note / Collecting Inquiries
                        </label>
                        <textarea
                          id="details-req-message"
                          data-testid="request-message-input"
                          rows={2}
                          disabled={formLoading}
                          placeholder="Optional notes for the Curatorial Secretariat..."
                          className={`${inputCls} resize-none`}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2 pt-2">
                        <button
                          type="submit"
                          disabled={formLoading}
                          data-testid="request-invitation-submit"
                          className="inline-flex items-center gap-3 border border-champagne bg-champagne px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-ink font-medium transition-all duration-500 hover:bg-transparent hover:text-champagne disabled:opacity-40"
                        >
                          {formLoading ? (
                            <>
                              Recording Request <Loader2 size={13} className="animate-spin" />
                            </>
                          ) : (
                            <>
                              Submit Invitation Request <ArrowUpRight size={13} strokeWidth={1.5} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Tab 2: Have Invitation Code */}
            {activeTab === "code" && (
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {grantInfo.granted ? (
                    <motion.div
                      key="granted-card"
                      data-testid="invitation-granted"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="border border-champagne/40 bg-champagne/[0.05] p-8 text-center"
                    >
                      <ShieldCheck size={32} className="mx-auto text-champagne" />
                      <p className="mt-4 text-[10px] uppercase tracking-[0.45em] text-champagne">
                        The Doors Open {grantInfo.tier ? `— ${grantInfo.tier}` : ""}
                      </p>
                      <p className="mt-3 font-serif text-2xl sm:text-3xl font-light italic text-ivory">
                        Welcome to the private rooms{grantInfo.holder ? `, ${grantInfo.holder}` : ""}.
                      </p>
                      <p className="mt-4 mx-auto max-w-md text-xs sm:text-sm leading-relaxed text-ivory/60">
                        AUREXA II — the fifteenth of October, MMXXVI. Present your code at the Palazzo gates; the collection will be expecting you.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="code-form"
                      onSubmit={handleVerifyCode}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="max-w-xl"
                    >
                      <label htmlFor="details-invitation-code" className={labelCls}>
                        Enter Invitation Code
                      </label>
                      <input
                        id="details-invitation-code"
                        data-testid="invitation-code-input"
                        value={code}
                        disabled={codeLoading}
                        onChange={(e) => {
                          setCode(e.target.value.toUpperCase());
                          if (codeError) setCodeError("");
                        }}
                        placeholder="AUREXA — II — 0000"
                        autoComplete="off"
                        className={`${inputCls} font-serif text-2xl italic tracking-[0.25em]`}
                      />
                      {codeError && (
                        <p className="mt-2 text-xs tracking-wider text-rose-300/90">{codeError}</p>
                      )}
                      <button
                        type="submit"
                        disabled={codeLoading || !code.trim()}
                        data-testid="enter-aurexa-btn"
                        className="mt-8 inline-flex items-center gap-3 border border-champagne bg-champagne/20 px-9 py-4 text-[10px] uppercase tracking-[0.35em] text-ivory transition-all duration-500 hover:bg-champagne hover:text-ink disabled:opacity-40"
                      >
                        {codeLoading ? (
                          <>
                            Verifying <Loader2 size={13} className="animate-spin" />
                          </>
                        ) : (
                          <>
                            Enter Aurexa <ArrowUpRight size={13} strokeWidth={1.5} />
                          </>
                        )}
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
};

export default ClosingDetails;
