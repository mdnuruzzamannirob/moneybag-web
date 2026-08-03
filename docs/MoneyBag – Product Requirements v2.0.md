# MoneyBag – Product Requirements v2.0

| Field       | Value                            |
| ----------- | -------------------------------- |
| Document ID | PRD-MB-002                       |
| Version     | 2.0                              |
| Status      | Ready for product-owner approval |
| Date        | 2026-08-03                       |
| Product     | MoneyBag Web Application         |

---

## 1. Purpose

This document defines what MoneyBag must provide as a product. It covers the target users,
subscription plans, user-facing capabilities, business rules, release scope, and product-level
quality expectations.

This document does not define frontend architecture, database schema, API endpoints, or backend
implementation. Those details belong to the Frontend Functional Specification, Frontend–Backend
Requirements Mapping, Backend Specification, and OpenAPI contract.

Requirement IDs identify testable Core Release behavior and must be preserved by downstream
specifications. Planned and possible future capabilities are intentionally not binding until they
are promoted into a later approved requirements version.

The previous Product & Architecture Overview v1.0 remains historical reference material. Once this
v2 document is approved, it takes precedence wherever the two documents conflict on product scope.

## 2. Product Summary

MoneyBag is a web-based personal and family finance management product. It helps individuals record
income and expenses, manage wallets, plan budgets, track savings goals, understand financial
reports, and collaborate on shared family finances.

MoneyBag also provides an administration dashboard for operating the product, managing users and
subscriptions, reviewing sensitive activity, and configuring essential platform behavior.

The initial product is a responsive web application. Progressive Web App capabilities are planned
for a later release and are not required for the Core Release.

## 3. Product Goals

- Give users one clear place to understand their current financial position.
- Make recording and reviewing daily income and expenses quick and reliable.
- Help users plan spending through budgets and savings goals.
- Support both personal and shared family finance without mixing ownership or permissions.
- Make shared expenses, balances, and settlements understandable to every family member.
- Offer a useful free plan and clear upgrade paths to Pro and Family.
- Give administrators enough control to operate subscriptions, users, plans, and critical settings.
- Protect sensitive identity and financial data throughout every workflow.
- Provide a consistent, accessible experience across mobile, tablet, and desktop web browsers.

## 4. Non-Goals for the Core Release

The following are not required for the initial web release:

- Progressive Web App installation, offline operation, or background synchronization
- Native mobile or desktop applications
- Bank account synchronization
- Automatic currency conversion or live exchange rates
- AI categorization or financial advice
- Investment portfolio performance tracking
- Cryptocurrency wallet integration
- Public developer API or third-party automation platform
- Instant multi-user collaborative updates
- Multiple Family groups under one Family subscription
- Enterprise tenancy, white-labeling, or single sign-on
- Lifetime or one-time-purchase subscription plans

## 5. Users, Roles, and Access Contexts

### 5.1 Platform Roles

| Role          | Description                                                                  |
| ------------- | ---------------------------------------------------------------------------- |
| Guest         | A person who is not signed in and may access public and authentication pages |
| User          | A registered person who manages personal finances according to their plan    |
| Administrator | An authorized operator who may access the Admin Dashboard                    |

- **ROLE-001 Plan separation:** Free, Pro, and Family are plans, not platform roles.

### 5.2 Family Roles

Family roles apply only inside a Family group:

| Role   | Product-level access                                                               |
| ------ | ---------------------------------------------------------------------------------- |
| Owner  | Manages the group, subscription, members, roles, settings, and destructive actions |
| Editor | May create and update permitted shared finance records and record settlements      |
| Viewer | May view permitted Family information but cannot change shared financial records   |

- **ROLE-002 Family ownership:** a Family Owner must have an active Family plan.
- **ROLE-003 Member entitlement:** an invited Family member does not need an individual paid plan to
  participate in the group.
- **ROLE-004 Context separation:** platform and Family roles remain separate. An Administrator is
  not automatically a member of every Family group.

## 6. Subscription Plans and Entitlements

- **PLAN-001 Public plans:** MoneyBag has exactly three public plans: Free, Pro, and Family. There is
  no Lifetime or Unlimited plan.

### 6.1 Pricing

| Plan   | Monthly billing | Yearly billing | Purpose                                      |
| ------ | --------------- | -------------- | -------------------------------------------- |
| Free   | $0              | Not applicable | Essential personal finance                   |
| Pro    | $4.99/month     | $49.99/year    | Complete personal finance                    |
| Family | $7.99/month     | $79.99/year    | Complete personal finance plus Family access |

- **PLAN-002 Launch pricing:** the table above defines the launch prices in United States dollars
  (USD).
