# App Flow Starter

App Flow Starter is a reusable Rails 8 starter built from Flowcast's proven app skeleton.

It keeps the parts Derek wanted to preserve:

- Rodauth authentication
- Inertia + React + Vite app shell
- Sonner toast pipeline for Rails-side validation and error handling
- AnyCable realtime wiring
- Kamal deployment scaffolding
- RSpec as the default test framework

It intentionally removes Flowcast-specific business logic and branding.

## What the starter includes

After booting the app, the default path is:

- sign up or sign in
- land on your profile settings
- update the signed-in account profile
- reuse or replace the authenticated shell as you build the real app

This starter does not assume multi-tenant workspaces, team membership, or any other app-specific domain model.

## Local development

This project uses a hybrid local development setup:

- Rails and Vite run on the host
- PostgreSQL and Redis run in Docker Compose

## Prerequisites

- Ruby `4.0.2`
- Node `24.x`
- Docker Desktop or Docker Engine with the Compose plugin

## First-time setup

```bash
cp .env.example .env
cp .env.compose.example .env.compose
bin/local-infra-up
bin/setup --skip-server
```

Then start the app:

```bash
bin/dev
```

The app defaults to http://localhost:3010 in development.

## Seeded demo account

```bash
bin/rails db:seed
```

This creates:

- `owner@example.com`
- password: `password123`

## Creating a real app from this starter

Use the included bootstrap script:

```bash
bin/new-app MyApp --module-name MyApp
```

That script updates the obvious starter placeholders while keeping the auth and app-shell foundation intact.

## Notes

- This repo keeps AnyCable and Action Cable mounted at `/cable`.
- No sample channel or workspace model is included by default.
- Rodauth remains the canonical auth stack.
- Tests were intentionally *not run* as part of this extraction pass.
