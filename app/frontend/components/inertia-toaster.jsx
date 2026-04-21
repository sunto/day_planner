import { useEffect } from "react"
import { usePage } from "@inertiajs/react"
import { Toaster } from "sonner"

import { emitToast, sharedToastClassNames } from "@/lib/sonner"

function flattenMessages(value, collector = []) {
  if (!value) return collector

  if (typeof value === "string") {
    collector.push(value)
    return collector
  }

  if (Array.isArray(value)) {
    value.forEach((entry) => flattenMessages(entry, collector))
    return collector
  }

  if (typeof value === "object") {
    Object.values(value).forEach((entry) => flattenMessages(entry, collector))
  }

  return collector
}

function uniqueMessages(value) {
  return [...new Set(flattenMessages(value).map((message) => message.trim()).filter(Boolean))]
}

function validationFallback(errors) {
  const messages = uniqueMessages(errors)
  if (messages.length === 0) return null

  return {
    type: "error",
    title: messages.length === 1 ? "There is 1 validation issue" : `There are ${messages.length} validation issues`,
    description: messages.join("\n")
  }
}

export function InertiaToaster({ children }) {
  const page = usePage()
  const errors = page.props.errors || {}
  const flash = page.flash || {}

  useEffect(() => {
    const queue = []

    if (flash.notice) {
      queue.push({
        type: "success",
        title: flash.notice
      })
    }

    if (flash.alert) {
      queue.push({
        type: "error",
        title: flash.alert
      })
    }

    if (flash.toast) {
      queue.push(flash.toast)
    }

    if (Array.isArray(flash.toasts)) {
      queue.push(...flash.toasts)
    }

    if (!flash.toast && !Array.isArray(flash.toasts)) {
      const fallback = validationFallback(errors)
      if (fallback) queue.push(fallback)
    }

    queue.forEach((entry, index) => {
      emitToast(
        entry,
        `${page.url}:${entry.type || "default"}:${entry.title}:${entry.description || ""}:${index}`
      )
    })
  }, [errors, flash, page.url])

  return (
    <>
      {children}
      <Toaster
        closeButton
        duration={6000}
        offset={{ right: 24, top: 112 }}
        position="top-right"
        theme="light"
        toastOptions={{
          unstyled: true,
          classNames: sharedToastClassNames
        }}
        visibleToasts={4}
      />
    </>
  )
}
