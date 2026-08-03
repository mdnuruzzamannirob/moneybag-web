# MoneyBag Project Rules & Conventions

This file is the single source of truth for the MoneyBag frontend refactor. It defines the target
structure and the rules for new or substantially changed code.

Keep the architecture simple. Add a new folder, abstraction, provider, store slice, or wrapper only
when real code needs it. Existing code may temporarily differ while it is being migrated.

Do not create a separate `RULES.md` during the refactor. After the refactor is complete, the team
may extract a short mandatory rules file while keeping this document for detailed conventions.

## 1. Technology Baseline

- Next.js App Router and React Server Components.
- React with TypeScript strict mode.
- Tailwind CSS 4 with CSS-first configuration.
- shadcn/Base UI primitives with a MoneyBag-specific `app-ui` layer.
- Redux Toolkit and RTK Query for client-global and remote client state.
- React Hook Form and Zod for non-trivial forms.
- Apache ECharts behind client-only chart components.
- Lucide React for interface icons.
- `date-fns` for date parsing, calculation, and presentation.
- pnpm as the only package manager.

Framework behavior is version-specific. Before using or changing a Next.js API, read the relevant
guide in `node_modules/next/dist/docs/` for the installed version.

## 2. Target Project Structure

```text
src/
├── app/
│   ├── (public)/                # All publicly reachable application routes
│   │   ├── (pages)/             # Landing, pricing, about, blog, legal, etc.
│   │   ├── (auth)/              # Login, register, recovery, verification, 2FA
│   │   ├── onboarding/          # Standalone onboarding flow
│   │   ├── ui/                  # Publicly reachable UI catalog
│   │   └── maintenance/         # Standalone maintenance page
│   ├── (personal)/              # Personal Dashboard
│   ├── (family)/                # Family Dashboard
│   ├── (admin)/                 # Admin Dashboard
│   ├── api/                     # Route Handlers when a frontend HTTP boundary is required
│   ├── layout.tsx               # Root document and root providers
│   └── globals.css              # Tailwind imports and global design tokens
├── components/
│   ├── ui/                      # Raw shadcn/Base UI primitives
│   ├── app-ui/                  # MoneyBag application UI built from ui primitives
│   ├── shared/                  # Cross-context composed components
│   ├── public/                  # Public-page components
│   ├── auth/                    # Authentication components
│   ├── onboarding/              # Onboarding components
│   ├── personal/                # Personal Dashboard components
│   ├── family/                  # Family Dashboard components
│   └── admin/                   # Admin Dashboard components
├── services/                    # RTK Query APIs and server-only request/auth helpers
├── schemas/                     # Shared Zod schemas
├── hooks/                       # Reusable React hooks
├── store/                       # Redux store, typed hooks, and client-only slices
├── types/                       # Shared TypeScript contracts
├── lib/                         # Pure utilities, constants, and formatters
└── providers/                   # Narrow client provider boundaries
```

Create folders only when they contain real code. Route-specific code that is not reused may be
colocated in a private `_components` or `_lib` folder beside the route.

## 3. Application Contexts and Routes

MoneyBag has four top-level route groups. Three are dashboards:

| Route group  | Context            | Access model         | Typical routes                         |
| ------------ | ------------------ | -------------------- | -------------------------------------- |
| `(public)`   | Public application | Publicly reachable   | `/`, `/login`, `/onboarding`, `/ui`    |
| `(personal)` | Personal Dashboard | Authenticated user   | `/dashboard`, `/wallets`, `/budgets`   |
| `(family)`   | Family Dashboard   | Family member + role | `/family/dashboard`, `/family/members` |
| `(admin)`    | Admin Dashboard    | Authorized admin     | `/admin/dashboard`, `/admin/users`     |

These route groups are application contexts, not feature modules.

### Public Context

Everything below belongs to `(public)` and is reachable without a dashboard route guard:

