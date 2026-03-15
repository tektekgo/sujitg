## Brand Guide – sujitg.com

This guide summarizes the core brand system for `sujitg.com` so AI tools can generate on‑brand documents, visuals, and content. It is aligned with the current production site and the design tokens defined in `src/index.css` and `tailwind.config.ts`.

---

### 1. Logos

- **Primary logo**: use the main `sujitg` logo the user will provide as the default mark on all materials.
- **Placement**:
  - Top‑left on web and slide layouts.
  - Clear space around the logo equal to at least the height of the “S” in the logotype.
- **Backgrounds**:
  - Prefer the **dark background** color (`background` from `Colors.json`) for primary usage.
  - On very light backgrounds, use a dark or full‑color logo variant with sufficient contrast.

When in doubt, keep the logo small to medium in size and let typography and content take the lead.

---

### 2. Color System

Canonical color tokens are defined in `docs/brand-assets/Colors.json`. These correspond to CSS custom properties in `src/index.css` and Tailwind theme extensions in `tailwind.config.ts`.

At a high level:

- **Background**: deep navy (\( --background \))  
  - Primary canvas for the site and most visuals.  
  - Use solid dark backgrounds or subtle gradients based on `gradient.hero` / `gradient.subtle`.

- **Foreground**: near‑white (\( --foreground \))  
  - Default text color for body copy and headings.

- **Primary**: saturated blue (\( --primary \), `primary` in `Colors.json`)  
  - Used for key accents: buttons, links, keylines, icons.  
  - Keep primary usage focused: calls to action, highlights, important UI.

- **Secondary & Muted**: darker navy and slate tones (\( --secondary \), \( --muted \))  
  - Used for cards, panels, navigation backgrounds, and less prominent UI states.

- **Accent**: bright blue highlight (\( --accent \))  
  - Used for emphasis, subtle glow effects, and gradient accents.  
  - Use sparingly to avoid visual noise.

- **Destructive / Danger**: red tone (\( --destructive \))  
  - Used for error states, destructive actions, and strong negative signals.

- **Semantic colors (success, warning, danger)**:  
  - Defined in `Colors.json` under `semantic`.  
  - These complement, but do not override, the core primary palette.

For any new surfaces or components, derive colors from the tokens in `Colors.json` instead of hard‑coding new hex values.

---

### 3. Typography

Typography is defined in `docs/brand-assets/typography.md` and implemented in `src/index.css` and `index.html`.

- **Body font**: `Inter` (300–800 weights)  
- **Heading font**: `Poppins` (600–800 weights)
- **Headings**: bold, confident, generally left‑aligned, using `Poppins`.  
- **Body**: readable, slightly compact, using `Inter`.

Use hierarchy to guide the reader:

- H1 for page titles or major section titles.
- H2/H3 for key subsections.
- Inter body text for explanations, lists, and supporting details.

Avoid adding new font families. All AI‑generated documents for this brand should assume Inter/Poppins as the default pair.

---

### 4. Layout & Spacing

Layout and spacing are derived from the design system tokens and Tailwind configuration:

- **Container width**:  
  - Max width around **1400px** on large screens (`container.screens.2xl`).  
  - Centered with horizontal padding of **2rem**.

- **Border radius**:  
  - Base radius token: `--radius: 0.5rem`.  
  - Derived radii for components:  
    - `lg`: `var(--radius)`  
    - `md`: `calc(var(--radius) - 2px)`  
    - `sm`: `calc(var(--radius) - 4px)`  
  - Overall look: slightly rounded corners — modern but not overly “pill‑shaped”.

- **Shadows and depth** (from `Colors.json` under `shadows`):  
  - Use `shadow.card` for cards and panels.  
  - Use `shadow.glow` and `shadow.primary` for emphasis states and hero elements.

When composing documents or slides:

- Prefer generous white space (or “navy space”) around key content blocks.
- Keep content in a column that feels similar to the web layout (not overly wide lines of text).

---

### 5. Interaction & Motion

The site uses subtle motion to convey polish:

- Keyframe animations like `fade-in`, `slide-in`, and `scale-in` are defined in `tailwind.config.ts`.
- Motion is generally:
  - **Subtle** (short durations, ease‑out).
  - **Supporting**, not distracting.

For AI‑generated prototypes or motion descriptions, favor:

- Short, easing transitions (200–600ms).
- Simple movements (fade, slight slide, slight scale).

---

### 6. Tone of Voice

The brand voice is tailored for an **enterprise technology executive** with deep experience in digital transformation and AI:

- **Professional, confident, and clear** — write with executive‑level clarity, not jargon‑heavy tech speak.
- **Insight‑driven** — focus on outcomes, value, and strategic perspective rather than low‑level implementation details.
- **Approachable, not stiff** — the tone should feel human, thoughtful, and practical.
- **Future‑oriented** — emphasize innovation, AI, cloud, and automation in a grounded way.

When generating content (articles, bios, case studies, decks):

- Use first or third person consistently, depending on the format.  
- Avoid hype; back up claims with experience, data, or specific examples.  
- Prefer short, strong sentences over long, complex ones.

---

### 7. How AI Tools Should Use These Assets

When using this repository as input:

- **Logos**: use the primary logo (user‑provided asset) as the main mark; respect clear space and background guidance.
- **Colors**: read from `docs/brand-assets/Colors.json` and prefer those tokens over ad‑hoc colors.
- **Typography**: read from `docs/brand-assets/typography.md` and assume Inter/Poppins for any text renderings.
- **Screenshots**: when provided, treat them as visual reference for composition, spacing, and interaction patterns, not as sources of new colors or fonts.

The goal is that anything generated — documents, slides, images, or UI mocks — should look and feel like a natural extension of `sujitg.com`.

