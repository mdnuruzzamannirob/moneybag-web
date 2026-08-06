# MoneyBag Full Refactor Plan

This document is the execution plan for refactoring the MoneyBag frontend. All implementation must
follow [`CONVENTIONS.md`](./CONVENTIONS.md).

The plan preserves existing URLs and user-visible behavior unless a separate approved requirement
explicitly changes them. It covers the frontend repository only; backend changes are out of scope
except for coordinating and consuming its API contract.

## How to Use This Plan

- Complete phases in order because later phases depend on earlier boundaries.
- Work on one route or workflow at a time inside a phase.
- Do not start the next phase until the current phase's exit gate passes or a blocker is documented.
- Update the checkboxes and progress log as work is completed.
- Keep refactor commits focused and reversible.
- Do not mix structural refactoring with unrelated product redesign or feature changes.
- Before changing a Next.js API or convention, read the relevant installed documentation in
  `node_modules/next/dist/docs/`.

Status values used in this file:

- `Not started`
- `In progress`
- `Blocked`
- `Complete`

## Locked Architecture Decisions

These decisions are already agreed and should not be reopened during routine implementation:

- `CONVENTIONS.md` remains the single rules document during the refactor.
- The top-level route groups are `(public)`, `(personal)`, `(family)`, and `(admin)`.
- `(personal)`, `(family)`, and `(admin)` are three separate dashboard contexts.
- `(public)` contains public pages, auth, onboarding, the UI catalog, and maintenance.
- `/ui` remains publicly reachable; this plan does not add a `noindex` rule.
- Family and Admin are dashboard contexts, not umbrella feature/API modules.
- The component direction is `ui → app-ui → shared/context → route`.
- Existing `app-ui` components are retained, audited, and improved rather than replaced wholesale.
- RTK Query uses one base API per backend base URL with capability-named endpoint files.
- Remote API data is not duplicated in ordinary Redux slices.
- The refactor is incremental; there is no repository-wide big-bang move.

## Current-to-Target Migration Map

### Routes

| Current location              | Target location                      | URL impact |
| ----------------------------- | ------------------------------------ | ---------- |
| `app/(public)/<public-page>`  | `app/(public)/(pages)/<public-page>` | None       |
| `app/(public)/(auth)`         | `app/(public)/(auth)`                | None       |
| `app/onboarding`              | `app/(public)/onboarding`            | None       |
| `app/ui`                      | `app/(public)/ui`                    | None       |
| `app/maintenance`             | `app/(public)/maintenance`           | None       |
| `app/(dashboard)`             | `app/(personal)`                     | None       |
| `app/family`                  | `app/(family)/family`                | None       |
| `app/admin`                   | `app/(admin)/admin`                  | None       |
| `app/api`                     | `app/api`                            | None       |
| Root error/loading boundaries | Root error/loading boundaries        | None       |

### Components and Infrastructure

| Current location/state          | Target location/state                                           |
| ------------------------------- | --------------------------------------------------------------- |
| `components/ui`                 | Keep as raw shadcn/Base UI primitives                           |
| `components/app-ui`             | Keep as MoneyBag application UI                                 |
| `components/user`               | `components/personal`                                           |
| `components/layout`             | Context shells or `components/shared` shell primitives          |
| `components/charts`             | `components/shared/charts` or the single owning context         |
| `components/public`             | Keep; split only when a component belongs exclusively elsewhere |
| `components/auth`               | Keep and normalize naming                                       |
| `components/family`             | Keep as Family Dashboard components                             |
| `components/admin`              | Keep as Admin Dashboard components                              |
| `redux/api`                     | Capability-named files in `services`                            |
| `redux/store.ts` and hooks      | `store/store.ts` and `store/hooks.ts`                           |
| `redux/slices`                  | `store/slices`, only for real cross-route client state          |
| Empty API/type/schema/hook file | Implement when its workflow migrates or delete it               |
| `lib/axios.ts` placeholder      | Remove unless an approved API transport actually requires Axios |