```text
(public)/
├── (pages)/
│   ├── layout.tsx              # PublicShell
│   └── ...
├── (auth)/
│   ├── layout.tsx              # AuthShell
│   └── ...
├── onboarding/
│   ├── layout.tsx              # OnboardingShell
│   └── page.tsx
├── ui/
│   ├── layout.tsx              # UI catalog shell
│   └── page.tsx
└── maintenance/
    ├── layout.tsx              # Minimal standalone shell
    └── page.tsx
```

- Do not put a marketing header/footer in `(public)/layout.tsx`; it would wrap auth, onboarding,
  UI, and maintenance pages unnecessarily.
- Each public area may have its own nested layout and visual shell.
- `/onboarding` is publicly reachable. Any action that reads or changes account-specific data must
  still authenticate and authorize the request on the server/backend.
- `/ui` is the application UI catalog for reviewing `ui` and `app-ui` components.
- `/maintenance` is a standalone public page. The mechanism that activates maintenance mode is a
  separate application/operations concern.

### Dashboard Contexts

- Personal, Family, and Admin each have a separate route-group layout.
- Use explicit `PersonalDashboardShell`, `FamilyDashboardShell`, and `AdminDashboardShell`
  compositions.
- Each dashboard owns its navigation, breadcrumbs, context actions, and optimistic route guard.
- Share small shell primitives, but do not create one large dashboard shell controlled by many
  personal/family/admin conditionals.
- Route groups do not add URL segments. Use real `family/` and `admin/` folders inside their route
  groups to create `/family/*` and `/admin/*` URLs.

```text
app/
├── (personal)/
│   ├── layout.tsx
│   ├── dashboard/page.tsx
│   ├── wallets/page.tsx
│   └── transactions/page.tsx
├── (family)/
│   ├── layout.tsx
│   └── family/
│       ├── dashboard/page.tsx
│       ├── members/page.tsx
│       └── settlements/page.tsx
└── (admin)/
    ├── layout.tsx
    └── admin/
        ├── dashboard/page.tsx
        ├── users/page.tsx
        └── settings/page.tsx
```

## 4. Component Architecture

Components follow this direction:

```text
components/ui
    ↓
components/app-ui
    ↓
components/shared or components/<context>
    ↓
app routes
```

### `components/ui`

- Contains raw shadcn/Base UI primitives owned by this repository.
- Keep primitives generic and independent of MoneyBag business rules.
- A deliberate system-wide accessibility or primitive fix may be made here.
- Do not change a primitive only to satisfy one screen; compose or adapt it at a higher layer.

### `components/app-ui`

`app-ui` adapts `ui` primitives to MoneyBag's design and product needs. Existing components in this
layer should be preserved and improved during the refactor.

Examples include `AppButton`, `AppCard`, `AppBadge`, `AppModal`, `AppTable`, `AppField`,
`AppPageHeader`, and `AppStatCard`.

- Product screens should prefer `app-ui` over directly styling raw `ui` primitives.
- `app-ui` owns consistent MoneyBag variants, tones, sizes, loading/disabled behavior, focus
  behavior, and design-token usage.
- `app-ui` may know the MoneyBag design system but must not know API data, permissions, routes,
  wallets, transactions, or user roles.
- Repeated customization of a raw primitive is a signal to add or improve an `app-ui` component.
- Do not introduce a wrapper that duplicates an existing `app-ui` component.
- Keep `components/app-ui/index.ts` as a deliberate public component surface without circular
  imports.
- Add `'use client';` only to interactive `app-ui` entry points; do not mark the entire barrel as a
  Client Component.
- Keep heavy, lazy-only components available through direct entry files so a static barrel import
  does not pull them into a frequently used client module graph.

### `components/shared`

- Contains composed, reusable UI used by more than one application context.
- Examples: currency display, date-range picker, file uploader, data table, empty state, and shell
  primitives.
- Shared components may compose `app-ui` components.
- Shared components must not contain Personal, Family, or Admin-specific business rules.

### Context Components

