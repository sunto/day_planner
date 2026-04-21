import { Head, Link, useForm } from "@inertiajs/react"

import { AppShell } from "@/components/app-shell"
import { Button } from "@/components/ui/button"

function errorText(errors, field) {
  return errors[field]?.join(", ")
}

export default function UserSettingsPage({ form, passkeys = { count: 0 }, errors = {} }) {
  const profileForm = useForm({
    first_name: form.first_name || "",
    last_name: form.last_name || "",
    email: form.email || ""
  })

  return (
    <>
      <Head title="User settings" />

      <AppShell
        title="User settings"
        subtitle="Update the name and email used across your app. This does not change your password."
      >
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.3fr)_minmax(280px,0.7fr)]">
          <section className="rounded-[1.75rem] bg-white/82 p-6 shadow-[var(--shadow-card)] ring-1 ring-[var(--color-border)]">
            <form
              className="space-y-6"
              onSubmit={(event) => {
                event.preventDefault()
                profileForm.transform((data) => ({ user: data }))
                profileForm.patch("/settings/user")
              }}
            >
              <div>
                <label className="text-sm font-medium text-[var(--color-charcoal-blue)]" htmlFor="user-first-name">
                  First name
                </label>
                <input
                  id="user-first-name"
                  autoComplete="given-name"
                  className="input-field mt-2"
                  value={profileForm.data.first_name}
                  onChange={(event) => profileForm.setData("first_name", event.target.value)}
                />
                {errorText(errors, "first_name") ? (
                  <p className="mt-2 text-sm text-[var(--color-danger)]">{errorText(errors, "first_name")}</p>
                ) : null}
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--color-charcoal-blue)]" htmlFor="user-last-name">
                  Last name
                </label>
                <input
                  id="user-last-name"
                  autoComplete="family-name"
                  className="input-field mt-2"
                  value={profileForm.data.last_name}
                  onChange={(event) => profileForm.setData("last_name", event.target.value)}
                />
                {errorText(errors, "last_name") ? (
                  <p className="mt-2 text-sm text-[var(--color-danger)]">{errorText(errors, "last_name")}</p>
                ) : null}
              </div>

              <div>
                <label className="text-sm font-medium text-[var(--color-charcoal-blue)]" htmlFor="user-email">
                  Email
                </label>
                <input
                  id="user-email"
                  autoComplete="email"
                  className="input-field mt-2"
                  type="email"
                  value={profileForm.data.email}
                  onChange={(event) => profileForm.setData("email", event.target.value)}
                />
                {errorText(errors, "email") ? (
                  <p className="mt-2 text-sm text-[var(--color-danger)]">{errorText(errors, "email")}</p>
                ) : null}
              </div>

              <Button disabled={profileForm.processing} type="submit">
                Save settings
              </Button>
            </form>
          </section>

          <aside className="space-y-6">
            <section className="rounded-[1.75rem] bg-[var(--color-panel)] p-6 shadow-[var(--shadow-card)]">
              <p className="text-[0.7rem] font-semibold uppercase text-[var(--color-text-faint)]">
                Passkeys
              </p>
              <p className="mt-4 text-sm leading-6 text-[var(--color-text-muted)]">
                {passkeys.count > 0
                  ? `${passkeys.count} ${passkeys.count === 1 ? "passkey is" : "passkeys are"} available for passwordless login.`
                  : "Add a passkey to sign in with your device instead of typing a password."}
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/webauthn-setup">Add passkey</Link>
                </Button>
                {passkeys.count > 0 ? (
                  <Button asChild variant="outline">
                    <Link href="/webauthn-remove">Remove passkey</Link>
                  </Button>
                ) : null}
              </div>
            </section>

            <section className="rounded-[1.75rem] bg-[var(--color-panel)] p-6 shadow-[var(--shadow-card)]">
              <p className="text-[0.7rem] font-semibold uppercase text-[var(--color-text-faint)]">
                Notes
              </p>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--color-text-muted)]">
                <li>This page is the default authenticated landing screen in the starter.</li>
                <li>To change your password, sign out and use the password reset flow from the sign-in page.</li>
              </ul>
            </section>
          </aside>
        </div>
      </AppShell>
    </>
  )
}
