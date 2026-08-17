import { useCallback, useState, useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Preloader from "@/components/Preloader";
import ScrollToTop from "@/components/ScrollToTop";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import { SiteScopeProvider } from "@/contexts/SiteScopeContext";

// Preload logos immediately
import logoAssetJson from "@/assets/logo.png.asset.json";
const logoSrc = logoAssetJson.url;
import logoFullSrc from "@/assets/logo-full.png";
const preloadImg = (src: string) => { const img = new Image(); img.src = src; };
preloadImg(logoSrc);
preloadImg(logoFullSrc);

// Main site pages - loaded immediately for instant initial navigation
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AboutPage from "./pages/AboutPage";
import LearnAboutPage from "./pages/LearnAboutPage";
import ServicesPage from "./pages/ServicesPage";
import WorkPage from "./pages/WorkPage";
import JoinTeamPage from "./pages/JoinTeamPage";
import ContactPage from "./pages/ContactPage";
import CoursesPage from "./pages/CoursesPage";

// Lazy-loaded LMS & secondary pages for code splitting & instant initial page load
const AdminLoginPage = lazy(() => import("./pages/AdminLoginPage"));
const StudentLoginPage = lazy(() => import("./pages/StudentLoginPage"));
const TeacherLoginPage = lazy(() => import("./pages/TeacherLoginPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));
const StudentDashboard = lazy(() => import("./pages/StudentDashboard"));
const TeacherDashboard = lazy(() => import("./pages/TeacherDashboard"));
const MyCertificatesPage = lazy(() => import("./pages/MyCertificatesPage"));
const CourseViewerPage = lazy(() => import("./pages/CourseViewerPage"));
const CertificatePage = lazy(() => import("./pages/CertificatePage"));
const VerifyCertificatePage = lazy(() => import("./pages/VerifyCertificatePage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const ResetPasswordPage = lazy(() => import("./pages/ResetPasswordPage"));
const PaymentCallbackPage = lazy(() => import("./pages/PaymentCallbackPage"));
const PaymentCancelPage = lazy(() => import("./pages/PaymentCancelPage"));
const CustomCheckoutPage = lazy(() => import("./pages/CustomCheckoutPage"));
const CourseLandingPage = lazy(() => import("./pages/CourseLandingPage"));
const LearnContactPage = lazy(() => import("./pages/LearnContactPage"));


import AIChatbot from "./components/AIChatbot";

const queryClient = new QueryClient();

// LMS routes where preloader should be skipped
const LMS_ROUTES = [
  '/admin/login',
  '/student/login',
  '/teacher/login',
  '/auth',
  '/dashboard',
  
  '/admin',
  '/student',
  '/teacher',
  '/my-certificates',
  '/certificate',
  '/verify-certificate',
  '/forgot-password',
  '/reset-password',
  '/payment',
  '/pay'
];

function AppContent() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [preloaderShown, setPreloaderShown] = useState(false);
  
  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    setPreloaderShown(true);
  }, []);

  // Check if current route is an LMS route
  const isLmsRoute = LMS_ROUTES.some(route => location.pathname.startsWith(route));
  const isWorkRoute = location.pathname === "/work";

  // Skip preloader for LMS routes or if already shown
  useEffect(() => {
    if (isLmsRoute || preloaderShown) {
      setIsLoading(false);
    }
  }, [isLmsRoute, preloaderShown]);

  const showPreloader = isLoading && !isLmsRoute && !preloaderShown;

  return (
    <>
      {showPreloader && <Preloader onComplete={handlePreloaderComplete} />}
      {!isLmsRoute && !isWorkRoute && <SmoothScroll />}
      {!isLmsRoute && !isWorkRoute && <ScrollReveal />}
      <ScrollToTop />
      
      
      
      <SiteScopeProvider>
      <AnimatePresence mode="wait" initial={false}>

        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <Suspense fallback={<div className="min-h-screen bg-background" />}>
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={typeof window !== "undefined" && window.location.hostname.startsWith("learn.") ? <CoursesPage /> : <Index />} />
              <Route path="/about" element={typeof window !== "undefined" && window.location.hostname.startsWith("learn.") ? <LearnAboutPage /> : <AboutPage />} />
              <Route path="/learn-about" element={<LearnAboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/logo-brand-identity" element={<ServicesPage />} />
              <Route path="/services/branding" element={<ServicesPage />} />
              <Route path="/services/ui-ux-design" element={<ServicesPage />} />
              <Route path="/services/web-design-development" element={<ServicesPage />} />
              <Route path="/services/social-media-design" element={<ServicesPage />} />
              <Route path="/work" element={<WorkPage />} />
              <Route path="/team" element={<Navigate to="/about#team" replace />} />
              <Route path="/join-team" element={<JoinTeamPage />} />
              <Route path="/contact" element={typeof window !== "undefined" && window.location.hostname.startsWith("learn.") ? <LearnContactPage /> : <ContactPage />} />
              <Route path="/learn-contact" element={<LearnContactPage />} />

              <Route path="/courses" element={<CoursesPage />} />
              <Route path="/courses/all" element={<CoursesPage />} />
              <Route path="/instructors" element={<CoursesPage />} />

              {/* LMS & Secondary Lazy-Loaded Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route path="/student/login" element={<StudentLoginPage />} />
              <Route path="/teacher/login" element={<TeacherLoginPage />} />
              <Route path="/auth" element={<StudentLoginPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />

              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/student" element={<StudentDashboard />} />
              <Route path="/student/course/:courseId" element={<CourseViewerPage />} />
              <Route path="/teacher" element={<TeacherDashboard />} />
              <Route path="/my-certificates" element={<MyCertificatesPage />} />
              <Route path="/certificate/:certificateId" element={<CertificatePage />} />
              <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />
              <Route path="/reset-password" element={<ResetPasswordPage />} />
              <Route path="/payment/callback" element={<PaymentCallbackPage />} />
              <Route path="/payment/cancel" element={<PaymentCancelPage />} />
              <Route path="/pay/:invoiceId" element={<CustomCheckoutPage />} />
              <Route path="/vibe-coding" element={<CourseLandingPage />} />
              <Route path="/courses/:slug" element={<CourseLandingPage />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </motion.div>
      </AnimatePresence>
      </SiteScopeProvider>

    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
        <LanguageProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AppContent />
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
