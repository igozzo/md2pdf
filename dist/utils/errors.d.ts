/**
 * Custom error classes for md2pdf
 */
export declare class Md2PdfError extends Error {
    constructor(message: string);
}
export declare class FileNotFoundError extends Md2PdfError {
    constructor(filePath: string);
}
export declare class InvalidMarkdownError extends Md2PdfError {
    constructor(message: string);
}
export declare class ThemeNotFoundError extends Md2PdfError {
    constructor(themeName: string);
}
export declare class PdfGenerationError extends Md2PdfError {
    constructor(message: string);
}
export declare class ConfigurationError extends Md2PdfError {
    constructor(message: string);
}
export declare class MermaidRenderError extends Md2PdfError {
    constructor(message: string);
}
export declare class MathRenderError extends Md2PdfError {
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map