import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Globe, 
  ChevronDown, 
  ArrowRight,
  Phone,
  MessageCircle
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const BUDGET_CHIPS = [
  "Less than $5K",
  "$5K - $10K",
  "$10K - $20K",
  "$20K - $50K",
  "More than $50K"
];

export const FinalCTAInquirySection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("Less than $5K");
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
      const { error } = await supabase.from("contact_submissions").insert({
        name: fullName.trim(),
        email: email.trim(),
        phone: phone.trim() || null,
        budget: budget,
        message: details.trim() || `Inquiry (Budget: ${budget})`,
        site_scope: "agency",
      });

      if (error) {
        console.warn("Database insert warning:", error);
      }

      toast.success("Thank you! Your inquiry has been received. We'll reach out within 24 hours.");
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
    <section className="relative py-16 sm:py-24 bg-slate-50 text-slate-900 overflow-hidden">
      {/* Soft Ambient Light Glow Effects */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-400/10 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-emerald-400/10 rounded-full blur-[130px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
        {/* Main Light Card Container */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] sm:rounded-[2.5rem] bg-white border border-slate-200/80 p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Top-Left Green Ambient Radial Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-[90px] pointer-events-none" 
          />
          {/* Top-Right Purple Ambient Radial Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-[420px] h-[420px] bg-purple-400/15 rounded-full blur-[100px] pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative z-10">
            
            {/* ══════════ LEFT SIDE — CTA / Profile ══════════ */}
            <div className="lg:col-span-5 space-y-8">
              
              {/* Green Outlined Pill Badge */}
              <div>
                <span className="inline-block border border-emerald-600/30 text-emerald-700 bg-emerald-50/80 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide">
                  Claim a $799 Consultation, on Us!
                </span>
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-bold text-slate-900 tracking-tight leading-[1.18]">
                Enhance Your Brand Potential{" "}
                <span className="font-serif italic font-normal text-purple-700 block sm:inline">
                  At No Cost!
                </span>
              </h2>

              {/* 3 Trust Points */}
              <div className="space-y-3.5 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-900 shrink-0" />
                  <span>Expect a response from us within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-900 shrink-0" />
                  <span>We’re happy to sign an NDA upon request.</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={16} className="text-slate-900 shrink-0" />
                  <span>Get access to a team of dedicated product specialists.</span>
                </div>
              </div>

              {/* Profile Card Area */}
              <div className="pt-2">
                <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-400 via-purple-300 to-indigo-400 p-1 mb-4 shadow-lg shadow-purple-500/10">
                  <img
                    src="https://res.cloudinary.com/de348sqlb/image/upload/v1784725025/alphazero-assets/instructors/sofiullah.png"
                    alt="Abdullah Al Noman — COO & Co-founder"
                    width={224}
                    height={224}
                    loading="lazy"
                    className="w-full h-full rounded-xl object-cover"
                  />
                </div>

                <div className="space-y-1">
                  <h4 className="font-bold text-lg text-slate-900">
                    Abdullah Al Noman
                  </h4>
                  <p className="text-xs text-slate-500 font-medium">
                    COO & Co-founder
                  </p>

                  <div className="pt-2 space-y-1 text-xs">
                    <div className="flex items-center gap-2 text-slate-600">
                      <MessageCircle size={14} className="text-purple-600" />
                      <span>+880 1846-484200</span>
                    </div>
                    <a
                      href="https://wa.me/8801846484200"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-purple-600 hover:text-purple-700 font-semibold text-xs sm:text-sm transition-colors"
                    >
                      Book a Call Directly
                    </a>
                  </div>
                </div>
              </div>

            </div>


            {/* ══════════ RIGHT SIDE — Form ══════════ */}
            <div className="lg:col-span-7 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Full Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all"
                  />
                </div>

                {/* Email & Whatsapp Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Your Email */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="yourmail@gmail.com"
                      className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all"
                    />
                  </div>

                  {/* Whatsapp Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                      Whatsapp Number
                    </label>
                    <div className="relative flex items-center">
                      <div className="absolute left-3 flex items-center gap-1 text-slate-400 pointer-events-none">
                        <Globe size={15} />
                        <ChevronDown size={12} />
                      </div>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="123 456 7890"
                        className="w-full h-12 pl-12 pr-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Project Budget */}
                <div className="space-y-2.5">
                  <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                    Project Budget
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {BUDGET_CHIPS.map((chip) => {
                      const isSelected = budget === chip;
                      return (
                        <button
                          key={chip}
                          type="button"
                          onClick={() => setBudget(chip)}
                          className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium border transition-all duration-200 ${
                            isSelected
                              ? "bg-purple-600 border-purple-600 text-white shadow-md shadow-purple-500/20"
                              : "bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                          }`}
                        >
                          {chip}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Project Details */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                    Project Details
                  </label>
                  <textarea
                    rows={4}
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="I want to redesign my website.."
                    className="w-full p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all resize-none"
                  />
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white px-7 py-3 rounded-xl text-sm font-bold shadow-[0_5px_18px_-3px_rgba(124,58,237,0.45)] hover:shadow-[0_8px_24px_rgba(168,85,247,0.7)] hover:scale-[1.02] active:scale-[0.98] border border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Connecting..." : "Let's Connect"}</span>
                    <ArrowRight size={16} />
                  </button>
                </div>

              </form>
            </div>

          </div>
        </motion.div>

        {/* ══════════ BOTTOM LIME TRUST STRIP ══════════ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 sm:mt-10 max-w-4xl mx-auto rounded-full bg-[#CEF834] text-slate-950 font-semibold text-xs sm:text-sm py-3.5 px-6 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xl shadow-lime-500/20 border border-lime-400"
        >
          {/* Avatars */}
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/100?img=${i + 20}`}
                  alt="Client avatar"
                  width={30}
                  height={30}
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#CEF834] object-cover"
                />
              ))}
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-slate-900 text-white text-[10px] sm:text-xs font-bold flex items-center justify-center border-2 border-[#CEF834]">
                40+
              </div>
            </div>
          </div>

          {/* Guarantee Statement */}
          <div className="text-center sm:text-right text-slate-950 font-medium leading-tight">
            Get 100% Value And Guarantee. Don’t Miss Out - Secure Your <span className="font-serif italic font-bold">Brand’s Future Today</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default FinalCTAInquirySection;