## Phase Summary

| Phase | Name                                      | Depends on | Status      |
| ----: | ----------------------------------------- | ---------- | ----------- |
|     0 | Baseline and safety                       | —          | Complete    |
|     1 | Tooling and quality foundation            | Phase 0    | Complete    |
|     2 | Route groups, layouts, and shells         | Phase 1    | Complete    |
|     3 | UI primitives, `app-ui`, and shared UI    | Phase 2    | Complete    |
|     4 | Services, store, providers, and contracts | Phase 3    | Not started |
|     5 | Public application areas                  | Phase 4    | Not started |
|     6 | Personal Dashboard                        | Phase 5    | Not started |
|     7 | Family Dashboard                          | Phase 6    | Not started |
|     8 | Admin Dashboard                           | Phase 7    | Not started |
|     9 | Cross-cutting hardening                   | Phase 8    | Not started |
|    10 | Cleanup, release validation, and handoff  | Phase 9    | Not started |

---

## Phase 0 — Baseline and Safety

### Objective

Create a reliable record of current behavior and known failures before moving code.

### Tasks

- [x] Record the current branch, working-tree state, and user-owned changes.
- [x] Generate a route inventory containing every current public URL.
- [x] Identify critical user journeys:
  - [x] Public navigation and pricing
  - [x] Login, registration, recovery, verification, and 2FA
  - [x] Onboarding
  - [x] Personal dashboard overview
  - [x] Wallet and transaction workflows
  - [x] Family navigation and permissions
  - [x] Admin navigation and protected actions
- [x] Capture current screenshots or a concise behavior checklist for critical routes.
- [x] Run and record the current baseline results:

  ```bash
  pnpm lint
  pnpm format:check
  pnpm exec tsc --noEmit
  pnpm build
  ```

- [x] Classify placeholder files into:
  - required and scheduled for implementation;
  - obsolete and safe to delete;
  - intentionally deferred with a named owning phase.
- [x] Record current large/high-risk modules, including the UI catalog, help center, reports,
      finance pages/dialogs, admin settings, Family views, and chart modules.
- [x] Confirm backend endpoint, auth, money, currency, date, and error-response contracts before
      replacing mocks.

### Deliverables

- A stable route/URL ledger.
- A baseline command report with existing failures clearly separated from new regressions.
- A placeholder disposition list.
- A critical-flow verification checklist.

### Exit Gate

- [x] Every existing URL has a recorded target path.
- [x] Existing quality failures are documented and reproducible.
- [x] No user-owned work has been overwritten or mixed into the refactor.
- [x] High-risk flows have a repeatable manual or automated verification method.

---

## Phase 1 — Tooling and Quality Foundation

### Objective

Make every later phase verifiable with consistent local and CI commands.

### Tasks

- [x] Add a `typecheck` script using `tsc --noEmit`.
- [x] Configure a unit/component test stack suitable for React and TypeScript.
- [x] Configure Playwright or the approved equivalent for end-to-end critical flows.
- [x] Add `test` and focused test scripts to `package.json`.
- [x] Ensure formatting checks include the files intentionally maintained by the project, including
      root Markdown rules/plan documents where appropriate.
- [x] Add a CI workflow that runs install, format check, lint, typecheck, tests, and build.
- [x] Add a minimal render/smoke test for each current application context.
- [x] Add test helpers for:
  - fixed time and timezone;
  - deterministic currency values;
  - Redux/RTK Query providers;
  - router/navigation behavior;
  - API success and normalized failure responses.
- [x] Do not weaken TypeScript, ESLint, or build settings to make legacy code pass; document or fix
      the underlying issue.

### Deliverables

- Working target scripts:

  ```bash
  pnpm lint
  pnpm format:check
  pnpm typecheck
  pnpm test
  pnpm build
  ```

