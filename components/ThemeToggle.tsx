"use client"
import { useEffect, useState } from "react"

export default function ThemeToggle() {
  const [dark, setDark] = useState(false)
  const [mounted, setMounted] = useState(false)

useEffect(() => {
  const saved = localStorage.getItem("theme")

  if (saved) {
    setDark(saved === "dark")
    document.documentElement.setAttribute("data-theme", saved)
  } else {
    const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    setDark(systemDark)
    document.documentElement.setAttribute("data-theme", systemDark ? "dark" : "light")
  }

  setMounted(true)
}, [])

  const toggleTheme = () => {
    const newDark = !dark
    setDark(newDark)
    console.log("Toggling theme to:", newDark ? "dark" : "light")
    document.documentElement.setAttribute("data-theme", newDark ? "dark" : "light")
    document.documentElement.style.colorScheme = newDark ? "dark" : "light"
    localStorage.setItem("theme", newDark ? "dark" : "light")
  }

  if (!mounted) return null

  return (
    <button
      onClick={toggleTheme}
      className="px-4 py-2 rounded-xl"
    >
      {dark ? "Light Mode" : "Dark Mode"}
    </button>
  )
}