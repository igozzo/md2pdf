/**
 * Main converter class that orchestrates the conversion process
 */

import * as fs from 'fs-extra';
import { MarkdownParser } from './parser';
import { HtmlRenderer } from './renderer';
import { PdfGenerator } from './pdf-generator';
import { ConversionOptions, ConversionResult, ProcessedContent } from './types';
import { mergeOptions, validateOptions } from './utils/config';
import { validateInputFile, validateOutputPath, validateMarkdownContent } from './utils/validators';

export class MarkdownConverter {
  private parser: MarkdownParser;
  private renderer: HtmlRenderer;
  private pdfGenerator: PdfGenerator;
  private options: Required<ConversionOptions>;

  constructor(options: ConversionOptions = {}) {
    this.parser = new MarkdownParser();
    this.renderer = new HtmlRenderer();
    this.pdfGenerator = new PdfGenerator();
    this.options = mergeOptions(options);
    validateOptions(this.options);
  }

  /**
   * Convert markdown file to PDF
   */
  async convert(inputPath: string, outputPath: string): Promise<ConversionResult> {
    try {
      // Validate input file
      await validateInputFile(inputPath);
      
      // Validate output path
      await validateOutputPath(outputPath);

      // Read markdown content
      const markdown = await fs.readFile(inputPath, 'utf-8');
      validateMarkdownContent(markdown);

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
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Convert markdown string to PDF
   */
  async convertString(markdown: string, outputPath: string): Promise<ConversionResult> {
    try {
      validateMarkdownContent(markdown);
      await validateOutputPath(outputPath);

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
    } catch (error) {
      return {
        success: false,
        error: error as Error,
      };
    }
  }

  /**
   * Convert markdown to HTML (without PDF generation)
   */
  async markdownToHTML(markdown: string): Promise<string> {
    validateMarkdownContent(markdown);
    
    const processed = this.parser.parse(markdown);
    return await this.renderer.render(processed, this.options);
  }

  /**
   * Parse markdown and get processed content
   */
  parseMarkdown(markdown: string): ProcessedContent {
    validateMarkdownContent(markdown);
    return this.parser.parse(markdown);
  }

  /**
   * Update converter options
   */
  updateOptions(options: ConversionOptions): void {
    this.options = mergeOptions({ ...this.options, ...options });
    validateOptions(this.options);
  }

  /**
   * Get current options
   */
  getOptions(): Required<ConversionOptions> {
    return { ...this.options };
  }
}

/**
 * Convenience function for simple conversions
 */
export async function convertMarkdownToPDF(
  inputPath: string,
  outputPath: string,
  options?: ConversionOptions
): Promise<ConversionResult> {
  const converter = new MarkdownConverter(options);
  return await converter.convert(inputPath, outputPath);
}

/**
 * Convenience function for string conversions
 */
export async function convertStringToPDF(
  markdown: string,
  outputPath: string,
  options?: ConversionOptions
): Promise<ConversionResult> {
  const converter = new MarkdownConverter(options);
  return await converter.convertString(markdown, outputPath);
}

// Made with Bob
