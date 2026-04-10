"use strict";
/**
 * Custom error classes for md2pdf
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathRenderError = exports.MermaidRenderError = exports.ConfigurationError = exports.PdfGenerationError = exports.ThemeNotFoundError = exports.InvalidMarkdownError = exports.FileNotFoundError = exports.Md2PdfError = void 0;
class Md2PdfError extends Error {
    constructor(message) {
        super(message);
        this.name = 'Md2PdfError';
        Object.setPrototypeOf(this, Md2PdfError.prototype);
    }
}
exports.Md2PdfError = Md2PdfError;
class FileNotFoundError extends Md2PdfError {
    constructor(filePath) {
        super(`File not found: ${filePath}`);
        this.name = 'FileNotFoundError';
        Object.setPrototypeOf(this, FileNotFoundError.prototype);
    }
}
exports.FileNotFoundError = FileNotFoundError;
class InvalidMarkdownError extends Md2PdfError {
    constructor(message) {
        super(`Invalid markdown: ${message}`);
        this.name = 'InvalidMarkdownError';
        Object.setPrototypeOf(this, InvalidMarkdownError.prototype);
    }
}
exports.InvalidMarkdownError = InvalidMarkdownError;
class ThemeNotFoundError extends Md2PdfError {
    constructor(themeName) {
        super(`Theme not found: ${themeName}`);
        this.name = 'ThemeNotFoundError';
        Object.setPrototypeOf(this, ThemeNotFoundError.prototype);
    }
}
exports.ThemeNotFoundError = ThemeNotFoundError;
class PdfGenerationError extends Md2PdfError {
    constructor(message) {
        super(`PDF generation failed: ${message}`);
        this.name = 'PdfGenerationError';
        Object.setPrototypeOf(this, PdfGenerationError.prototype);
    }
}
exports.PdfGenerationError = PdfGenerationError;
class ConfigurationError extends Md2PdfError {
    constructor(message) {
        super(`Configuration error: ${message}`);
        this.name = 'ConfigurationError';
        Object.setPrototypeOf(this, ConfigurationError.prototype);
    }
}
exports.ConfigurationError = ConfigurationError;
class MermaidRenderError extends Md2PdfError {
    constructor(message) {
        super(`Mermaid rendering failed: ${message}`);
        this.name = 'MermaidRenderError';
        Object.setPrototypeOf(this, MermaidRenderError.prototype);
    }
}
exports.MermaidRenderError = MermaidRenderError;
class MathRenderError extends Md2PdfError {
    constructor(message) {
        super(`Math rendering failed: ${message}`);
        this.name = 'MathRenderError';
        Object.setPrototypeOf(this, MathRenderError.prototype);
    }
}
exports.MathRenderError = MathRenderError;
// Made with Bob
//# sourceMappingURL=errors.js.map