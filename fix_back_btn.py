import os
import re

def fix_buttons(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern to find the entire <a> tag containing "العودة"
    # Matches <a ... > ... العودة ... </a>
    pattern = r'<a[^>]*href="[^"]*index\.html"[^>]*>[\s\S]*?العودة[\s\S]*?</a>'

    def replacer(match):
        text = match.group(0)
        # We only want to replace the specific blue styling with yellow styling
        text = text.replace('var(--primary)', 'var(--accent)')
        text = text.replace('rgba(56, 189, 248, 0.08)', 'rgba(250, 204, 21, 0.08)')
        text = text.replace('rgba(56, 189, 248, 0.2)', 'rgba(250, 204, 21, 0.2)')
        text = text.replace('rgba(56, 189, 248, 0.15)', 'rgba(250, 204, 21, 0.15)')
        return text

    new_content = re.sub(pattern, replacer, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

subjects = ['ir', 'DS', 'cv']
counter = 0

for root, dirs, files in os.walk('.'):
    dirname = os.path.basename(root)
    if dirname in subjects or root == '.':
        for filename in files:
            if filename.endswith('.html'):
                if fix_buttons(os.path.join(root, filename)):
                    counter += 1

print(f"Fixed back buttons in {counter} files.")
