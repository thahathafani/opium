// lib/renderHTML.ts

type File = {
    path: string;
    content: string;
  };
  
  export function generateHTML(files: File[]): string {
    const entry = files.find((f) => f.path === "app/page.tsx");
  
    if (!entry) return "<h1>No entry file found</h1>";
  
    return `
      <html>
        <head>
          <style>
            body { font-family: sans-serif; padding: 2rem; }
          </style>
        </head>
        <body>
          <script type="module">
            ${transformTSX(entry.content)}
          </script>
        </body>
      </html>
    `;
  }
  
  function transformTSX(tsx: string): string {
    // Extremely simplified transform: strips JSX to raw HTML-ish
    return tsx
      .replace(/export\s+default\s+function\s+\w+\(\)\s*{/, "")
      .replace(/return\s+\(/, "")
      .replace(/\);?/, "")
      .replace(/}/, "");
  }
  