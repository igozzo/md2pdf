/**
 * Mermaid diagram processor
 */
export declare class MermaidProcessor {
    /**
     * Process HTML to prepare Mermaid diagrams for rendering
     * The actual rendering will be done by Puppeteer in the browser
     */
    process(html: string): string;
    /**
     * Get Mermaid initialization script for browser
     */
    getMermaidScript(): string;
    /**
     * Get Mermaid CSS for styling
     */
    getMermaidCSS(): string;
    /**
     * Basic validation of Mermaid syntax
     */
    private isValidMermaidSyntax;
    /**
     * Extract Mermaid diagrams from HTML
     */
    extractDiagrams(html: string): string[];
    /**
     * Check if HTML contains Mermaid diagrams
     */
    hasMermaidDiagrams(html: string): boolean;
}
//# sourceMappingURL=mermaid.d.ts.map