- `components/public`: public content and marketing sections.
- `components/auth`: authentication and recovery flows.
- `components/onboarding`: onboarding steps and progress UI.
- `components/personal`: Personal Dashboard screen components.
- `components/family`: Family Dashboard screen components.
- `components/admin`: Admin Dashboard screen components.
- Family and Admin are component/dashboard groupings, not umbrella feature or service layers.
- Move only the reusable portion of a context component into `shared` or `app-ui`; keep its
  context-specific orchestration in place.
- A context must not import another dashboard's page, layout, or screen entry point. This keeps
  route ownership clear and prevents unrelated dashboard code from entering its bundle.

## 5. Next.js and React Rules

- Keep `page.tsx` and `layout.tsx` small. They validate route input, load/authorize data, define
  metadata, and compose screen components.
- Pages and layouts are Server Components by default.
- Next.js automatically code-splits Server Components and route segments. Preserve that boundary by
  keeping dashboard entry points isolated and importing only what a route renders.
- Add `'use client';` only when state, effects, event handlers, context, browser APIs, or a
  client-only library requires it.
- Keep Client Component boundaries as small as practical because their imported module tree enters
  the client bundle.
- Client Components must not be `async`.
- Props passed from Server to Client Components must be serializable and contain only the data the
  client needs.
- Mark server-only service/auth modules with `import 'server-only';`.
- Render providers as deep in the component tree as practical. Do not turn the root layout into a
  Client Component.
- Await dynamic `params` and page `searchParams` in the installed Next.js version.
- Prefer generated route types such as `PageProps<'/wallets/[walletId]'>`.
- Use `notFound()` for missing resources and redirects for intentional access/navigation flows.
- Use `next/link` for internal links, `next/image` for content images, and `next/font` for fonts.
- Keep `next/link` prefetching enabled by default. Disable it only for a measured performance,
  privacy, or data-cost reason.
- Use typed static `metadata` or `generateMetadata` where page metadata depends on data.
- Make server data caching and revalidation behavior explicit; do not rely on assumptions from an
  older Next.js version.
- Use Route Handlers only for callbacks, webhooks, same-origin HTTP contracts, or a required
  backend-for-frontend boundary. They are not a second business backend.

### Route States

- Add `loading.tsx` only when it renders meaningful progress or a representative skeleton.
- Use `loading.tsx` for dynamic routes that benefit from instant navigation and partial prefetching.
- Use nested `<Suspense>` boundaries when independent slow sections can stream separately; each
  fallback should approximate the content it replaces and avoid layout shift.
- `error.tsx` and `global-error.tsx` are Client Components and must provide a safe recovery action.
- Use `not-found.tsx` for a useful missing-page/resource experience.
- Every data-driven screen deliberately handles loading, empty, error, permission-denied, and
  success states.
- Do not expose exception details, backend payloads, or stack traces to users.

## 6. Services and Data Fetching

Use a single RTK Query API per backend base URL and inject domain endpoints from small files:

```text
services/
├── base-api.ts                 # createApi, base query, auth refresh, error normalization
├── auth-api.ts
├── wallets-api.ts
├── transactions-api.ts
├── categories-api.ts
├── budgets-api.ts
├── goals-api.ts
├── reports-api.ts
├── family-groups-api.ts
├── family-members-api.ts
├── settlements-api.ts
├── billing-api.ts
├── users-api.ts
├── subscriptions-api.ts
├── plans-api.ts
├── coupons-api.ts
├── audit-logs-api.ts
└── server/                     # Server-only session and request helpers
```

- `base-api.ts` owns the base URL, credentials, headers, refresh behavior, common tag types, and
  normalized error contract.
- Domain API files inject endpoints into the base API; do not create an unrelated API store for
  every endpoint.
- `family` and `admin` are dashboard contexts, so do not create umbrella `family-api.ts` or
  `admin-api.ts` files. Name APIs after capabilities/resources.
