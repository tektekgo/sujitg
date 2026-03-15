## Typography for sujitg.com

This document describes the typography system used on `sujitg.com` so that other tools can generate assets with consistent type.

### Primary fonts

- **Body font**: `Inter`, with the stack  
  `Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`  
  - **Weights used**: 300, 400, 500, 600, 700, 800  
  - **Usage**: all paragraph text, metadata, navigation items, buttons, and most UI elements.

- **Display / heading font**: `Poppins`, with fallback  
  `"Poppins", "Inter", sans-serif`  
  - **Weights used**: 600, 700, 800  
  - **Usage**: page titles, section headings, hero headline, and key call‑outs.

Fonts are loaded via Google Fonts, as defined in `index.html`:

- **Inter**: `https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap`
- **Poppins**: `https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&display=swap`

### Hierarchy and usage

- **H1** (page titles / hero):  
  - Font: `Poppins`  
  - Weight: 700–800  
  - Style: large size, high contrast, often with accent color or gradient where emphasis is needed.

- **H2 / H3** (section headings):  
  - Font: `Poppins`  
  - Weight: 600–700  
  - Style: medium to large size, clear separation from body copy; typically uses the standard foreground color, not gradients.

- **Body text**:  
  - Font: `Inter`  
  - Weight: 400–500  
  - Style: comfortable line length, dark‑on‑dark‑background contrast using `--foreground` from the color system.

- **Labels, UI, and small text**:  
  - Font: `Inter`  
  - Weight: 500–600  
  - Style: slightly tighter line height, all‑caps only when necessary; avoid over‑using all caps to keep tone approachable.

### Special treatments

- **Gradient text**:  
  - Utility: `.text-gradient` (see `src/index.css`)  
  - Behavior: applies the `--gradient-primary` background and clips it to text.  
  - Usage: highlights key phrases in headings or hero content; use sparingly for important emphasis.

### Tone reflected in typography

- **Professional and enterprise‑grade**, but approachable — headings are bold and confident; body copy is clean and easy to scan.
- **Clarity over decoration** — avoid overly decorative fonts; stick to `Inter` and `Poppins` only.
- **Consistency across surfaces** — any new documents, decks, or visuals generated for this brand should use these same fonts and roles by default.

