/**
 * HTML renderer that combines markdown, processors, and themes
 */
import { ProcessedContent, ConversionOptions } from './types';
export declare class HtmlRenderer {
    private codeProcessor;
    private mermaidProcessor;
    private mathProcessor;
    constructor();
    /**
     * Render complete HTML document from processed markdown
     */
    render(content: ProcessedContent, options: Required<ConversionOptions>): Promise<string>;
    /**
     * Build complete HTML document with head and body
     */
    private buildHtmlDocument;
    /**
     * Get all required stylesheets
     */
    private getStylesheets;
    /**
     * Get required scripts
     */
    private getScripts;
    /**
     * Load theme CSS
     */
    private loadTheme;
    /**
     * Build CSS from theme customization
     */
    private buildCustomizationCSS;
    /**
     * Generate table of contents from headings
     */
    private generateTableOfContents;
    /**
     * Escape HTML special characters
     */
    private escapeHtml;
}
//# sourceMappingURL=renderer.d.ts.map