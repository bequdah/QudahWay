import os

files = [f for f in os.listdir('.') if f.endswith('.html')]

for file in files:
    try:
        with open(file, 'r', encoding='utf-8') as f:
            content = f.read()
        
        if '<script src="nav.js"></script>' not in content and '</body>' in content:
            new_content = content.replace('</body>', '\n    <!-- Navigation Script -->\n    <script src="nav.js"></script>\n</body>')
            with open(file, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {file}")
        else:
            print(f"Skipped {file} (already updated or invalid)")
            
    except Exception as e:
        print(f"Error processing {file}: {e}")