- Components must not contain raw API URLs, refresh logic, or transport configuration.
- Use targeted cache tags and invalidation. Do not invalidate all cached data after every mutation.
- RTK Query owns authenticated interactive client-side server state.
- Server Components may use server-only helpers for server-rendered reads and secure access checks.
- Do not fetch and store the same resource independently in both systems without an explicit
  hydration/ownership design.
- Normalize transport errors into a safe typed application error before UI consumption.
- Validate untrusted external responses where runtime correctness or security matters.
- Run independent server requests concurrently to avoid request waterfalls.

## 7. State Management

Choose the smallest correct owner:

1. URL state for shareable search, filters, tabs, date ranges, sorting, and pagination.
2. Component state for local interaction.
3. React Hook Form for form state.
4. RTK Query for remote client-side server state.
5. Redux slices for cross-route client-only state.

Store structure:

```text
store/
├── store.ts
├── hooks.ts                    # Typed useAppDispatch and useAppSelector
└── slices/                     # Cross-route client-only state
```

- Use one Redux store.
- Use Redux Toolkit APIs and typed React-Redux hooks.
- Redux state and actions must remain serializable.
- Do not put form state, API cache copies, React elements, class instances, promises, or derived
  values in Redux.
- Derive values during render or through named selectors such as `selectActiveWallet`.
- Avoid contradictory, duplicate, and deeply nested state.
- Do not create a global slice for state used by one component or route.
- URL, session, and permission state must not be duplicated merely for convenience.

## 8. Forms and Validation

- Use React Hook Form for non-trivial forms and Zod for runtime input validation.
- Shared schemas live in `schemas/<subject>.schema.ts`; a schema used by only one component may be
  colocated with it.
- Infer form values from Zod schemas instead of duplicating form interfaces.
- Define explicit default values.
- Show field errors beside their fields and submission errors at form level.
- Disable duplicate submissions and show a pending state.
- Preserve valid user input after a recoverable failure.
- Transform strings into domain/API values at the submission boundary, not throughout JSX.
- Destructive actions require confirmation that names the affected resource and consequence.
- Client validation improves UX; server/backend validation and authorization remain mandatory.

## 9. Types, Hooks, Utilities, and Providers

### Types

- Shared domain/API types live in domain-named files such as `wallet.ts`, `transaction.ts`, and
  `user.ts`.
- Keep API request/response types distinct from component props when their shapes or meanings
  differ.
- Do not use `any`. Use a precise type or `unknown` followed by validation/narrowing.
- Use discriminated unions for request/view states that cannot validly overlap.
- Use `import type` for type-only dependencies.

### Hooks

- Reusable hooks live in `hooks` and use `use-something.ts` filenames.
- Keep a hook beside its component when it has only one consumer.
- Hooks orchestrate reusable React behavior; they do not hide transport setup or unrelated
  business logic.

### Utilities

- Pure helpers, constants, and formatters live in `lib`.
- Centralize money, date, number, and text formatting.
- Utilities must not import React components or Redux store instances.
- Do not create vague catch-all files such as `common.ts` or `helpers.ts`.

### Providers

- Each provider is a narrow Client Component with one purpose.
- Providers compose in a single application provider when several are globally required.
- Render providers only around the subtree that consumes them.
- Do not use context for values that can remain server-rendered, local, or ordinary props.

## 10. Naming, Imports, and Formatting

- New files and folders use `kebab-case`.
- React components and exported types use `PascalCase`.
- Functions, variables, and object properties use `camelCase`.
- Hooks begin with `use`; booleans read as predicates such as `isLoading`, `hasAccess`, and
  `canEdit`.
- Zod values end with `Schema`; RTK Query files end with `-api.ts`; Redux slices end with
  `-slice.ts`.
- Use named exports except where Next.js requires a default export.
- Prefer `@/` imports across directories and relative imports for tightly colocated files.
- Avoid long relative paths and imports into another module's private internals.

Import order, separated by blank lines:

1. React, Next.js, and third-party packages.
2. Internal `@/` imports.
3. Relative imports.
4. Styles or side-effect imports.

