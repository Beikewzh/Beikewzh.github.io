import os
from datetime import datetime, timedelta

# ========== CONFIGURATION ==========
photo_folder = "/Users/beike/Desktop/Workspace/academic-homepage/assets/images/photos/sea"
output_dir = "sea"
base_name = os.path.basename(photo_folder)  # e.g., "montreal"
group_name = base_name.capitalize()         # "Montreal"
start_date = "2059-09-12"

# Ensure output directory exists
os.makedirs(output_dir, exist_ok=True)

# List all files in the image folder (filter for jpg, png, etc)
image_files = sorted([f for f in os.listdir(photo_folder) if f.lower().endswith(('.jpg', '.jpeg', '.png'))])

# Date generator
def date_gen(start, n):
    date = datetime.strptime(start, "%Y-%m-%d")
    for i in range(n):
        yield (date + timedelta(days=i)).strftime("%Y-%m-%d 00:01:00 +0800")

# Generate .md files
for idx, (img, date_str) in enumerate(zip(image_files, date_gen(start_date, len(image_files))), start=1):
    md_content = f"""---
show: true
width: 3
date: {date_str}
group: {group_name}
title: {base_name} {idx}
---
<div>
<a href="/assets/images/photos/{base_name}/{img}" target="_blank">
    <img data-src="/assets/images/photos/{base_name}/{img}" class="lazy w-100 rounded-xl" src="{{{{ '/assets/images/empty_300x200.png' | relative_url }}}}">
</a>
</div>
"""
    filename = os.path.join(output_dir, f"{base_name}{idx}.md")
    with open(filename, "w", encoding="utf-8") as f:
        f.write(md_content)

print(f"Generated {len(image_files)} .md files in {output_dir}")
