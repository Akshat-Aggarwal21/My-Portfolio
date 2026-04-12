'use client'

import { useEffect } from 'react'
import { initSession } from '../utils/analytics'
import Cursor from '../components/ui/Cursor'
import DevPanel from '../components/ui/DevPanel'
import Navbar from '../components/ui/Navbar'
import Hero from '../components/sections/Hero'
import About from '../components/sections/About'
import Skills from '../components/sections/Skills'
import Experience from '../components/sections/Experience'
import Projects from '../components/sections/Projects'
import Education from '../components/sections/Education'
import Contact from '../components/sections/Contact'
import Footer from '../components/ui/Footer'

export default function Home() {
  // Initialise analytics session on first client render
  useEffect(() => {
    initSession()
  }, [])

  return (
    <main className="bg-ink min-h-screen">
      <Cursor />
      <DevPanel />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Contact />
      <Footer />
    </main>
  )
}
