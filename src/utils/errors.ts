/**
 * Custom error classes for md2pdf
 */

export class Md2PdfError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Md2PdfError';
    Object.setPrototypeOf(this, Md2PdfError.prototype);
  }
}

export class FileNotFoundError extends Md2PdfError {
  constructor(filePath: string) {
    super(`File not found: ${filePath}`);
    this.name = 'FileNotFoundError';
    Object.setPrototypeOf(this, FileNotFoundError.prototype);
  }
}

export class InvalidMarkdownError extends Md2PdfError {
  constructor(message: string) {
    super(`Invalid markdown: ${message}`);
    this.name = 'InvalidMarkdownError';
    Object.setPrototypeOf(this, InvalidMarkdownError.prototype);
  }
}

export class ThemeNotFoundError extends Md2PdfError {
  constructor(themeName: string) {
    super(`Theme not found: ${themeName}`);
    this.name = 'ThemeNotFoundError';
    Object.setPrototypeOf(this, ThemeNotFoundError.prototype);
  }
}

export class PdfGenerationError extends Md2PdfError {
  constructor(message: string) {
    super(`PDF generation failed: ${message}`);
    this.name = 'PdfGenerationError';
    Object.setPrototypeOf(this, PdfGenerationError.prototype);
  }
}

export class ConfigurationError extends Md2PdfError {
  constructor(message: string) {
    super(`Configuration error: ${message}`);
    this.name = 'ConfigurationError';
    Object.setPrototypeOf(this, ConfigurationError.prototype);
  }
}

export class MermaidRenderError extends Md2PdfError {
  constructor(message: string) {
    super(`Mermaid rendering failed: ${message}`);
    this.name = 'MermaidRenderError';
    Object.setPrototypeOf(this, MermaidRenderError.prototype);
  }
}

export class MathRenderError extends Md2PdfError {
  constructor(message: string) {
    super(`Math rendering failed: ${message}`);
    this.name = 'MathRenderError';
    Object.setPrototypeOf(this, MathRenderError.prototype);
  }
}

// Made with Bob
