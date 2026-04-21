export function submitOnModEnter(event) {
  if (event.defaultPrevented || event.isComposing) return
  if (event.key !== "Enter" || (!event.metaKey && !event.ctrlKey)) return

  const form = event.currentTarget
  if (!(form instanceof HTMLFormElement)) return

  event.preventDefault()
  form.requestSubmit()
}
