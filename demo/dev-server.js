// Simple development server for testing the demo locally
// This mimics Vercel's routing behavior for local development
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 5000;

// MIME types for static files
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.json': 'application/json'
};

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  let pathname = parsedUrl.pathname;

  // Handle root path
  if (pathname === '/') {
    pathname = '/index.html';
  }

  // Handle API routes (for testing - in production these go to Vercel functions)
  if (pathname.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ 
      message: 'API endpoint placeholder - deploy to Vercel for full functionality',
      note: 'Local development server - API calls will work on Vercel deployment'
    }));
    return;
  }

  // Serve static files
  const filePath = path.join(__dirname, pathname);
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end(`
          <h1>404 - File Not Found</h1>
          <p>Path: ${pathname}</p>
          <p><a href="/">Return to Demo</a></p>
        `);
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
      return;
    }

    const ext = path.extname(filePath);
    const contentType = mimeTypes[ext] || 'text/plain';
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Review Rocket Demo (Development Mode)`);
  console.log(`📄 Serving static files from: ${__dirname}`);
  console.log(`🌐 Local server: http://localhost:${PORT}`);
  console.log(`⚠️  Note: API endpoints require Vercel deployment for full functionality`);
  console.log(`📋 To deploy: Push to GitHub → Connect to Vercel → Add env vars`);
});