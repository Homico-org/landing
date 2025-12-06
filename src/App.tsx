import { useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'

// Configuration
const APP_URL = import.meta.env.VITE_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '')
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001'

// Helper to get cookie value
function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  return match ? match[2] : null
}

// Hook to check if user is authenticated
function useAuthRedirect() {
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('access_token') || localStorage.getItem('token') || getCookie('auth_token')
        const userRole = getCookie('user_role')

        if (!token) {
          setIsChecking(false)
          return
        }

        if (userRole) {
          if (userRole === 'company') {
            window.location.href = `${APP_URL}/company/jobs`
          } else if (userRole === 'admin') {
            window.location.href = `${APP_URL}/admin`
          } else {
            window.location.href = `${APP_URL}/browse`
          }
          return
        }

        const response = await fetch(`${API_URL}/users/me`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })

        if (response.ok) {
          const userData = await response.json()
          if (userData.role === 'company') {
            window.location.href = `${APP_URL}/company/jobs`
          } else if (userData.role === 'admin') {
            window.location.href = `${APP_URL}/admin`
          } else {
            window.location.href = `${APP_URL}/browse`
          }
          return
        }

        localStorage.removeItem('access_token')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
      } catch {
        // Error checking auth
      }

      setIsChecking(false)
    }

    checkAuth()
  }, [])

  return { isChecking }
}

type Lang = 'ka' | 'en'

