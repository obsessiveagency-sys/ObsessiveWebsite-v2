import { useState, useEffect } from 'react'
import Nav      from './components/Nav.jsx'

function ScrollProgress({ page }) {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    setPct(0)
    const onScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      setPct(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [page])
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed', top: 0, left: 0,
        width: `${pct}%`, height: 2,
        background: '#d42b2b', zIndex: 9999,
        transition: reduced ? 'none' : 'width 0.1s linear',
        pointerEvents: 'none',
      }}
    />
  )
}
import Footer   from './components/Footer.jsx'
import HomePage    from './pages/Home.jsx'
import WorkPage    from './pages/Work.jsx'
import PricingPage from './pages/Pricing.jsx'
import ProcessPage from './pages/Process.jsx'
import AboutPage   from './pages/About.jsx'
import ContactPage from './pages/Contact.jsx'

export default function App() {
  const [page, setPage] = useState('home')

  const navigate = (key) => setPage(key)

  // Scroll to top on every page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [page])

  return (
    <div>
      <ScrollProgress page={page} />
      <Nav page={page} setPage={navigate} />

      {page === 'home'    && <HomePage    setPage={navigate} />}
      {page === 'work'    && <WorkPage    setPage={navigate} />}
      {page === 'pricing' && <PricingPage setPage={navigate} />}
      {page === 'process' && <ProcessPage setPage={navigate} />}
      {page === 'about'   && <AboutPage   setPage={navigate} />}
      {page === 'contact' && <ContactPage setPage={navigate} />}

      <Footer setPage={navigate} />
    </div>
  )
}
