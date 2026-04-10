/**
 * Code syntax highlighting processor
 */
export declare class CodeProcessor {
    /**
     * Process HTML to add syntax highlighting to code blocks
     */
    process(html: string): string;
    /**
     * Get CSS for syntax highlighting theme
     */
    getHighlightCSS(theme?: string): string;
    /**
     * Decode HTML entities in code
     */
    private decodeHtmlEntities;
    /**
     * Get list of supported languages
     */
    getSupportedLanguages(): string[];
    /**
     * Check if a language is supported
     */
    isLanguageSupported(language: string): boolean;
}
//# sourceMappingURL=code.d.ts.map