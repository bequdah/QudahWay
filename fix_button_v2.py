import os
import re

def fix_back_button_simple(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Targets the exact blue back button pattern from the files
    # Before replacement: color: var(--primary); background: rgba(56, 189, 248, 0.08); border: 1px solid rgba(56, 189, 248, 0.2); 
    
    # Yellow version colors
    y_color = 'var(--accent)'
    y_bg_8 = 'rgba(250, 204, 21, 0.08)'
    y_bg_15 = 'rgba(250, 204, 21, 0.15)'
    y_border = 'rgba(250, 204, 21, 0.2)'

    modified = False
    
    # Primary to Accent (Only for buttons containing "العودة")
    # Using a single regex to be very safe
    pattern = r'(<a href="[^"]*index\.html"[^>]*?العودة[\s\S]*?</a>)'
    
    def replace_colors(match):
        tag = match.group(1)
        tag = tag.replace('var(--primary)', y_color)
        tag = tag.replace('var(--accent)', y_color) # In case it was already accent
        tag = tag.replace('rgba(56, 189, 248, 0.08)', y_bg_8)
        tag = tag.replace('rgba(56, 189, 248, 0.15)', y_bg_15)
        tag = tag.replace('rgba(56, 189, 248, 0.2)', y_border)
        return tag

    new_content = re.sub(pattern, replace_colors, content)

    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# Subjects
subjects = ['ir', 'DS', 'cv']
counter = 0

for root, dirs, files in os.walk('.'):
    dirname = os.path.basename(root)
    if dirname in subjects or root == '.':
        for filename in files:
            if filename.endswith('.html'):
                if fix_back_button_simple(os.path.join(root, filename)):
                    counter += 1

print(f"Fixed specific back buttons in {counter} files.")
