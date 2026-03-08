# QudahWay System Architecture & Implementation Guide 🚀

This document serves as the **Master Blueprint** for the QudahWay project. It outlines the design system, technical structure, and workflow patterns to ensure consistency across all present and future educational modules.

---

## 1. Design Philosophy: The "QudahWay" Aesthetic ✨
The core of QudahWay is its **premium, modern, and high-impact design**. We aim to WOW the students from the first click.

### Core Visual Elements:
- **Dark Mode First:** Deep backgrounds (e.g., `#0f172a`, `#1e293b`).
- **Glassmorphism:** Use of `backdrop-filter: blur(x)` for cards and headers.
- **The "Glow" Effect:**
    - Cards must have localized box-shadows and border-taps in primary/accent colors.
    - Interactive elements (links/buttons) should transition smoothly to a glowing state on hover.
- **Vibrant UI Tokens:**
    - **Primary:** Sky Blue (`#38bdf8`) - Represents logic and stability.
    - **Accent:** Yellow/Gold (`#facc15`) - Represents highlights, tips, and the "Qudah" brand part.
    - **Success:** Emerald/Mint (`#34d399`) - For correct answers and stable progress.
    - **Danger:** Rose/Red (`#fb7185`) - For errors, warnings, and fairness issues.

### CSS Classes & Standards:
- All new files must link to `../gooey.css` for standardized glass/glow effects.
- Unified font hierarchy: `Cairo` for Arabic text, `Inter` for English/Technical text, and `Satisfy` for the brand logo.

---

## 2. Infrastructure & Workspace 📂
All work resides within the `QudahWay` repository.

### Directory Structure:
- `/` (Root): Main landing page and global assets (`index.html`, `gooey.css`, `nav.js`).
- `/DS/`: Data Science module (Quizzes, Lectures, Sub-index).
- `/ir/`: Information Retrieval module.
- `/ss/`: System Security/Security Software module.
- `/.agents/workflows/`: Automated task definitions.

### Workflow for New Modules:
1.  **Create Directory:** Always group related material (e.g., `/AI/` for Artificial Intelligence).
2.  **Sub-Index Creation:** Build an `index.html` inside the module folder that mirrors the "Grid Card" layout.
3.  **Topic Implementation:** Each topic/lecture gets its own descriptive HTML file (e.g., `Data_Preprocessing.html`).

---

## 3. Quiz & Interaction Logic 🧠
Quizzes are high-stakes interactive challenges.

### Rules for Quiz Construction:
- **Language:** Technical content (Questions, Options, Explanations) must be in **English**.
- **Randomization:** Use the `shuffleArray` function for both **Question Order** and **Option Order**.
- **Immediate Feedback:** 
    - Correct: Highlight Green.
    - Wrong: Highlight Red + Show immediate, detailed `explanation-box`.
- **Result Finality:** Show only the final percentage score (e.g., "Score: 85/100").

### Data Bank Structure:
Each quiz is powered by a JSON-style object called `quizBank` where each key represents a chapter (e.g., `ch1: [{...}, {...}]`).

---

## 4. Deployment & GitHub Protocol 🛠️
To respect project ownership, deployment is **Action-Based**.

### Steps for Uploading:
1.  **NO AUTO-PULL/PUSH:** Never upload without explicit user permission.
2.  **Git & Cloudflare Deployment:**
    ```bash
    # Step 1: Push to GitHub
    git add .
    git commit -m "Descriptive message using QudahWay tags"
    git push origin main

    # Step 2: Deploy to Cloudflare Pages
    npx wrangler pages deploy . --branch main --project-name qudahway
    ```
3.  **Final Check:** Ensure both GitHub is updated and the Cloudflare link (qudahway.pages.dev) is active.

---

## 5. Examples & Snippets 📝

### Example Hover Glow CSS:
```css
.link-card:hover {
    transform: translateY(-5px);
    border-color: var(--accent);
    box-shadow: 0 10px 40px -10px rgba(250, 204, 21, 0.3);
}
```

### Example Markdown Task Summary:
> [!IMPORTANT]
> When building a new chapter, ensure the `card-title` is in English and matches the filename exactly for navigation consistency.

---

**Mohammad Qudah | QudahWay Architecture © 2026**
