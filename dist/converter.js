"use strict";
/**
 * Main converter class that orchestrates the conversion process
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownConverter = void 0;
exports.convertMarkdownToPDF = convertMarkdownToPDF;
exports.convertStringToPDF = convertStringToPDF;
const fs = __importStar(require("fs-extra"));
const parser_1 = require("./parser");
const renderer_1 = require("./renderer");
const pdf_generator_1 = require("./pdf-generator");
const config_1 = require("./utils/config");
const validators_1 = require("./utils/validators");
class MarkdownConverter {
    constructor(options = {}) {
        this.parser = new parser_1.MarkdownParser();
        this.renderer = new renderer_1.HtmlRenderer();
        this.pdfGenerator = new pdf_generator_1.PdfGenerator();
        this.options = (0, config_1.mergeOptions)(options);
        (0, config_1.validateOptions)(this.options);
    }
    /**
     * Convert markdown file to PDF
     */
    async convert(inputPath, outputPath) {
        try {
            // Validate input file
            await (0, validators_1.validateInputFile)(inputPath);
            // Validate output path
            await (0, validators_1.validateOutputPath)(outputPath);
            // Read markdown content
            const markdown = await fs.readFile(inputPath, 'utf-8');
            (0, validators_1.validateMarkdownContent)(markdown);
            // Parse markdown
            const processed = this.parser.parse(markdown);
            // Render HTML
            const html = await this.renderer.render(processed, this.options);
            // Generate PDF
            await this.pdfGenerator.generatePDFWithCleanup(html, outputPath, this.options);
            return {
                success: true,
                outputPath,
                metadata: processed.metadata,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
            };
        }
    }
    /**
     * Convert markdown string to PDF
     */
    async convertString(markdown, outputPath) {
        try {
            (0, validators_1.validateMarkdownContent)(markdown);
            await (0, validators_1.validateOutputPath)(outputPath);
            // Parse markdown
            const processed = this.parser.parse(markdown);
            // Render HTML
            const html = await this.renderer.render(processed, this.options);
            // Generate PDF
            await this.pdfGenerator.generatePDFWithCleanup(html, outputPath, this.options);
            return {
                success: true,
                outputPath,
                metadata: processed.metadata,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error,
            };
        }
    }
    /**
     * Convert markdown to HTML (without PDF generation)
     */
    async markdownToHTML(markdown) {
        (0, validators_1.validateMarkdownContent)(markdown);
        const processed = this.parser.parse(markdown);
        return await this.renderer.render(processed, this.options);
    }
    /**
     * Parse markdown and get processed content
     */
    parseMarkdown(markdown) {
        (0, validators_1.validateMarkdownContent)(markdown);
        return this.parser.parse(markdown);
    }
    /**
     * Update converter options
     */
    updateOptions(options) {
        this.options = (0, config_1.mergeOptions)({ ...this.options, ...options });
        (0, config_1.validateOptions)(this.options);
    }
    /**
     * Get current options
     */
    getOptions() {
        return { ...this.options };
    }
}
exports.MarkdownConverter = MarkdownConverter;
/**
 * Convenience function for simple conversions
 */
async function convertMarkdownToPDF(inputPath, outputPath, options) {
    const converter = new MarkdownConverter(options);
    return await converter.convert(inputPath, outputPath);
}
/**
 * Convenience function for string conversions
 */
async function convertStringToPDF(markdown, outputPath, options) {
    const converter = new MarkdownConverter(options);
    return await converter.convertString(markdown, outputPath);
}
// Made with Bob
//# sourceMappingURL=converter.js.map