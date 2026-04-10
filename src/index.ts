/**
 * md2pdf - Markdown to PDF Converter
 * Main library export
 */

// Main converter class and functions
export { MarkdownConverter, convertMarkdownToPDF, convertStringToPDF } from './converter';

// Parser
export { MarkdownParser } from './parser';

// Renderer
export { HtmlRenderer } from './renderer';

// PDF Generator
export { PdfGenerator } from './pdf-generator';

// Processors
export { CodeProcessor } from './processors/code';
export { MermaidProcessor } from './processors/mermaid';
export { MathProcessor } from './processors/math';

// Types
export type {
  ConversionOptions,
  ConversionResult,
  ProcessedContent,
  MarkdownMetadata,
  PageSize,
  PageOrientation,
  PageMargins,
  ThemeName,
  ThemeColors,
  ThemeFonts,
  ThemeSpacing,
  ThemeCustomization,
  Theme,
} from './types';

// Utilities
export { mergeOptions, validateOptions, normalizeMargins, DEFAULT_OPTIONS } from './utils/config';
export {
  validateInputFile,
  validateOutputPath,
  validateMarkdownContent,
  validateTheme,
  isDirectory,
} from './utils/validators';

// Errors
export {
  Md2PdfError,
  FileNotFoundError,
  InvalidMarkdownError,
  ThemeNotFoundError,
  PdfGenerationError,
  ConfigurationError,
  MermaidRenderError,
  MathRenderError,
} from './utils/errors';

// Made with Bob
