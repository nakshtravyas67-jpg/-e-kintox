import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'

const HeroSection = lazy(() => import('./components/HeroSection'))
const FeaturesSection = lazy(() => import('./components/FeaturesSection'))
const StatsSection = lazy(() => import('./components/StatsSection'))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'))
const CTASection = lazy(() => import('./components/CTASection'))
const AboutSection = lazy(() => import('./components/AboutSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const PortfolioSection = lazy(() => import('./components/PortfolioSection'))
const ServicesPreview = lazy(() => import('./components/ServicesPreview'))
const TrustedBy = lazy(() => import('./components/TrustedBy'))
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'))
const CartPage = lazy(() => import('./components/CartPage'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const LoginPage = lazy(() => import('./components/LoginPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const MyDesigns = lazy(() => import('./components/MyDesigns'))
import Footer from './components/Footer'

function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
      <TrustedBy />
      <TestimonialsSection />
      <ServicesPreview />
      <CTASection />
      <ContactSection />
      <Footer />
    </PageTransition>
  )
}

function AboutPage() {
  return (
    <PageTransition>
      <AboutSection />
      <Footer />
    </PageTransition>
  )
}

function ServicesPage() {
  return (
    <PageTransition>
      <ServicesSection />
      <Footer />
    </PageTransition>
  )
}

function PortfolioPage() {
  return (
    <PageTransition>
      <PortfolioSection />
      <Footer />
    </PageTransition>
  )
}

function TeamPage() {
  return (
    <PageTransition>
      <TeamSection />
      <Footer />
    </PageTransition>
  )
}

function ProductPage() {
  return (
    <PageTransition>
      <ProductDetailPage />
      <Footer />
    </PageTransition>
  )
}

function LoginRoute() {
  return (
    <PageTransition>
      <LoginPage />
    </PageTransition>
  )
}

function ContactRoute() {
  return (
    <PageTransition>
      <ContactSection />
      <Footer />
    </PageTransition>
  )
}

function CartRoute() {
  return (
    <PageTransition>
      <CartPage />
    </PageTransition>
  )
}

function NotFoundRoute() {
  return (
    <PageTransition>
      <NotFoundPage />
    </PageTransition>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <HelmetProvider>
      <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pb-14 md:pb-16 pt-11 md:pt-[44px]">
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="min-h-[80vh] bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-[#0071E3] border-t-transparent rounded-full animate-spin mx-auto" />
                  <p className="text-[#6E6E73] text-sm mt-4">Loading...</p>
                </div>
              </div>
            }>
              <Routes location={location} key={location.pathname}>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/team" element={<TeamPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/portfolio" element={<PortfolioPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
              <Route path="/cart" element={<CartRoute />} />
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/my-designs" element={<MyDesigns />} />
              <Route path="/contact" element={<ContactRoute />} />
              <Route path="*" element={<NotFoundRoute />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <WhatsAppButton />
        <ChatBot />
      </div>
    </HelmetProvider>
  )
}