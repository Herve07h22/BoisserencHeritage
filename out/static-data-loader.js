
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
      staticUrl = `/api/${endpoint}.json`;
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
