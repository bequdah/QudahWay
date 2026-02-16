import os

# Root directories to scan
dirs = ['ir', 'cv']

for d in dirs:
    path = os.path.join('.', d)
    if not os.path.exists(path):
        continue
    
    files = [f for f in os.listdir(path) if f.endswith('.html')]
    for file in files:
        file_path = os.path.join(path, file)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Update Nav Script Path
            if '<script src="nav.js"></script>' in content:
                content = content.replace('<script src="nav.js"></script>', '<script src="../nav.js"></script>')
            
            with open(file_path, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated script path in {file_path}")
            
        except Exception as e:
            print(f"Error in {file_path}: {e}")
