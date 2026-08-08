# MoneyBag Web Frontend

MoneyBag is a modern personal, family, and admin financial management web application built with **Next.js 16 (App Router)**, **TypeScript**, **Tailwind CSS v4**, **Redux Toolkit + RTK Query**, **Zod**, and **Vitest**.

---

## 🚀 Getting Started

### Installation & Prerequisites

Ensure you have Node.js 18+ and `pnpm` installed.

```bash
pnpm install
```

### Development Server

Start the local development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📋 Quality Gate Scripts

Run standard validation checks before committing changes:

```bash
# Typecheck TypeScript
pnpm typecheck

# Run Vitest test suite
pnpm test

# Run ESLint
pnpm lint

# Check formatting with Prettier
pnpm format:check

# Format files with Prettier
pnpm format

# Production build & static page generation
pnpm build
```

---

## 📐 Architecture & Target Structure

The codebase strictly follows [`CONVENTIONS.md`](./CONVENTIONS.md) and [`REFACTOR_PLAN.md`](./REFACTOR_PLAN.md).

```
src/
├── app/                  # Next.js App Router route groups
│   ├── (public)/         # Marketing, auth, onboarding, UI catalog & maintenance
│   ├── (personal)/       # Personal dashboard routes (wallets, budgets, goals, etc.)
│   ├── (family)/         # Family dashboard routes (shared wallets, settlements, etc.)
│   └── (admin)/          # Admin operations dashboard (users, plans, audit logs, etc.)
├── components/           # UI components grouped by context
│   ├── admin/            # Admin dashboard views & modals
│   ├── app-ui/           # MoneyBag design system primitives
│   ├── auth/             # Authentication forms & shells
│   ├── family/           # Family dashboard views & modals
│   ├── maintenance/      # Maintenance page view
│   ├── onboarding/       # Onboarding wizard flow
│   ├── personal/         # Personal dashboard views & modals
│   ├── public/           # Marketing page components & catalog
│   ├── shared/           # Cross-context components (charts, shells, sidebar, topbar)
│   └── ui/               # Base Radix/shadcn primitive abstractions
├── hooks/                # Custom React hooks
├── lib/                  # Utilities & demo fixtures
├── providers/            # Redux, Theme, Toast, and App provider wrappers
├── schemas/              # Zod validation schemas for all domain entities
├── services/             # RTK Query API slice endpoints (capability-named)
├── store/                # Redux Toolkit store & slices
├── test/                 # Vitest + React Testing Library suites
└── types/                # TypeScript type definitions
```

---

## 📄 Refactor Documentation

- **[`CONVENTIONS.md`](./CONVENTIONS.md)** — Core design principles, architectural rules, and folder structure conventions.
- **[`REFACTOR_PLAN.md`](./REFACTOR_PLAN.md)** — Complete 10-phase execution plan and progress log.
