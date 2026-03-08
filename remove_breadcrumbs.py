import os
import re

def remove_breadcrumb(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # Pattern for the breadcrumb div
    # Matches the div with the specific font/style and content starting with QudahWay
    # Handles multi-line tags and whitespace
    pattern = r'<div\s+style="font-family:\s*\'Inter\',\s*sans-serif;\s*font-weight:\s*600;\s*color:\s*var\(--text-muted\);\s*font-size:\s*0\.9rem;">\s*QudahWay[\s\S]*?</div>'
    
    new_content = re.sub(pattern, '', content)
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# Search and destroy
subjects = ['ir', 'DS', 'cv']
counter = 0

for root, dirs, files in os.walk('.'):
    # Only process subject folders and root
    dirname = os.path.basename(root)
    if dirname in subjects or root == '.':
        for filename in files:
            if filename.endswith('.html'):
                if remove_breadcrumb(os.path.join(root, filename)):
                    counter += 1

print(f"Removed breadcrumbs from {counter} files.")
