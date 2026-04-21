import { toast } from "sonner"

export const sharedToastClassNames = {
  actionButton:
    "shrink-0 self-center rounded-full border border-[var(--color-border)] bg-white/85 px-3 py-2 text-xs font-semibold text-[var(--color-charcoal-blue)]",
  cancelButton:
    "shrink-0 self-center rounded-full border border-[var(--color-border)] bg-white/55 px-3 py-2 text-xs font-semibold text-[var(--color-charcoal-blue)]",
  closeButton:
    "absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full border-none bg-transparent text-[var(--color-charcoal-blue)]/60 transition hover:bg-white/45 hover:text-[var(--color-charcoal-blue)]",
  content: "flex min-w-0 flex-1 flex-col",
  description:
    "mt-2 whitespace-pre-line text-sm leading-6 text-[var(--color-text-muted)]",
  error:
    "border-[rgb(231_111_81_/_0.34)] bg-[linear-gradient(135deg,rgb(231_111_81_/_0.22),rgb(255_255_255_/_0.98)_42%)]",
  icon:
    "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center text-[var(--color-charcoal-blue)]",
  info:
    "border-[rgb(42_157_143_/_0.34)] bg-[linear-gradient(135deg,rgb(42_157_143_/_0.22),rgb(255_255_255_/_0.98)_42%)]",
  success:
    "border-[rgb(42_157_143_/_0.34)] bg-[linear-gradient(135deg,rgb(42_157_143_/_0.22),rgb(255_255_255_/_0.98)_42%)]",
  title:
    "text-sm font-semibold tracking-[-0.01em] text-[var(--color-charcoal-blue)]",
  toast:
    "pointer-events-auto relative flex w-[min(420px,calc(100vw-2rem))] items-start gap-3 rounded-[1.4rem] border px-4 py-3 pr-10 shadow-[var(--shadow-card)] backdrop-blur-xl",
  warning:
    "border-[rgb(233_196_106_/_0.42)] bg-[linear-gradient(135deg,rgb(233_196_106_/_0.26),rgb(255_255_255_/_0.98)_42%)]"
}

export function emitToast(entry, fallbackId) {
  if (!entry?.title) return

  const id = entry.id || fallbackId
  const description = entry.description || undefined

  switch (entry.type) {
    case "success":
      toast.success(entry.title, { description, id })
      break
    case "info":
      toast.info(entry.title, { description, id })
      break
    case "warn":
    case "warning":
      toast.warning(entry.title, { description, id })
      break
    case "danger":
    case "error":
      toast.error(entry.title, { description, id })
      break
    default:
      toast(entry.title, { description, id })
      break
  }
}