- **PLAN-003 Cadence parity:** monthly and yearly subscriptions provide the same entitlements for
  their respective plan.
- **PLAN-004 Yearly saving:** yearly Pro and Family billing represents an approximately 17% saving
  over paying the monthly price for twelve months.
- **PLAN-005 Future prices:** an authorized price change applies only to new purchases or future
  renewals after the user receives advance notice. It must not rewrite completed charges.

### 6.2 Plan Comparison

| Capability                        | Free  | Pro            | Family         |
| --------------------------------- | ----- | -------------- | -------------- |
| Active personal wallets           | 1     | Unlimited      | Unlimited      |
| Transactions per calendar month   | 50    | Unlimited      | Unlimited      |
| Active budgets                    | 2     | Unlimited      | Unlimited      |
| Active savings goals              | 1     | Unlimited      | Unlimited      |
| Recurring transactions            | No    | Yes            | Yes            |
| CSV transaction import            | No    | Yes            | Yes            |
| Personal reports                  | Basic | Full + exports | Full + exports |
| Priority email support            | No    | Yes            | Yes            |
| Family group                      | No    | No             | 1              |
| Total people in the Family group  | No    | No             | Up to 5        |
| Shared Family wallets             | No    | No             | Yes            |
| Expense splitting and settlements | No    | No             | Yes            |
| Pooled Family budgets             | No    | No             | Yes            |
| Family reports and exports        | No    | No             | Yes            |

- **PLAN-006 Family inheritance:** Family includes every Pro entitlement plus the Family
  capabilities listed above.
- **PLAN-007 Family capacity:** “up to five people” means five total registered people, including
  the Owner. This is the launch capacity rule.
- **PLAN-008 Priority support:** Pro and Family email requests are triaged ahead of Free requests
  during published support hours. Priority support is not real-time support and does not guarantee
  a response time unless one is published separately.
- **PLAN-009 Active limits:** wallet, budget, and savings-goal limits count active records. Archived
  or completed records remain readable and may be reactivated only when the current plan limit
  permits it.

### 6.3 Trial

- **TRIAL-001 Eligibility:** one trial is available per verified email address. Deleting and
  recreating an account with that address does not restore trial eligibility.
- **TRIAL-002 Start:** the 14 consecutive-day trial begins when the account is first activated by
  email verification or a successful trusted social registration.
- **TRIAL-003 No card:** a payment card is not required to start the trial.
- **TRIAL-004 Entitlement:** the trial unlocks Pro capabilities, not Family capabilities.
- **TRIAL-005 No automatic charge:** a trial does not silently create a paid subscription.
- **TRIAL-006 Conversion:** selecting Pro or Family during the trial ends the trial when the paid
  subscription is successfully activated; paid access begins immediately.
- **TRIAL-007 Expiration:** when the trial ends without a paid subscription, the account moves to
  Free.
- **TRIAL-008 Reminder:** the user receives a trial-ending reminder at least 24 hours before
  expiration.

### 6.4 Upgrade, Downgrade, and Cancellation

- **BILL-001 Billing currency:** subscriptions are charged in USD. Any applicable tax and final
  total must be disclosed before confirmation.
- **BILL-002 Upgrade:** Free users may upgrade to Pro or Family, and Pro users may upgrade to Family.
  A successful upgrade becomes active immediately.
- **BILL-003 Proration:** when a paid subscription changes immediately, any prorated credit or
  charge calculated by the payment provider must be shown before confirmation.
- **BILL-004 Downgrade:** a downgrade to a lower plan or shorter entitlement takes effect at the end
  of the current paid billing period.
- **BILL-005 Lower-plan limits:** a downgrade preserves personal data. Existing records remain
  readable, while creation is blocked when the lower plan's active limit has already been exceeded.
- **BILL-006 Cancellation:** cancellation keeps paid access until the end of the current paid
  billing period and prevents the next renewal.
- **BILL-007 Failed payment:** a failed renewal enters a seven-day grace period with clear notices
  and retry opportunities. If payment remains unresolved, the account moves to Free and Family
  activity is frozen under the Family retention rules.
- **BILL-008 Refund:** refunds are not automatic. An authorized Administrator may issue an eligible
  full or partial refund to the original payment method, and the resulting access change must be
  shown before confirmation.
- **BILL-009 Coupon:** one eligible coupon may be applied to a purchase. Expiry, plan, cadence,
  redemption, and discount limits must be enforced, and a coupon cannot produce a negative charge.
- **BILL-010 Informed consent:** the effective date, amount, cadence, renewal behavior, and important
  access consequences must be shown before any paid-plan change is confirmed.

## 7. Public Web Experience

