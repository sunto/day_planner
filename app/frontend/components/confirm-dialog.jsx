import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import { useId } from "react"

import { Button } from "@/components/ui/button"
import { dialogOpenAutoFocusToTitle, dialogTitleClassName } from "@/lib/dialog-title-focus"
import { cn } from "@/lib/utils"

export function ConfirmDialog({
  confirmLabel = "Confirm",
  description,
  onConfirm,
  onOpenChange,
  open,
  processing = false,
  title
}) {
  const titleId = useId()

  return (
    <Dialog.Root onOpenChange={onOpenChange} open={open}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-[rgb(12_48_60_/_0.42)] backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[min(94vw,30rem)] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] bg-white p-6 shadow-[var(--shadow-soft)] ring-1 ring-[var(--color-border)]"
          onOpenAutoFocus={dialogOpenAutoFocusToTitle(titleId)}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title
                className={cn(
                  "text-2xl font-semibold tracking-[-0.03em] text-[var(--color-charcoal-blue)]",
                  dialogTitleClassName
                )}
                id={titleId}
                tabIndex={-1}
              >
                {title}
              </Dialog.Title>
              <Dialog.Description className="mt-2 text-sm leading-6 text-[var(--color-text-muted)]">
                {description}
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button size="icon" type="button" variant="ghost">
                <Cross2Icon className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <Button disabled={processing} onClick={() => onOpenChange(false)} type="button" variant="ghost">
              Cancel
            </Button>
            <Button disabled={processing} onClick={onConfirm} type="button">
              {confirmLabel}
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
