import re

def fix_html(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    new_lines = []
    stack = []
    
    # We'll try to reconstruct the tags and their indentation
    # This is a bit risky for complex HTML, but the QudahWay style is mostly nested divs.
    
    indent_level = 0
    
    for i, line in enumerate(lines):
        # Count opens and closes in this line
        opens = re.findall(r'<div', line)
        closes = re.findall(r'</div', line)
        
        # Determine the "correct" indentation based on current stack
        # But for now, let's just find the mismatches.
        if opens or closes:
            print(f"Line {i+1}: {len(opens)} opens, {len(closes)} closes. Current stack: {len(stack)}")
            for _ in opens: stack.append('div')
            for _ in closes: 
                if stack: stack.pop()
                else: print(f"WARNING: Extra close at line {i+1}")

    print(f"Final stack size: {len(stack)}")

if __name__ == "__main__":
    import sys
    fix_html(r"c:\Users\AL Qudah\.gemini\antigravity\scratch\QudahWay\cv\intro-video-processing.html")