Follow the repository Prettier configuration: single quotes, semicolons, trailing commas, two-space
indentation, 100-character print width, and LF line endings.

## 11. Styling and Design System

- Tailwind CSS 4 remains CSS-first; global theme variables and semantic tokens live in
  `globals.css`.
- Use semantic utilities for background, foreground, card, border, primary, success, warning,
  danger, and info colors.
- Do not hard-code brand, surface, text, border, or status colors inside screen components.
- New tokens need a clear reusable purpose and both light and dark behavior.
- Use `cn()` from `@/lib/utils` for conditional class composition.
- Prefer established spacing, radius, typography, and shadow values over arbitrary values.
- Build mobile-first and enhance at larger breakpoints.
- Verify hover, focus, active, disabled, loading, success, and error states in light and dark themes.
- Use Lucide React for standard interface icons; reserve custom SVG for brand/domain artwork.

## 12. Accessibility and UX

- Use semantic HTML before adding ARIA.
- Every interactive element must be keyboard accessible with a visible focus state.
- Every form control needs an associated label; a placeholder is not a label.
- Icon-only controls need an accessible name; decorative icons use `aria-hidden="true"`.
- Dialogs expose a title, manage focus, close with Escape when appropriate, and restore trigger
  focus.
- Tables use real headers and a usable narrow-screen strategy.
- Do not communicate state using color alone.
- Preserve user context after errors and provide a clear recovery action.
- Respect reduced-motion preferences for non-essential animation.
- Target WCAG 2.2 AA interaction and contrast behavior.

## 13. Financial Data and Dates

- Never use binary floating-point arithmetic as the authoritative representation of money.
- Follow the backend contract and use integer minor units or validated decimal strings.
- Every amount has an explicit or unambiguous currency.
- Never combine or compare different currencies without a defined conversion rate, timestamp,
  rounding mode, and policy.
- Centralize monetary parsing, calculation, and formatting; do not concatenate currency symbols.
- Define one sign convention for income, expense, transfer, balance, and settlement values.
- Financial calculations belong in pure, unit-tested functions, not JSX.
- Transport timestamps use ISO 8601 with an explicit timezone, normally UTC.
- Treat an instant and a date-only value as different concepts.
- Use `date-fns` through shared helpers and format in the user's locale/timezone at the UI boundary.
- Reports and totals must define date-range inclusivity, timezone, and currency scope.

## 14. Authentication, Authorization, and Security

- Authentication verifies identity; authorization decides access. Treat them as separate checks.
- Public routes do not require a dashboard route guard, but protected actions and data still require
  server/backend authorization.
- Personal data requires the authenticated owner; Family data requires membership and the relevant
  family role; Admin data/actions require explicit admin permission.
- Centralize secure session and authorization checks in server-only service helpers and enforce
  authorization again close to the backend/data source.
- A dashboard layout/proxy redirect is an optimistic UX check, not the security boundary.
- Every Server Action, Route Handler, export, upload, billing action, and mutation validates its
  input and authorization independently.
- Prefer secure `HttpOnly`, `Secure`, `SameSite` cookies for session credentials.
- Never store access tokens, refresh tokens, passwords, recovery codes, or financial records in
  `localStorage`.
- Only intentionally public configuration uses `NEXT_PUBLIC_*`.
- Do not log credentials, tokens, payment details, personal identifiers, or sensitive financial
  payloads.
- Treat API data, route parameters, search parameters, browser storage, and uploads as untrusted.
- Validate uploaded file type, size, and content on both client and server/backend.
- Avoid `dangerouslySetInnerHTML`; sanitize required rich HTML at a trusted boundary.

## 15. Performance

- Keep Client Component boundaries narrow to minimize browser JavaScript.
- Prefer server rendering and streaming for initial content.
- Lazy-load heavy or rarely used Client Components—such as ECharts, editors, CSV importers, large
  dialogs, and advanced report panels—with `next/dynamic` or an on-demand `import()`.
- Do not lazy-load the primary navigation, dashboard shell, above-the-fold critical content, or
  small frequently used controls; the extra request and fallback would add unnecessary latency.
