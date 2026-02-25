import os

def update_favicons():
    root_dir = r"c:\Users\AL Qudah\.gemini\antigravity\scratch\QudahWay"
    icon_name = "QudahWay.png"
    
    for root, dirs, files in os.walk(root_dir):
        if '.git' in dirs:
            dirs.remove('.git')
        
        for file in files:
            if file.endswith(".html"):
                full_path = os.path.join(root, file)
                rel_depth = os.path.relpath(root_dir, root)
                if rel_depth == ".":
                    icon_path = icon_name
                else:
                    icon_path = os.path.join(rel_depth, icon_name).replace("\\", "/")
                
                with open(full_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                if 'rel="icon"' not in content:
                    new_link = f'    <link rel="icon" type="image/png" href="{icon_path}">\n'
                    # Insert after the last link rel="stylesheet" or before </head>
                    if '<link' in content:
                        parts = content.split('rel="stylesheet">')
                        if len(parts) > 1:
                            # Insert after first stylesheet link
                            new_content = parts[0] + 'rel="stylesheet">\n' + new_link + 'rel="stylesheet">'.join(parts[1:])
                        else:
                            # Revert to inserting before head
                            new_content = content.replace('</head>', new_link + '</head>')
                    else:
                        new_content = content.replace('</head>', new_link + '</head>')
                    
                    with open(full_path, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {full_path}")

if __name__ == "__main__":
    update_favicons()
