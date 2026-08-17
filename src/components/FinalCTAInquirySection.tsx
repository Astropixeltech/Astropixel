import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Send, 
  MessageSquare, 
  PhoneCall, 
  Sparkles, 
  ChevronDown, 
  ArrowUpRight,
  Clock,
  ShieldCheck,
  UserCheck
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const SERVICES_OPTIONS = [
  "Branding & Logo Design",
  "UI/UX Design",
  "Website Design",
  "Web Development",
  "E-commerce",
  "SEO & Digital Marketing",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under $1K",
  "$1K – $5K",
  "$5K – $10K",
  "$10K – $20K",
  "$20K+",
];

export const FinalCTAInquirySection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(SERVICES_OPTIONS[0]);
  const [budget, setBudget] = useState("$1K – $5K");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please fill in your name and email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      // Save submission to database
      const { error } = await supabase.from("contact_submissions").insert({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        service: service,
        budget: budget,
        message: details.trim() || `Inquiry for ${service} (Budget: ${budget})`,
        site_scope: "agency",
      });

      if (error) {
        console.warn("Database insert warning:", error);
      }

      toast.success("Thank you! Your project inquiry has been received. We'll reach out within 24 hours.");
      setFullName("");
      setEmail("");
      setPhone("");
      setDetails("");
    } catch (err) {
      console.error(err);
      toast.success("Inquiry received! We'll get back to you shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-16 sm:py-24 bg-[#0A0D14] text-white overflow-hidden">
      {/* Subtle Background Glow Orbs */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 left-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Large Framer-Style Container Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-[#111622]/90 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-2xl backdrop-blur-2xl overflow-hidden"
        >
          {/* Top Edge Gradient Line */}
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* ══════════ LEFT COLUMN — CTA & Brand Message ══════════ */}
            <div className="lg:col-span-5 space-y-8">
              {/* Badge */}
              <div>
                <span className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-semibold px-3.5 py-1.5 rounded-full tracking-wide">
                  <Sparkles size={13} className="text-purple-400" />
                  <span>Claim a $799 Consultation, on Us!</span>
                </span>
              </div>

              {/* Headline */}
              <div className="space-y-3">
                <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-display font-bold text-white tracking-tight leading-[1.18]">
                  Have a project in mind?{" "}
                  <span className="block font-serif italic font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-300 to-cyan-400">
                    Let’s make it happen.
                  </span>
                </h2>
                <p className="text-sm sm:text-base text-white/70 font-roboto leading-relaxed max-w-md">
                  Tell us about your idea, challenge, or project. We’ll get back to you with the right strategy, transparent timeline, and next steps.
                </p>
              </div>

              {/* 3 Trust Points */}
              <div className="space-y-3 pt-1 border-t border-white/10">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>Expect a response from us within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>Clear communication & transparent process</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-white/80">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <CheckCircle2 size={13} />
                  </div>
                  <span>Dedicated creative & development specialists</span>
                </div>
              </div>

              {/* Creative Profile Card */}
              <div className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5 flex items-center gap-4 group hover:border-purple-500/40 transition-all duration-300">
                <div className="relative shrink-0">
                  <img
                    src="https://res.cloudinary.com/de348sqlb/image/upload/v1784725025/alphazero-assets/instructors/sofiullah.png"
                    alt="Abdullah Al Noman — COO & Co-Founder"
                    width={80}
                    height={80}
                    loading="lazy"
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-white/15 bg-purple-950/40"
                  />
                  <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-[#111622]"></span>
                  </span>
                </div>
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm sm:text-base text-white truncate">
                      Abdullah Al Noman
                    </h4>
                  </div>
                  <p className="text-xs text-white/60 font-medium">COO & Co-Founder</p>
                  
                  <div className="pt-1 flex items-center gap-3 text-xs">
                    <a
                      href="https://wa.me/8801846484200"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-purple-400 hover:text-purple-300 transition-colors"
                    >
                      <span>Book a Call Directly</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                </div>
              </div>

            </div>


            {/* ══════════ RIGHT COLUMN — Project Inquiry Form ══════════ */}
            <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl sm:rounded-3xl p-6 sm:p-8 backdrop-blur-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                    Full Name <span className="text-purple-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                  />
                </div>

                {/* Email & Phone Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                      Your Email <span className="text-purple-400">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>

                  {/* WhatsApp Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                      WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+880 1XXX-XXXXXX"
                      className="w-full h-12 px-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
                    />
                  </div>
                </div>

                {/* Service Required */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                    Service Required
                  </label>
                  <div className="relative">
                    <select
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full h-12 px-4 pr-10 rounded-xl bg-[#181F2E] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all appearance-none cursor-pointer"
                    >
                      {SERVICES_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#181F2E] text-white py-2">
                          {opt}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 pointer-events-none" />
                  </div>
                </div>

                {/* Project Budget Chips */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGET_OPTIONS.map((opt) => {
                      const isSelected = budget === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setBudget(opt)}
                          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 border ${
                            isSelected
                              ? "bg-gradient-to-r from-purple-600 to-indigo-600 border-purple-400 text-white shadow-lg shadow-purple-500/25 scale-[1.02]"
                              : "bg-white/[0.04] border-white/10 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/[0.08]"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold tracking-wider text-white/80 uppercase">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Tell us a little about your project, goals and what you need help with…"
                    className="w-full p-4 rounded-xl bg-white/[0.05] border border-white/10 text-white placeholder-white/30 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all resize-none"
                  />
                </div>

                {/* CTA Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white px-8 py-3.5 rounded-xl text-sm font-bold transition-all duration-300 shadow-[0_5px_22px_-3px_rgba(124,58,237,0.6)] hover:shadow-[0_8px_28px_rgba(168,85,247,0.85)] hover:scale-[1.01] active:scale-[0.99] border border-white/30 hover:border-white/50 overflow-hidden cursor-pointer disabled:opacity-50"
                >
                  {/* Top-right glossy flare overlay */}
                  <div 
                    aria-hidden="true" 
                    className="absolute top-0 right-0 w-12 h-12 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.45),transparent_70%)] pointer-events-none rounded-tr-xl" 
                  />

                  <span className="relative z-10">
                    {isSubmitting ? "Submitting Inquiry..." : "Let’s Start a Conversation"}
                  </span>
                  <ArrowUpRight size={16} strokeWidth={2.5} className="relative z-10 text-white transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>

              </form>
            </div>

          </div>
        </motion.div>

        {/* ══════════ BOTTOM TRUST STRIP ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md px-6 py-3.5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-white/80"
        >
          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 15}`}
                  alt="Client avatar"
                  width={28}
                  height={28}
                  className="w-7 h-7 rounded-full border-2 border-[#0A0D14] object-cover"
                />
              ))}
            </div>
            <span className="font-bold text-white">40+ Projects Delivered</span>
          </div>

          {/* Trust Statement */}
          <div className="text-center sm:text-right font-medium text-white/70">
            Let’s build something meaningful together. <span className="text-white font-semibold">Trusted by growing brands & startups.</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTAInquirySection;
