/**
 * Mermaid diagram processor
 */

import { MermaidRenderError } from '../utils/errors';

export class MermaidProcessor {
  /**
   * Process HTML to prepare Mermaid diagrams for rendering
   * The actual rendering will be done by Puppeteer in the browser
   */
  public process(html: string): string {
    // Mermaid diagrams are already wrapped in <div class="mermaid"> by the parser
    // We just need to ensure they have proper attributes for rendering
    const mermaidRegex = /<div class="mermaid">\s*([\s\S]*?)\s*<\/div>/g;
    
    let counter = 0;
    return html.replace(mermaidRegex, (match, content) => {
      counter++;
      const id = `mermaid-diagram-${counter}`;
      
      // Validate mermaid syntax (basic check)
      if (!this.isValidMermaidSyntax(content)) {
        console.warn(`Invalid Mermaid syntax detected in diagram ${counter}`);
      }
      
      return `<div class="mermaid" id="${id}" data-processed="false">\n${content}\n</div>`;
    });
  }

  /**
   * Get Mermaid initialization script for browser
   */
  public getMermaidScript(): string {
    return `
      <script type="module">
        import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        
        mermaid.initialize({
          startOnLoad: true,
          theme: 'default',
          securityLevel: 'loose',
          fontFamily: 'Arial, sans-serif',
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: 'basis'
          }
        });

        // Wait for all diagrams to render
        window.mermaidReady = new Promise((resolve) => {
          if (document.readyState === 'complete') {
            mermaid.run().then(resolve).catch(console.error);
          } else {
            window.addEventListener('load', () => {
              mermaid.run().then(resolve).catch(console.error);
            });
          }
        });
      </script>
    `;
  }

  /**
   * Get Mermaid CSS for styling
   */
  public getMermaidCSS(): string {
    return `
      .mermaid {
        display: flex;
        justify-content: center;
        margin: 20px 0;
        page-break-inside: avoid;
      }
      
      .mermaid svg {
        max-width: 100%;
        height: auto;
      }
    `;
  }

  /**
   * Basic validation of Mermaid syntax
   */
  private isValidMermaidSyntax(content: string): boolean {
    const trimmed = content.trim();
    
    // Check for common Mermaid diagram types
    const validTypes = [
      'graph',
      'flowchart',
      'sequenceDiagram',
      'classDiagram',
      'stateDiagram',
      'erDiagram',
      'gantt',
      'pie',
      'journey',
      'gitGraph',
      'mindmap',
      'timeline',
      'quadrantChart',
    ];
    
    return validTypes.some(type => 
      trimmed.startsWith(type) || 
      trimmed.startsWith(`${type} `) ||
      trimmed.startsWith(`${type}\n`)
    );
  }

  /**
   * Extract Mermaid diagrams from HTML
   */
  public extractDiagrams(html: string): string[] {
    const diagrams: string[] = [];
    const mermaidRegex = /<div class="mermaid"[^>]*>\s*([\s\S]*?)\s*<\/div>/g;
    
    let match;
    while ((match = mermaidRegex.exec(html)) !== null) {
      diagrams.push(match[1].trim());
    }
    
    return diagrams;
  }

  /**
   * Check if HTML contains Mermaid diagrams
   */
  public hasMermaidDiagrams(html: string): boolean {
    return /<div class="mermaid"/.test(html);
  }
}

// Made with Bob
