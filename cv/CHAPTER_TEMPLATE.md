# QudahWay CV Chapter Template Guide 📘

This guide documents the standard HTML structure and CSS styling for QudahWay Computer Vision chapters. Use this template when creating new chapter files to ensure consistency.

## 0. The QudahWay Teaching Style (Essence) 🧠
Before you write a single line of code, remember the philosophy:
- **Jordanian Soul:** Use the friendly Jordanian dialect (`هاض`, `هاي`, `ركز معي خالي`) to break the ice and make the material accessible.
- **The Hook (Storytelling):** Every chapter must start with a story. Why does this matter? How did it start? Connect the history to the tech.
- **Visual Hierarchy:**
    - `highlight-y` (Yellow): Core concepts, "Aha!" moments, and critical facts.
    - `highlight-b` (Blue): Technical details, secondary emphasis, or list labels.
    - `eng-term` (Badge): Mandatory for all English terms to ensure they look professional and stand out.
- **Relatability:** Always link theory to real-world examples (Smartphones, Self-driving cars, Forensics, etc.).
- **Conciseness:** Explain the "Why" behind the "How" without being wordy.

## 0.1 Workflow: Creating a New Chapter 🚀
To ensure every new chapter is fully integrated into the QudahWay ecosystem, follow these exact steps:

1.  **Create File:** Create a new `.html` file in the `cv/` directory (e.g., `convolution.html`) and paste the template structure from this guide.
2.  **Add to Dashboard:** Open `cv/index.html` and add a new `<a class="link-card">` entry in the `links-grid` section. Use the correct number and icon.
3.  **Update Navigation:** Open `nav.js`. Find the `isCV` section and add a new `<a>` link with the appropriate number and emoji. **CRITICAL:** This ensures the "Course Map" button works everywhere.
4.  **Verify Links:** Open the new file in a browser and test both the "Back" button and the "Course Map" toggle to ensure everything is connected.
5.  **Write Content:** Start with the "Story Section", then build the "Slide Sections" one by one.



## 1. Basic HTML Structure & Head
Every chapter file must start with this structure. It includes the required fonts (Cairo, Inter, Satisfy) and the core CSS variables.

```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>QudahWay | [Chapter Title]</title>
    <!-- Fonts -->
    <link
        href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&family=Inter:wght@400;600;800&family=Satisfy&display=swap"
        rel="stylesheet">
    <style>
        :root {
            --bg-dark: #0f172a;
            --card-dark: #1e293b;
            --text-light: #f1f5f9;
            --text-muted: #94a3b8;
            --primary: #38bdf8;       /* Light Blue */
            --accent: #facc15;        /* Yellow */
            --success: #34d399;       /* Green */
            --danger: #fb7185;        /* Red */
            --border: rgba(255, 255, 255, 0.05);
        }

        body {
            background-color: var(--bg-dark);
            color: var(--text-light);
            font-family: 'Cairo', sans-serif;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            min-height: 100vh;
        }

        .container {
            max-width: 1000px;
            width: 100%;
            padding: 40px 20px;
        }

        /* ... Copy the rest of the CSS from cv-introduction.html here ... */
        /* Key classes to include: */
        /* .header, .story-section, .slide-section, .explanation-box, .highlight-*, .eng-term */
    </style>
</head>

<body>
    <div class="container">
        <!-- Content goes here -->
    </div>
    <script src="../nav.js"></script>
</body>
</html>
```

## 2. Header Section
The top section with the breadcrumb/back link and the main title.

```html
<div class="header">
    <!-- Back to Dashboard Link -->
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; border-bottom: 1px solid var(--border); padding-bottom: 15px;">
        <a href="index.html"
            style="text-decoration: none; color: var(--primary); font-weight: 700; display: flex; align-items: center; gap: 8px; background: rgba(56, 189, 248, 0.08); padding: 8px 20px; border-radius: 15px; border: 1px solid rgba(56, 189, 248, 0.2); transition: all 0.3s;"
            onmouseover="this.style.background='rgba(56, 189, 248, 0.15)'; this.style.transform='translateY(-2px)'"
            onmouseout="this.style.background='rgba(56, 189, 248, 0.08)'; this.style.transform='translateY(0)'">
            🏠 العودة للوحة التحكم
        </a>
        <div style="font-family: 'Inter', sans-serif; font-weight: 600; color: var(--text-muted); font-size: 0.9rem;">
            QudahWay / CV / [Chapter Name]
        </div>
    </div>
    
    <!-- Main Title -->
    <h1><span style="color: var(--primary);">Qudah</span><span style="color: var(--accent);">Way</span> CV</h1>
    <p class="subtitle">[English Title] | [Arabic Title]</p>
</div>
```

## 3. Story Section
A distinct section for the introductory story or hook.

```html
<div class="story-section">
    <div class="story-title">🎬 القصة: [Story Title]</div>
    <div class="story-content">
        [Story text goes here...]
        <br><br>
        استخدم <span class="highlight-y">الهايلايت الأصفر</span> للتركيز.
    </div>
</div>
```

## 4. Slide Section (The Core Component)
This is the standard block for every slide.

```html
<!-- Slide X -->
<div class="slide-section">
    <!-- Title Bar -->
    <div class="slide-title-bar">
        <span style="font-weight: 700;">[Slide English Title]</span>
        <span class="slide-number">Slide [XX]</span>
    </div>
    
    <!-- Image -->
    <div class="slide-image-box">
        <img src="[Path to Image]" alt="[Alt Text]">
    </div>
    
    <!-- Explanation -->
    <div class="explanation-box">
        <div class="explanation-header">[Arabic Header / Hook]</div>
        <div class="explanation-content">
            [Main explanation text...]
            <br><br>
            
            <!-- List Example -->
            <ul>
                <li><span class="highlight-b">[Term]:</span> Description...</li>
                <li><span class="highlight-y">[Term]:</span> Description...</li>
            </ul>

            <!-- English Term Badge -->
            مصطلح مهم: <span class="eng-term">Computer Vision</span>.
        </div>
    </div>
</div>
```

## 5. Utility Classes (Styling Guide)

Use these classes inside the text to highlight important information:

| Class | Appearance | Usage |
| :--- | :--- | :--- |
| `highlight-y` | **Yellow Text** | For key concepts, emphasis, or "aha!" moments. |
| `highlight-b` | **Blue Text** | For secondary emphasis, technical terms, or list items. |
| `highlight-r` | **Red Text** | For warnings, errors, or "Not True" statements. |
| `highlight-g` | **Green Text** | For success, correct answers, or positive examples. |
| `eng-term` | `Blue Badge` | **CRITICAL:** Use for ALL English terms (e.g., `<span class="eng-term">Edge Detection</span>`). Ensures correct LTR direction and font. |
| `detail-item` | Boxed Section | Use inside `explanation-content` for sub-sections or detailed points. |

## 6. Footer
Standard footer at the end of the `body`.

```html
<script src="../nav.js"></script>
```