### 7.1 Core Release

The public application must provide:

- **PUB-001 Landing:** product value, primary capabilities, pricing entry points, and clear signup
  calls to action.
- **PUB-002 Features:** an understandable overview of Personal, Pro, and Family capabilities.
- **PUB-003 Pricing:** Free, Pro, and Family pricing, monthly/yearly switching, comparison, trial
  information, and subscription FAQs.
- **PUB-004 About:** product purpose and company/project story.
- **PUB-005 FAQ:** answers to common product, account, subscription, and Family questions.
- **PUB-006 Contact:** a way to submit a general or support-related message.
- **PUB-007 Legal:** Terms of Service and Privacy Policy.
- **PUB-008 Security:** a public explanation of the product's security posture and user controls.
- **PUB-009 Maintenance:** a publicly reachable maintenance experience that explains temporary
  unavailability without exposing internal details and provides a safe retry path.

### 7.2 Planned Public Pages

The following pages are planned but do not block the Core Release:

- Customer stories
- Careers
- Press resources
- Integration directory
- Blog and article pages
- Public Help Center
- Public status page
- Changelog

### 7.3 Publicly Reachable Project UI

- The existing `/ui` surface may remain publicly reachable as a project component showcase. It is
  not an end-user MoneyBag capability, does not contain real user or Admin data, and does not block
  the Core Release.
- **PUB-010 Public route safety:** publicly reachable authentication, onboarding, maintenance, and
  UI showcase surfaces must never grant Personal, Family, or Admin access without authorization.

## 8. Authentication and Account Security

### 8.1 Registration and Sign-In

- **AUTH-001 Registration:** a Guest may create an account with name, email, and password.
- **AUTH-002 Email verification:** MoneyBag must verify ownership of the registered email address.
- **AUTH-003 Password login:** a registered user may sign in with email and password.
- **AUTH-004 Social login:** a user may sign in with Google or GitHub.
- **AUTH-005 Logout:** a user may end the current authenticated session.
- **AUTH-006 Session continuity:** an eligible signed-in session may be renewed without repeatedly
  asking for credentials.
- **AUTH-007 Safe failure:** authentication failures use clear messages without exposing sensitive
  account details.

### 8.2 Password Recovery

- **AUTH-008 Forgot password:** a user may request a password-reset message.
- **AUTH-009 Reset password:** a valid single-use recovery flow allows the user to set a new
  password.
- **AUTH-010 Recovery failure:** expired, reused, or invalid recovery attempts fail safely and offer
  a clear restart action.

### 8.3 Two-Factor Authentication

- **AUTH-011 2FA setup:** a signed-in user may configure app-based two-factor authentication.
- **AUTH-012 2FA challenge:** an enabled account must complete a valid second-factor challenge
  during sign-in.
- **AUTH-013 Recovery codes:** setup generates one-time recovery codes that the user can store
  safely.
- **AUTH-014 Recovery sign-in:** a valid unused recovery code may replace the normal second factor.
- **AUTH-015 2FA management:** users may regenerate recovery codes and disable 2FA only after
  confirming their password or another approved strong verification method.

### 8.4 Account Security Controls

- **AUTH-016 Password change:** users may change their password after confirming the current password
  or another approved strong verification method.
- **AUTH-017 Security settings:** users may view and manage their own security settings.
- **AUTH-018 Recent verification:** password, 2FA, email, account deletion, billing ownership, and
  similarly sensitive changes require recent verification.
- **AUTH-019 Expired session:** users receive safe feedback for expired sessions and may resume the
  original flow after signing in when the action remains valid.

## 9. Onboarding

- **ONB-001 Availability:** `/onboarding` is publicly reachable.
- **ONB-002 Guest path:** a Guest may view onboarding entry content and must be directed to register
  or sign in before saving account-specific progress.
- **ONB-003 Profile setup:** a signed-in user may confirm their name, preferred currency, locale, and
  theme.
- **ONB-004 First wallet:** onboarding guides the user through creating or identifying a first
  personal wallet.
- **ONB-005 Goal selection:** the user may select the workflows they want to begin with, such as
  transactions, budgets, goals, or Family.
- **ONB-006 Completion:** a user may complete or skip optional onboarding steps and continue to the
  appropriate dashboard.
- **ONB-007 Recovery:** interrupted onboarding may resume without duplicating saved records.

## 10. Personal Dashboard

### 10.1 Dashboard Overview

- **PERSONAL-001 Summary:** show current balances, period income, period expenses, and net savings.
- **PERSONAL-002 Trends:** show useful income/expense and spending-category visualizations.
- **PERSONAL-003 Recent activity:** show recent transactions with clear type, amount, wallet,
  category, and date.
