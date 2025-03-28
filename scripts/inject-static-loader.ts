/**
 * Inject static loader script for Boisserenc static site
 * 
 * This script injects a script that enables the static site to work
 * without a backend API by loading the exported JSON data files.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');
const outDir = path.join(rootDir, 'out');

// Make sure the output directory exists
if (!fs.existsSync(outDir)) {
  console.error('❌ Output directory does not exist! Run build first.');
  process.exit(1);
}

// Create the loader script content
const loaderScript = `
// Static data loader for exported site
window.API_BASE_URL = '';

// Override fetch for API endpoints
const originalFetch = window.fetch;
window.fetch = async function(url, options) {
  // Only intercept API requests
  if (typeof url === 'string' && url.startsWith('/api/')) {
    const endpoint = url.replace('/api/', '');
    
    // Map endpoints to static JSON files
    let staticUrl;
    if (endpoint.startsWith('stoves/featured')) {
      staticUrl = '/api/stoves-featured.json';
    } else if (endpoint.startsWith('stoves/')) {
      // Handle specific stove requests
      const stoveId = endpoint.replace('stoves/', '');
      // For individual stoves, we'll need to load all stoves and filter
      const response = await originalFetch('/api/stoves.json', { method: 'GET' });
      const allStoves = await response.json();
      const stove = allStoves.find(s => s.id === parseInt(stoveId));
      return {
        ok: !!stove,
        status: stove ? 200 : 404,
        json: async () => stove || null
      };
    } else if (endpoint.startsWith('blog/')) {
      // Handle specific blog post requests
      const slug = endpoint.replace('blog/', '');
      // For individual blog posts, load all posts and filter
      const response = await originalFetch('/api/blog.json', { method: 'GET' });
      const allPosts = await response.json();
      const post = allPosts.find(p => p.slug === slug);
      return {
        ok: !!post,
        status: post ? 200 : 404,
        json: async () => post || null
      };
    } else {
      // Handle general endpoints
      staticUrl = \`/api/\${endpoint}.json\`;
    }
    
    // If we have a static URL, fetch from there
    if (staticUrl) {
      const response = await originalFetch(staticUrl, { method: 'GET' });
      return response;
    }
  }
  
  // Pass through all other requests
  return originalFetch(url, options);
};

console.log('[Static Export] Using static data files instead of API');
`;

// Create static-data-loader.js
console.log('📝 Creating static-data-loader.js...');
fs.writeFileSync(
  path.join(outDir, 'static-data-loader.js'),
  loaderScript
);

// Function to inject the loader script into HTML files
function injectLoaderScript(filePath: string) {
  console.log(`💉 Injecting loader into ${filePath}...`);
  try {
    let html = fs.readFileSync(filePath, 'utf8');
    
    // Add the script tag before the closing body tag
    html = html.replace('</body>', '<script src="/static-data-loader.js"></script></body>');
    
    fs.writeFileSync(filePath, html);
    return true;
  } catch (error) {
    console.error(`❌ Error injecting loader into ${filePath}:`, error);
    return false;
  }
}

// Inject the loader script into the main index.html
const mainIndexPath = path.join(outDir, 'index.html');
if (fs.existsSync(mainIndexPath)) {
  injectLoaderScript(mainIndexPath);
} else {
  console.error('❌ Main index.html not found!');
}

// Create directories and index.html for all routes
const routes = [
  '/about',
  '/blog',
  '/contact',
  '/creations',
  '/process',
  '/services'
];

routes.forEach(route => {
  const routeDir = path.join(outDir, route.substring(1));
  
  // Create the directory if it doesn't exist
  if (!fs.existsSync(routeDir)) {
    console.log(`📁 Creating directory for ${route}...`);
    fs.mkdirSync(routeDir, { recursive: true });
  }
  
  // Copy and inject the main index.html to this route's directory
  const routeIndexPath = path.join(routeDir, 'index.html');
  if (!fs.existsSync(routeIndexPath)) {
    console.log(`📋 Copying index.html for ${route}...`);
    fs.copyFileSync(mainIndexPath, routeIndexPath);
  }
  
  // Inject the loader script into this route's index.html
  injectLoaderScript(routeIndexPath);
});

console.log('✅ Static loader injection completed!');