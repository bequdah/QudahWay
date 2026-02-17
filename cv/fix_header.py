
import os

file_path = r"c:\Users\AL Qudah\.gemini\antigravity\scratch\QudahWay\cv\intro-video-processing.html"

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
for line in lines:
    if 'class="explanation-header">حركة الكاميرا vs حركة الأجسام' in line:
        # Keep the prefix, keep the text up to 'الأجسام', then close div
        # We assume the line is: <div class="explanation-header">حركة الكاميرا vs حركة الأجسام ...</div>
        # We want: <div class="explanation-header">حركة الكاميرا vs حركة الأجسام</div>
        indentation = line.split('<')[0] # Preserve indentation
        new_line = indentation + '<div class="explanation-header">حركة الكاميرا vs حركة الأجسام</div>\n'
        new_lines.append(new_line)
    else:
        new_lines.append(line)

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("Fixed header successfully.")
