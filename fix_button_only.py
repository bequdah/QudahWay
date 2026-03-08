import os
import re

def fix_specific_button(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Targets ONLY the "العودة" button that is currently BLUE/PRIMARY
    # We use a very specific regex to avoid touching other elements
    
    # Check if this button exists in its blue state
    if 'العودة' in content and 'rgba(56, 189, 248, 0.08)' in content:
        # Replace primary colors with accent ONLY in the context of the back button
        new_content = content
        
        # Replace in the style attribute
        new_content = re.sub(
            r'(<a href="[^"]*"[^>]*style="[^"]*?)color:\s*var\(--primary\)([^"]*?العودة[^"]*?</a>)',
            r'\1color: var(--accent)\2',
            new_content
        )
        new_content = re.sub(
            r'(<a href="[^"]*"[^>]*style="[^"]*?)background:\s*rgba\(56, 189, 248, 0\.08\)([^"]*?العودة[^"]*?</a>)',
            r'\1background: rgba(250, 204, 21, 0.08)\2',
            new_content
        )
        new_content = re.sub(
            r'(<a href="[^"]*"[^>]*style="[^"]*?)border:\s*1px\s*solid\s*rgba\(56, 189, 248, 0\.2\)([^"]*?العودة[^"]*?</a>)',
            r'\1border: 1px solid rgba(250, 204, 21, 0.2)\2',
            new_content
        )
        
        # Replace in event listeners (onmouseover/onmouseout)
        new_content = re.sub(
            r'(onmouseover="[^"]*?)rgba\(56, 189, 248, 0\.15\)([^"]*?العودة[^"]*?</a>)',
            r"\1rgba(250, 204, 21, 0.15)\2",
            new_content
        )
        new_content = re.sub(
            r'(onmouseout="[^"]*?)rgba\(56, 189, 248, 0\.08\)([^"]*?العودة[^"]*?</a>)',
            r"\1rgba(250, 204, 21, 0.08)\2",
            new_content
        )

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
                if fix_specific_button(os.path.join(root, filename)):
                    counter += 1

print(f"Fixed specific back buttons in {counter} files.")
