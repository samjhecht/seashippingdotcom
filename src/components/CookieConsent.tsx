'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    setShowBanner(false)

    // Enable analytics if gtag is available
    if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      })
    }
  }

  const declineCookies = () => {
    localStorage.setItem('cookie-consent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white p-4 z-50 shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm md:text-base">
          We use cookies to improve your experience and analyze site traffic. By using our site, you accept our use of cookies.
        </p>
        <div className="flex gap-2 flex-shrink-0">
          <Button
            variant="outline"
            onClick={declineCookies}
            className="bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
          >
            Decline
          </Button>
          <Button
            onClick={acceptCookies}
            className="bg-white text-gray-900 hover:bg-gray-100"
          >
            Accept
          </Button>
        </div>
      </div>
    </div>
  )
}
