import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ChatbotBubble } from "@/components/ChatbotBubble";
import { AdminProvider } from "@/contexts/AdminContext";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ProtectedRoute } from "@/pages/admin/ProtectedRoute";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import Products from "./pages/Products";
import CaseStudies from "./pages/CaseStudies";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import Blog from "./pages/Blog";
import BlogDetail from "./pages/BlogDetail";
import Careers from "./pages/Careers";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import BlogsManager from "./pages/admin/BlogsManager";
import CaseStudiesManager from "./pages/admin/CaseStudiesManager";
import ServicesManager from "./pages/admin/ServicesManager";
import ProductsManager from "./pages/admin/ProductsManager";
import CareersManager from "./pages/admin/CareersManager";
import LegalDocsManager from "./pages/admin/LegalDocsManager";
import TeamManager from "./pages/admin/TeamManager";
import ClientsManager from "./pages/admin/ClientsManager";

const queryClient = new QueryClient();

// Wrapper component to access location for chatbot logic
function AppContent() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  
  // Replace with your actual n8n chat embed URLs
  const MAIN_CHAT_URL = ""; // Add your n8n chat URL for main website
  
  return (
    <>
      <Routes>
            {/* Public Routes */}
            <Route path="/" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Home /></main>
                <Footer />
              </div>
            } />
            <Route path="/services" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Services /></main>
                <Footer />
              </div>
            } />
            <Route path="/services/:slug" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><ServiceDetail /></main>
                <Footer />
              </div>
            } />
            <Route path="/products" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Products /></main>
                <Footer />
              </div>
            } />
            <Route path="/case-studies" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><CaseStudies /></main>
                <Footer />
              </div>
            } />
            <Route path="/case-studies/:slug" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><CaseStudyDetail /></main>
                <Footer />
              </div>
            } />
            <Route path="/blog" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Blog /></main>
                <Footer />
              </div>
            } />
            <Route path="/blog/:slug" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><BlogDetail /></main>
                <Footer />
              </div>
            } />
            <Route path="/careers" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Careers /></main>
                <Footer />
              </div>
            } />
            <Route path="/about" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><About /></main>
                <Footer />
              </div>
            } />
            <Route path="/contact" element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1"><Contact /></main>
                <Footer />
              </div>
            } />

            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
              <Route index element={<AdminDashboard />} />
              <Route path="blogs" element={<BlogsManager />} />
              <Route path="case-studies" element={<CaseStudiesManager />} />
              <Route path="services" element={<ServicesManager />} />
              <Route path="products" element={<ProductsManager />} />
              <Route path="careers" element={<CareersManager />} />
              <Route path="legal-docs" element={<LegalDocsManager />} />
              <Route path="team" element={<TeamManager />} />
              <Route path="clients" element={<ClientsManager />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Routes>
          
          {/* Chatbot for main website (not admin) */}
          {!isAdminRoute && MAIN_CHAT_URL && (
            <ChatbotBubble chatUrl={MAIN_CHAT_URL} position="bottom-right" />
          )}
        </>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AdminProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AdminProvider>
  </QueryClientProvider>
);

export default App;
