#!/bin/bash
cd /workspace/project/goayachtworld.com/assets/images
rm -f *.jpg test.jpg 2>/dev/null

# Yacht images
for img in service-yacht-1 service-yacht-2 service-yacht-3 service-yacht-4 service-yacht-5 service-yacht-6 service-yacht-7 service-yacht-9 service-yacht-10 service-yacht-11 service-yacht-12 service-yacht-13 service-yacht-14 service-yacht-15 service-yacht-16 service-yacht-17 service-yacht-18 service-yacht-19 service-yacht-20 service-yacht-21 service-yacht-22 service-yacht-23 service-yacht-24 service-yacht-25 service-yacht-26 service-yacht-27 service-yacht-28 service-yacht-29 service-yacht-30 service-yacht-31 service-yacht-32 service-yacht-33 service-yacht-34 service-yacht-35 service-yacht-36 hero-slide1 hero-slide2 hero-slide3; do
  echo "Downloading: $img.jpg"
  curl -sL -A "Mozilla/5.0" -H "Referer: https://goayachtworld.com/" "https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/$img.jpg" -o "$img.jpg" 2>/dev/null
done

# Location images
for i in 1 2 3 4 5 6; do
  echo "Downloading: location-$i.jpg"
  curl -sL -A "Mozilla/5.0" -H "Referer: https://goayachtworld.com/" "https://goayachtworld.com/wp-content/uploads/sites/58/2023/06/location-$i.jpg" -o "location-$i.jpg" 2>/dev/null
done

# Post-hero images
for i in 1 2 3 4 5; do
  echo "Downloading: post-hero-$i.jpg"
  curl -sL -A "Mozilla/5.0" -H "Referer: https://goayachtworld.com/" "https://goayachtworld.com/wp-content/uploads/sites/58/2023/05/post-hero-$i.jpg" -o "post-hero-$i.jpg" 2>/dev/null
done

echo "Download complete!"
ls -la *.jpg 2>/dev/null | wc -l
