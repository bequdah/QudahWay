import re

def check_balance(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    tokens = re.finditer(r'<(div|/div)', content)
    stack = 0
    for match in tokens:
        tag = match.group(0)
        line_no = content.count('\n', 0, match.start()) + 1
        if tag == '<div':
            stack += 1
        else:
            stack -= 1
        print(f"Line {line_no}: {tag} -> Stack: {stack}")

if __name__ == "__main__":
    check_balance(r"c:\Users\AL Qudah\.gemini\antigravity\scratch\QudahWay\cv\intro-video-processing.html")
