---
name: StudentPay Design System
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#3c4a42'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#6c7a71'
  outline-variant: '#bbcabf'
  surface-tint: '#006c49'
  primary: '#006c49'
  on-primary: '#ffffff'
  primary-container: '#10b981'
  on-primary-container: '#00422b'
  inverse-primary: '#4edea3'
  secondary: '#52625c'
  on-secondary: '#ffffff'
  secondary-container: '#d3e3dc'
  on-secondary-container: '#566660'
  tertiary: '#494bd6'
  on-tertiary: '#ffffff'
  tertiary-container: '#9699ff'
  on-tertiary-container: '#1d17b2'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6ffbbe'
  primary-fixed-dim: '#4edea3'
  on-primary-fixed: '#002113'
  on-primary-fixed-variant: '#005236'
  secondary-fixed: '#d5e6df'
  secondary-fixed-dim: '#bacac3'
  on-secondary-fixed: '#101e1a'
  on-secondary-fixed-variant: '#3b4a44'
  tertiary-fixed: '#e1e0ff'
  tertiary-fixed-dim: '#c0c1ff'
  on-tertiary-fixed: '#07006c'
  on-tertiary-fixed-variant: '#2f2ebe'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-sm:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: -0.005em
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
    letterSpacing: 0.005em
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
  numeric-hero:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.03em
  numeric-keypad:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '500'
    lineHeight: 32px
    letterSpacing: 0em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.25rem
  margin: 1rem
  margin-sm: 0.75rem
  margin-lg: 1.5rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system is tailored for university students managing shared living expenses, recurring utility bills, and daily social spending. The aesthetic fuses high-end modern fintech precision with the friendly, accessible modularity of student-first tools. It eliminates financial anxiety by presenting balances, settlements, and budgets through structured clarity, calm tactile surfaces, and encouraging micro-interactions.

