import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'

// Configuration - Use environment variable or fallback to current origin for local development
const APP_URL = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '')

// Home/Renovation themed SVG Icons
const HouseIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
    <polyline points="9,22 9,12 15,12 15,22" />
  </svg>
)

const ApartmentIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 6h.01M15 6h.01M9 10h.01M15 10h.01M9 14h.01M15 14h.01M9 18h.01M15 18h.01" />
  </svg>
)

const HammerIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 12l-8.5 8.5a2.12 2.12 0 01-3-3L12 9" />
    <path d="M17.64 15L22 10.64a1 1 0 00-1.41-1.41l-4.24 4.24" />
    <path d="M9 3l6 6-3 3-6-6z" />
    <path d="M3 9l6 6" />
  </svg>
)

const WrenchIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
  </svg>
)

const PaintBrushIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.37 2.63L14 7l-1.59-1.59a2 2 0 00-2.82 0L8 7l9 9 1.59-1.59a2 2 0 000-2.82L17 10l4.37-4.37a2.12 2.12 0 10-3-3z" />
    <path d="M9 8c-2 3-4 3.5-7 4l8 10c2-1 6-5 6-7" />
  </svg>
)

const RulerIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 2l6 6-14 14-6-6z" />
    <path d="M10 8l2 2M6 12l2 2M14 4l2 2" />
  </svg>
)

const WindowIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <line x1="12" y1="3" x2="12" y2="21" />
    <line x1="3" y1="12" x2="21" y2="12" />
  </svg>
)

const DoorIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 2h14a1 1 0 011 1v18a1 1 0 01-1 1H5a1 1 0 01-1-1V3a1 1 0 011-1z" />
    <path d="M12 2v20" />
    <circle cx="15.5" cy="12" r="0.5" fill="currentColor" />
  </svg>
)

const BrickIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="6" rx="1" />
    <rect x="2" y="14" width="20" height="6" rx="1" />
    <line x1="12" y1="4" x2="12" y2="10" />
    <line x1="7" y1="14" x2="7" y2="20" />
    <line x1="17" y1="14" x2="17" y2="20" />
  </svg>
)

const LightBulbIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18h6M10 22h4M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
  </svg>
)

const KeyIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 11-7.778 7.778 5.5 5.5 0 017.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
)