- **PERSONAL-004 Planning status:** show relevant budget and savings-goal progress.
- **PERSONAL-005 Quick actions:** provide clear paths to add transactions and access common
  workflows.

### 10.2 Wallets

- **WALLET-001 List:** users may view all personal wallets and their balances.
- **WALLET-002 Create:** users may create a wallet within their plan limit.
- **WALLET-003 Manage:** users may update wallet name, type, icon, color, currency, and default
  status. When at least one active personal wallet exists, exactly one is the default.
- **WALLET-004 Detail:** users may view wallet-specific totals and activity.
- **WALLET-005 Transfer:** users may transfer an amount between two active personal wallets they
  own.
- **WALLET-006 Archive/delete:** a wallet may be archived while retaining its history. It may be
  permanently deleted only when its balance is zero and no transaction, transfer, budget, or other
  financial record still references it.
- **WALLET-007 Opening balance:** wallet creation records a currency and an opening balance from
  which later activity is calculated.
- **WALLET-008 Transfer currency:** the Core Release permits transfers only between wallets using the
  same currency. A transfer is displayed as one user action backed by linked source and destination
  activity.
- **WALLET-009 Types:** supported wallet types include Bank, Cash, Mobile Banking, Card, and
  Investment Account. The Core Release tracks an Investment Account balance but does not provide
  portfolio analytics.
- **WALLET-010 Currency change:** a wallet's currency may change only while its opening balance is
  zero and no financial record references it.

### 10.3 Categories

- **CATEGORY-001 Defaults:** new users receive useful default income and expense categories.
- **CATEGORY-002 Manage:** users may create and update personal categories with name, type, icon,
  and color.
- **CATEGORY-003 Delete:** a category cannot be deleted in a way that invalidates referenced
  financial records; a referenced category must instead be archived or its records explicitly
  reassigned.
- **CATEGORY-004 Type safety:** a referenced category cannot change between income and expense in a
  way that reinterprets historical transactions.

### 10.4 Transactions

- **TXN-001 Create:** users may record income and expense transactions.
- **TXN-002 Fields:** a transaction includes description, wallet, category, amount, type, date, and
  optional note and tags.
- **TXN-003 Manage:** users may view, update, and delete their own personal transactions.
- **TXN-004 Balance integrity:** creating, updating, deleting, or transferring transactions must
  preserve correct wallet balances.
- **TXN-005 Discovery:** users may search, filter, sort, and paginate transactions.
- **TXN-006 Filters:** supported filters include wallet, type, category, date range, tags, and text
  search across the transaction description and note.
- **TXN-007 Recurring:** Pro and Family users may create and manage daily, weekly, or monthly
  recurring transactions.
- **TXN-008 Import:** Pro and Family users may import a validated CSV file into a chosen wallet.
- **TXN-009 Import safety:** an invalid import must provide actionable row-level feedback and must
  not leave partially applied financial results.
- **TXN-010 Free limit:** Free users may hold up to 50 personal transaction records dated within a
  calendar month, using the user's configured timezone.
- **TXN-011 Limit counting:** income, expense, generated recurring records, and successfully imported
  rows count individually. A transfer counts as one user-visible transaction. Updates do not add to
  the count, and deleting a record removes it from that month's count.
- **TXN-012 Family separation:** shared Family transactions use the Family entitlement and do not
  consume an invited member's personal Free transaction allowance.

### 10.5 Budgets

- **BUDGET-001 Manage:** users may create, view, update, and delete budgets within plan limits.
- **BUDGET-002 Scope:** a budget may be overall or linked to an expense category.
- **BUDGET-003 Period:** budgets support monthly and yearly periods.
- **BUDGET-004 Progress:** users may see limit, spent amount, remaining amount, and percentage.
- **BUDGET-005 Alerts:** users may choose an alert threshold and receive a warning when spending
  crosses it.
- **BUDGET-006 Rollover:** users may carry an unspent amount into the immediately following period
  of the same budget. Rollover changes planning capacity only and does not create wallet funds.
- **BUDGET-007 Free limit:** Free users may have up to two active budgets.
- **BUDGET-008 Spending calculation:** eligible expense transactions consume a budget according to
  transaction date, category, and currency. Income and transfers do not consume a budget; an
  eligible refund or reversal reduces the related spending total.
- **BUDGET-009 Currency:** each budget applies to one currency and never combines spending from
  wallets using other currencies.

### 10.6 Savings Goals

- **GOAL-001 Manage:** users may create, view, update, and delete savings goals within plan limits.
- **GOAL-002 Fields:** a goal includes title, currency, target amount, optional deadline, and
  progress.
