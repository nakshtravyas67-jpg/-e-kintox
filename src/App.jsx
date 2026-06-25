import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { HelmetProvider } from 'react-helmet-async'
import { ToastProvider } from './context/ToastContext'
import ToastContainer from './components/common/ToastContainer'
import Navbar from './components/Navbar'
import PageTransition from './components/PageTransition'
import WhatsAppButton from './components/WhatsAppButton'
import ChatBot from './components/ChatBot'
import ScrollReveal from './components/ScrollReveal'
import { WishlistProvider } from './context/WishlistContext'

const HeroSection = lazy(() => import('./components/HeroSection'))
const FeaturesSection = lazy(() => import('./components/FeaturesSection'))
const StatsSection = lazy(() => import('./components/StatsSection'))
const TestimonialsSection = lazy(() => import('./components/TestimonialsSection'))
const CTASection = lazy(() => import('./components/CTASection'))
const AboutSection = lazy(() => import('./components/AboutSection'))
const ServicesSection = lazy(() => import('./components/ServicesSection'))
const PortfolioSection = lazy(() => import('./components/PortfolioSection'))
const PortfolioMasonry = lazy(() => import('./components/PortfolioMasonry'))
const ServicesPreview = lazy(() => import('./components/ServicesPreview'))
const TrustedBy = lazy(() => import('./components/TrustedBy'))
const ProductDetailPage = lazy(() => import('./components/ProductDetailPage'))
const CartPage = lazy(() => import('./components/CartPage'))
const CheckoutPage = lazy(() => import('./components/CheckoutPage'))
const TeamSection = lazy(() => import('./components/TeamSection'))
const ContactSection = lazy(() => import('./components/ContactSection'))
const LoginPage = lazy(() => import('./components/LoginPage'))
const NotFoundPage = lazy(() => import('./components/NotFoundPage'))
const AdminDashboard = lazy(() => import('./components/AdminDashboard'))
const MyDesigns = lazy(() => import('./components/MyDesigns'))
const WishlistPage = lazy(() => import('./components/WishlistPage'))
const MyOrders = lazy(() => import('./components/MyOrders'))
const ResetPasswordPage = lazy(() => import('./components/ResetPasswordPage'))
const StaticPage = lazy(() => import('./components/StaticPage'))
import Footer from './components/Footer'

function HomePage() {
  return (
    <PageTransition>
      <ScrollReveal delay={0}><HeroSection /></ScrollReveal>
      <ScrollReveal delay={0.05}><FeaturesSection /></ScrollReveal>
      <ScrollReveal delay={0.1}><StatsSection /></ScrollReveal>
      <ScrollReveal delay={0.15}><PortfolioMasonry /></ScrollReveal>
      <ScrollReveal delay={0.2}><TrustedBy /></ScrollReveal>
      <ScrollReveal delay={0.25}><TestimonialsSection /></ScrollReveal>
      <ScrollReveal delay={0.3}><ServicesPreview /></ScrollReveal>
      <ScrollReveal delay={0.35}><CTASection /></ScrollReveal>
      <ScrollReveal delay={0.4}><ContactSection /></ScrollReveal>
      <ScrollReveal delay={0.45}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function AboutPage() {
  return (
    <PageTransition>
      <ScrollReveal><AboutSection /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function ServicesPage() {
  return (
    <PageTransition>
      <ScrollReveal><ServicesSection /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function PortfolioPage() {
  return (
    <PageTransition>
      <ScrollReveal><PortfolioSection /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function TeamPage() {
  return (
    <PageTransition>
      <ScrollReveal><TeamSection /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function ProductPage() {
  return (
    <PageTransition>
      <ScrollReveal><ProductDetailPage /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

function LoginRoute() {
  return (
    <PageTransition>
      <ScrollReveal><LoginPage /></ScrollReveal>
    </PageTransition>
  )
}

function ContactRoute() {
  return (
    <PageTransition>
      <ScrollReveal><ContactSection standalone /></ScrollReveal>
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
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

function ResetRoute() {
  return (
    <PageTransition>
      <ResetPasswordPage />
    </PageTransition>
  )
}

function StaticRoute({ pageKey }) {
  return (
    <PageTransition>
      <StaticPage pageKey={pageKey} />
      <ScrollReveal delay={0.1}><Footer /></ScrollReveal>
    </PageTransition>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <HelmetProvider>
      <ToastProvider>
      <WishlistProvider>
      <div className="bg-background text-on-background antialiased min-h-screen flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-4 focus:py-2 focus:bg-white focus:text-[#1d1d1f] focus:rounded-[11px] focus:shadow-lg focus:text-[14px] focus:font-[500]">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1 pb-14 md:pb-16 pt-11 md:pt-[44px]">
          <AnimatePresence mode="wait">
            <Suspense fallback={
              <div className="min-h-[80vh] bg-white flex items-center justify-center">
                <div className="text-center">
                  <div className="w-10 h-10 border-2 border-[#0066cc] border-t-transparent rounded-full animate-spin mx-auto" role="status" aria-label="Loading" />
                  <p className="text-[#7a7a7a] text-[14px] mt-4">Loading KINTOX…</p>
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
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/login" element={<LoginRoute />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/my-designs" element={<MyDesigns />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/contact" element={<ContactRoute />} />
              <Route path="/reset-password" element={<ResetRoute />} />
              <Route path="/privacy" element={<StaticRoute pageKey="privacy" />} />
              <Route path="/terms" element={<StaticRoute pageKey="terms" />} />
              <Route path="/faq" element={<StaticRoute pageKey="faq" />} />
              <Route path="/refund" element={<StaticRoute pageKey="refund" />} />
              <Route path="*" element={<NotFoundRoute />} />
              </Routes>
            </Suspense>
          </AnimatePresence>
        </main>
        <WhatsAppButton />
        <ChatBot />
      </div>
      </WishlistProvider>
      <ToastContainer />
      </ToastProvider>
    </HelmetProvider>
  )
}