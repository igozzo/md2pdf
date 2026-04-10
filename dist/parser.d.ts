/**
 * Markdown parser with support for extended features
 */
import { ProcessedContent } from './types';
export declare class MarkdownParser {
    private md;
    constructor();
    /**
     * Parse markdown content to HTML
     */
    parse(markdown: string): ProcessedContent;
    /**
     * Extract YAML frontmatter metadata
     */
    private extractMetadata;
    /**
     * Detect Mermaid diagrams in markdown
     */
    private detectMermaid;
    /**
     * Detect math equations in markdown
     */
    private detectMath;
    /**
     * Detect code blocks in markdown
     */
    private detectCode;
    /**
     * Customize markdown-it renderer for better PDF output
     */
    private customizeRenderer;
    /**
     * Create URL-friendly slug from text
     */
    private slugify;
}
//# sourceMappingURL=parser.d.ts.map