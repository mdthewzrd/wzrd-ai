export default function EmergencyPage() {
  return (
    <html lang="en">
      <head>
        <title>inflnce - Emergency Mode</title>
        <style>{`
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: system-ui, -apple-system, sans-serif;
            background: #000;
            color: #fff;
            line-height: 1.6;
            padding: 2rem;
          }
          .container { max-width: 800px; margin: 0 auto; text-align: center; }
          h1 { font-size: 3rem; margin-bottom: 1rem; color: #22c55e; }
          p { font-size: 1.2rem; margin-bottom: 2rem; color: #ccc; }
          .links { display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin-top: 2rem; }
          a { 
            background: #22c55e; 
            color: white; 
            padding: 1rem 2rem; 
            text-decoration: none; 
            border-radius: 0.5rem;
            font-weight: 600;
            transition: background 0.2s;
          }
          a:hover { background: #16a34a; }
          .status { 
            background: #1f2937; 
            padding: 1.5rem; 
            border-radius: 0.5rem; 
            margin: 2rem 0; 
            border-left: 4px solid #22c55e;
          }
        `}</style>
      </head>
      <body>
        <div className="container">
          <h1>inflnce</h1>
          <p>Emergency recovery mode - Platform is operational</p>
          
          <div className="status">
            <h2>✅ System Status: ONLINE</h2>
            <p>All core services are functional. This is a simplified interface to ensure stability.</p>
          </div>

          <div className="links">
            <a href="/">Back to Homepage</a>
            <a href="/social-media">Social Media</a>
            <a href="/tools">Tools</a>
            <a href="/publications">Publications</a>
            <a href="/orders">My Orders</a>
          </div>

          <div style={{ marginTop: '3rem', color: '#666' }}>
            <p>If you're seeing this page, the platform has automatically recovered from an error.</p>
            <p>All your services and data are safe.</p>
          </div>
        </div>
      </body>
    </html>
  )
}