const FloorPlanIcon = ({ size = 48 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9M15 21v-6M15 15h6" />
  </svg>
)

// 3D Parallax Objects Component - Home/Renovation Theme
function Parallax3DObjects() {
  const [scrollY, setScrollY] = useState(0)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  // Calculate parallax transforms
  const getTransform = (speed: number, mouseInfluence: number = 10) => {
    const y = scrollY * speed
    const rotateX = mousePos.y * mouseInfluence
    const rotateY = mousePos.x * mouseInfluence
    return `translateY(${y}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden perspective-container" style={{ zIndex: 1 }}>

      {/* === HERO SECTION === */}

      {/* House - Top Right */}
      <div
        className="floating-object hidden md:block animate-float-gentle"
        style={{ top: '12%', right: '8%', transform: getTransform(-0.25) }}
      >
        <div className="icon-3d">
          <div className="icon-glass" />
          <HouseIcon size={56} />
        </div>
      </div>

      {/* Wrench - Top Left */}
      <div
        className="floating-object hidden md:block animate-float-slow"
        style={{ top: '18%', left: '6%', transform: getTransform(-0.2, 8), animationDelay: '-2s' }}
      >
        <div className="icon-3d forest">
          <div className="icon-glass" />
          <WrenchIcon size={48} />
        </div>
      </div>

      {/* Paint Brush - Left Side */}
      <div
        className="floating-object hidden lg:block animate-float-reverse"
        style={{ top: '35%', left: '4%', transform: getTransform(-0.15, 12) }}
      >
        <div className="icon-3d">
          <PaintBrushIcon size={42} />
        </div>
      </div>

      {/* Apartment Building - Right Side */}
      <div
        className="floating-object hidden md:block animate-float-slow"
        style={{ top: '48%', right: '5%', transform: getTransform(-0.18), animationDelay: '-3s' }}
      >
        <div className="icon-3d forest">
          <div className="icon-glass" />
          <ApartmentIcon size={52} />
        </div>
      </div>

      {/* Decorative line */}
      <div
        className="floating-object hidden md:block"
        style={{ top: '28%', left: '18%', transform: `${getTransform(-0.3)} rotate(25deg)` }}
      >
        <div className="deco-line" style={{ width: '60px' }} />
      </div>

      {/* Floating dots - Hero */}
      <div
        className="floating-object hidden lg:block animate-pulse-soft"
        style={{ top: '22%', right: '22%', transform: getTransform(-0.35) }}
      >
        <div className="floating-dot large" />
      </div>
      <div
        className="floating-object hidden lg:block animate-pulse-soft"
        style={{ top: '38%', left: '15%', transform: getTransform(-0.28), animationDelay: '-1s' }}
      >
        <div className="floating-dot forest" />
      </div>

      {/* === STATS SECTION === */}

      {/* Hammer - Stats area */}
      <div
        className="floating-object hidden md:block animate-float-gentle"
        style={{ top: '72%', right: '12%', transform: getTransform(-0.12, 8), animationDelay: '-1.5s' }}
      >
        <div className="icon-3d">
          <div className="icon-glass" />
          <HammerIcon size={50} />
        </div>
      </div>

      {/* Key - Stats left */}
      <div
        className="floating-object hidden lg:block animate-sway"
        style={{ top: '78%', left: '8%', transform: getTransform(-0.1) }}
      >
        <div className="icon-3d forest">
          <KeyIcon size={40} />
        </div>
      </div>

      {/* Decorative line */}
      <div
        className="floating-object hidden md:block"
        style={{ top: '68%', right: '28%', transform: `${getTransform(-0.2)} rotate(-15deg)` }}
      >
        <div className="deco-line forest" style={{ width: '50px' }} />
      </div>

      {/* === FEATURES SECTION === */}

      {/* Window - Features left */}
      <div
        className="floating-object hidden lg:block animate-float-slow"
        style={{ top: '105%', left: '5%', transform: getTransform(-0.08, 6), animationDelay: '-2s' }}
      >
        <div className="icon-3d">
          <div className="icon-glass" />
          <WindowIcon size={46} />
        </div>
      </div>

      {/* Ruler - Features right */}
      <div
        className="floating-object hidden md:block animate-float-reverse"
        style={{ top: '115%', right: '6%', transform: getTransform(-0.1, 8) }}
      >
        <div className="icon-3d forest">
          <RulerIcon size={44} />
        </div>
      </div>

      {/* Floor Plan - Features center-right */}
      <div
        className="floating-object hidden lg:block animate-float-gentle"
        style={{ top: '125%', right: '18%', transform: getTransform(-0.06), animationDelay: '-1s' }}
      >
        <div className="icon-3d">
          <FloorPlanIcon size={48} />
        </div>
      </div>

      {/* Bricks - Features left */}
      <div
        className="floating-object hidden lg:block animate-sway"
        style={{ top: '135%', left: '10%', transform: getTransform(-0.05), animationDelay: '-0.5s' }}
      >
        <div className="icon-3d forest">
          <BrickIcon size={42} />
        </div>
      </div>

      {/* Door - Lower area */}
      <div
        className="floating-object hidden md:block animate-float-slow"
        style={{ top: '145%', right: '10%', transform: getTransform(-0.04, 5), animationDelay: '-2.5s' }}
      >
        <div className="icon-3d">
          <DoorIcon size={44} />
        </div>
      </div>

      {/* Light Bulb - CTA area */}
      <div
        className="floating-object hidden lg:block animate-pulse-soft"
        style={{ top: '160%', left: '6%', transform: getTransform(-0.03) }}
      >
        <div className="icon-3d">
          <div className="icon-glass" />
          <LightBulbIcon size={50} />
        </div>
      </div>

      {/* Floating dots - Features */}
      <div
        className="floating-object hidden lg:block animate-pulse-soft"
        style={{ top: '110%', left: '20%', transform: getTransform(-0.12), animationDelay: '-2s' }}
      >
        <div className="floating-dot" />
      </div>
      <div
        className="floating-object hidden lg:block animate-pulse-soft"
        style={{ top: '130%', right: '25%', transform: getTransform(-0.08), animationDelay: '-1.5s' }}
      >
        <div className="floating-dot forest small" />
      </div>

      {/* === MOBILE OBJECTS (smaller, fewer) === */}

      {/* House - Mobile */}
      <div
        className="floating-object md:hidden animate-float-gentle"
        style={{ top: '8%', right: '4%', transform: getTransform(-0.2, 5) }}
      >
        <div className="icon-3d">
          <HouseIcon size={36} />
        </div>
      </div>

      {/* Wrench - Mobile */}
      <div
        className="floating-object md:hidden animate-float-slow"
        style={{ top: '45%', left: '3%', transform: getTransform(-0.15, 5), animationDelay: '-1s' }}
      >
        <div className="icon-3d forest">
          <WrenchIcon size={32} />
        </div>
      </div>

      {/* Hammer - Mobile */}
      <div
        className="floating-object md:hidden animate-float-reverse"
        style={{ top: '75%', right: '5%', transform: getTransform(-0.1, 5) }}
      >
        <div className="icon-3d">
          <HammerIcon size={34} />
        </div>
      </div>

    </div>
  )
}

type Lang = 'ka' | 'en'

const translations = {
  ka: {
    nav: { login: 'შესვლა', register: 'რეგისტრაცია', menu: 'მენიუ' },
    hero: {
      badge: 'საქართველოს #1 სახლის სერვისების პლატფორმა',
      title: 'შენი სახლი',
      titleHighlight: 'იმსახურებს საუკეთესოს',
      subtitle: 'იპოვე გადამოწმებული პროფესიონალები შენი სახლისთვის — ინტერიერის დიზაინერები, არქიტექტორები, ხელოსნები და სახლის მოვლის ექსპერტები.',
      findPro: 'მოძებნე ოსტატი',
      becomePro: 'გახდი პროფესიონალი',
    },
    stats: { professionals: 'პროფესიონალი', projects: 'პროექტი', rating: 'რეიტინგი', satisfaction: 'კმაყოფილება' },
    features: {
      title: 'რატომ ირჩევენ Homico-ს?',
      subtitle: 'ჩვენ ვაკავშირებთ სახლის მფლობელებს საუკეთესო პროფესიონალებთან',
      secure: { title: 'უსაფრთხო გადახდები', description: 'თქვენი თანხა დაცულია სამუშაოს დასრულებამდე.' },
      quality: { title: 'გადამოწმებული ოსტატები', description: 'ყველა პროფესიონალი გადის ვერიფიკაციას.' },
      fast: { title: 'სწრაფი შედეგი', description: 'მიიღეთ შეთავაზებები რამდენიმე წუთში.' },
      communication: { title: 'პირდაპირი კონტაქტი', description: 'დაუკავშირდით ოსტატებს პირდაპირ.' },
    },
    cta: { title: 'მზად ხარ დასაწყებად?', subtitle: 'შემოგვიერთდი ათასობით კმაყოფილ მომხმარებელს და იპოვე შენი ოსტატი დღესვე' },
    footer: { rights: 'ყველა უფლება დაცულია' },
  },
  en: {
    nav: { login: 'Login', register: 'Get Started', menu: 'Menu' },
    hero: {
      badge: "Georgia's #1 Home Services Platform",
      title: 'Your home',
      titleHighlight: 'deserves the best',
      subtitle: 'Find verified professionals for your home — interior designers, architects, craftsmen, and home care experts.',
      findPro: 'Find a Pro',
      becomePro: 'Become a Pro',
    },
    stats: { professionals: 'Professionals', projects: 'Projects', rating: 'Rating', satisfaction: 'Satisfaction' },
    features: {
      title: 'Why choose Homico?',
      subtitle: 'We connect homeowners with the best professionals',
      secure: { title: 'Secure Payments', description: 'Your money is protected until the job is complete.' },
      quality: { title: 'Verified Pros', description: 'Every professional goes through verification.' },
      fast: { title: 'Fast Results', description: 'Get offers within minutes.' },
      communication: { title: 'Direct Contact', description: 'Connect with pros directly.' },
    },
    cta: { title: 'Ready to get started?', subtitle: 'Join thousands of happy customers and find your pro today' },
    footer: { rights: 'All rights reserved' },
  },
}

export default function App() {
  const [lang] = useState<Lang>('ka')
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  // Set dark mode by default
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  useEffect(() => {
    setIsLoaded(true)
    document.documentElement.lang = lang
  }, [lang])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{lang === 'ka' ? 'Homico - შენი სახლი იმსახურებს საუკეთესოს' : 'Homico - Your Home Deserves the Best'}</title>
        <meta name="description" content={t.hero.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden relative transition-colors duration-300">
        {/* Subtle grain texture */}
        <div className="fixed inset-0 pointer-events-none grain" />

        {/* Decorative gradient shapes */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl animate-float" style={{ backgroundColor: 'var(--blob-1)' }} />
          <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'var(--blob-2)' }} />
          <div className="absolute -bottom-40 right-1/4 w-[500px] h-[500px] rounded-full blur-3xl" style={{ backgroundColor: 'var(--blob-3)' }} />
        </div>

        {/* 3D Parallax Objects */}
        <Parallax3DObjects />

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-colors duration-300" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--color-border)' }}>
          <nav className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 z-50">
              <span className="text-xl md:text-2xl font-serif font-semibold text-[var(--color-text-primary)] tracking-tight">
                Homico
              </span>
              <span className="w-1.5 md:w-2 h-1.5 md:h-2 rounded-full bg-primary-400"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-3">
              <a
                href={`${APP_URL}/login`}
                className="px-5 py-2.5 font-medium transition-colors duration-200 text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
              >
                {t.nav.login}
              </a>
              <a
                href={`${APP_URL}/register`}
                className="btn-primary px-6 py-2.5 rounded-xl"
              >
                {t.nav.register}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-300"
              style={{
                backgroundColor: mobileMenuOpen ? 'var(--color-bg-elevated)' : 'transparent',
                border: mobileMenuOpen ? '1px solid var(--color-border)' : '1px solid transparent'
              }}
              aria-label={t.nav.menu}
            >
              <div className="w-5 h-4 relative flex flex-col justify-between">
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-[7px]' : ''}`}
                  style={{ backgroundColor: mobileMenuOpen ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
                />
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0 scale-x-0' : ''}`}
                  style={{ backgroundColor: 'var(--color-text-primary)' }}
                />
                <span
                  className={`w-full h-[2px] rounded-full transition-all duration-300 ease-out origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`}
                  style={{ backgroundColor: mobileMenuOpen ? 'var(--color-accent)' : 'var(--color-text-primary)' }}
                />
              </div>
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          <div
            className={`md:hidden fixed inset-x-0 bottom-0 transition-all duration-400 ease-out ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            style={{
              top: '64px',
              backgroundColor: 'var(--color-bg-primary)',
            }}
          >
            <div className="h-full flex flex-col px-5 pt-6 pb-8">
              {/* Card container with background */}
              <div
                className={`rounded-2xl p-6 transition-all duration-400 ease-out ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'}`}
                style={{
                  backgroundColor: 'var(--color-bg-elevated)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-lg)'
                }}
              >
                {/* Action Buttons */}
                <div className="flex flex-col gap-3">
                  <a
                    href={`${APP_URL}/register`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-primary w-full py-3.5 text-center text-base"
                  >
                    {t.nav.register}
                  </a>
                  <a
                    href={`${APP_URL}/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="btn-secondary w-full py-3.5 text-center text-base"
                  >
                    {t.nav.login}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section */}
          <section className="relative min-h-[100svh] flex items-center justify-center pt-16 md:pt-20">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                {/* Badge */}
                <div className={`badge badge-accent mb-8 transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <span className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" />
                  <span>{t.hero.badge}</span>
                </div>

                {/* Title */}
                <h1 className={`text-[2.75rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 md:mb-8 tracking-tight transition-all duration-1000 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <span className="block text-[var(--color-text-primary)]">{t.hero.title}</span>
                  <span className="block mt-1 md:mt-2 gradient-text">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                <p className={`text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-200 text-[var(--color-text-secondary)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {t.hero.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <a
                    href={`${APP_URL}/browse`}
                    className="group btn-primary inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-4"
                  >
                    <span>{t.hero.findPro}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="group btn-secondary inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-4"
                  >
                    <span>{t.hero.becomePro}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>

                {/* Trust indicators */}
                <div className={`mt-12 md:mt-16 flex flex-wrap justify-center gap-6 md:gap-10 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-300 to-primary-500 border-2 shadow-sm" style={{ borderColor: 'var(--color-bg-primary)' }} />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">500+ {lang === 'ka' ? 'ოსტატი' : 'Pros'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4 text-primary-400" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">4.9 {lang === 'ka' ? 'რეიტინგი' : 'Rating'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:block">
              <div className="flex flex-col items-center gap-2 text-[var(--color-text-muted)]">
                <span className="text-xs font-medium uppercase tracking-wider">{lang === 'ka' ? 'გადაახვიე' : 'Scroll'}</span>
                <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <StatsSection t={t} />

          {/* Features Section */}
          <section className="py-16 md:py-28 relative">
            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4">{t.features.title}</h2>
                <p className="text-base md:text-lg max-w-xl mx-auto text-[var(--color-text-secondary)]">{t.features.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
                <FeatureCard
                  icon={<ShieldIcon />}
                  title={t.features.secure.title}
                  description={t.features.secure.description}
                  color="primary"
                  delay={0}
                />
                <FeatureCard
                  icon={<BadgeIcon />}
                  title={t.features.quality.title}
                  description={t.features.quality.description}
                  color="forest"
                  delay={100}
                />
                <FeatureCard
                  icon={<BoltIcon />}
                  title={t.features.fast.title}
                  description={t.features.fast.description}
                  color="primary"
                  delay={200}
                />
                <FeatureCard
                  icon={<ChatIcon />}
                  title={t.features.communication.title}
                  description={t.features.communication.description}
                  color="forest"
                  delay={300}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-forest-800 to-forest-900" />
            <div className="absolute inset-0 grain opacity-10" />

            {/* Decorative circles */}
            <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-400/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-primary-400/5 rounded-full blur-2xl" />

            <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white mb-4 md:mb-6">{t.cta.title}</h2>
                <p className="text-base md:text-lg text-white/80 mb-8 md:mb-10">{t.cta.subtitle}</p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <a
                    href={`${APP_URL}/browse`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-4 bg-primary-400 text-forest-900 font-semibold rounded-xl transition-all duration-300 hover:bg-primary-300 hover:shadow-glow hover:-translate-y-1 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.findPro}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-7 sm:px-8 py-4 bg-transparent text-white font-semibold rounded-xl border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/50 hover:-translate-y-1 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.becomePro}</span>
                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-8 md:py-10 transition-colors duration-300" style={{ backgroundColor: 'var(--color-bg-elevated)', borderColor: 'var(--color-border)' }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-serif font-semibold text-[var(--color-text-primary)]">Homico</span>
                <span className="w-1.5 h-1.5 rounded-full bg-primary-400"></span>
              </div>
              <p className="text-sm text-[var(--color-text-muted)]">&copy; 2024 Homico. {t.footer.rights}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Stats Section
function StatsSection({ t }: { t: typeof translations.ka }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const [counts, setCounts] = useState({ pros: 0, projects: 0, rating: 0, satisfaction: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!inView) return

    const animate = (key: keyof typeof counts, end: number, duration: number) => {
      let startTime: number
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 4)
        setCounts(prev => ({ ...prev, [key]: Math.floor(eased * end) }))
        if (progress < 1) requestAnimationFrame(step)
      }
      requestAnimationFrame(step)
    }

    animate('pros', 500, 2000)
    animate('projects', 2500, 2500)
    animate('rating', 49, 1500)
    animate('satisfaction', 98, 2000)
  }, [inView])

  return (
    <section ref={ref} className="py-16 md:py-24 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="card rounded-3xl p-8 md:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <StatItem value={`${counts.pros}+`} label={t.stats.professionals} />
            <StatItem value={`${counts.projects}+`} label={t.stats.projects} />
            <StatItem value={`${(counts.rating / 10).toFixed(1)}`} label={t.stats.rating} suffix="/5" />
            <StatItem value={`${counts.satisfaction}`} label={t.stats.satisfaction} suffix="%" />
          </div>
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary-400 mb-2">
        {value}<span className="text-[var(--color-text-muted)]">{suffix}</span>
      </div>
      <div className="text-sm md:text-base font-medium text-[var(--color-text-secondary)]">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, color, delay }: { icon: React.ReactNode; title: string; description: string; color: 'primary' | 'forest'; delay: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const bgColor = color === 'primary' ? 'var(--color-accent-soft)' : 'var(--color-forest-soft)'
  const iconColor = color === 'primary' ? 'var(--color-accent)' : 'var(--color-forest)'

  return (
    <div
      ref={ref}
      className={`group card rounded-2xl p-6 md:p-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div
        className="w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300"
        style={{ backgroundColor: bgColor }}
      >
        <div style={{ color: iconColor }}>{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 text-[var(--color-text-primary)]">{title}</h3>
      <p className="text-sm md:text-base leading-relaxed text-[var(--color-text-secondary)]">{description}</p>
    </div>
  )
}

// Icons
function ShieldIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function BadgeIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