- **GOAL-003 Contribution:** users may add dated contributions with an optional note.
- **GOAL-004 Withdrawal:** users may withdraw no more than the current saved amount.
- **GOAL-005 Completion:** progress is clearly shown and may reach a completed state.
- **GOAL-006 Free limit:** Free users may have one active savings goal.
- **GOAL-007 Wallet independence:** Core Release goal contributions and withdrawals track declared
  progress only; they do not change a wallet balance or create a financial transaction.

### 10.7 Reports and Analytics

- **REPORT-001 Monthly:** show total income, expense, and net result for a month.
- **REPORT-002 Yearly:** show yearly totals and period comparisons.
- **REPORT-003 Categories:** show expense breakdown by category.
- **REPORT-004 Trend:** show income and expense trends over a chosen supported period.
- **REPORT-005 Basic access:** Free users receive current-month income, expense, net result, and
  category breakdown without file export.
- **REPORT-006 Full access:** Pro and Family users additionally receive yearly and supported custom
  periods, period comparisons, trends, and PDF/CSV exports.
- **REPORT-007 Accuracy:** every report clearly identifies its date range, timezone, and currency
  scope.

### 10.8 Notifications, Settings, and Privacy

- **PREF-001 Notification inbox:** users may view their own in-app notifications.
- **PREF-002 Profile and display:** users may manage profile name, avatar, preferred currency, locale,
  and theme.
- **PREF-003 Notification preferences:** users may manage supported email and in-app notification
  preferences except required security, billing, and legal messages.
- **PREF-004 Security access:** users may change their password and manage their own 2FA and recovery
  codes.
- **PRIV-001 Data export:** users may request an export of eligible personal data in a portable
  format.
- **PRIV-002 Account deletion:** users may request permanent account deletion after a clear warning
  and recent verification.
- **PRIV-003 Family owner deletion:** a Family Owner must transfer ownership through the approved
  flow or delete the Family group before deleting the account.
- **PRIV-004 Historical integrity:** deleting or removing a non-owner account must not corrupt shared
  financial history. Required historical attribution may remain as a non-identifying “Former
  member” record while unrelated personal account data is deleted.

### 10.9 Billing

- **BILL-011 Billing overview:** users may view the current plan, billing cadence,
  trial/subscription status, renewal date, and scheduled cancellation or downgrade.
- **BILL-012 Plan selection:** users may compare and select Free, Pro, or Family.
- **BILL-013 Billing records:** paid users may access available billing history and invoices.
- **BILL-014 Checkout result:** checkout success and cancellation flows clearly communicate the
  resulting subscription state and provide an appropriate next action.

## 11. Family Dashboard

Family capabilities require an active Family plan for the Owner.

### 11.1 Family Group

- **FAMILY-001 Create:** a Family subscriber may create one Family group.
- **FAMILY-002 Capacity:** a group supports up to five people including the Owner.
- **FAMILY-003 Manage:** the Owner may update the group name and supported settings.
- **FAMILY-004 Delete:** the Owner may delete the group only after explicit confirmation.
- **FAMILY-005 Downgrade:** a lapsed or downgraded Family plan disables new group activity while
  preserving the group's read-only data for 90 days after paid access ends.
- **FAMILY-006 Retention:** during the 90-day retention period, the Owner may export shared data or
  reactivate the Family plan. MoneyBag must warn the Owner before scheduled deletion at the end of
  the period. Personal records outside the Family group are unaffected.

### 11.2 Members and Invitations

- **FAMILY-007 Invite:** the Owner may invite a registered or unregistered email address until the
  group limit is reached, provided that person is not already active in another Family group.
- **FAMILY-008 Join:** an invitee may accept a valid invitation through the account registration or
  sign-in flow associated with the invited email address. A user may belong to only one active
  Family group at a time.
- **FAMILY-009 Roles:** the Owner may assign Viewer or Editor roles.
- **FAMILY-010 Remove:** the Owner may remove a non-owner member.
- **FAMILY-011 Leave:** a non-owner member may leave the group voluntarily.
- **FAMILY-012 Ownership:** the Owner cannot leave without transferring ownership or deleting the
  group. Ownership may transfer only to an existing Editor who accepts the transfer and activates a
  Family subscription as part of the flow. The previous Owner then becomes an Editor and may leave;
  their Family renewal is cancelled, and any provider-calculated credit or charge is disclosed
  before confirmation.

### 11.3 Shared Wallets and Transactions

- **FAMILY-013 Shared wallet management:** the Owner may create and manage shared wallets.
- **FAMILY-014 Shared wallet access:** active members may view shared wallet balances.
- **FAMILY-015 Editor actions:** Editors may create and update shared transactions; the Owner has the
  same financial editing capability.
