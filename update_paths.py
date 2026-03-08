import os

def update_path_text(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace "QudahWay Method" with "QudahWay"
    new_content = content.replace("QudahWay Method", "QudahWay")
    
    if new_content != content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

# Subjects
subjects = ['ir', 'DS', 'cv']
counter = 0

for subdir in subjects:
    if not os.path.exists(subdir): continue
    for filename in os.listdir(subdir):
        if filename.endswith('.html'):
            if update_path_text(os.path.join(subdir, filename)):
                counter += 1

print(f"Updated {counter} HTML files.")