- Repeatable test helpers and CI quality gates.

### Exit Gate

- [x] All target scripts exist and run locally.
- [x] CI runs the same commands used locally.
- [x] At least one representative smoke test passes for Public, Personal, Family, and Admin.
- [x] Newly introduced failures block phase completion.

---

## Phase 2 — Route Groups, Layouts, and Shells

### Objective

Move every route into its agreed application context without changing URLs or behavior.

### Tasks

#### Public routes

- [x] Create `(public)/(pages)` only by moving real public routes into it.
- [x] Move the current public shell from `(public)/layout.tsx` to `(public)/(pages)/layout.tsx`.
- [x] Keep `(public)/(auth)` and its `AuthShell` separate from the public marketing shell.
- [x] Move `app/onboarding` to `app/(public)/onboarding`.
- [x] Move `app/ui` to `app/(public)/ui`.
- [x] Move `app/maintenance` to `app/(public)/maintenance`.
- [x] Ensure `(public)/layout.tsx`, if retained, is neutral and does not add the marketing shell.

#### Personal Dashboard

- [x] Rename/move `app/(dashboard)` to `app/(personal)`.
- [x] Replace the generic dashboard composition with an explicit `PersonalDashboardShell`.
- [x] Preserve URLs such as `/dashboard`, `/wallets`, `/transactions`, `/settings`, and `/reports`.

#### Family Dashboard

- [x] Create `app/(family)/layout.tsx` with `FamilyDashboardShell`.
- [x] Move `app/family/*` to `app/(family)/family/*` without changing `/family/*` URLs.
- [x] Preserve the `/family` entry route behavior intentionally: render or redirect, but do not
      leave an accidental duplicate dashboard.

#### Admin Dashboard

- [x] Create `app/(admin)/layout.tsx` with `AdminDashboardShell`.
- [x] Move `app/admin/*` to `app/(admin)/admin/*` without changing `/admin/*` URLs.
- [x] Preserve the `/admin` entry route behavior intentionally.

#### Root boundaries

- [x] Keep `app/layout.tsx`, `app/api`, favicon, global styles, and global error/not-found boundaries
      at the root.
- [x] Replace the empty root `loading.tsx` with meaningful UI or remove it if it provides no value.
- [x] Ensure root providers do not make the root layout a Client Component.

### Verification

- [x] Compare the post-move route list with the Phase 0 URL ledger.
- [x] Verify direct navigation and client navigation to every route group.
- [x] Verify browser refresh on nested dynamic routes.
- [x] Confirm no two route groups resolve to the same URL.
- [x] Confirm public pages are not wrapped by dashboard shells and auth/onboarding/UI/maintenance
      are not wrapped by the marketing shell.

### Exit Gate

- [x] All routes live under the target context.
- [x] No URL has changed unintentionally.
- [x] Personal, Family, and Admin use distinct shells.
- [x] Format, lint, typecheck, route smoke tests, and build pass.

---

## Phase 3 — UI Primitives, `app-ui`, and Shared UI

### Objective

Establish one consistent component system before migrating screen implementations.

### Tasks

#### Raw primitives

- [x] Audit `components/ui` for generated primitives, local fixes, unused files, and accessibility
      regressions.
- [x] Keep primitives business-agnostic.
- [x] Document any intentional changes that would affect all higher-level components.

#### MoneyBag `app-ui`

- [x] Inventory every existing `app-ui` component, variant, state, and consumer.
- [x] Verify light/dark, keyboard, focus, disabled, loading, error, and responsive behavior.
- [x] Preserve useful existing components; fix their contracts rather than replacing the layer.
- [x] Remove confirmed duplication among `AppStatCard`, shared stat cards, tables, fields, file
      uploaders, and empty/loading components.
- [x] Keep business logic and API types out of `app-ui`.
- [x] Keep heavy lazy-only components directly importable without relying on the broad barrel.
- [x] Keep the `app-ui` barrel free of `'use client'` and circular imports.