- **FAMILY-016 Viewer restriction:** Viewers may not mutate shared financial records.
- **FAMILY-017 Attribution:** shared transactions record their creator, payer, transaction currency,
  and allocation among members.
- **FAMILY-018 Split methods:** supported split methods are Equal, Percentage, and Exact.
- **FAMILY-019 Split integrity:** allocations must equal the transaction amount in the smallest unit
  of its currency. Any equal-split rounding remainder is distributed deterministically and shown
  before confirmation.

### 11.4 Balances and Settlements

- **FAMILY-020 Net balances:** MoneyBag calculates understandable net balances showing who owes whom.
- **FAMILY-021 Balance visibility:** active members may view balances for their Family group.
- **FAMILY-022 Settlement:** the Owner and Editors may record a settlement between active members.
- **FAMILY-023 Settlement limit:** a settlement cannot exceed the applicable outstanding balance.
- **FAMILY-024 Settlement history:** settlement history remains traceable and must not silently
  rewrite previous expenses.

### 11.5 Family Budgets and Reports

- **FAMILY-025 Pooled budgets:** the Owner may create and manage pooled Family budgets.
- **FAMILY-026 Family budget calculation:** eligible shared transactions contribute to applicable
  budget consumption under the same financial rules as personal budgets.
- **FAMILY-027 Family budget alerts:** budget alerts notify the Owner and any member who opted into
  that optional alert category.
- **FAMILY-028 Family overview:** the Family dashboard shows combined shared-wallet income, expenses,
  categories, budgets, balances, and recent activity without including members' private Personal
  records.
- **FAMILY-029 Family reports:** reports include shared totals, category analysis, and member
  contribution summaries.
- **FAMILY-030 Family exports:** the Owner may export supported Family reports and shared data.

### 11.6 Family Settings

- **FAMILY-031 Owner settings:** the Owner may manage group identity, membership, roles, and
  destructive settings.
- **FAMILY-032 Member settings:** non-owners may view permitted group information and manage only
  their own allowed membership actions.
- **FAMILY-033 Authorization:** every Family read and action must respect current membership and role.

## 12. Admin Dashboard

The Admin Dashboard is restricted to authorized Administrators. Client-side visibility alone is not
sufficient authorization.

### 12.1 Core Release

#### Dashboard

- **ADMIN-001 Summary:** show total users, active trials, paid subscriptions, recurring revenue,
  churn indicators, and current plan distribution when the required data exists.
- **ADMIN-002 Recent activity:** show recent registrations and successful subscription activity.
- **ADMIN-003 Navigation:** provide clear links to essential operational workflows.

#### User Management

- **ADMIN-004 User discovery:** search, filter, sort, and paginate users.
- **ADMIN-005 User detail:** view an authorized user profile including account status, plan, and
  relevant operational activity while excluding unnecessary financial detail.
- **ADMIN-006 Account status:** activate or deactivate an account with confirmation, reason, and
  audit history.
- **ADMIN-007 Manual plan:** manually assign an eligible time-bounded plan entitlement with reason,
  confirmation, and audit history. This does not create an undisclosed payment charge.

#### Subscription, Plan, and Coupon Management

- **ADMIN-008 Subscription discovery:** search, filter, and review subscriptions.
- **ADMIN-009 Subscription actions:** perform supported cancellation, reactivation, and refund
  actions with confirmation, reason, and audit history.
- **ADMIN-010 Plan management:** manage launch plan price availability and entitlement limits without
  creating a fourth public plan.
- **ADMIN-011 Plan restriction:** the system must not allow creation of a Lifetime/Unlimited or other
  public plan type outside Free, Pro, and Family.
- **ADMIN-012 Coupon management:** create, update, deactivate, and review percentage or fixed-amount
  coupons.

#### Family Oversight

- **ADMIN-013 Family discovery:** search and review Family groups, Owners, members, and status.
- **ADMIN-014 Family privacy:** review only operationally necessary group metadata without
  automatically becoming a member or reading private financial records.
- **ADMIN-015 Family intervention:** deactivate or delete a group only through an explicitly
  authorized, confirmed, reasoned, and audited action.

#### Audit and Essential Settings

- **ADMIN-016 Audit:** maintain tamper-evident records of sensitive Admin actions and important
  security events.
- **ADMIN-017 General settings:** provide the minimum General settings required to operate the Core
  Release.
- **ADMIN-018 Own account:** Administrators may manage their own profile and security settings.

### 12.2 Planned Admin Capabilities

The following remain part of the intended product but do not block the Core Release:

