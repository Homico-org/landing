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
      subtitle: 'იპოვე გადამოწმებული პროფესიონალები შენი სახლისთვის — დიზაინერები, არქიტექტორები, ხელოსნები.',
      findPro: 'იპოვე ოსტატი',
      becomePro: 'გახდი პრო',
    },
    stats: { professionals: 'პროფესიონალი', projects: 'პროექტი', rating: 'რეიტინგი', satisfaction: 'კმაყოფილება' },
    features: {
      title: 'რატომ Homico?',
      subtitle: 'მარტივი, სწრაფი, საიმედო',
      secure: { title: 'უსაფრთხო', desc: 'თქვენი თანხა დაცულია' },
      quality: { title: 'გადამოწმებული', desc: 'ყველა ოსტატი ვერიფიცირებულია' },
      fast: { title: 'სწრაფი', desc: 'შეთავაზებები წუთებში' },
      communication: { title: 'პირდაპირი', desc: 'დაუკავშირდი პირდაპირ' },
    },
    cta: { title: 'მზად ხარ?', subtitle: 'შემოგვიერთდი და იპოვე შენი ოსტატი დღესვე' },
    footer: { rights: 'ყველა უფლება დაცულია' },
  },
  en: {
    nav: { login: 'Login', register: 'Get Started', menu: 'Menu' },
    hero: {
      badge: "Georgia's #1 Home Services Platform",
      title: 'Your home',
      titleHighlight: 'deserves the best',
      subtitle: 'Find verified professionals for your home — designers, architects, craftsmen.',
      findPro: 'Find a Pro',
      becomePro: 'Become Pro',
    },
    stats: { professionals: 'Professionals', projects: 'Projects', rating: 'Rating', satisfaction: 'Satisfaction' },
    features: {
      title: 'Why Homico?',
      subtitle: 'Simple, fast, reliable',
      secure: { title: 'Secure', desc: 'Your money is protected' },
      quality: { title: 'Verified', desc: 'All pros are verified' },
      fast: { title: 'Fast', desc: 'Get offers in minutes' },
      communication: { title: 'Direct', desc: 'Connect directly' },
    },
    cta: { title: 'Ready?', subtitle: 'Join us and find your pro today' },
    footer: { rights: 'All rights reserved' },
  },
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
        {/* Subtle background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
          <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-3xl animate-float" style={{ backgroundColor: 'var(--blob-1)' }} />
          <div className="absolute top-1/2 -left-1/4 w-[500px] h-[500px] md:w-[700px] md:h-[700px] rounded-full blur-3xl animate-float-delayed" style={{ backgroundColor: 'var(--blob-2)' }} />
          <div className="absolute -bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full blur-3xl" style={{ backgroundColor: 'var(--blob-3)' }} />
        </div>

        {/* Header - Glass effect */}
        <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b transition-all duration-300" style={{ backgroundColor: 'var(--header-bg)', borderColor: 'var(--color-border)' }}>
          <nav className="max-w-5xl mx-auto px-4 sm:px-6 flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2 z-50">
              <span className="text-lg md:text-xl font-semibold text-[var(--color-text-primary)] tracking-tight">
                Homico
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:bg-[var(--color-bg-tertiary)]"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                <svg
                  className={`w-[18px] h-[18px] transition-all duration-300 ${isDark ? 'opacity-0 rotate-90 scale-0 absolute' : 'opacity-100 rotate-0 scale-100'}`}
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
                  className={`w-[18px] h-[18px] transition-all duration-300 ${isDark ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-0 absolute'}`}
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
                className="px-4 py-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors rounded-lg hover:bg-[var(--color-bg-tertiary)]"
              >
                {t.nav.login}
              </a>
              <a
                href={`${APP_URL}/register`}
                className="px-4 py-2 text-sm font-medium bg-[var(--color-forest)] text-white rounded-lg transition-all duration-300 hover:opacity-90"
              >
                {t.nav.register}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                onClick={toggleTheme}
                className="w-9 h-9 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--color-bg-tertiary)]"
                aria-label={isDark ? 'Light mode' : 'Dark mode'}
              >
                {isDark ? (
                  <svg className="w-[18px] h-[18px]" style={{ color: 'var(--color-text-tertiary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                ) : (
                  <svg className="w-[18px] h-[18px]" style={{ color: 'var(--color-text-tertiary)' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
                  </svg>
                )}
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-9 h-9 flex items-center justify-center rounded-lg transition-colors hover:bg-[var(--color-bg-tertiary)]"
                aria-label={t.nav.menu}
              >
                <div className="w-4 h-3 relative flex flex-col justify-between">
                  <span className={`w-full h-[1.5px] rounded-full transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[5px] bg-[var(--color-accent)]' : 'bg-[var(--color-text-primary)]'}`} />
                  <span className={`w-full h-[1.5px] rounded-full transition-all duration-200 ${mobileMenuOpen ? 'opacity-0' : 'bg-[var(--color-text-primary)]'}`} />
                  <span className={`w-full h-[1.5px] rounded-full transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[5px] bg-[var(--color-accent)]' : 'bg-[var(--color-text-primary)]'}`} />
                </div>
              </button>
            </div>
          </nav>

          {/* Mobile Menu */}
          <div
            className={`md:hidden fixed inset-x-0 bottom-0 transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'}`}
            style={{ top: '56px', backgroundColor: 'var(--color-bg-primary)' }}
          >
            <div className="p-4">
              <div
                className={`card p-4 transition-all duration-300 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}
              >
                <div className="flex flex-col gap-2">
                  <a
                    href={`${APP_URL}/register`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-sm font-medium bg-[var(--color-forest)] text-white rounded-xl transition-all"
                  >
                    {t.nav.register}
                  </a>
                  <a
                    href={`${APP_URL}/login`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full py-3 text-center text-sm font-medium text-[var(--color-text-secondary)] rounded-xl transition-all border border-[var(--color-border)] hover:bg-[var(--color-bg-tertiary)]"
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
          <section className="relative min-h-[100svh] flex items-center justify-center pt-14 md:pt-16">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 md:py-24 relative z-10">
              <div className="max-w-2xl mx-auto text-center">
                {/* Badge */}
                <div className={`badge badge-accent mb-6 md:mb-8 transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full" />
                  <span className="text-xs">{t.hero.badge}</span>
                </div>

                {/* Title */}
                <h1 className={`mb-4 md:mb-6 transition-all duration-700 delay-100 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <span className="block text-[var(--color-text-primary)] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                    {t.hero.title}
                  </span>
                  <span className="block mt-1 md:mt-2 hero-highlight-text text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight leading-[1.1]">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                <p className={`text-sm sm:text-base md:text-lg mb-8 md:mb-10 max-w-lg mx-auto leading-relaxed transition-all duration-700 delay-200 text-[var(--color-text-secondary)] ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  {t.hero.subtitle}
                </p>

                {/* CTA Buttons */}
                <div className={`flex flex-col sm:flex-row gap-3 justify-center transition-all duration-700 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <a
                    href={`${APP_URL}/login`}
                    className="btn-primary px-6 py-3 text-sm md:text-base inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <circle cx="11" cy="11" r="7" />
                      <path d="m21 21-4.35-4.35" />
                    </svg>
                    <span>{t.hero.findPro}</span>
                  </a>
                  <a
                    href={`${APP_URL}/register?type=pro`}
                    className="btn-secondary px-6 py-3 text-sm md:text-base inline-flex items-center justify-center gap-2"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
                    </svg>
                    <span>{t.hero.becomePro}</span>
                  </a>
                </div>

                {/* Trust indicators */}
                <div className={`mt-10 md:mt-14 flex flex-wrap justify-center gap-6 md:gap-8 transition-all duration-700 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1.5">
                      {[1,2,3,4].map(i => (
                        <div key={i} className="w-6 h-6 rounded-full border-2 border-[var(--color-bg-primary)]" style={{ background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-forest) 100%)` }} />
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-tertiary)]">500+ {lang === 'ka' ? 'ოსტატი' : 'Pros'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className="flex gap-0.5">
                      {[1,2,3,4,5].map(i => (
                        <svg key={i} className="w-3.5 h-3.5 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs font-medium text-[var(--color-text-tertiary)]">4.9</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 hidden sm:block">
              <svg className="w-5 h-5 text-[var(--color-text-muted)] animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </section>

          {/* Stats Section */}
          <StatsSection t={t} />

          {/* Features Section */}
          <section className="py-16 md:py-24 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] mb-2">{t.features.title}</h2>
                <p className="text-sm md:text-base text-[var(--color-text-secondary)]">{t.features.subtitle}</p>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <FeatureCard icon={<ShieldIcon />} title={t.features.secure.title} description={t.features.secure.desc} delay={0} />
                <FeatureCard icon={<BadgeIcon />} title={t.features.quality.title} description={t.features.quality.desc} delay={50} />
                <FeatureCard icon={<BoltIcon />} title={t.features.fast.title} description={t.features.fast.desc} delay={100} />
                <FeatureCard icon={<ChatIcon />} title={t.features.communication.title} description={t.features.communication.desc} delay={150} />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 md:py-24 relative">
            <div className="max-w-5xl mx-auto px-4 sm:px-6">
              <div className="card p-8 md:p-12 text-center relative overflow-hidden">
                {/* Subtle gradient background */}
                <div className="absolute inset-0 opacity-50" style={{ background: 'linear-gradient(135deg, var(--color-accent-soft) 0%, transparent 50%, var(--color-forest-soft) 100%)' }} />

                <div className="relative z-10">
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-text-primary)] mb-3">{t.cta.title}</h2>
                  <p className="text-sm md:text-base text-[var(--color-text-secondary)] mb-6 md:mb-8 max-w-md mx-auto">{t.cta.subtitle}</p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={`${APP_URL}/login`}
                      className="btn-primary px-6 py-3 text-sm md:text-base inline-flex items-center justify-center gap-2"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <circle cx="11" cy="11" r="7" />
                        <path d="m21 21-4.35-4.35" />
                      </svg>
                      <span>{t.hero.findPro}</span>
                    </a>
                    <a
                      href={`${APP_URL}/register?type=pro`}
                      className="btn-secondary px-6 py-3 text-sm md:text-base inline-flex items-center justify-center gap-2"
                    >
                      <span>{t.hero.becomePro}</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 md:py-8 border-t transition-colors" style={{ borderColor: 'var(--color-border)' }}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--color-text-primary)]">Homico</span>
                <span className="w-1 h-1 rounded-full bg-[var(--color-accent)]"></span>
              </div>
              <p className="text-xs text-[var(--color-text-muted)]">&copy; 2024 Homico. {t.footer.rights}</p>
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
    <section ref={ref} className="py-12 md:py-20 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="card p-6 md:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
      <div className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[var(--color-accent)] mb-1">
        {value}<span className="text-[var(--color-text-muted)]">{suffix}</span>
      </div>
      <div className="text-xs md:text-sm font-medium text-[var(--color-text-secondary)]">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
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

  return (
    <div
      ref={ref}
      className={`card-solid p-4 md:p-6 text-center transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-10 h-10 md:w-12 md:h-12 mx-auto rounded-xl flex items-center justify-center mb-3 md:mb-4" style={{ backgroundColor: 'var(--color-accent-soft)' }}>
        <div className="text-[var(--color-accent)]">{icon}</div>
      </div>
      <h3 className="text-sm md:text-base font-semibold mb-1 text-[var(--color-text-primary)]">{title}</h3>
      <p className="text-xs md:text-sm text-[var(--color-text-secondary)] leading-relaxed">{description}</p>
    </div>
  )
}

// Icons - Minimal and clean
function ShieldIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>
  )
}

function BadgeIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
    </svg>
  )
}

function BoltIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  )
}
