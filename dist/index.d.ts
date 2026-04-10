/**
 * md2pdf - Markdown to PDF Converter
 * Main library export
 */
export { MarkdownConverter, convertMarkdownToPDF, convertStringToPDF } from './converter';
export { MarkdownParser } from './parser';
export { HtmlRenderer } from './renderer';
export { PdfGenerator } from './pdf-generator';
export { CodeProcessor } from './processors/code';
export { MermaidProcessor } from './processors/mermaid';
export { MathProcessor } from './processors/math';
export type { ConversionOptions, ConversionResult, ProcessedContent, MarkdownMetadata, PageSize, PageOrientation, PageMargins, ThemeName, ThemeColors, ThemeFonts, ThemeSpacing, ThemeCustomization, Theme, } from './types';
export { mergeOptions, validateOptions, normalizeMargins, DEFAULT_OPTIONS } from './utils/config';
export { validateInputFile, validateOutputPath, validateMarkdownContent, validateTheme, isDirectory, } from './utils/validators';
export { Md2PdfError, FileNotFoundError, InvalidMarkdownError, ThemeNotFoundError, PdfGenerationError, ConfigurationError, MermaidRenderError, MathRenderError, } from './utils/errors';
//# sourceMappingURL=index.d.ts.map