- Support ticket management
- Secure, time-limited user impersonation
- Announcement management
- Blog management
- FAQ management
- Email template management
- Detailed application logs
- Advanced platform reports
- System health monitoring
- Authentication-provider configuration
- OAuth configuration
- SMTP/email infrastructure configuration
- Storage-provider configuration
- Localization management
- Legal-content management
- Multiple payment-gateway management
- More granular Admin roles and permissions
- Global default-category management
- Administrator team management

## 13. Notifications and Automation

### 13.1 Core Release

MoneyBag must support:

- **NOTIFY-001 Account messages:** welcome, email-verification, and password-reset messages.
- **NOTIFY-002 Security messages:** 2FA and important account-security notifications.
- **NOTIFY-003 Budget alerts:** enabled budget-threshold alerts.
- **NOTIFY-004 Recurring generation:** scheduled recurring transaction generation with visible
  success or failure status.
- **NOTIFY-005 Trial messages:** trial-ending reminders.
- **NOTIFY-006 Family messages:** invitations and important membership, ownership, retention, and
  group-deletion notifications.
- **NOTIFY-007 Subscription messages:** important trial, payment, renewal, grace-period,
  cancellation, and plan-state notifications.
- **NOTIFY-008 Preferences:** users may control optional notification categories through their
  preferences.
- **NOTIFY-009 Required delivery:** required security, billing, and legal messages cannot be
  disabled.
- **NOTIFY-010 Failure isolation:** a failed notification must not corrupt or roll back an otherwise
  valid financial record unless the workflow explicitly requires successful delivery.

### 13.2 Planned

- Scheduled financial report emails
- Advanced bill and payment reminders
- Real-time Family activity notifications
- In-app announcement banners

## 14. Financial Data Requirements

- **FIN-001 Precision:** authoritative monetary calculations preserve exact currency-unit precision.
- **FIN-002 Currency:** every monetary value has an explicit or unambiguous currency, and every
  wallet has one currency.
- **FIN-003 No conversion:** the Core Release does not automatically convert currencies.
- **FIN-004 Multi-currency totals:** totals do not combine different currencies into one misleading
  amount; results are grouped or clearly separated by currency.
- **FIN-005 Sign consistency:** income, expense, transfer, contribution, withdrawal, and settlement
  directions remain consistent across records, balances, and reports.
- **FIN-006 Timezone:** the user timezone governs personal calendar-month limits and reporting
  boundaries; Family reports use the Owner's configured timezone and display it.
- **FIN-007 Confirmation:** destructive financial actions require confirmation and leave balances
  consistent.
- **FIN-008 Duplicate prevention:** repeated submissions must not accidentally create duplicate
  transfers, imports, settlements, subscription charges, or other sensitive mutations.

## 15. Security, Privacy, and Trust

- **SEC-001 Personal access:** Personal data requires the authenticated owner or a specifically
  authorized operational action.
- **SEC-002 Family access:** Family data requires active membership and the appropriate Family role.
- **SEC-003 Admin access:** Admin data and actions require explicit Administrator authorization.
- **SEC-004 Trusted enforcement:** authentication and authorization are enforced at trusted product
  boundaries, not only through visible interface controls.
- **SEC-005 Secret protection:** sessions, passwords, 2FA secrets, recovery codes, and payment
  details are protected and never exposed unnecessarily.
- **SEC-006 Sensitive actions:** sensitive actions are validated, recently verified, confirmed when
  appropriate, and auditable.
- **SEC-007 Data minimization:** MoneyBag minimizes collection and exposure of personal data.
- **SEC-008 Privacy controls:** users may request an export and deletion of eligible personal data.
- **SEC-009 Safe errors:** public error messages do not expose private account state or internal
  security details.
- **SEC-010 Upload safety:** uploaded data is validated before it affects user or financial records.
- **SEC-011 Payment data:** payment-card data is handled by the approved payment provider and is not
  stored directly by MoneyBag.

## 16. Accessibility and Web Experience

- **UX-001 Responsive web:** the Core Release supports modern mobile, tablet, and desktop web
  browsers.
- **UX-002 Keyboard:** Core workflows are usable with a keyboard.
- **UX-003 Forms and focus:** controls and forms have clear names, labels, instructions, errors, and
  focus behavior.
- **UX-004 Non-color meaning:** status is not communicated through color alone.
- **UX-005 Theme:** light, dark, and system theme preferences are supported.
- **UX-006 Product states:** data-driven experiences provide meaningful loading, empty, error,
  permission-denied, and success states.
- **UX-007 Narrow screens:** long tables and complex financial views remain usable on narrow screens.
- **UX-008 Motion:** non-essential animation respects reduced-motion preferences.
- **UX-009 Accessibility target:** the product targets WCAG 2.2 AA behavior and contrast.

