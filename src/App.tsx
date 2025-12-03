import { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

// Configuration - Update these URLs for your deployment
const APP_URL = 'http://159.203.106.183'

type Lang = 'ka' | 'en'

const translations = {
  ka: {
    nav: { login: 'შესვლა', register: 'რეგისტრაცია', menu: 'მენიუ' },
    hero: {
      title: 'სახლი შენია,',
      titleHighlight: 'ოსტატი ჩვენი',
      subtitle: 'იპოვე საუკეთესო პროფესიონალები შენი სახლისთვის - ინტერიერის დიზაინერები, არქიტექტორები, ხელოსნები და სახლის მოვლის სერვისები.',
      findPro: 'მოძებნე პროფესიონალი',
      becomePro: 'გახდი პროფესიონალი',
    },
    stats: { professionals: 'პროფესიონალი', projects: 'დასრულებული პროექტი', rating: 'საშუალო რეიტინგი', satisfaction: 'კმაყოფილი კლიენტი' },
    features: {
      title: 'რატომ Homico?',
      subtitle: 'ჩვენ ვაკავშირებთ სახლის მფლობელებს გადამოწმებულ პროფესიონალებთან',
      secure: { title: 'უსაფრთხო გარიგებები', description: 'ყველა გადახდა დაცულია და გარანტირებული.' },
      quality: { title: 'ხარისხის გარანტია', description: 'მხოლოდ გადამოწმებული პროფესიონალები.' },
      fast: { title: 'სწრაფი პასუხი', description: 'მიიღეთ შეთავაზებები წუთებში.' },
      communication: { title: 'პირდაპირი კომუნიკაცია', description: 'დაუკავშირდით პროფესიონალებს პირდაპირ.' },
    },
    cta: { title: 'მზად ხარ დასაწყებად?', subtitle: 'შემოგვიერთდი ათასობით კმაყოფილ მომხმარებელს' },
    footer: { rights: 'ყველა უფლება დაცულია' },
  },
  en: {
    nav: { login: 'Login', register: 'Register', menu: 'Menu' },
    hero: {
      title: 'Your Home,',
      titleHighlight: 'Our Experts',
      subtitle: 'Find trusted professionals for your home - interior designers, architects, craftsmen, and home care services.',
      findPro: 'Find a Pro',
      becomePro: 'Become a Pro',
    },
    stats: { professionals: 'Professionals', projects: 'Completed Projects', rating: 'Average Rating', satisfaction: 'Satisfied Clients' },
    features: {
      title: 'Why Homico?',
      subtitle: 'We connect homeowners with verified professionals',
      secure: { title: 'Secure Transactions', description: 'All payments are protected and guaranteed.' },
      quality: { title: 'Quality Guarantee', description: 'Only verified professionals.' },
      fast: { title: 'Fast Response', description: 'Get offers in minutes.' },
      communication: { title: 'Direct Communication', description: 'Connect with professionals directly.' },
    },
    cta: { title: 'Ready to Get Started?', subtitle: 'Join thousands of satisfied customers' },
    footer: { rights: 'All rights reserved' },
  },
}

export default function App() {
  const [lang, setLang] = useState<Lang>('ka')
  const [isLoaded, setIsLoaded] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const t = translations[lang]

  useEffect(() => {
    setIsLoaded(true)
    document.documentElement.lang = lang
  }, [lang])

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Prevent body scroll when mobile menu is open
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
        <title>{lang === 'ka' ? 'Homico - სახლი შენია, ოსტატი ჩვენი' : 'Homico - Your Home, Our Experts'}</title>
        <meta name="description" content={t.hero.subtitle} />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </Helmet>

      <div className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
        {/* Animated Background - Optimized for mobile */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-32 -left-32 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-emerald-500/10 rounded-full blur-[80px] md:blur-[120px] animate-pulse" />
          <div className="absolute -bottom-32 -right-32 w-[250px] h-[250px] md:w-[500px] md:h-[500px] bg-teal-500/10 rounded-full blur-[60px] md:blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] md:w-[800px] md:h-[800px] bg-emerald-600/5 rounded-full blur-[100px] md:blur-[150px]" />
        </div>

        {/* Header - Mobile Optimized */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
          <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="text-xl md:text-2xl font-display font-bold text-white tracking-tight z-50">
              Homico
              <span className="inline-block w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-400 rounded-full ml-1 animate-pulse" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {/* Language Switcher */}
              <div className="flex gap-1 bg-white/5 rounded-full p-1 border border-white/10">
                <button
                  onClick={() => setLang('ka')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${lang === 'ka' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-gray-400 hover:text-white'}`}
                >
                  GE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${lang === 'en' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-gray-400 hover:text-white'}`}
                >
                  EN
                </button>
              </div>

              {/* Login/Register */}
              <a
                href={`${APP_URL}/login`}
                className="px-5 py-2.5 text-gray-300 hover:text-white font-medium transition-colors duration-200"
              >
                {t.nav.login}
              </a>
              <a
                href={`${APP_URL}/register`}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.nav.register}
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative z-50 w-10 h-10 flex items-center justify-center"
              aria-label={t.nav.menu}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 ${mobileMenuOpen ? 'opacity-0 scale-0' : ''}`} />
                <span className={`w-full h-0.5 bg-white rounded-full transition-all duration-300 origin-center ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          </nav>

          {/* Mobile Menu Overlay */}
          <div
            className={`md:hidden fixed inset-0 bg-[#0a0a0f]/98 backdrop-blur-xl transition-all duration-500 ${mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ top: '64px' }}
          >
            <div className={`flex flex-col items-center justify-center h-full px-6 pb-20 transition-all duration-500 ${mobileMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-8 opacity-0'}`}>
              {/* Language Switcher */}
              <div className="flex gap-2 bg-white/5 rounded-full p-1.5 border border-white/10 mb-10">
                <button
                  onClick={() => setLang('ka')}
                  className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${lang === 'ka' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-gray-400'}`}
                >
                  GE
                </button>
                <button
                  onClick={() => setLang('en')}
                  className={`px-5 py-2.5 rounded-full text-base font-medium transition-all duration-300 ${lang === 'en' ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25' : 'text-gray-400'}`}
                >
                  EN
                </button>
              </div>

              {/* Mobile Menu Links */}
              <div className="flex flex-col items-center gap-4 w-full max-w-xs">
                <a
                  href={`${APP_URL}/login`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 text-center text-lg text-gray-300 hover:text-white font-medium transition-colors duration-200 border border-white/10 rounded-2xl bg-white/5"
                >
                  {t.nav.login}
                </a>
                <a
                  href={`${APP_URL}/register`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-4 text-center text-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl shadow-lg shadow-emerald-500/25"
                >
                  {t.nav.register}
                </a>
              </div>
            </div>
          </div>
        </header>

        <main>
          {/* Hero Section - Mobile Optimized */}
          <section className="relative min-h-[100svh] flex items-center justify-center pt-16 md:pt-20">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10">
              <div className="max-w-4xl mx-auto text-center">
                {/* Animated Title */}
                <h1 className={`text-[2.5rem] leading-[1.1] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-bold mb-6 md:mb-8 tracking-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <span className="block text-white">{t.hero.title}</span>
                  <span className="block mt-1 md:mt-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    {t.hero.titleHighlight}
                  </span>
                </h1>

                <p className={`text-base sm:text-lg md:text-xl text-gray-400 mb-8 md:mb-12 max-w-2xl mx-auto leading-relaxed px-2 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  {t.hero.subtitle}
                </p>

                {/* CTA Buttons - Stack on mobile */}
                <div className={`flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0 transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
                  <a
                    href={`${APP_URL}/browse`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/30 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.findPro}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-emerald-500/50 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.becomePro}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Scroll Indicator - Hidden on very small screens */}
            <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
              <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/20 rounded-full flex justify-center pt-1.5 md:pt-2">
                <div className="w-1 h-2 md:w-1.5 md:h-3 bg-emerald-400 rounded-full animate-pulse" />
              </div>
            </div>
          </section>

          {/* Stats Section with Animated Counters */}
          <StatsSection t={t} />

          {/* Features Section - Mobile Optimized */}
          <section className="py-16 md:py-24 relative">
            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
              <div className="text-center mb-10 md:mb-16">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-3 md:mb-4">{t.features.title}</h2>
                <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto px-2">{t.features.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                <FeatureCard
                  icon={<ShieldIcon />}
                  title={t.features.secure.title}
                  description={t.features.secure.description}
                  delay={0}
                />
                <FeatureCard
                  icon={<BadgeIcon />}
                  title={t.features.quality.title}
                  description={t.features.quality.description}
                  delay={100}
                />
                <FeatureCard
                  icon={<BoltIcon />}
                  title={t.features.fast.title}
                  description={t.features.fast.description}
                  delay={200}
                />
                <FeatureCard
                  icon={<ChatIcon />}
                  title={t.features.communication.title}
                  description={t.features.communication.description}
                  delay={300}
                />
              </div>
            </div>
          </section>

          {/* CTA Section - Mobile Optimized */}
          <section className="py-16 md:py-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 via-teal-600/20 to-emerald-600/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(16,185,129,0.15),transparent_70%)]" />

            <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-white mb-4 md:mb-6">{t.cta.title}</h2>
                <p className="text-base md:text-lg text-gray-300 mb-8 md:mb-10 px-2">{t.cta.subtitle}</p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
                  <a
                    href={`${APP_URL}/browse`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-gray-900 font-semibold rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-white/20 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.findPro}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  <a
                    href={`${APP_URL}/register`}
                    className="group inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-8 py-3.5 sm:py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white/30 transition-all duration-300 hover:bg-white/10 hover:border-white/50 active:scale-[0.98] touch-manipulation"
                  >
                    <span>{t.hero.becomePro}</span>
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </section>
        </main>

        {/* Footer - Mobile Optimized */}
        <footer className="border-t border-white/5 py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg md:text-xl font-display font-bold text-white">Homico</span>
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
              </div>
              <p className="text-gray-500 text-xs md:text-sm">&copy; 2024 Homico. {t.footer.rights}</p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Stats Section with animated counters - Mobile Optimized
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
        const eased = 1 - Math.pow(1 - progress, 4) // easeOutQuart
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
    <section ref={ref} className="py-12 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/5 to-transparent" />

      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
          <StatItem value={`${counts.pros}+`} label={t.stats.professionals} />
          <StatItem value={`${counts.projects}+`} label={t.stats.projects} />
          <StatItem value={`${(counts.rating / 10).toFixed(1)}/5`} label={t.stats.rating} />
          <StatItem value={`${counts.satisfaction}%`} label={t.stats.satisfaction} />
        </div>
      </div>
    </section>
  )
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center group">
      <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-1 md:mb-2 group-hover:text-emerald-400 transition-colors duration-300">
        {value}
      </div>
      <div className="text-gray-400 text-sm md:text-base font-medium">{label}</div>
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
      className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10 hover:border-emerald-500/50 transition-all duration-500 hover:bg-white/10 active:scale-[0.98] touch-manipulation ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="w-12 h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
        <div className="text-emerald-400">{icon}</div>
      </div>
      <h3 className="text-lg md:text-xl font-semibold mb-2 md:mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300">{title}</h3>
      <p className="text-gray-400 text-sm md:text-base leading-relaxed">{description}</p>
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
