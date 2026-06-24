#!/usr/bin/env python3
import urllib.request
import re
import os

url = 'https://goayachtworld.com'
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'}
req = urllib.request.Request(url, headers=headers)
html = urllib.request.urlopen(req).read().decode()

# Find all image URLs
pattern = r'https://goayachtworld\.com/[^"\')\s]+\.(jpg|jpeg|png)'
images = list(set(re.findall(pattern, html)))

# Filter for yacht images only (full size, not thumbnails)
yacht_images = []
for img in images:
    base_url = img.split()[0]  # Handle srcset
    fname = base_url.split('/')[-1].split('?')[0]
    # Skip thumbnails
    if any(x in fname for x in ['-300x', '-768x', '-1024x', '-150x', '-300w', '-768w', '-1024w', '-866w']):
        continue
    if ('service-yacht' in base_url or 'location-' in base_url) and fname.endswith(('.jpg', '.jpeg')):
        yacht_images.append(base_url)

print(f"Found {len(yacht_images)} yacht images to download")

os.chdir('/workspace/project/goayachtworld.com/assets/images')
for img_url in yacht_images:
    fname = img_url.split('/')[-1].split('?')[0]
    print(f"Downloading: {fname}")
    try:
        urllib.request.urlretrieve(img_url, fname)
    except Exception as e:
        print(f"Error: {e}")

print("Done!")
