/**
 * Code syntax highlighting processor
 */

import hljs from 'highlight.js';

export class CodeProcessor {
  /**
   * Process HTML to add syntax highlighting to code blocks
   */
  public process(html: string): string {
    // Match code blocks with language specification
    const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
    
    return html.replace(codeBlockRegex, (match, lang, code) => {
      try {
        // Decode HTML entities
        const decodedCode = this.decodeHtmlEntities(code);
        
        // Highlight code
        const highlighted = hljs.highlight(decodedCode, {
          language: lang,
          ignoreIllegals: true,
        });

        return `<pre><code class="hljs language-${lang}">${highlighted.value}</code></pre>`;
      } catch (error) {
        // If highlighting fails, return original code block
        console.warn(`Failed to highlight code block with language: ${lang}`, error);
        return match;
      }
    });
  }

  /**
   * Get CSS for syntax highlighting theme
   */
  public getHighlightCSS(theme: string = 'github'): string {
    // Return the CSS for the specified highlight.js theme
    // In a real implementation, you would load the actual CSS file
    // For now, we'll return a placeholder
    return `/* Highlight.js ${theme} theme will be loaded */`;
  }

  /**
   * Decode HTML entities in code
   */
  private decodeHtmlEntities(text: string): string {
    const entities: Record<string, string> = {
      '&': '&',
      '<': '<',
      '>': '>',
      '"': '"',
      ''': "'",
      '&#x2F;': '/',
    };

    return text.replace(/&[#\w]+;/g, (entity) => entities[entity] || entity);
  }

  /**
   * Get list of supported languages
   */
  public getSupportedLanguages(): string[] {
    return hljs.listLanguages();
  }

  /**
   * Check if a language is supported
   */
  public isLanguageSupported(language: string): boolean {
    return hljs.getLanguage(language) !== undefined;
  }
}

// Made with Bob