#### Shared and context UI

- [x] Split `components/layout`:
  - public header/footer/shell → `components/public`;
  - auth shell → `components/auth`;
  - dashboard-neutral frame pieces → `components/shared`;
  - context navigation/shell behavior → Personal, Family, or Admin components.
- [x] Move cross-context chart primitives to `components/shared/charts`.
- [x] Keep dashboard-specific chart composition inside its owning context.
- [ ] Move `components/user` to `components/personal` incrementally with its routes.
- [x] Normalize new/touched component filenames to `kebab-case`.

#### UI catalog

- [x] Break the large `/ui` page into manageable catalog sections/components.
- [x] Ensure the catalog demonstrates every supported `app-ui` state and variant.
- [x] Lazy-load heavy catalog examples that are not initially visible.
- [x] Keep the catalog publicly reachable as agreed.

### Exit Gate

- [x] Product screens have a clear rule for using `ui`, `app-ui`, or `shared`.
- [x] No duplicate application-level primitive remains without a documented reason.
- [x] `/ui` accurately represents the supported application UI contracts.
- [x] Component accessibility tests and all quality gates pass.

### Completion Log

**Completed:** 2026-08-06

#### What was done

- **Raw primitives** – Audited all `components/ui` shadcn/radix primitives; confirmed business-agnostic and free of regressions. No breaking changes made.
- **`app-ui` contracts** – Inventoried all `app-ui` components and corrected prop contracts:
  - `AppBadge`: uses `status` prop (not `tone`).
  - `AppSwitch` / `AppCheckbox`: require a `label` prop.
  - `AppField`: uses `description` instead of `hint`.
  - `AppTabs` / `AppTable`: require explicit `value`/`key` props matching the types exported from the barrel.
- **Barrel hygiene** – Confirmed `app-ui/index.ts` is free of `'use client'` directives and circular imports. Heavy components (`AppTable`, chart wrappers) are directly importable via their own paths.
- **Layout split** – Reorganized `components/layout` into:
  - `components/public` – public marketing header/footer/shell.
  - `components/auth` – `AuthShell` and auth layout wrappers.
  - `components/shared/layout` – `Sidebar`, `Topbar`, and dashboard-neutral frame pieces.
  - Fixed Logo import path in `Sidebar.tsx` and `app-ui`/`ui/dialog` import paths in `Topbar.tsx`.
- **Charts** – Moved cross-context chart primitives to `components/shared/charts`; dashboard-specific chart compositions remain inside their owning contexts.
- **UI catalog** – Refactored the large `src/app/(public)/ui/page.tsx` into four lazy-loaded modular sections:
  - `_components/data-display-section.tsx`
  - `_components/form-controls-section.tsx`
  - `_components/navigation-section.tsx`
  - `_components/feedback-overlays-section.tsx`
- **Quality gates** – `pnpm format:check`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, and `pnpm build` all pass.

#### Deferred to Phase 6

- `Move components/user to components/personal` – deferred intentionally; will be done incrementally alongside Personal Dashboard route migration (Phase 6).

---

## Phase 4 — Services, Store, Providers, and Contracts

### Objective

Create one typed API/state foundation before migrating data-driven screens.

### Tasks

#### Services

- [ ] Move `redux/api/baseApi.ts` to `services/base-api.ts` and implement the real RTK Query base
      API.
- [ ] Centralize base URL, credentials, shared headers, refresh behavior, tag types, and normalized
      errors.
- [ ] Move resource API modules into capability-named kebab-case files, for example:
  - `auth-api.ts`
  - `wallets-api.ts`
  - `transactions-api.ts`
  - `categories-api.ts`
  - `budgets-api.ts`
  - `goals-api.ts`
  - `reports-api.ts`
  - `billing-api.ts`
  - `coupons-api.ts`
