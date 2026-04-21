/**
 * Radix Dialog auto-focuses the first tabbable control (often the close button), which
 * shows a large focus ring as soon as the dialog opens. Move programmatic focus to the
 * dialog title instead: use Dialog.Title with id={titleId}, tabIndex={-1}, and
 * `dialogTitleClassName`.
 */
export function dialogOpenAutoFocusToTitle(titleId) {
  return (event) => {
    event.preventDefault()
    queueMicrotask(() => {
      document.getElementById(titleId)?.focus({ preventScroll: true })
    })
  }
}

/** Append to Dialog.Title `className` so programmatic focus does not draw a ring. */
export const dialogTitleClassName = "outline-none focus:outline-none"