- Put `next/dynamic` declarations at module scope with explicit import paths so Next.js can discover
  and preload their chunks.
- Use `ssr: false` only inside a Client Component and only for code that truly cannot render on the
  server because it requires browser APIs.
- Dynamic imports are not a substitute for a correct Server/Client Component boundary. Do not
  dynamically import Server Components merely to force client-side code splitting.
- Every lazy-loaded UI has a meaningful loading component or Suspense fallback and a usable error
  path.
- Load third-party scripts through `next/script`, place them in the narrowest page/layout that needs
  them, and choose `afterInteractive` or `lazyOnload` unless an earlier strategy is demonstrably
  required.
- Import only the needed exports from large libraries. Avoid whole-library imports and broad client
  barrels that pull unused heavy modules into a bundle.
- Use `next/image` with accurate `sizes` for responsive content images.
- Paginate or virtualize large transaction, report, user, and audit-log collections.
- Debounce repeatable user-driven queries such as search, not mutations or accounting logic.
- Memoize only measured expensive work or when referential stability is required by a child API.
- Avoid effect-driven state synchronization when the value can be derived during render.
- Review the production bundle when adding a large dependency or after a material bundle-size
  regression; optimize measured costs instead of guessing.

## 16. Testing and Quality Gates

The target project scripts are:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test
pnpm build
```

If a script is not configured yet, adding the relevant tool/script is part of the tooling refactor.

- Unit-test monetary calculations, rounding, date boundaries, formatters, schemas, selectors, and
  permission rules.
- Component-test forms, keyboard interaction, dialogs, errors, and loading/empty states.
- Integration-test API error normalization, auth refresh, and RTK Query cache invalidation.
- End-to-end test login, transactions, transfers, budgets, Family permissions, exports, and
  billing-critical flows.
- Use fixed clocks, explicit timezones, and deterministic currency inputs in tests.
- Test observable behavior rather than implementation details.
- A bug fix includes a regression test when the relevant test layer exists.

## 17. Refactoring Workflow

Refactor one route or workflow at a time:

1. Record its current observable behavior and identify its access context.
2. Add characterization/regression tests where practical.
3. Move it under the correct `(public)`, `(personal)`, `(family)`, or `(admin)` route group.
4. Keep the route thin and establish its Server/Client Component boundary.
5. Reuse or improve `app-ui` before introducing new screen-level primitives.
6. Move context UI into its component folder and cross-context UI into `shared`.
7. Move API behavior into capability-named services and register RTK Query through the store.
8. Organize schemas, types, hooks, utilities, and providers only as the workflow needs them.
9. Verify behavior, permissions, responsive UI, keyboard use, light/dark themes, and quality gates.
10. Remove replaced code, stale exports, empty placeholders, temporary adapters, and duplicates.

Do not restructure the entire repository in one change. Do not mix unrelated behavior changes or
formatting churn into a structural refactor.

Recommended migration order:

1. Application shells and route groups.
2. `ui` and `app-ui` audit.
3. Public pages, Auth, Onboarding, UI catalog, and Maintenance.
4. Personal Dashboard workflows.
5. Family Dashboard workflows.
6. Admin Dashboard workflows.
7. Final dead-code cleanup and documentation review.

## 18. Definition of Done

A refactored route or workflow is complete when:

- It lives under the correct application context and uses the correct shell.
- Its route file is thin and its Server/Client boundary is intentional.
- It follows the `ui → app-ui → shared/context → route` component direction.
- API, state, schemas, types, hooks, utilities, and providers have one clear owner.
- Loading, empty, error, success, permission, responsive, keyboard, light, and dark states are
  handled where relevant.
- Financial amounts, currencies, dates, timezones, and permissions are explicit.
- Relevant formatting, lint, type, test, and build checks pass.
- Replaced legacy code, duplicate components, stale exports, and accidental placeholders are gone.
- Shared contracts or conventions changed by the work are documented here.