- [ ] Replace umbrella `familyApi.ts` with resource APIs such as family groups, members, and
      settlements.
- [ ] Replace umbrella `adminApi.ts` with resource APIs such as users, subscriptions, plans, audit
      logs, and settings.
- [ ] Merge recurring-transaction endpoints into the transaction capability unless the API
      contract justifies a separate resource module.
- [ ] Add server-only session/request helpers under `services/server` and mark them `server-only`.
- [ ] Remove the empty `lib/axios.ts` unless Axios is deliberately adopted and installed.

#### Store

- [ ] Move `redux/store.ts` to `store/store.ts` and configure one Redux store.
- [ ] Move/create typed hooks in `store/hooks.ts`.
- [ ] Register the single RTK Query base API reducer and middleware.
- [ ] Move valid cross-route UI slices to `store/slices` using kebab-case filenames.
- [ ] Review existing slices:
  - auth: keep only client-global session/UI state not owned by server auth or RTK Query;
  - filters: prefer URL state and remove duplicated filter state;
  - theme: keep one theme source rather than Redux plus context duplication.

#### Providers and contracts

- [ ] Implement or remove the Redux and toast provider placeholders.
- [ ] Compose only globally required providers and keep them as deep as practical.
- [ ] Define the normalized application error contract.
- [ ] Replace empty shared type files with real contracts when their first consumer migrates.
- [ ] Replace empty schemas/hooks/constants only when needed; otherwise delete them.
- [ ] Add tests for refresh concurrency, error normalization, cache tags, typed hooks, and critical
      selectors.

### Exit Gate

- [ ] There is one working base API and one Redux store.
- [ ] No component contains base URLs, token refresh, or raw transport configuration.
- [ ] Remote API data is not duplicated in ordinary slices.
- [ ] `family-api.ts`, `admin-api.ts`, empty provider/store/API placeholders, and unused Axios stubs
      are gone.
- [ ] API/store tests and all quality gates pass.

---

## Phase 5 — Public Application Areas

### Objective

Complete Public pages, Auth, Onboarding, UI catalog, and Maintenance using the new foundations.

### Execution Order

#### 5.1 Public pages

- [ ] Landing
- [ ] Features, integrations, customers, and pricing
- [ ] About, careers, and press
- [ ] Blog list and dynamic article routes
- [ ] FAQ, contact, help center, changelog, and status
- [ ] Terms, privacy, and security

For each route:

- [ ] Keep the route thin and move reusable screen UI to `components/public`.
- [ ] Add/verify typed metadata.
- [ ] Use Server Components unless a narrow interaction needs a client boundary.
- [ ] Replace repeated UI with `app-ui` or shared components.
- [ ] Verify internal links, responsive behavior, themes, and accessibility.

#### 5.2 Authentication

- [ ] Login and registration
- [ ] Forgot/reset password
- [ ] Email verification
- [ ] 2FA setup, challenge, and recovery
- [ ] Callback and error routes
- [ ] Implement real auth schemas, auth API endpoints, pending/error states, and safe redirects.
- [ ] Keep credentials/session handling server/backend controlled.

#### 5.3 Onboarding

- [ ] Move onboarding UI into `components/onboarding`.
- [ ] Keep `/onboarding` publicly reachable.
- [ ] Authenticate/authorize any account-specific reads or mutations independently.
- [ ] Preserve progress safely and handle restart/recovery states.

#### 5.4 UI catalog and Maintenance

- [ ] Complete the `/ui` catalog work begun in Phase 3.
- [ ] Keep `/maintenance` minimal, responsive, accessible, and independent of the marketing shell.
- [ ] Keep maintenance activation logic outside the page component.

### Exit Gate

- [ ] All Public-context routes use the correct nested shell.
- [ ] Auth flows have validated inputs and complete pending/error/success behavior.
- [ ] Onboarding remains publicly reachable while protected actions remain secure.
- [ ] Public critical-flow and accessibility tests pass.
- [ ] All quality gates pass.

