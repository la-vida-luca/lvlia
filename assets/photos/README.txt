LVLIA Website Images Directory
==============================

This directory contains all images used on the LVLIA website.

IMAGE NAMING CONVENTIONS
-----------------------
- Product photos: IMG_<number>.jpeg (e.g., IMG_6813.jpeg)
- UUID-based names: <uuid>.jpeg for specific features
- Diagrams/icons: descriptive-name.svg (e.g., micro-serre-1m2.svg)

SUPPORTED FORMATS
----------------
- JPEG (.jpeg, .jpg) - for photos
- PNG (.png) - for graphics with transparency
- SVG (.svg) - for logos and icons

IMAGE REQUIREMENTS
-----------------
1. All images must be optimized before upload (compressed without visible quality loss)
2. Recommended max width: 2000px for photos
3. Alt text is REQUIRED for all images in HTML for accessibility
4. Images must be committed to git (they are NOT in .gitignore)

REFERENCING IMAGES IN HTML
-------------------------
Always use relative paths from the HTML file location:

From root-level HTML files (index.html, kit-particuliers.html, etc.):
  <img src="assets/photos/IMG_6813.jpeg" alt="Description">

From subdirectory HTML files (blog/post.html):
  <img src="../assets/photos/IMG_6813.jpeg" alt="Description">

DEPLOYMENT NOTES
---------------
- Images are served with proper MIME types via _headers file (Netlify)
- Images are served with proper MIME types via .htaccess file (Apache)
- Images use lazy loading for performance (loading="lazy" attribute added by JavaScript)
- Failed image loads are logged to console and display fallback styling
- All images have 1-year cache for optimal performance

TROUBLESHOOTING
--------------
If images don't load in production:
1. Verify file exists in git: git ls-files assets/photos/
2. Check file permissions: should be readable (644 or rw-rw-r--)
3. Verify path is correct (relative, not absolute)
4. Check browser console for errors
5. Verify MIME type headers are set correctly
6. Clear browser cache and CDN cache

ADDING NEW IMAGES
----------------
1. Optimize the image (compress, resize if needed)
2. Copy to this directory with appropriate naming
3. Add to git: git add assets/photos/your-image.jpeg
4. Reference in HTML with proper alt text
5. Commit and push changes

For questions, contact: lucas.horville@lvlia.net