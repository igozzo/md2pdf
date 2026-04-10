/**
 * Markdown parser with support for extended features
 */

import MarkdownIt from 'markdown-it';
import footnote from 'markdown-it-footnote';
import taskLists from 'markdown-it-task-lists';
import attrs from 'markdown-it-attrs';
import { MarkdownMetadata, ProcessedContent } from './types';
import { InvalidMarkdownError } from './utils/errors';

export class MarkdownParser {
  private md: MarkdownIt;

  constructor() {
    this.md = new MarkdownIt({
      html: true,
      linkify: true,
      typographer: true,
      breaks: false,
    })
      .use(footnote)
      .use(taskLists, { enabled: true })
      .use(attrs);

    // Customize rendering for better PDF output
    this.customizeRenderer();
  }

  /**
   * Parse markdown content to HTML
   */
  public parse(markdown: string): ProcessedContent {
    if (!markdown || markdown.trim().length === 0) {
      throw new InvalidMarkdownError('Content is empty');
    }

    // Extract metadata from frontmatter if present
    const { content, metadata } = this.extractMetadata(markdown);

    // Parse markdown to HTML
    const html = this.md.render(content);

    // Detect features used in the document
    const hasMermaid = this.detectMermaid(content);
    const hasMath = this.detectMath(content);
    const hasCode = this.detectCode(content);

    return {
      html,
      metadata,
      hasMermaid,
      hasMath,
      hasCode,
    };
  }

  /**
   * Extract YAML frontmatter metadata
   */
  private extractMetadata(markdown: string): { content: string; metadata: MarkdownMetadata } {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
      return { content: markdown, metadata: {} };
    }

    const frontmatter = match[1];
    const content = markdown.slice(match[0].length);
    const metadata: MarkdownMetadata = {};

    // Simple YAML parser for common fields
    const lines = frontmatter.split('\n');
    for (const line of lines) {
      const colonIndex = line.indexOf(':');
      if (colonIndex > 0) {
        const key = line.slice(0, colonIndex).trim();
        const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
        metadata[key] = value;
      }
    }

    return { content, metadata };
  }

  /**
   * Detect Mermaid diagrams in markdown
   */
  private detectMermaid(markdown: string): boolean {
    return /```mermaid\s/i.test(markdown);
  }

  /**
   * Detect math equations in markdown
   */
  private detectMath(markdown: string): boolean {
    // Detect inline math: $...$
    // Detect block math: $$...$$
    return /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(markdown);
  }

  /**
   * Detect code blocks in markdown
   */
  private detectCode(markdown: string): boolean {
    return /```[\s\S]*?```|`[^`]+?`/.test(markdown);
  }

  /**
   * Customize markdown-it renderer for better PDF output
   */
  private customizeRenderer(): void {
    // Store original rules
    const defaultRender = this.md.renderer.rules;

    // Customize table rendering
    this.md.renderer.rules.table_open = () => '<table class="md-table">\n';
    this.md.renderer.rules.table_close = () => '</table>\n';

    // Customize code block rendering
    const originalFence = defaultRender.fence;
    this.md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
      const token = tokens[idx];
      const info = token.info ? token.info.trim() : '';
      const langName = info.split(/\s+/g)[0];

      // Check if it's a mermaid diagram
      if (langName.toLowerCase() === 'mermaid') {
        return `<div class="mermaid">\n${token.content}</div>\n`;
      }

      // Check if it's a math block
      if (langName.toLowerCase() === 'math') {
        return `<div class="math-block">$$${token.content}$$</div>\n`;
      }

      // Default code block rendering
      if (originalFence) {
        return originalFence(tokens, idx, options, env, slf);
      }

      return `<pre><code class="language-${langName}">${token.content}</code></pre>\n`;
    };

    // Customize heading rendering with anchors
    for (let i = 1; i <= 6; i++) {
      const headingOpen = `heading_open` as any;
      const originalHeadingOpen = defaultRender[headingOpen];
      
      this.md.renderer.rules[headingOpen] = (tokens, idx, options, env, slf) => {
        const token = tokens[idx];
        const level = token.tag;
        const nextToken = tokens[idx + 1];
        
        if (nextToken && nextToken.type === 'inline' && nextToken.content) {
          const id = this.slugify(nextToken.content);
          return `<${level} id="${id}" class="md-heading">`;
        }
        
        if (originalHeadingOpen) {
          return originalHeadingOpen(tokens, idx, options, env, slf);
        }
        
        return `<${level} class="md-heading">`;
      };
    }

    // Customize blockquote rendering
    this.md.renderer.rules.blockquote_open = () => '<blockquote class="md-blockquote">\n';
    this.md.renderer.rules.blockquote_close = () => '</blockquote>\n';

    // Customize list rendering
    this.md.renderer.rules.bullet_list_open = () => '<ul class="md-list">\n';
    this.md.renderer.rules.ordered_list_open = () => '<ol class="md-list">\n';
  }

  /**
   * Create URL-friendly slug from text
   */
  private slugify(text: string): string {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }
}

// Made with Bob