---

## Phase 6 — Personal Dashboard

### Objective

Migrate every Personal Dashboard workflow and eliminate the legacy `components/user` grouping.

### Route Order

Migrate in this dependency-aware order:

1. [ ] Dashboard overview
2. [ ] Wallet list and wallet detail
3. [ ] Transactions and recurring transactions
4. [ ] Categories
5. [ ] Budgets
6. [ ] Goals
7. [ ] Reports and analytics
8. [ ] Notifications and help
9. [ ] Settings: profile, preferences, notifications, privacy, security, and backup codes
10. [ ] Billing settings and checkout success/cancel
11. [ ] Family join/invite entry points that originate from Personal Dashboard

### Per-Route Checklist

Apply this checklist to every route above:

- [ ] Record current behavior and route contract.
- [ ] Move/rename its UI from `components/user` to `components/personal`.
- [ ] Keep its `page.tsx` thin and server-first.
- [ ] Replace raw/repeated primitives with `app-ui` where appropriate.
- [ ] Connect the capability API and remove duplicate local/mock server state.
- [ ] Implement/verify types and Zod schemas.
- [ ] Move shareable filters, tabs, sorting, and pagination into URL state.
- [ ] Implement loading, empty, error, permission, and success states.
- [ ] Verify money, currency, date, timezone, and sign conventions.
- [ ] Add unit/component/integration coverage appropriate to the workflow.
- [ ] Remove the replaced legacy file immediately after consumers migrate.

### Special Cleanup

- [ ] Move `wallet-data.ts` out of the component layer; replace it with real service data or an
      explicitly scoped test/demo fixture.
- [ ] Split oversized `finance-pages`, `finance-dialog`, reports, help center, and settings modules
      by screen responsibility without introducing empty abstraction folders.
- [ ] Lazy-load CSV import, advanced report panels, charts, and large rarely opened dialogs.
- [ ] Consolidate duplicated financial display/table/card patterns through `app-ui` or `shared`.

### Exit Gate

- [ ] Every Personal route uses `PersonalDashboardShell`.
- [ ] `components/user` no longer exists.
- [ ] Personal pages use real service/store ownership or clearly isolated fixtures.
- [ ] Personal critical-flow tests and all quality gates pass.

---

## Phase 7 — Family Dashboard

### Objective

Migrate Family Dashboard as an independent context while reusing shared financial UI safely.

### Route Order

1. [ ] Family entry/dashboard
2. [ ] Members, invitations, roles, and permissions
3. [ ] Family wallets
4. [ ] Family transactions
5. [ ] Family budgets
6. [ ] Balances
7. [ ] Settlements
8. [ ] Family reports
9. [ ] Family settings

### Tasks

- [ ] Use `FamilyDashboardShell` and Family-specific navigation/breadcrumbs.
- [ ] Make the active family/group context explicit and typed.
- [ ] Enforce membership and role permissions at the server/backend boundary for every read and
      mutation.
- [ ] Use capability APIs for family groups, members, settlements, and scoped finance resources.
- [ ] Do not recreate Personal wallet/transaction/budget primitives solely because the route is
      under Family Dashboard.
- [ ] Keep Family-specific orchestration in `components/family` and shared presentation in
      `app-ui`/`shared`.
- [ ] Split oversized Family overview/wallet modules by screen responsibility.
- [ ] Test owner/admin/member/viewer behavior as defined by the backend contract.
- [ ] Test settlement signs, totals, rounding, currency scope, and date boundaries.

### Exit Gate

- [ ] Every `/family/*` route uses `FamilyDashboardShell`.
- [ ] Family access is enforced beyond client-side navigation visibility.
- [ ] No umbrella `family-api.ts` or duplicated Personal UI implementation remains.
- [ ] Family critical-flow tests and all quality gates pass.

---

