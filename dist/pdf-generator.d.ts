/**
 * PDF generation using Puppeteer
 */
import { ConversionOptions } from './types';
export declare class PdfGenerator {
    private browser;
    /**
     * Initialize browser instance
     */
    initialize(): Promise<void>;
    /**
     * Generate PDF from HTML content
     */
    generatePDF(html: string, outputPath: string, options: Required<ConversionOptions>): Promise<void>;
    /**
     * Build Puppeteer PDF options from conversion options
     */
    private buildPdfOptions;
    /**
     * Map page size to Puppeteer format
     */
    private mapPageSize;
    /**
     * Close browser instance
     */
    close(): Promise<void>;
    /**
     * Generate PDF with automatic cleanup
     */
    generatePDFWithCleanup(html: string, outputPath: string, options: Required<ConversionOptions>): Promise<void>;
}
declare global {
    interface Window {
        mermaidReady: Promise<void>;
    }
}
//# sourceMappingURL=pdf-generator.d.ts.map