const translations = {
  ka: {
    nav: { login: 'შესვლა', register: 'დაწყება', menu: 'მენიუ' },
    hero: {
      badge: 'საქართველოს #1 სახლის სერვისების პლატფორმა',
      title: 'შენი სახლი',
      titleHighlight: 'იმსახურებს საუკეთესოს',
      subtitle: 'იპოვე გადამოწმებული პროფესიონალები რომლებიც შენს ოცნების სახლს რეალობად აქცევენ.',
      findPro: 'იპოვე ოსტატი',
      becomePro: 'დაემატე ოსტატად',
    },
    stats: { professionals: 'პროფესიონალი', projects: 'დასრულებული პროექტი', rating: 'საშუალო რეიტინგი', satisfaction: 'კლიენტის კმაყოფილება' },
    howItWorks: {
      title: 'როგორ მუშაობს',
      subtitle: 'სამი მარტივი ნაბიჯი შენი პროექტისთვის',
      step1: { title: 'აღწერე პროექტი', desc: 'გვითხარი რა სჭირდება შენს სახლს და მიიღე შეთავაზებები გადამოწმებული ოსტატებისგან' },
      step2: { title: 'შეადარე და აირჩიე', desc: 'შეადარე პორტფოლიოები, შეფასებები და ფასები რომ იპოვო სწორი ოსტატი' },
      step3: { title: 'დაასრულე პროექტი', desc: 'იმუშავე პირდაპირ ოსტატთან და გადაიხადე მხოლოდ კმაყოფილების შემთხვევაში' },
    },
    categories: {
      title: 'რას ეძებ?',
      subtitle: 'იპოვე ოსტატი ნებისმიერი სახლის პროექტისთვის',
      designer: { name: 'დიზაინერი', desc: 'ინტერიერის და ექსტერიერის დიზაინი' },
      architect: { name: 'არქიტექტორი', desc: 'პროექტირება და მშენებლობა' },
      craftsmen: { name: 'ხელოსანი', desc: 'ელექტრიკა, სანტექნიკა, შეკეთება' },
      services: { name: 'სერვისები', desc: 'დალაგება, გადაზიდვა, მოვლა' },
    },
    features: {
      title: 'რატომ Homico?',
      subtitle: 'პლატფორმა შექმნილია შენი მოხერხებულობისთვის',
      secure: { title: 'თანხა დაცულია', desc: 'გადაიხადე მხოლოდ სამუშაოს დასრულების შემდეგ' },
      quality: { title: 'გადამოწმებული ოსტატები', desc: 'ყველა პროფესიონალი გადის ვერიფიკაციას' },
      fast: { title: 'სწრაფი შეთავაზებები', desc: 'მიიღე პასუხი წუთებში, არა დღეებში' },
      support: { title: '24/7 მხარდაჭერა', desc: 'ჩვენი გუნდი ყოველთვის შენს გვერდითაა' },
    },
    testimonials: {
      title: 'რას ამბობენ ჩვენი მომხმარებლები',
      review1: { text: 'საოცარი გამოცდილება! ვიპოვე შესანიშნავი დიზაინერი რომელმაც ჩემი ბინა სრულიად შეცვალა.', author: 'მარიამ გ.', role: 'თბილისი' },
      review2: { text: 'პროფესიონალიზმის მაღალი დონე. რემონტი დასრულდა დროულად და ხარისხიანად.', author: 'გიორგი კ.', role: 'ბათუმი' },
      review3: { text: 'მარტივი პროცესი, საიმედო ოსტატები. აუცილებლად გამოვიყენებ კიდევ.', author: 'ანა მ.', role: 'ქუთაისი' },
    },
    cta: {
      title: 'მზად ხარ დასაწყებად?',
      subtitle: 'შემოგვიერთდი ათასობით კმაყოფილ მომხმარებელს და იპოვე შენი ოსტატი დღესვე',
      clientCta: 'მინდა ოსტატის პოვნა',
      proCta: 'ვარ პროფესიონალი',
    },
    footer: {
      rights: 'ყველა უფლება დაცულია',
      about: 'ჩვენს შესახებ',
      contact: 'კონტაქტი',
      terms: 'პირობები',
      privacy: 'კონფიდენციალობა',
    },
  },
  en: {
    nav: { login: 'Login', register: 'Get Started', menu: 'Menu' },
    hero: {
      badge: "Georgia's #1 Home Services Platform",
      title: 'Your home',
      titleHighlight: 'deserves the best',
      subtitle: 'Find verified professionals who will turn your dream home into reality.',
      findPro: 'Find a Pro',
      becomePro: 'Become Pro',
    },
    stats: { professionals: 'Professionals', projects: 'Completed Projects', rating: 'Average Rating', satisfaction: 'Client Satisfaction' },
    howItWorks: {
      title: 'How It Works',
      subtitle: 'Three simple steps to your project',
      step1: { title: 'Describe Your Project', desc: 'Tell us what your home needs and receive offers from verified professionals' },
      step2: { title: 'Compare & Choose', desc: 'Compare portfolios, reviews and prices to find the right professional' },
      step3: { title: 'Complete Your Project', desc: 'Work directly with the professional and pay only when satisfied' },
    },
    categories: {
      title: 'What are you looking for?',
      subtitle: 'Find a professional for any home project',
      designer: { name: 'Designer', desc: 'Interior and exterior design' },
      architect: { name: 'Architect', desc: 'Planning and construction' },
      craftsmen: { name: 'Craftsmen', desc: 'Electrical, plumbing, repairs' },
      services: { name: 'Services', desc: 'Cleaning, moving, maintenance' },
    },
    features: {
      title: 'Why Homico?',
      subtitle: 'A platform built for your convenience',
      secure: { title: 'Money Protected', desc: 'Pay only after the work is completed' },
      quality: { title: 'Verified Pros', desc: 'All professionals go through verification' },
      fast: { title: 'Quick Offers', desc: 'Get responses in minutes, not days' },
      support: { title: '24/7 Support', desc: 'Our team is always by your side' },
    },
    testimonials: {
      title: 'What Our Customers Say',
      review1: { text: 'Amazing experience! Found a fantastic designer who completely transformed my apartment.', author: 'Mariam G.', role: 'Tbilisi' },
      review2: { text: 'High level of professionalism. The renovation was completed on time and with quality.', author: 'Giorgi K.', role: 'Batumi' },
      review3: { text: 'Simple process, reliable professionals. Will definitely use again.', author: 'Ana M.', role: 'Kutaisi' },
    },
    cta: {
      title: 'Ready to get started?',
      subtitle: 'Join thousands of satisfied customers and find your professional today',
      clientCta: 'Find a Professional',
      proCta: "I'm a Professional",
    },
    footer: {
      rights: 'All rights reserved',
      about: 'About Us',
      contact: 'Contact',
      terms: 'Terms',
      privacy: 'Privacy',
    },
  },
}