## Phase 8 — Admin Dashboard

### Objective

Migrate Admin Dashboard as an independently authorized operations context.

### Route Batches

#### 8.1 Shell, profile, and access

- [ ] Admin entry/dashboard
- [ ] Admin profile and profile security
- [ ] Admin team

#### 8.2 Users and support

- [ ] Users list and user detail
- [ ] Tickets list and ticket detail
- [ ] User impersonation with explicit audit/security controls

#### 8.3 Commercial management

- [ ] Subscriptions
- [ ] Plans
- [ ] Coupons
- [ ] Payment/payment-gateway settings

#### 8.4 Content management

- [ ] Blog
- [ ] FAQ
- [ ] Announcements
- [ ] Email templates
- [ ] Categories and legal content settings

#### 8.5 Operations and settings

- [ ] Audit logs and logs
- [ ] Reports
- [ ] System health
- [ ] General, localization, email/SMTP, storage, security, auth-provider, and OAuth settings

### Tasks

- [ ] Use `AdminDashboardShell` and Admin-specific navigation/breadcrumbs.
- [ ] Enforce Admin authorization in server-only checks and again at every backend mutation/data
      boundary.
- [ ] Replace `adminApi.ts` with resource APIs.
- [ ] Keep Admin screen UI in `components/admin`; reuse only domain-neutral `app-ui`/shared pieces.
- [ ] Replace or delete current placeholder Admin tables, modals, and actions when their route batch
      migrates.
- [ ] Split the oversized Admin settings panel into route-specific, testable screen components.
- [ ] Require confirmations and clear consequences for destructive or impersonation actions.
- [ ] Add audit-log expectations for sensitive actions.
- [ ] Paginate large users, tickets, subscriptions, and log datasets.

### Exit Gate

- [ ] Every `/admin/*` route uses `AdminDashboardShell`.
- [ ] Admin access does not depend solely on a layout, URL, or hidden client control.
- [ ] No umbrella `admin-api.ts` or route-shared monolithic settings panel remains.
- [ ] Admin critical-flow tests and all quality gates pass.

---

## Phase 9 — Cross-Cutting Hardening

### Objective

Audit the completed application for requirements that span every context.

### Security and privacy

- [ ] Audit every Server Action, Route Handler, service, export, upload, billing action, and mutation
      for validation and authorization.
- [ ] Confirm secure cookie/session behavior and remove sensitive browser persistence.
- [ ] Scan logs and error messages for tokens, personal data, and financial payloads.
- [ ] Confirm only intentionally public values use `NEXT_PUBLIC_*`.

### Accessibility and UX

- [ ] Complete keyboard-only navigation across all contexts.
- [ ] Verify focus visibility, dialog focus management, labels, table headers, and accessible names.
- [ ] Verify loading, empty, error, permission-denied, and success states for every data view.
- [ ] Verify WCAG 2.2 AA contrast in light and dark themes.
- [ ] Verify reduced-motion behavior.

### Performance

- [ ] Audit `'use client'` boundaries and remove directives that are no longer necessary.
- [ ] Verify route-level code splitting and confirm Public, Personal, Family, and Admin entry points
      do not pull unrelated context code into their client bundles.
- [ ] Confirm dashboard contexts do not import each other's route/screen entry points.
- [ ] Lazy-load ECharts, CSV importers, large dialogs, editors, and advanced report panels.
- [ ] Verify lazy fallbacks and error paths.
- [ ] Audit `next/image` sizes, fonts, link prefetching, Suspense/loading boundaries, and third-party
      scripts.
- [ ] Analyze the production bundle and investigate material route-bundle regressions.
- [ ] Paginate or virtualize large datasets.

### Financial correctness

- [ ] Audit money representation, currency association, rounding, and sign conventions.
- [ ] Audit transfer and settlement idempotency behavior.
- [ ] Audit report date inclusivity, timezone, and currency scope.
- [ ] Ensure authoritative financial calculations have deterministic unit tests.

