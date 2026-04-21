import posthog from "posthog-js"

const POSTHOG_HOST = String(import.meta.env.VITE_PUBLIC_POSTHOG_HOST || "").replace(/\/+$/, "")
const POSTHOG_KEY = String(import.meta.env.VITE_PUBLIC_POSTHOG_KEY || "")
const POSTHOG_ENABLED = import.meta.env.PROD && POSTHOG_HOST.length > 0 && POSTHOG_KEY.length > 0

let initialized = false

function personProperties(pageProps) {
  const user = pageProps?.user

  return {
    email: user?.email || null
  }
}

export function setupPostHog(pageProps) {
  if (!POSTHOG_ENABLED) return null

  if (!initialized) {
    posthog.init(POSTHOG_KEY, {
      api_host: POSTHOG_HOST,
      capture_pageleave: true,
      capture_pageview: false,
      person_profiles: "identified_only"
    })
    initialized = true
  }

  const userId = pageProps?.user?.id
  if (userId) {
    posthog.identify(String(userId), personProperties(pageProps))
  } else {
    posthog.register(personProperties(pageProps))
  }

  return posthog
}

export function capturePostHogPageview() {
  if (!POSTHOG_ENABLED || !initialized) return

  posthog.capture("$pageview", {
    $current_url: window.location.href
  })
}
