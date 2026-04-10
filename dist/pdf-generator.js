"use strict";
/**
 * PDF generation using Puppeteer
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfGenerator = void 0;
const puppeteer_1 = __importDefault(require("puppeteer"));
const errors_1 = require("./utils/errors");
class PdfGenerator {
    constructor() {
        this.browser = null;
    }
    /**
     * Initialize browser instance
     */
    async initialize() {
        try {
            this.browser = await puppeteer_1.default.launch({
                headless: true,
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
            });
        }
        catch (error) {
            throw new errors_1.PdfGenerationError(`Failed to launch browser: ${error}`);
        }
    }
    /**
     * Generate PDF from HTML content
     */
    async generatePDF(html, outputPath, options) {
        if (!this.browser) {
            await this.initialize();
        }
        let page = null;
        try {
            page = await this.browser.newPage();
            // Set viewport for consistent rendering
            await page.setViewport({
                width: 1200,
                height: 800,
                deviceScaleFactor: 2,
            });
            // Set content with base URL for relative resources
            await page.setContent(html, {
                waitUntil: ['networkidle0', 'domcontentloaded'],
                timeout: 30000,
            });
            // Wait for Mermaid diagrams to render if present
            if (options.enableMermaid && html.includes('class="mermaid"')) {
                try {
                    await page.waitForFunction(() => window.mermaidReady !== undefined, { timeout: 10000 });
                    await page.evaluate(() => window.mermaidReady);
                }
                catch (error) {
                    console.warn('Mermaid rendering timeout, continuing anyway');
                }
            }
            // Additional wait for any dynamic content
            await page.waitForTimeout(1000);
            // Build PDF options
            const pdfOptions = this.buildPdfOptions(outputPath, options);
            // Generate PDF
            await page.pdf(pdfOptions);
        }
        catch (error) {
            throw new errors_1.PdfGenerationError(`Failed to generate PDF: ${error}`);
        }
        finally {
            if (page) {
                await page.close();
            }
        }
    }
    /**
     * Build Puppeteer PDF options from conversion options
     */
    buildPdfOptions(path, options) {
        const margins = options.margins;
        const pdfOptions = {
            path,
            format: this.mapPageSize(options.pageSize),
            landscape: options.orientation === 'landscape',
            printBackground: options.printBackground,
            preferCSSPageSize: options.preferCSSPageSize,
            margin: {
                top: margins.top,
                right: margins.right,
                bottom: margins.bottom,
                left: margins.left,
            },
            displayHeaderFooter: options.displayHeaderFooter,
        };
        // Add header/footer templates if provided
        if (options.displayHeaderFooter) {
            if (options.headerTemplate) {
                pdfOptions.headerTemplate = options.headerTemplate;
            }
            if (options.footerTemplate) {
                pdfOptions.footerTemplate = options.footerTemplate;
            }
            else {
                // Default footer with page numbers
                pdfOptions.footerTemplate = `
          <div style="font-size: 9px; text-align: center; width: 100%; margin: 0 auto;">
            <span class="pageNumber"></span> / <span class="totalPages"></span>
          </div>
        `;
            }
        }
        // Add scale if specified
        if (options.scale && options.scale !== 1) {
            pdfOptions.scale = options.scale;
        }
        return pdfOptions;
    }
    /**
     * Map page size to Puppeteer format
     */
    mapPageSize(pageSize) {
        const sizeMap = {
            'A4': 'A4',
            'A3': 'A3',
            'A5': 'A5',
            'Letter': 'Letter',
            'Legal': 'Legal',
            'Tabloid': 'Tabloid',
        };
        return sizeMap[pageSize] || 'A4';
    }
    /**
     * Close browser instance
     */
    async close() {
        if (this.browser) {
            await this.browser.close();
            this.browser = null;
        }
    }
    /**
     * Generate PDF with automatic cleanup
     */
    async generatePDFWithCleanup(html, outputPath, options) {
        try {
            await this.generatePDF(html, outputPath, options);
        }
        finally {
            await this.close();
        }
    }
}
exports.PdfGenerator = PdfGenerator;
// Made with Bob
//# sourceMappingURL=pdf-generator.js.map