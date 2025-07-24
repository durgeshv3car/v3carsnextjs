'use client'

import { useEffect, useState } from 'react'

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('theme')
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches

    const shouldUseDark = saved === 'dark' || (!saved && prefersDark)
    document.documentElement.classList.toggle('dark', shouldUseDark)
    setIsDark(shouldUseDark)
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const nextDark = !html.classList.contains('dark')
    html.classList.toggle('dark', nextDark)
    localStorage.setItem('theme', nextDark ? 'dark' : 'light')
    setIsDark(nextDark)
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-10 h-10 rounded-lg border border-gray-300 dark:border-[#262629] transition"
    >
      {isDark ? '☀' : '🌙'}
    </button>
  )
}
