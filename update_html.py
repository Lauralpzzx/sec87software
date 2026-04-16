import os
import re

directory = 'c:/sec87software/pages/'
count = 0

for root, _, files in os.walk(directory):
    for filename in files:
        if filename.endswith('.html'):
            filepath = os.path.join(root, filename)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()

            # Fix fonts
            content = re.sub(
                r'https://fonts\.googleapis\.com/css2\?family=Inter:.*?display=swap',
                r'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap',
                content, flags=re.DOTALL
            )
            
            # Remove SVG background blobs
            content = re.sub(r'style=\"background-image:\s*url\(\'data:image/svg[^>]*>', '>', content, flags=re.DOTALL)
            
            # Change backgrounds
            content = re.sub(r'bg-\[#fcfbf9\]', 'bg-sepBeige', content)
            content = re.sub(r'bg-\[#f5f0e6\]', 'bg-sepBeige', content)
            
            # Change sidebars to green and headers to burgundy
            content = re.sub(r'bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900', 'bg-sepGreenDark', content)
            content = re.sub(r'bg-gradient-to-r from-sepBurgundyDark to-sepBurgundy', 'bg-sepBurgundy', content)
            content = re.sub(r'bg-gradient-to-r from-emerald-800 to-emerald-600', 'bg-sepGreen', content)
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            count += 1

print(f'HTML files processed successfully: {count}')
