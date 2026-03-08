import os
import re

def update_html(filepath, depth):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Determine relative path to root
    rel_root = "../" * depth
    if rel_root == "": rel_root = "./"

    # 1. Add CSS link if missing
    css_link = f'<link rel="stylesheet" href="{rel_root}gooey.css">'
    if 'gooey.css' not in content:
        # Insert before </head>
        content = re.sub(r'(</head>)', f'    {css_link}\n\\1', content, flags=re.IGNORECASE)

    # 2. Add JS script if missing
    js_script = f'<script src="{rel_root}gooey.js"></script>'
    if 'gooey.js' not in content:
        # Insert before </body>
        content = re.sub(r'(</body>)', f'    {js_script}\n\\1', content, flags=re.IGNORECASE)

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

# Root index
update_html('index.html', 0)

# Subjects
for subdir in ['ir', 'DS', 'cv']:
    if not os.path.exists(subdir): continue
    for filename in os.listdir(subdir):
        if filename.endswith('.html'):
            update_html(os.path.join(subdir, filename), 1)

print("All HTML files updated with Gooey CSS and JS.")