// Floating Background Objects - Organic, soft geometric shapes
function FloatingObjects() {
  return (
    <div className="floating-objects">
      {/* Large organic blobs - main atmosphere */}
      <div
        className="floating-object blob-sage anim-drift-1"
        style={{
          width: '600px',
          height: '600px',
          top: '-10%',
          right: '-5%',
        }}
      />
      <div
        className="floating-object blob-terracotta anim-drift-2"
        style={{
          width: '500px',
          height: '500px',
          top: '25%',
          left: '-8%',
        }}
      />
      <div
        className="floating-object blob-gold anim-drift-3"
        style={{
          width: '400px',
          height: '400px',
          bottom: '10%',
          right: '15%',
        }}
      />
      <div
        className="floating-object blob-sage anim-drift-2"
        style={{
          width: '350px',
          height: '350px',
          top: '60%',
          left: '10%',
        }}
      />

      {/* Medium accent blobs */}
      <div
        className="floating-object blob-terracotta anim-pulse-grow"
        style={{
          width: '250px',
          height: '250px',
          top: '15%',
          left: '35%',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="floating-object blob-gold anim-drift-1"
        style={{
          width: '300px',
          height: '300px',
          bottom: '30%',
          left: '60%',
        }}
      />

      {/* Geometric accents - subtle rings */}
      <div
        className="floating-object geo-ring anim-ring-pulse"
        style={{
          width: '180px',
          height: '180px',
          top: '20%',
          right: '20%',
        }}
      />
      <div
        className="floating-object geo-ring anim-ring-pulse"
        style={{
          width: '120px',
          height: '120px',
          bottom: '25%',
          left: '25%',
        }}
      />
      <div
        className="floating-object geo-ring anim-ring-pulse"
        style={{
          width: '90px',
          height: '90px',
          top: '45%',
          right: '35%',
        }}
      />

      {/* Soft square */}
      <div
        className="floating-object geo-soft-square anim-spin"
        style={{
          width: '200px',
          height: '200px',
          top: '70%',
          right: '8%',
        }}
      />

      {/* Diamond accent */}
      <div
        className="floating-object geo-diamond anim-drift-3"
        style={{
          width: '150px',
          height: '150px',
          top: '35%',
          left: '20%',
        }}
      />

      {/* Dot clusters for texture */}
      <div
        className="floating-object dot-cluster"
        style={{
          top: '12%',
          left: '15%',
        }}
      />
      <div
        className="floating-object dot-cluster"
        style={{
          top: '55%',
          right: '12%',
        }}
      />
      <div
        className="floating-object dot-cluster"
        style={{
          bottom: '18%',
          left: '40%',
        }}
      />

      {/* Subtle decorative lines */}
      <div
        className="floating-object line-accent"
        style={{
          width: '200px',
          top: '30%',
          left: '5%',
          transform: 'rotate(-15deg)',
        }}
      />
      <div
        className="floating-object line-accent"
        style={{
          width: '150px',
          bottom: '35%',
          right: '10%',
          transform: 'rotate(20deg)',
        }}
      />
      <div
        className="floating-object line-vertical"
        style={{
          height: '120px',
          top: '40%',
          right: '25%',
        }}
      />

      {/* Additional small blobs for depth */}
      <div
        className="floating-object blob-sage anim-pulse-grow"
        style={{
          width: '180px',
          height: '180px',
          top: '80%',
          left: '70%',
          filter: 'blur(60px)',
        }}
      />
      <div
        className="floating-object blob-terracotta anim-drift-1"
        style={{
          width: '220px',
          height: '220px',
          top: '5%',
          left: '55%',
          filter: 'blur(90px)',
        }}
      />
    </div>
  )
}

export default function App() {
  const [lang] = useState<Lang>('ka')
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('landing-theme')
      if (saved) return saved === 'dark'
      return window.matchMedia('(prefers-color-scheme: dark)').matches
    }
    return false
  })
  const t = translations[lang]

  const { isChecking } = useAuthRedirect()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
    localStorage.setItem('landing-theme', isDark ? 'dark' : 'light')
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  useEffect(() => {
    if (!isChecking) {
      setIsLoaded(true)
    }
    document.documentElement.lang = lang
  }, [lang, isChecking])

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

  if (isChecking) {
    return (
      <div className="min-h-screen bg-[var(--color-bg-primary)] flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--color-accent)] border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{lang === 'ka' ? 'Homico - შენი სახლი იმსახურებს საუკეთესოს' : 'Homico - Your Home Deserves the Best'}</title>
        <meta name="description" content={t.hero.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] overflow-x-hidden relative transition-colors duration-500">
        {/* Floating Background Objects */}
        <FloatingObjects />

        {/* Subtle Grid Pattern Overlay */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
          <div
            className="absolute inset-0"
            style={{
              opacity: isDark ? 0.015 : 0.02,
              backgroundImage: `
                linear-gradient(to right, currentColor 1px, transparent 1px),
                linear-gradient(to bottom, currentColor 1px, transparent 1px)
              `,
              backgroundSize: '80px 80px',
            }}
          />
        </div>

        {/* Header */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-2xl border-b transition-all duration-300" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--color-border)' }}>
          <nav className="max-w-6xl mx-auto px-5 sm:px-8 flex items-center justify-between h-16 md:h-18">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2.5 z-50">
              <span className="text-xl md:text-2xl font-semibold text-[var(--color-text-primary)] tracking-tight">
                Homico
              </span>
              <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-bg-tertiary)]"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0 absolute' : 'opacity-100 rotate-0 scale-100'}`}
                  style={{ color: 'var(--color-text-tertiary)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                </svg>
                <svg
                  className={`w-5 h-5 transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0 absolute'}`}
                  style={{ color: 'var(--color-text-tertiary)' }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                </svg>
              </button>

              <a
                href={`${APP_URL}/login`}
                className="px-5 py-2.5 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-xl hover:bg-[var(--color-bg-tertiary)]"
              >
                {t.nav.login}
              </a>
              <a
                href={`${APP_URL}/register`}
                className="px-5 py-2.5 text-sm font-medium bg-[var(--color-forest)] text-white rounded-xl transition-all duration-300 hover:opacity-90 hover:shadow-lg"
              >
                {t.nav.register}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-colors hover:bg-[var(--color-bg-tertiary)]"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? (
                  <svg className="w-5 h-5" style={{ color: 'var(--color-text-tertiary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" style={{ color: 'var(--color-text-tertiary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-10 h-10 flex items-center justify-center rounded-xl transition-colors hover:bg-[var(--color-bg-tertiary)]"
                aria-label={t.nav.menu}
              >
                <div className="w-5 h-3.5 relative flex flex-col justify-between">
                  <span className={`w-full h-[2px] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[6px] bg-[var(--color-accent)]' : 'bg-[var(--color-text-primary)]'}`} />
                  <span className={`w-full h-[2px] rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'bg-[var(--color-text-primary)]'}`} />
                  <span className={`w-full h-[2px] rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[6px] bg-[var(--color-accent)]' : 'bg-[var(--color-text-primary)]'}`} />
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed inset-x-0 bottom-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            style={{ top: '64px', backgroundColor: 'var(--color-bg-primary)' }}
          >
            <div className="p-5">
              <div className={`card p-5 transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                <div className="flex flex-col gap-3">
                  <a
                    href={`${APP_URL}/register`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 text-center text-sm font-medium bg-[var(--color-forest)] text-white rounded-2xl transition-all"
                  >
                    {t.nav.register}
                  </a>
                  <a
                    href={`${APP_URL}/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3.5 text-center text-sm font-medium text-[var(--color-text-secondary)] rounded-2xl transition-all border border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]"
                  >
                    {t.nav.login}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section - More spacious */}
          <section className="relative min-h-[100svh] flex items-center justify-center pt-16 md:pt-20">
            <div className="max-w-6xl mx-auto px-5 sm:px-8 py-20 md:py-28 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                {/* Badge */}
                <div className={`badge badge-accent mb-8 md:mb-10 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="w-2 h-2 bg-[var(--color-accent)] rounded-full animate-pulse" />
                  <span className="text-sm">{t.hero.badge}</span>
                </div>

                {/* Title - More breathing room */}
                <h1 className={`mb-6 md:mb-8 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="block text-[var(--color-text-primary)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                    {t.hero.title}
                  </span>
                  <span className="block md:h-[170px] mt-2 md:mt-3 hero-highlight-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                {/* Subtitle - More width */}
                <p className={`text-base sm:text-lg md:text-xl mb-10 md:mb-12 max-w-2xl mx-auto leading-relaxed transition-all duration-700 delay-200 text-[var(--color-text-secondary)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {t.hero.subtitle}
                </p>

                {/* CTA Buttons - Larger and more spaced */}
                <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <a
                    href={`${APP_URL}/login`}
                    className="btn-primary px-8 py-4 text-base md:text-lg inline-flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <span>{t.hero.findPro}</span>
                  </a>
                  <a
                    href={`${APP_URL}/register?type=pro`}
                    className="btn-secondary px-8 py-4 text-base md:text-lg inline-flex items-center justify-center gap-3"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                    <span>{t.hero.becomePro}</span>
                  </a>
                </div>

                {/* Trust indicators - More elegant */}
                <div className={`mt-14 md:mt-20 flex flex-wrap justify-center gap-8 md:gap-12 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {[1,2,3,4,5].map(i => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full border-2 border-[var(--color-bg-primary)]"
                          style={{
                            background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-forest) 100%)`,
                            opacity: 1 - (i * 0.1)
                          }}
                        />
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">500+ {lang === 'ka' ? 'ოსტატი' : 'Pros'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-4 h-4 text-[var(--color-warm)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-sm font-medium text-[var(--color-text-secondary)]">4.9/5 {lang === 'ka' ? 'რეიტინგი' : 'Rating'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2">
              <span className="text-xs text-[var(--color-text-muted)]">{lang === 'ka' ? 'გადაახვიე' : 'Scroll'}</span>
              <svg className="w-5 h-5 text-[var(--color-text-muted)] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>

          {/* Stats Section */}
          <StatsSection t={t} />

          {/* How It Works Section */}
          <HowItWorksSection t={t} />

          {/* Categories Section */}
          <CategoriesSection t={t} appUrl={APP_URL} />

          {/* Features Section */}
          <section className="py-20 md:py-32 relative">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4">{t.features.title}</h2>
                <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">{t.features.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                <FeatureCard
                  icon={<ShieldIcon />}
                  title={t.features.secure.title}
                  description={t.features.secure.desc}
                  delay={0}
                  accent="accent"
                />
                <FeatureCard
                  icon={<BadgeIcon />}
                  title={t.features.quality.title}
                  description={t.features.quality.desc}
                  delay={50}
                  accent="forest"
                />
                <FeatureCard
                  icon={<BoltIcon />}
                  title={t.features.fast.title}
                  description={t.features.fast.desc}
                  delay={100}
                  accent="warm"
                />
                <FeatureCard
                  icon={<SupportIcon />}
                  title={t.features.support.title}
                  description={t.features.support.desc}
                  delay={150}
                  accent="gold"
                />
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <TestimonialsSection t={t} />

          {/* CTA Section */}
          <section className="py-20 md:py-32 relative">
            <div className="max-w-6xl mx-auto px-5 sm:px-8">
              <div className="card p-10 md:p-16 text-center relative overflow-hidden">
                {/* Gradient background */}
                <div className="absolute inset-0 opacity-60" style={{ background: 'linear-gradient(135deg, var(--color-accent-soft) 0%, transparent 40%, var(--color-warm-soft) 100%)' }} />

                <div className="relative z-10">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4 md:mb-6">{t.cta.title}</h2>
                  <p className="text-base md:text-lg text-[var(--color-text-secondary)] mb-8 md:mb-10 max-w-xl mx-auto leading-relaxed">{t.cta.subtitle}</p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href={`${APP_URL}/login`}
                      className="btn-primary px-8 py-4 text-base md:text-lg inline-flex items-center justify-center gap-3"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <span>{t.cta.clientCta}</span>
                    </a>
                    <a
                      href={`${APP_URL}/register?type=pro`}
                      className="btn-secondary px-8 py-4 text-base md:text-lg inline-flex items-center justify-center gap-3"
                    >
                      <span>{t.cta.proCta}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-10 md:py-12 border-t transition-colors" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-6xl mx-auto px-5 sm:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-2.5">
                <span className="text-lg font-semibold text-[var(--color-text-primary)]">Homico</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
              </div>

              <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--color-text-tertiary)]">
                <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t.footer.about}</a>
                <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t.footer.contact}</a>
                <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t.footer.terms}</a>
                <a href="#" className="hover:text-[var(--color-text-primary)] transition-colors">{t.footer.privacy}</a>
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
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          <StatItem value={`${counts.pros}+`} label={t.stats.professionals} />
          <StatItem value={`${counts.projects}+`} label={t.stats.projects} />
          <StatItem value={`${(counts.rating / 10).toFixed(1)}`} label={t.stats.rating} suffix="/5" />
          <StatItem value={`${counts.satisfaction}`} label={t.stats.satisfaction} suffix="%" />
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label, suffix = '' }: { value: string; label: string; suffix?: string }) {
  return (
    <div className="text-center p-6 md:p-8">
      <div className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-2">
        <span className="font-serif italic text-[var(--color-accent)]">{value}</span>
        <span className="text-[var(--color-text-muted)] text-2xl md:text-3xl">{suffix}</span>
      </div>
      <div className="text-sm md:text-base font-medium text-[var(--color-text-secondary)]">{label}</div>
    </div>
  )
}

// How It Works Section
function HowItWorksSection({ t }: { t: typeof translations.ka }) {
  const [inView, setInView] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true) },
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const steps = [
    { icon: <ClipboardIcon />, ...t.howItWorks.step1 },
    { icon: <CompareIcon />, ...t.howItWorks.step2 },
    { icon: <CheckCircleIcon />, ...t.howItWorks.step3 },
  ]

  return (
    <section ref={ref} className="py-20 md:py-32 relative" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4">{t.howItWorks.title}</h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">{t.howItWorks.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`relative text-center transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Step number */}
              <div className="mb-6 relative">
                <div className="w-20 h-20 mx-auto rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
                  <div className="text-[var(--color-accent)]">{step.icon}</div>
                </div>
                <div className="absolute -top-2 -right-2 md:right-1/4 w-8 h-8 rounded-full bg-[var(--color-forest)] text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[calc(100%-20%)] h-[2px]" style={{ background: 'linear-gradient(90deg, var(--color-accent-muted), transparent)' }} />
              )}

              <h3 className="text-lg md:text-xl font-semibold text-[var(--color-text-primary)] mb-3">{step.title}</h3>
              <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed max-w-xs mx-auto">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Categories Section
function CategoriesSection({ t, appUrl }: { t: typeof translations.ka; appUrl: string }) {
  const categories = [
    { key: 'designer', icon: <DesignerIcon />, ...t.categories.designer },
    { key: 'architect', icon: <ArchitectIcon />, ...t.categories.architect },
    { key: 'craftsmen', icon: <CraftsmenIcon />, ...t.categories.craftsmen },
    { key: 'services', icon: <ServicesIcon />, ...t.categories.services },
  ]

  return (
    <section className="py-20 md:py-32 relative">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4">{t.categories.title}</h2>
          <p className="text-base md:text-lg text-[var(--color-text-secondary)] max-w-xl mx-auto">{t.categories.subtitle}</p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {categories.map((cat) => (
            <a
              key={cat.key}
              href={`${appUrl}/browse?category=${cat.key}`}
              className="category-card card-solid p-6 md:p-8 text-center group cursor-pointer"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 md:mb-5 transition-all duration-300 group-hover:scale-110" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
                <div className="text-[var(--color-accent)] transition-colors group-hover:text-[var(--color-forest)]">{cat.icon}</div>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text-primary)] mb-2">{cat.name}</h3>
              <p className="text-xs md:text-sm text-[var(--color-text-tertiary)] leading-relaxed">{cat.desc}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// Testimonials Section
function TestimonialsSection({ t }: { t: typeof translations.ka }) {
  const reviews = [
    { ...t.testimonials.review1, rating: 5 },
    { ...t.testimonials.review2, rating: 5 },
    { ...t.testimonials.review3, rating: 5 },
  ]

  return (
    <section className="py-20 md:py-32 relative" style={{ backgroundColor: 'var(--color-bg-tertiary)' }}>
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-[var(--color-text-primary)] mb-4">{t.testimonials.title}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {reviews.map((review, index) => (
            <div key={index} className="card p-6 md:p-8">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-[var(--color-warm)]" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 text-sm md:text-base">
                "{review.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-medium" style={{ background: 'linear-gradient(135deg, var(--color-accent), var(--color-forest))' }}>
                  {review.author.charAt(0)}
                </div>
                <div>
                  <div className="font-medium text-[var(--color-text-primary)] text-sm">{review.author}</div>
                  <div className="text-xs text-[var(--color-text-tertiary)]">{review.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon, title, description, delay, accent }: { icon: React.ReactNode; title: string; description: string; delay: number; accent: string }) {
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

  const accentColors: Record<string, string> = {
    accent: 'var(--color-accent-soft)',
    forest: 'var(--color-forest-soft)',
    warm: 'var(--color-warm-soft)',
    gold: 'var(--color-gold-soft)',
  }

  const iconColors: Record<string, string> = {
    accent: 'var(--color-accent)',
    forest: 'var(--color-forest)',
    warm: 'var(--color-warm)',
    gold: 'var(--color-gold)',
  }

  return (
    <div
      ref={ref}
      className={`card-solid p-6 md:p-8 flex items-start gap-5 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: accentColors[accent] }}>
        <div style={{ color: iconColors[accent] }}>{icon}</div>
      </div>
      <div>
        <h3 className="text-base md:text-lg font-semibold mb-2 text-[var(--color-text-primary)]">{title}</h3>
        <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Icons
function ShieldIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function BadgeIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function SupportIcon() {
  return (
    <svg className="w-6 h-6 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  )
}

function ClipboardIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  )
}

function CompareIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  )
}

function DesignerIcon() {
  return (
    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
    </svg>
  )
}

function ArchitectIcon() {
  return (
    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function CraftsmenIcon() {
  return (
    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
    </svg>
  )
}

function ServicesIcon() {
  return (
    <svg className="w-7 h-7 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  )
}
