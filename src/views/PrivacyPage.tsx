'use client';

import { motion } from "framer-motion";
import { 
  ShieldCheck, 
  Lock, 
  Eye, 
  Database, 
  UserCheck, 
  Globe, 
  HelpCircle, 
  Clock, 
  Mail,
  Building2,
  Cookie,
  Scale,
  CheckCircle2,
  FileText,
  Trash2,
  ExternalLink,
  Info
} from "lucide-react";
import SEO from "@/components/SEO";

export default function PrivacyPage() {
  return (
    <>
      <SEO 
        title="Privacy Policy | AstroPixel Creative Design Agency"
        description="Privacy Policy describing our policies and procedures on data collection, use, and disclosure at AstroPixel Creative Design Agency."
        canonical="https://astropixel.tech/privacy"
      />

      <div className="overflow-x-hidden bg-background min-h-screen">
        {/* Signature Hero Header matching About Page & Services Page */}
        <section id="site-hero" className="relative overflow-hidden pt-20 pb-8 lg:pt-24 lg:pb-10 rounded-b-3xl">
          {/* Dark base */}
          <div className="absolute inset-0 bg-black" />
          {/* Background image */}
          <img
            src="/hero-new-bg.png"
            alt="AstroPixel Hero Background"
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-x-0 top-0 w-full h-full object-cover object-top scale-125"
            style={{ filter: "blur(48px)" }}
          />
          {/* Grid backdrop */}
          <div 
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{ 
              backgroundImage: "linear-gradient(#ffffff1a 1px,transparent 1px),linear-gradient(90deg,#ffffff1a 1px,transparent 1px)", 
              backgroundSize: "56px 56px" 
            }} 
          />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.05] text-white mb-3"
              >
                Privacy & <span className="font-serif italic font-normal text-white">Policy</span>
              </motion.h1>

              <motion.p 
                initial={{ opacity: 0, y: 15 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: 0.15 }}
                className="text-sm lg:text-base text-white/70 max-w-lg mx-auto"
              >
                Last updated: January 27, 2026 • AstroPixel Creative Design Agency
              </motion.p>
            </div>
          </div>
        </section>

        {/* Content Container - Clean Light Theme */}
        <section className="pt-12 sm:pt-16 pb-24 bg-white text-[#0B0F19]">
          <div className="container mx-auto px-4 sm:px-6 max-w-4xl space-y-10 sm:space-y-12">
            
            {/* Introduction Note */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-slate-700" /> Privacy Policy Overview
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                This Privacy Policy describes Our policies and procedures on the collection, use, and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.
              </p>
            </div>

            {/* Interpretation and Definitions */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-700" /> Interpretation and Definitions
              </h2>
              <h3 className="text-lg font-bold text-slate-800">Interpretation</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
              </p>
              
              <h3 className="text-lg font-bold text-slate-800 pt-2">Definitions</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                For the purposes of this Privacy Policy:
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Account</span>
                  <p className="text-xs text-slate-600">A unique account created for You to access our Service or parts of our Service.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Company</span>
                  <p className="text-xs text-slate-600">Refers to AstroPixel Creative Design Agency, Rajshahi, Bangladesh.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Cookies</span>
                  <p className="text-xs text-slate-600">Small files placed on Your computer or mobile device containing browsing details.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Country</span>
                  <p className="text-xs text-slate-600">Refers to: Bangladesh.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Device</span>
                  <p className="text-xs text-slate-600">Any device that can access the Service such as a computer, cellphone or digital tablet.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Personal Data</span>
                  <p className="text-xs text-slate-600">Any information that relates to an identified or identifiable individual.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Service</span>
                  <p className="text-xs text-slate-600">Refers to the Website accessible from https://astropixel.tech/.</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <span className="font-bold text-slate-900 text-sm">Service Provider</span>
                  <p className="text-xs text-slate-600">Third-party companies or individuals employed by the Company to facilitate the Service.</p>
                </div>
              </div>
            </section>

            {/* Collecting and Using Your Personal Data */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Database className="w-5 h-5 text-slate-700" /> Collecting and Using Your Personal Data
              </h2>
              <h3 className="text-lg font-bold text-slate-800">Types of Data Collected</h3>
              
              <div className="space-y-3 pt-1">
                <h4 className="font-bold text-slate-900 text-base">Personal Data</h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  While using Our Service, We may ask You to provide Us with certain personally identifiable information that can be used to contact or identify You. Personally identifiable information may include, but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-1 text-slate-700 text-sm sm:text-base">
                  <li>Email address</li>
                  <li>First name and last name</li>
                  <li>Phone number</li>
                  <li>Usage Data</li>
                </ul>

                <h4 className="font-bold text-slate-900 text-base pt-3">Usage Data</h4>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  Usage Data is collected automatically when using the Service. Usage Data may include information such as Your Device’s Internet Protocol address (e.g. IP address), browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on those pages, unique device identifiers and other diagnostic data.
                </p>
                <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                  When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
                </p>
              </div>
            </section>

            {/* Tracking Technologies and Cookies */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-slate-700" /> Tracking Technologies and Cookies
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                We use Cookies and similar tracking technologies to track the activity on Our Service and store certain information. Tracking technologies used are beacons, tags, and scripts to collect and track information and to improve and analyze Our Service.
              </p>
              
              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm block">Cookies Policy / Notice Acceptance Cookies</span>
                  <p className="text-xs text-slate-600"><strong>Type:</strong> Persistent Cookies • <strong>Administered by:</strong> Us</p>
                  <p className="text-xs sm:text-sm text-slate-700">These Cookies identify if users have accepted the use of cookies on the Website.</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-900 text-sm block">Functionality Cookies</span>
                  <p className="text-xs text-slate-600"><strong>Type:</strong> Persistent Cookies • <strong>Administered by:</strong> Us</p>
                  <p className="text-xs sm:text-sm text-slate-700">These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference.</p>
                </div>
              </div>
            </section>

            {/* Use of Your Personal Data */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-slate-700" /> Use of Your Personal Data
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The Company may use Personal Data for the following purposes:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-700 text-sm sm:text-base">
                <li><strong className="text-slate-900">To provide and maintain our Service:</strong> Including to monitor the usage of our Service.</li>
                <li><strong className="text-slate-900">To manage Your Account:</strong> To manage Your registration as a user of the Service.</li>
                <li><strong className="text-slate-900">For the performance of a contract:</strong> The development, compliance and undertaking of the purchase contract for products or services.</li>
                <li><strong className="text-slate-900">To contact You:</strong> By email, telephone calls, SMS, or mobile push notifications regarding updates or security notices.</li>
                <li><strong className="text-slate-900">To provide news & special offers:</strong> General information about other goods, services and events similar to those enquired about.</li>
                <li><strong className="text-slate-900">To manage Your requests:</strong> To attend and manage Your requests to Us.</li>
              </ul>
            </section>

            {/* Retention & Delete Your Personal Data */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Trash2 className="w-5 h-5 text-slate-700" /> Retention & Rights to Delete Personal Data
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The Company will retain Your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use Your Personal Data to the extent necessary to comply with legal obligations, resolve disputes, and enforce our agreements.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                You have the right to delete or request that We assist in deleting the Personal Data that We have collected about You. You may update, amend, or delete Your information at any time by contacting us directly.
              </p>
            </section>

            {/* Security & Children's Privacy */}
            <section className="space-y-4 border-b border-slate-200 pb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Lock className="w-5 h-5 text-slate-700" /> Security of Data & Children&apos;s Privacy
              </h2>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                The security of Your Personal Data is important to Us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable means to protect Your Personal Data, We cannot guarantee its absolute security.
              </p>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from anyone under 13.
              </p>
            </section>

            {/* Contact Box */}
            <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 text-white space-y-4 shadow-sm">
              <h2 className="text-xl font-bold flex items-center gap-2 text-white">
                <Mail className="w-5 h-5 text-cyan-400" /> Contact Us
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                If you have any questions about this Privacy Policy, You can contact us:
              </p>
              <div className="pt-2 text-xs sm:text-sm text-slate-200 space-y-1">
                <p><strong className="text-white">By Email:</strong> hello@astropixel.tech</p>
                <p><strong className="text-white">Website:</strong> https://astropixel.tech/</p>
                <p><strong className="text-white">Company:</strong> AstroPixel Creative Design Agency, Rajshahi, Bangladesh</p>
              </div>
            </div>

          </div>
        </section>
      </div>
    </>
  );
}