The visual direction merges modern minimalist fintech with tactile bento-box modularity:
- **Calm, High-Trust Foundation:** Clean crisp white surfaces set against a barely-there cool slate backdrop (#F8FAFC) provide clarity and breathing room.
- **Vibrant Optimism:** Emerald green (#10B981) anchors monetary progress, settlement confirmation, and positive cash flow, paired with refreshing mint washes.
- **Expressive Categorization:** Semantic accents (Amber, Indigo, Caramel, Violet, Rose, Cyan) afford instantaneous cognitive parsing across complex expense splits.
- **Approachable Sophistication:** Curvature is generous (`rounded-2xl` to `rounded-3xl`), typography is dense yet legible with tabular figures, and elevation relies on emerald-diffused ambient light rather than oppressive borders.

## Colors

The palette balances clinical financial readability with expressive youth-oriented utility. 

### Core Palette
- **Primary Emerald (`#10B981`):** The signature brand color. Represents successful transactions, "You are owed" states, positive balance charts, and primary conversion triggers.
- **Soft Mint Accent (`#ECFDF5` / `#D1FAE5`):** High-delight, low-fatigue surface fills for positive badges, selected states, and balance backdrops.
- **Text & High Contrast Slate (`#0F172A` / `#1E293B`):** Deep charcoal slate engineered for maximum legibility of numeric balances and primary headlines.
- **Muted Slate (`#64748B`):** Secondary metadata, inactive states, timestamp labels, and form placeholders.
- **Structural Neutral Outlines (`#F1F5F9` / `#E2E8F0`):** Crisp, featherweight hairpins defining bento-card edges without visually cluttering dense layouts.
- **Canvas Base (`#F8FAFC`) & Card Layer (`#FFFFFF`):** A subtle two-tiered background architecture that separates the overall view from dynamic interactive cards.

### Category Semantic Palette
- **Food & Dining:** Amber (`#F59E0B`) with soft amber tint (`#FEF3C7`)
- **Rent & Housing:** Indigo (`#6366F1`) with soft indigo tint (`#EEF2FF`)
- **Coffee & Study Cafes:** Warm Caramel (`#D97706`) with soft caramel tint (`#FEF3C7`)
- **Entertainment & Social:** Violet (`#8B5CF6`) with soft violet tint (`#F5F3FF`)
- **Shopping & Groceries:** Rose (`#F43F5E`) with soft rose tint (`#FFE4E6`)
- **Transit & Travel:** Cyan (`#06B6D4`) with soft cyan tint (`#CFFAFE`)

All category colors must always be paired with their respective 10–12% low-saturation tint backgrounds when applied to icons, badge tags, and bento graph pills.

## Typography

The type hierarchy is powered exclusively by **Inter** to ensure utmost utilitarian precision and structural density. 

### Tabular Figures & Numeric Handling
Financial clarity demands zero layout jitter when balances change or animate:
- Enable OpenType tabular numbers (`tnum`) across all monetary representations, bill split allocations, account ledgers, and keypad inputs.
- Combine font-weight 700 with letter-spacing `-0.03em` for big hero figures (`$1,248.50`), ensuring amounts read as unified, punchy visual marks.
- Secondary decimal places (`.50`) may drop to 80% opacity or a step down in font size to guide immediate focus to the integer amount.

### Case & Weight Strategy
- **Titles & Balances:** Bold (`700`) to Extra-Bold (`800`) weights with tight negative letter-spacing for high-impact presence.
- **Labels & Status Pills:** Small, uppercase or capitalized Medium-to-SemiBold text (`label-sm`, `label-md`) with expanded tracking (`+0.02em` to `+0.04em`) to maintain sharp legibility at micro scales.

## Layout & Spacing

The layout is built for fluid mobile-first ergonomic navigation, accommodating thumb zones, single-handed settlement workflows, and glanceable dashboard bento modules.

### Grid & Composition
- **Mobile Base (360px – 430px):** 4-column fluid layout with an outer canvas `margin` of `1rem` (16px) and interior card gutters of `0.75rem` (12px).
- **Tablet / Large Mobile Foldables (600px+):** 8-column layout with `margin-lg` of `1.5rem` (24px) and `gutter` of `1rem` (16px).
- **Bento Grid Rhythms:** Cards use fluid column spans (e.g., full-width balance banner, 2-column split metrics for "You Owe" vs. "You are Owed", followed by a full-width transaction feed).

### Spacing Tokens Application
- `space-xs` (4px): Micro-gaps between status tag icons and labels, avatar cluster overlap offsets.
- `space-sm` (8px): Spacing inside interactive pill elements, gap between user avatar and name in split rows.
- `space-md` (16px): Internal padding for modular bento tiles, default gap between input fields and contextual helper strings.
- `space-lg` (24px): Padding inside primary hero cards and separation between distinct dashboard sections.
- `space-xl` (32px): Safe separation for bottom floating action elements above mobile navigation bars.

## Elevation & Depth

Visual hierarchy uses a crisp layered-substrate model: dynamic, pure white bento cards sit gently above the `#F8FAFC` base surface, anchored by colored ambient radiance rather than heavy gray drop-shadows.

### Layer Hierarchy
- **Base Canvas (`Level 0`):** Solid `#F8FAFC`. Houses static labels, persistent section titles, and tab navigation track.
- **Card Containers (`Level 1`):** Solid `#FFFFFF` bordered with an ultra-thin hairline outline: `1px solid #F1F5F9`. Shadow is soft and warm: `0 4px 20px -2px rgba(15, 23, 42, 0.04)`.
- **Interactive Elevated Modules (`Level 2`):** Primary action cards, active split selectors, and popover tooltips: `0 12px 28px -6px rgba(15, 23, 42, 0.08)`.
- **Primary Floating Actions & Hero Callouts (`Brand Glow`):** Key positive-action buttons and primary summary triggers employ an emerald tinted blur:
  `box-shadow: 0 10px 30px -10px rgba(16, 185, 129, 0.35)`.
- **Modal Sheets & Overlays (`Level 3`):** Bottom-sheet split drawers utilize a backdrop blur (`backdrop-filter: blur(12px)`) with `rgba(15, 23, 42, 0.35)` scrim and upward throw: `0 -10px 40px rgba(15, 23, 42, 0.12)`.

## Shapes

The geometric identity relies on friendly, hyper-smooth corners that feel tactile and responsive under touch.

### Corner Radius Mapping
- **Pills (`rounded-full`):** Category tags, segmented control thumbs, status indicators, counter badges, and the main Floating Action Button (FAB).
- **Cards & Bento Units (`rounded-2xl` / 16px to `rounded-3xl` / 24px):** All financial modular cards, settlement summary panels, and receipt upload modules.
- **Inputs & Interactive Tiles (`rounded-xl` / 12px to `rounded-2xl` / 16px):** Form fields, custom numpad buttons, and payment split member selectors.
- **Avatar Profiles:** Pure geometric circles (`rounded-full`) with optional 2px white isolation rings for overlapping cluster arrangements.

## Components

### Buttons
- **Primary Action (Split Now / Pay):** Filled `#10B981`, text `#FFFFFF`, font `label-lg`, radius `rounded-full` or `rounded-2xl`. Height `52px` for comfortable thumb tap targets. Shadow: `0 10px 25px -8px rgba(16, 185, 129, 0.4)`. Active state drops scale to `0.98` with darkened background `#059669`.
- **Secondary (Add Note / Remind):** Filled with soft mint `#ECFDF5`, text `#065F46`, no shadow, subtle border `1px solid #D1FAE5`.
- **Ghost / Neutral:** Transparent background, text `#64748B`, hover/press state `#F1F5F9`.

### Chips & Pill Badges
- **Status Tags:** Capsule shapes with `padding: 4px 10px`. 
  - *Settled:* `#ECFDF5` background, `#059669` text, 6px filled emerald dot indicator.
  - *Pending:* `#FFFBEB` background, `#D97706` text, 6px amber dot indicator.
  - *Overdue / Unpaid:* `#FFF1F2` background, `#E11D48` text.
- **Category Badges:** Low-saturation accent tint paired with vibrant category icons (e.g., Food badge: `#FEF3C7` background with `#D97706` text and vector icon).

### Bento-Box Cards
- Modular containers encased in `#FFFFFF` with `16px` or `20px` internal padding, `rounded-3xl`, and `1px solid #F1F5F9`.
- Dynamic headers: title in `headline-sm`, trailing action or pill tag, followed by large tabular amount and roommate split progress indicators.

### Lists & Transaction Rows
- Clean row layout with `space-md` vertical padding. Left: 44px circular category icon or friend avatar. Center: Payee/Title (`label-lg`) stacked above timestamp and group tag (`body-sm`, `#64748B`). Right: amount in tabular figures (`label-lg`, `#0F172A` if expense, `#10B981` if positive return), with subtitle split breakdown (e.g., "you paid $42.00").

### Student Roommate Avatars & Split Clusters
- 36px–40px circles with initials or high-res student photos.
- When stacked in a group split summary, avatars overlap by `-8px` using a `2px solid #FFFFFF` border ring.
- Percentage allocation badge or amount badge pinned to the avatar bottom-right corner.

### Keypad & Numpad Inputs
- Dedicated custom numeric input grid for quick bill additions. Large `numeric-keypad` typography centered inside borderless tactile touch targets.
- Haptic-ready feedback with active state background `#F1F5F9` and zero lag. Includes built-in split fraction shortcuts (`÷ 2`, `÷ 3`, `÷ 4`) on top utility toolbar.

### Segmented Controls
- Fully rounded track in `#F1F5F9` with `4px` interior gutter.
- Sliding white active pill thumb (`#FFFFFF`) with elevation `0 2px 8px rgba(15, 23, 42, 0.08)`. Label transitions between `#64748B` and `#0F172A` with `font-weight: 600`.