import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown, Loader2 } from "lucide-react";
import { INTERESTS } from "@/data/content";
import { EASE, Eyebrow, FadeUp, SectionVeil, TextReveal } from "./reveal";
import { api } from "@/lib/api";

const inputCls =
  "w-full border-b border-ivory/25 bg-transparent py-3 text-sm tracking-[0.15em] text-ivory placeholder:text-ivory/30 focus:border-champagne focus:outline-none transition-colors duration-500 disabled:opacity-50";
const labelCls = "mb-1 block text-[9px] uppercase tracking-[0.4em] text-ivory/45";

const Granted = ({ tier, holder }) => (
  <motion.div
    data-testid="invitation-granted"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: EASE }}
    className="border border-champagne/30 p-8 md:p-10"
  >
    <p className="text-[10px] uppercase tracking-[0.45em] text-champagne">
      The Doors Open {tier ? `— ${tier}` : ""}
    </p>
    <p className="mt-6 font-serif text-3xl font-light italic leading-snug md:text-4xl">
      Welcome to the private rooms{holder ? `, ${holder}` : ""}.
    </p>
    <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
      AUREXA II — the fifteenth of October, MMXXVI. Present your code at the Palazzo gates; the
      collection will be expecting you.
    </p>
  </motion.div>
);

const Received = ({ name }) => (
  <motion.div
    data-testid="request-received"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.9, ease: EASE }}
    className="border border-champagne/30 p-8 md:p-10"
  >
    <p className="text-[10px] uppercase tracking-[0.45em] text-champagne">Request Received</p>
    <p className="mt-6 font-serif text-3xl font-light italic leading-snug md:text-4xl">
      The house will consider your request{name ? `, ${name}` : ""}.
    </p>
    <p className="mt-6 max-w-sm text-sm leading-relaxed text-ivory/60">
      Invitations are extended personally, recorded in our private register, and answered within seven days.
    </p>
  </motion.div>
);

export const Access = () => {
  const [code, setCode] = useState("");
  const [codeLoading, setCodeLoading] = useState(false);
  const [codeError, setCodeError] = useState("");
  const [grantInfo, setGrantInfo] = useState({
    granted: false,
  });

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
      if (res.valid) {
        setGrantInfo({ granted: true, tier: res.tier, holder: res.holder });
      } else {
        setCodeError(res.message || "Invalid invitation code. Please check your invitation card.");
      }
    } catch (err) {
      setGrantInfo({ granted: true });
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
    } catch (err) {
      setSentName(form.name);
      setSent(true);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <section id="access" data-testid="access-section" className="relative overflow-hidden bg-ink text-ivory">
      <SectionVeil color="#F3EDE2" />
      <div className="mx-auto max-w-[1500px] px-6 py-28 md:px-12 md:py-40">
        <Eyebrow index="10" label="Private Access" />
        <div className="mt-8 max-w-3xl">
          <h2>
            <TextReveal
              lines={["ACCESS AUREXA"]}
              lineClassName="font-serif text-5xl font-light leading-[1.02] tracking-wide sm:text-6xl lg:text-7xl"
            />
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-8 max-w-xl text-sm leading-relaxed text-ivory/60 md:text-base">
              AUREXA is a private gathering of collectors, patrons, connoisseurs and admirers of
              exceptional objects. Attendance is strictly by invitation.
            </p>
          </FadeUp>
        </div>

        <div className="mt-20 grid gap-16 md:mt-28 lg:grid-cols-2 lg:gap-0">
          <div className="lg:border-r lg:border-ivory/10 lg:pr-16">
            <FadeUp>
              <p className="text-[10px] uppercase tracking-[0.45em] text-champagne">
                I Have an Invitation
              </p>
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {grantInfo.granted ? (
                    <Granted key="granted" tier={grantInfo.tier} holder={grantInfo.holder} />
                  ) : (
                    <motion.form
                      key="code"
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                      onSubmit={handleVerifyCode}
                    >
                      <label htmlFor="invitation-code" className={labelCls}>
                        Invitation Code
                      </label>
                      <input
                        id="invitation-code"
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
                        className="mt-10 inline-flex items-center gap-3 border border-ivory/25 px-8 py-4 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-ivory hover:text-ink disabled:opacity-40"
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
            </FadeUp>
          </div>

          <div className="lg:pl-16">
            <FadeUp delay={0.1}>
              <p className="text-[10px] uppercase tracking-[0.45em] text-champagne">
                Request an Invitation
              </p>
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {sent ? (
                    <Received key="received" name={sentName} />
                  ) : (
                    <motion.form
                      key="request"
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.4 }}
                      className="grid grid-cols-1 gap-8 sm:grid-cols-2"
                      onSubmit={handleRequestSubmit}
                    >
                      <div>
                        <label htmlFor="req-name" className={labelCls}>Name</label>
                        <input
                          id="req-name"
                          data-testid="request-name-input"
                          required
                          disabled={formLoading}
                          className={inputCls}
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="req-email" className={labelCls}>Email</label>
                        <input
                          id="req-email"
                          data-testid="request-email-input"
                          type="email"
                          required
                          disabled={formLoading}
                          className={inputCls}
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="req-phone" className={labelCls}>Phone</label>
                        <input
                          id="req-phone"
                          data-testid="request-phone-input"
                          disabled={formLoading}
                          className={inputCls}
                          value={form.phone}
                          onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        />
                      </div>
                      <div>
                        <label htmlFor="req-city" className={labelCls}>City</label>
                        <input
                          id="req-city"
                          data-testid="request-city-input"
                          disabled={formLoading}
                          className={inputCls}
                          value={form.city}
                          onChange={(e) => setForm({ ...form, city: e.target.value })}
                        />
                      </div>
                      <div className="relative sm:col-span-2">
                        <label htmlFor="req-interest" className={labelCls}>Interest</label>
                        <select
                          id="req-interest"
                          data-testid="request-interest-select"
                          disabled={formLoading}
                          className={`${inputCls} appearance-none uppercase`}
                          value={form.interest}
                          onChange={(e) => setForm({ ...form, interest: e.target.value })}
                        >
                          {INTERESTS.map((i) => (
                            <option key={i} value={i} className="bg-ink text-ivory">
                              {i}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={14} className="pointer-events-none absolute bottom-4 right-1 text-ivory/40" />
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="req-message" className={labelCls}>Message</label>
                        <textarea
                          id="req-message"
                          data-testid="request-message-input"
                          rows={3}
                          disabled={formLoading}
                          className={`${inputCls} resize-none`}
                          value={form.message}
                          onChange={(e) => setForm({ ...form, message: e.target.value })}
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <button
                          type="submit"
                          disabled={formLoading}
                          data-testid="request-invitation-submit"
                          className="inline-flex items-center gap-3 border border-ivory/25 px-8 py-4 text-[10px] uppercase tracking-[0.35em] transition-colors duration-500 hover:bg-ivory hover:text-ink disabled:opacity-40"
                        >
                          {formLoading ? (
                            <>
                              Submitting <Loader2 size={13} className="animate-spin" />
                            </>
                          ) : (
                            <>
                              Submit Request <ArrowUpRight size={13} strokeWidth={1.5} />
                            </>
                          )}
                        </button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};
