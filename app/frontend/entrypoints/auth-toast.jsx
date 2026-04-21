import { useEffect } from "react"
import { createRoot } from "react-dom/client"
import { Toaster } from "sonner"

import { emitToast, sharedToastClassNames } from "@/lib/sonner"

function AuthToaster({ alert, notice }) {
  useEffect(() => {
    const queue = []

    if (notice) {
      queue.push({
        type: "success",
        title: notice
      })
    }

    if (alert) {
      queue.push({
        type: "error",
        title: alert
      })
    }

    queue.forEach((entry, index) => {
      emitToast(entry, `auth:${entry.type}:${entry.title}:${index}`)
    })
  }, [alert, notice])

  return (
    <Toaster
      closeButton
      duration={6000}
      offset={{ right: 24, top: 24 }}
      position="top-right"
      theme="light"
      toastOptions={{
        unstyled: true,
        classNames: sharedToastClassNames
      }}
      visibleToasts={3}
    />
  )
}

const rootElement = document.getElementById("auth-toast-root")

if (rootElement) {
  const notice = rootElement.dataset.notice || ""
  const alert = rootElement.dataset.alert || ""

  createRoot(rootElement).render(<AuthToaster alert={alert} notice={notice} />)
}
