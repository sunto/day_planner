# AGENTS

## Stack And App Shape
- Rails serves Inertia pages with React entrypoints from `app/frontend`.
- Frontend stateful forms use `@inertiajs/react` `useForm`; server validation flows back through controller-rendered props plus toast messaging.
- App pages should use `AppShell` for authenticated screens and keep page titles/subtitles/actions in that shell rather than inventing custom top-level layouts.

## UI Component Rules
- Always use the shared shadcn-style primitives from `app/frontend/components/ui` before reaching for raw Radix primitives or native controls.
- If the needed primitive does not exist yet, add it under `app/frontend/components/ui` first, then consume that wrapper from feature code.
- Do not introduce raw native `<select>` / ad hoc dropdown styling in feature files. Add or use a shared select-style primitive instead.
- Reuse shared wrappers such as `Button`, `Popover`, `DatePicker`, `MonthPicker`, `Collapsible`, and dialog patterns already established in the app.
- Reuse `ConfirmDialog` or the existing Radix dialog composition style for modal flows so overlays, radius, spacing, and close affordances stay consistent.

## Styling Conventions
- Follow the existing Flowcast visual language:
  - large rounded surfaces
  - soft border/ring treatment using CSS variables
  - `shadow-[var(--shadow-card)]` / `shadow-[var(--shadow-soft)]`
  - brand colors from `app/frontend/entrypoints/application.css`
- Prefer shared utility classes and tokens over one-off colors or spacing values.
- Use `input-field` for shared text/number input styling; if a control needs special behavior across the app, promote it into a shared UI primitive instead of patching one screen.
- Use `Button` variants (`primary`, `outline`, `ghost`) instead of custom button styling in feature components.
- Keep button labels on one line unless wrapping is explicitly desired.

## Page And Feature Patterns
- Settings/index pages use `AppShell` with a short descriptive subtitle and card-based content blocks.
- Feature rows/cards should align into explicit grids at desktop breakpoints and collapse cleanly on mobile.
- Use `Head` for page metadata, but keep user-facing page headings in the page body via `AppShell`.
- Search bars, action rows, and modal launches should match existing patterns from projects, placeholders, forecast, and members pages.

## Forms And Data Flow
- Keep form payload shapes explicit and feature-scoped, matching controller params exactly.
- Prefer inline editing only when the page already follows that pattern; otherwise use dialogs for create/invite/confirm flows.
- When validation can fail inside a modal flow, preserve enough server props for the UI to reopen the relevant modal with errors populated.

## Implementation Hygiene
- Before adding a new UI pattern, scan existing pages/components for an established version and follow that style.
- Prefer behavior-level reuse over copy-pasting markup between pages.
- When a styling or interaction problem is clearly systemic, fix it in the shared primitive or shared CSS instead of patching a single screen.
