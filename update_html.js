const fs = require('fs');
const path = require('path');

const directory = 'c:/sec87software/pages/';
let count = 0;

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (file.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');

            // Fix fonts
            content = content.replace(
                /https:\/\/fonts\.googleapis\.com\/css2\?family=Inter:.*?display=swap/gs,
                'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;800&display=swap'
            );
            
            // Remove SVG background blobs
            content = content.replace(/style="background-image:\s*url\('data:image\/svg[^>]*>/gs, '>');
            
            // Change backgrounds
            content = content.replace(/bg-\[#fcfbf9\]/g, 'bg-sepBeige');
            content = content.replace(/bg-\[#f5f0e6\]/g, 'bg-sepBeige');
            
            // Change sidebars to green and headers to burgundy
            content = content.replace(/bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900/g, 'bg-sepGreenDark');
            content = content.replace(/bg-gradient-to-r from-sepBurgundyDark to-sepBurgundy/g, 'bg-sepBurgundy');
            content = content.replace(/bg-gradient-to-r from-emerald-800 to-emerald-600/g, 'bg-sepGreen');
            
            fs.writeFileSync(fullPath, content, 'utf8');
            count++;
        }
    }
}

walkDir(directory);
console.log('HTML files processed successfully: ' + count);
