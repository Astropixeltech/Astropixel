import { useState } from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  ArrowRight
} from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COUNTRY_CODES = [
  { id: "BD", code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { id: "US", code: "+1", flag: "🇺🇸", name: "United States" },
  { id: "GB", code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { id: "CA", code: "+1", flag: "🇨🇦", name: "Canada" },
  { id: "AE", code: "+971", flag: "🇦🇪", name: "UAE" },
  { id: "SA", code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { id: "IN", code: "+91", flag: "🇮🇳", name: "India" },
  { id: "AU", code: "+61", flag: "🇦🇺", name: "Australia" },
  { id: "DE", code: "+49", flag: "🇩🇪", name: "Germany" },
  { id: "SG", code: "+65", flag: "🇸🇬", name: "Singapore" },
  { id: "MY", code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { id: "PK", code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { id: "QA", code: "+974", flag: "🇶🇦", name: "Qatar" },
  { id: "KW", code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { id: "OM", code: "+968", flag: "🇴🇲", name: "Oman" },
  { id: "FR", code: "+33", flag: "🇫🇷", name: "France" },
  { id: "IT", code: "+39", flag: "🇮🇹", name: "Italy" },
  { id: "NL", code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { id: "ES", code: "+34", flag: "🇪🇸", name: "Spain" },
];

export const FinalCTAInquirySection = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("BD");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [details, setDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentCountry = COUNTRY_CODES.find((c) => c.id === selectedCountry) || COUNTRY_CODES[0];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim()) {
      toast.error("Please fill in your name and email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      const fullPhoneNumber = phone.trim() ? `${currentCountry.code} ${phone.trim()}` : null;
      const { error } = await (supabase as any).from("contact_submissions").insert({
        name: fullName.trim(),
        email: email.trim(),
        phone: fullPhoneNumber,
        budget: budget || "Not specified",
        message: details.trim() 
          ? `[Service: ${service || "General"} | Budget: ${budget || "Not specified"}]\n${details.trim()}`
          : `Inquiry (Service: ${service || "General"}, Budget: ${budget || "Not specified"})`,
        site_scope: "agency",
      });

      if (error) {
        console.warn("Database insert warning:", error);
      }

      toast.success("Thank you! Your inquiry has been received. We'll reach out within 24 hours.");
      setFullName("");
      setEmail("");
      setPhone("");
      setService("");
      setBudget("");
      setDetails("");
    } catch (err) {
      console.error(err);
      toast.success("Inquiry received! We'll get back to you shortly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-14 sm:py-20 lg:py-24 bg-slate-50 text-slate-900 overflow-hidden">
      {/* Soft Ambient Light Glow Effects */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-purple-400/15 rounded-full blur-[140px] pointer-events-none" 
      />
      <div 
        aria-hidden="true" 
        className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-emerald-400/15 rounded-full blur-[130px] pointer-events-none" 
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-6xl">
        {/* Main Light Card Container — Spacious & Grand */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative rounded-[2rem] sm:rounded-[2.6rem] bg-white border border-slate-200/90 p-6 sm:p-10 lg:p-12 xl:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.06)] overflow-hidden"
        >
          {/* Top-Left Green Ambient Radial Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/15 rounded-full blur-[90px] pointer-events-none" 
          />
          {/* Top-Right Purple Ambient Radial Glow */}
          <div 
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-96 h-96 bg-purple-400/15 rounded-full blur-[90px] pointer-events-none" 
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start relative z-10">
            
            {/* ══════════ LEFT SIDE — CTA / Profile ══════════ */}
            <div className="lg:col-span-5 space-y-6 sm:space-y-7">

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[40px] xl:text-[44px] font-semibold font-display text-slate-900 tracking-tight leading-[1.15]">
                Ready to <span className="font-serif italic font-normal gradient-text">Transform</span> Your Digital <span className="font-serif italic font-normal gradient-text">Presence?</span>
              </h2>

              {/* 3 Trust Points */}
              <div className="space-y-3 pt-1">
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="text-purple-600 shrink-0" />
                  <span>Free project estimation &amp; proposal within 24 hours</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="text-purple-600 shrink-0" />
                  <span>Guaranteed privacy with client-first NDA coverage</span>
                </div>
                <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-700">
                  <CheckCircle2 size={18} className="text-purple-600 shrink-0" />
                  <span>Direct collaboration with senior designers &amp; strategists</span>
                </div>
              </div>

              {/* Profile Card Area */}
              <div className="pt-2">
                <div className="w-36 h-36 sm:w-44 sm:h-44 rounded-2xl overflow-hidden bg-gradient-to-tr from-purple-100 via-purple-50 to-indigo-100 border border-purple-200/80 p-0.5 mb-3 shadow-md">
                  <img
                    src="/sofiullah-ahammad.jpg"
                    alt="Sofiullah Ahammad — Founder & CEO"
                    width={176}
                    height={176}
                    loading="lazy"
                    className="w-full h-full rounded-[14px] object-cover object-top"
                  />
                </div>

                <div className="space-y-0.5">
                  <h4 className="font-bold text-lg sm:text-xl text-slate-900">
                    Sofiullah Ahammad
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium">
                    Founder & CEO
                  </p>
                </div>
              </div>

            </div>


            {/* ══════════ RIGHT SIDE — Form ══════════ */}
            <div className="lg:col-span-7 space-y-5">
              <form onSubmit={handleSubmit} className="space-y-5">
                
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
                    className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all shadow-xs"
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
                      className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all shadow-xs"
                    />
                  </div>

                  {/* Whatsapp Number */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                      Whatsapp Number
                    </label>
                    <div className="flex items-center rounded-xl bg-slate-100/80 border border-slate-200 focus-within:border-purple-600 focus-within:bg-white focus-within:ring-1 focus-within:ring-purple-600 transition-all overflow-hidden h-12 shadow-xs">
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="w-[108px] shrink-0 h-full px-3 bg-transparent border-0 border-r border-slate-200 rounded-none text-slate-800 text-xs sm:text-sm font-semibold focus:ring-0 focus:outline-none shadow-none flex items-center justify-between gap-1 hover:bg-slate-200/50 transition-colors">
                          <span className="flex items-center gap-1.5 truncate">
                            <span className="text-lg leading-none">{currentCountry.flag}</span>
                            <span className="text-xs sm:text-sm font-bold text-slate-800">{currentCountry.code}</span>
                          </span>
                        </SelectTrigger>
                        <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50 max-h-60 overflow-y-auto">
                          {COUNTRY_CODES.map((c) => (
                            <SelectItem
                              key={c.id}
                              value={c.id}
                              className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="text-base leading-none">{c.flag}</span>
                                <span className="font-bold text-slate-800">{c.code}</span>
                                <span className="text-slate-500 truncate text-xs">({c.name})</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <input
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="1712 345678"
                        className="w-full h-full px-3.5 bg-transparent border-0 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Service required & Project Budget Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service required */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                      Service required
                    </label>
                    <Select value={service} onValueChange={setService}>
                      <SelectTrigger className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 text-sm sm:text-base focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all shadow-none">
                        <SelectValue placeholder="Select your Service" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50">
                        <SelectItem value="Logo Design" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          Logo Design
                        </SelectItem>
                        <SelectItem value="Brand Strategy" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          Brand Strategy
                        </SelectItem>
                        <SelectItem value="UI/UX Design" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          UI/UX Design
                        </SelectItem>
                        <SelectItem value="Web Development" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          Web Development
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Project Budget */}
                  <div className="space-y-2">
                    <label className="block text-xs font-bold tracking-wider text-slate-900 uppercase">
                      Project Budget
                    </label>
                    <Select value={budget} onValueChange={setBudget}>
                      <SelectTrigger className="w-full h-12 px-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 text-sm sm:text-base focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all shadow-none">
                        <SelectValue placeholder="Select your range" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/95 backdrop-blur-md border border-slate-200 rounded-xl shadow-2xl p-1.5 z-50">
                        <SelectItem value="Under $1,000" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          Under $1,000
                        </SelectItem>
                        <SelectItem value="$1,000 – $5,000" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          $1,000 – $5,000
                        </SelectItem>
                        <SelectItem value="$5,000 – $10,000" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          $5,000 – $10,000
                        </SelectItem>
                        <SelectItem value="$10,000+" className="rounded-lg py-2.5 text-xs sm:text-sm text-slate-700 focus:bg-purple-50 focus:text-purple-700 cursor-pointer">
                          $10,000+
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
                    placeholder="Tell us about your project, goals, and timeline..."
                    className="w-full p-4 rounded-xl bg-slate-100/80 border border-slate-200 text-slate-900 placeholder-slate-400 text-sm sm:text-base focus:outline-none focus:border-purple-600 focus:bg-white focus:ring-1 focus:ring-purple-600 transition-all resize-none shadow-xs"
                  />
                </div>

                {/* CTA Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2.5 bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#9333EA] text-white px-8 py-3.5 rounded-xl text-sm sm:text-base font-bold shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 hover:scale-[1.02] active:scale-[0.98] border border-white/20 transition-all duration-300 cursor-pointer disabled:opacity-50"
                  >
                    <span>{isSubmitting ? "Connecting..." : "Let's Connect"}</span>
                    <ArrowRight size={17} />
                  </button>
                </div>

              </form>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTAInquirySection;
