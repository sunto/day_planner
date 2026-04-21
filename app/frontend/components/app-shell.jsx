import { Link, usePage } from "@inertiajs/react"
import {
  ExitIcon,
  GearIcon,
  PersonIcon
} from "@radix-ui/react-icons"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const settingsNav = [
  { href: "/settings/user", label: "Profile", icon: PersonIcon, match: /^\/settings\/user$/ }
]

export function AppShell({ children, title, subtitle, actions, headerActions, fullWidth = false, wide = false }) {
  const page = usePage()
  const pathname = page.url.split("?")[0]
  const user = page.props.user
  const app = page.props.starter_app || {}
  const hasIntro = Boolean(title || subtitle)
  const hasHeader = Boolean(hasIntro || actions)
  const initials = user?.email?.slice(0, 2)?.toUpperCase() || "AS"
  const csrfToken = typeof document === "undefined"
    ? ""
    : document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || ""

  return (
    <div className="min-h-screen bg-[var(--color-app-bg)] text-[var(--color-text)]">
      <div className="w-full px-2 py-3 sm:px-3 lg:px-4 lg:py-4 xl:px-5">
        <header className="rounded-[1.8rem] border border-[var(--color-border)] bg-white/78 px-4 py-4 shadow-[var(--shadow-card)] backdrop-blur-xl sm:px-5 lg:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex min-w-0 flex-col gap-3 lg:flex-row lg:items-center lg:gap-4">
              <div className="min-w-0">
                <Link className="inline-flex rounded-full text-sm font-semibold uppercase tracking-[0.24em] text-[var(--color-charcoal-blue)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]" href="/">
                  {app.name || "App Flow Starter"}
                </Link>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 lg:flex-nowrap">
              {headerActions ? <div className="w-full lg:w-auto">{headerActions}</div> : null}

              <form id="app-shell-logout" action="/logout" hidden method="post">
                <input name="authenticity_token" type="hidden" value={csrfToken} />
              </form>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] bg-white text-sm font-semibold text-[var(--color-charcoal-blue)] shadow-[var(--shadow-card)] transition outline-none hover:bg-[var(--color-panel)] focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-surface)]"
                    type="button"
                  >
                    {initials}
                  </button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-[260px] p-3">
                  <div className="rounded-[1rem] bg-[var(--color-panel)] p-3">
                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[var(--color-text-faint)]">
                      Signed in
                    </p>
                    <div className="mt-2 flex items-start justify-between gap-2">
                      <p className="min-w-0 break-all pr-1 text-sm font-medium text-[var(--color-charcoal-blue)]">{user?.email}</p>
                      <Link
                        aria-label="User settings"
                        className={cn(
                          "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(38_70_83/0.22)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-panel)]",
                          /^\/settings\/user$/.test(pathname)
                            ? "bg-[var(--color-charcoal-blue)] text-white"
                            : "text-[var(--color-text-muted)] hover:bg-white/90 hover:text-[var(--color-charcoal-blue)]"
                        )}
                        href="/settings/user"
                      >
                        <GearIcon className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2">
                    {settingsNav.map((item) => {
                      const Icon = item.icon
                      const active = item.match.test(pathname)

                      return (
                        <DropdownMenuItem key={item.href} asChild className="p-0 focus:bg-transparent">
                          <Link
                            className={cn(
                              "flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition-colors no-underline outline-none",
                              active
                                ? "bg-[var(--color-charcoal-blue)] text-white"
                                : "text-[var(--color-text-muted)] hover:bg-[var(--color-panel)] hover:text-[var(--color-charcoal-blue)]"
                            )}
                            href={item.href}
                          >
                            <Icon className="h-4 w-4 shrink-0" />
                            <span>{item.label}</span>
                          </Link>
                        </DropdownMenuItem>
                      )
                    })}
                  </div>

                  <DropdownMenuItem
                    className="mt-3 cursor-pointer font-medium"
                    onSelect={() => document.getElementById("app-shell-logout")?.requestSubmit()}
                  >
                    <ExitIcon className="mr-1 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
      </div>

      <main className={cn(
        "min-h-screen min-w-0 w-full pt-5 lg:pt-6",
        fullWidth || wide
          ? "px-2 pb-3 sm:px-3 lg:px-4 lg:pb-4 xl:px-5"
          : "mx-auto max-w-[1680px] px-4 pb-4 sm:px-6 lg:px-8 lg:pb-6"
      )}>
          {hasHeader ? (
            <header className={cn(
              "flex flex-col gap-4",
              hasIntro
                ? "border-b border-[var(--color-border)] pb-5 lg:flex-row lg:items-end lg:justify-between"
                : "items-start justify-end lg:flex-row"
            )}>
              {hasIntro ? (
                <div>
                  <p className="text-[0.65rem] font-semibold uppercase tracking-[0.3em] text-[var(--color-text-faint)]">
                    Starter app
                  </p>
                  {title ? (
                    <h1 className="mt-2 text-3xl font-semibold tracking-[-0.03em] text-[var(--color-charcoal-blue)]">
                      {title}
                    </h1>
                  ) : null}
                  {subtitle ? (
                    <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--color-text-muted)]">{subtitle}</p>
                  ) : null}
                </div>
              ) : null}

              {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
            </header>
          ) : null}

          <div className={cn(hasHeader ? "pt-6" : "")}>{children}</div>
      </main>
    </div>
  )
}
