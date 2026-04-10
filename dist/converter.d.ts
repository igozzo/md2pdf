/**
 * Main converter class that orchestrates the conversion process
 */
import { ConversionOptions, ConversionResult, ProcessedContent } from './types';
export declare class MarkdownConverter {
    private parser;
    private renderer;
    private pdfGenerator;
    private options;
    constructor(options?: ConversionOptions);
    /**
     * Convert markdown file to PDF
     */
    convert(inputPath: string, outputPath: string): Promise<ConversionResult>;
    /**
     * Convert markdown string to PDF
     */
    convertString(markdown: string, outputPath: string): Promise<ConversionResult>;
    /**
     * Convert markdown to HTML (without PDF generation)
     */
    markdownToHTML(markdown: string): Promise<string>;
    /**
     * Parse markdown and get processed content
     */
    parseMarkdown(markdown: string): ProcessedContent;
    /**
     * Update converter options
     */
    updateOptions(options: ConversionOptions): void;
    /**
     * Get current options
     */
    getOptions(): Required<ConversionOptions>;
}
/**
 * Convenience function for simple conversions
 */
export declare function convertMarkdownToPDF(inputPath: string, outputPath: string, options?: ConversionOptions): Promise<ConversionResult>;
/**
 * Convenience function for string conversions
 */
export declare function convertStringToPDF(markdown: string, outputPath: string, options?: ConversionOptions): Promise<ConversionResult>;
//# sourceMappingURL=converter.d.ts.map