## 17. Performance and Reliability Expectations

- **PERF-001 Navigation feedback:** public and dashboard navigation provides timely feedback,
  including under slower network conditions.
- **PERF-002 Progressive content:** critical content and navigation become usable before optional
  heavy charts or advanced panels.
- **PERF-003 Failure isolation:** a failed optional chart, notification, or secondary integration
  does not prevent access to core financial records.
- **PERF-004 Submission state:** mutations prevent accidental duplicate submission and clearly
  communicate the final state.
- **PERF-005 Scalable lists:** lists that may grow substantially support pagination or another
  scalable browsing method.
- **PERF-006 Maintenance communication:** incidents and maintenance states are communicated clearly
  through the public maintenance experience.
- **PERF-007 Operational targets:** measurable backup, recovery, observability, and uptime targets
  are defined in the Backend and Operations specifications before production launch.

## 18. Core Release Scope

The Core Release is the first monetizable web release in which every advertised Free, Pro, and
Family entitlement works end to end. It intentionally excludes content-heavy public pages and
advanced operations that do not block the finance product. It includes:

- Responsive web application
- Landing, Features, Pricing, About, FAQ, Contact, Legal, Security, and Maintenance public
  experiences
- Email/password, Google, GitHub, email verification, password recovery, and 2FA flows
- Public onboarding entry with authenticated account setup
- Free, Pro, and Family subscriptions with monthly/yearly paid billing
- Personal wallets, categories, transactions, recurring transactions, CSV import, budgets, goals,
  reports, analytics, notifications, settings, privacy controls, and billing
- Family group, member roles, shared wallets, shared transactions, split expenses, balances,
  settlements, budgets, reports, and settings
- Essential Admin dashboard, users, subscriptions, plans, coupons, Family oversight, audit logs,
  general settings, and Admin profile/security
- Core notification and automation workflows

## 19. Planned and Future Scope

### 19.1 Planned After Core Release

- Customer, careers, press, and integration public pages
- Blog, public Help Center, public status page, and changelog
- Advanced Admin capabilities listed in section 12.2
- Scheduled reports and advanced reminders
- In-app announcements
- Progressive Web App capabilities

### 19.2 Longer-Term Possibilities

- Receipt capture and storage
- Rule-based transaction automation
- AI-assisted categorization
- Automatic currency conversion
- Loan and debt tracking
- Investment portfolio analytics
- Bank synchronization
- Real-time Family collaboration
- Family shared goals or wishlists
- Public shareable reports
- Native mobile applications
- Public API and external automation integrations
- Enterprise and white-label capabilities

These possibilities are not commitments until promoted into an approved Product Requirements
version.

## 20. Product-Level Completion Criteria

A Core Release capability is product-complete when:

- Its intended users and permissions are defined.
- Its primary and alternative workflows behave as specified.
- Its required inputs, validation, and consequences are clear.
- Loading, empty, error, permission-denied, and success states are covered where relevant.
- Financial amounts, currency, dates, timezones, and destructive actions are unambiguous.
- Required responsive and accessibility behavior is satisfied.
- Security-sensitive behavior is enforced by trusted boundaries.
- The corresponding Frontend Functional Specification and backend mapping are approved.
- Acceptance tests demonstrate the requirement from the user's perspective.
- Every testable Core requirement is linked by its stable ID through the Frontend Functional
  Specification, Frontend–Backend Requirements Mapping, and relevant acceptance tests.

## 21. Decisions Established in v2.0

- MoneyBag launches as a web application; PWA is planned for later.
- The public plans are Free, Pro, and Family.
- Pro and Family support monthly and yearly billing.
- There is no Lifetime or Unlimited plan.
- Family is separate from Pro and is required for shared Family capabilities.
- The 14-day no-card trial grants Pro, not Family.
- The trial starts once when a new account is activated and never creates an automatic charge.
- Family groups support up to five people including the Owner.
- A user may belong to only one active Family group at a time.
- Family data becomes read-only for 90 days after paid Family access ends, then is scheduled for
  deletion after warning unless reactivated.
- Personal, Family, and Admin are separate product contexts.
- Subscription billing uses USD; wallet data may use multiple explicitly separated currencies.
- Personal Free usage is limited by transaction records dated in the user's calendar month.
- Savings-goal progress does not change wallet balances in the Core Release.
- `/maintenance` is a public product experience; `/ui` is a publicly reachable project showcase,
  not an end-user product capability.
- Advanced incomplete Admin capabilities remain planned rather than blocking the Core Release.

---

**End of Product Requirements v2.0**