### Exit Gate

- [ ] Security, accessibility, performance, and financial checklists pass across all contexts.
- [ ] No critical or high-severity issue remains open.
- [ ] Full end-to-end suite and all quality gates pass.

---

## Phase 10 — Cleanup, Release Validation, and Handoff

### Objective

Remove migration residue and prove the target structure is complete.

### Cleanup

- [ ] Remove obsolete directories after confirming no imports remain:
  - `components/user`
  - `components/layout`
  - `components/charts`
  - `redux`
- [ ] Remove empty placeholder modules, dead exports, temporary adapters, commented-out code, and
      debug logs.
- [ ] Remove duplicate mock data and obsolete fixtures.
- [ ] Remove unused dependencies and update the lockfile through pnpm only.
- [ ] Search for stale imports and naming that violate `CONVENTIONS.md`.
- [ ] Confirm there are no accidental route duplicates or abandoned route groups.

### Final validation

- [ ] Compare the final URL list with the Phase 0 ledger.
- [ ] Run the complete command suite from a clean install:

  ```bash
  pnpm install --frozen-lockfile
  pnpm format:check
  pnpm lint
  pnpm typecheck
  pnpm test
  pnpm build
  ```

- [ ] Run all critical end-to-end flows in production-build mode.
- [ ] Verify responsive behavior and light/dark themes for representative pages in every context.
- [ ] Review bundle output and production runtime errors.
- [ ] Update README/setup documentation and any changed API/environment contracts.
- [ ] Review `CONVENTIONS.md` against the final structure.
- [ ] Decide after the refactor whether a short `RULES.md` should be extracted; do not create it
      automatically.

### Final Exit Gate / Definition of Done

- [ ] The repository matches the target structure in `CONVENTIONS.md`.
- [ ] All existing intended URLs and critical behaviors are preserved.
- [ ] No legacy architecture or accidental placeholder remains.
- [ ] All quality gates and critical flows pass from a clean environment.
- [ ] The team has reviewed and accepted the refactored application.

---

## Standard Vertical-Slice Checklist

Use this checklist whenever a single route or workflow is migrated:

- [ ] Identify its current URL, shell, component tree, data source, state owner, and permissions.
- [ ] Record current behavior and add a regression test where practical.
- [ ] Move the route without changing its URL.
- [ ] Keep the route component thin and server-first.
- [ ] Move screen UI into the correct context component folder.
- [ ] Reuse `app-ui`; move only cross-context compositions into `shared`.
- [ ] Connect the capability-named service and choose one remote-data owner.
- [ ] Add/verify types, schemas, hooks, formatters, and providers only when required.
- [ ] Handle loading, empty, error, permission, and success states.
- [ ] Verify responsive UI, keyboard operation, light/dark themes, and reduced motion.
- [ ] Verify money, currency, dates, timezones, and authorization where relevant.
- [ ] Add targeted tests.
- [ ] Remove the replaced legacy code and temporary imports.
- [ ] Run format, lint, typecheck, targeted tests, and build as appropriate.
- [ ] Update this plan's phase checklist and progress log.

## Progress Log

Add one row when a phase or meaningful route batch changes status.

| Date       | Phase/batch | Status   | Verification                              | Notes/next action                                                              |
| ---------- | ----------- | -------- | ----------------------------------------- | ------------------------------------------------------------------------------ |
| 2026-08-06 | Phase 0     | Complete | Route ledger, baseline build/tsc records  | Baseline documented and safety validated.                                      |
| 2026-08-06 | Phase 1     | Complete | pnpm lint, format:check, typecheck, test  | Vitest + RTL setup, test helpers & CI flow                                     |
| 2026-08-06 | Phase 2     | Complete | pnpm lint, format:check, typecheck, build | Route groups (public), (personal), (family), (admin) & explicit shells created |
