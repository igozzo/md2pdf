/**
 * Configuration utilities for md2pdf
 */

import { ConversionOptions, PageMargins } from '../types';
import { ConfigurationError } from './errors';

export const DEFAULT_MARGINS: PageMargins = {
  top: '20mm',
  right: '20mm',
  bottom: '20mm',
  left: '20mm',
};

export const DEFAULT_OPTIONS: Required<ConversionOptions> = {
  pageSize: 'A4',
  orientation: 'portrait',
  margins: DEFAULT_MARGINS,
  theme: 'default',
  themeCustomization: {},
  customCSS: '',
  enableMermaid: true,
  enableMath: true,
  enableSyntaxHighlight: true,
  enableTableOfContents: false,
  displayHeaderFooter: false,
  headerTemplate: '',
  footerTemplate: '',
  title: '',
  author: '',
  subject: '',
  keywords: '',
  scale: 1,
  printBackground: true,
  preferCSSPageSize: false,
};

/**
 * Normalize margins to PageMargins object
 */
export function normalizeMargins(margins: PageMargins | string | undefined): PageMargins {
  if (!margins) {
    return DEFAULT_MARGINS;
  }

  if (typeof margins === 'string') {
    return {
      top: margins,
      right: margins,
      bottom: margins,
      left: margins,
    };
  }

  return margins;
}

/**
 * Merge user options with defaults
 */
export function mergeOptions(userOptions: ConversionOptions = {}): Required<ConversionOptions> {
  const merged = {
    ...DEFAULT_OPTIONS,
    ...userOptions,
  };

  // Normalize margins
  merged.margins = normalizeMargins(userOptions.margins);

  // Merge theme customization
  if (userOptions.themeCustomization) {
    merged.themeCustomization = {
      ...DEFAULT_OPTIONS.themeCustomization,
      ...userOptions.themeCustomization,
      colors: {
        ...DEFAULT_OPTIONS.themeCustomization.colors,
        ...userOptions.themeCustomization.colors,
      },
      fonts: {
        ...DEFAULT_OPTIONS.themeCustomization.fonts,
        ...userOptions.themeCustomization.fonts,
      },
      spacing: {
        ...DEFAULT_OPTIONS.themeCustomization.spacing,
        ...userOptions.themeCustomization.spacing,
      },
    };
  }

  return merged;
}

/**
 * Validate conversion options
 */
export function validateOptions(options: ConversionOptions): void {
  if (options.scale !== undefined && (options.scale <= 0 || options.scale > 2)) {
    throw new ConfigurationError('Scale must be between 0 and 2');
  }

  const validPageSizes = ['A4', 'A3', 'A5', 'Letter', 'Legal', 'Tabloid'];
  if (options.pageSize && !validPageSizes.includes(options.pageSize)) {
    throw new ConfigurationError(`Invalid page size. Must be one of: ${validPageSizes.join(', ')}`);
  }

  const validOrientations = ['portrait', 'landscape'];
  if (options.orientation && !validOrientations.includes(options.orientation)) {
    throw new ConfigurationError(`Invalid orientation. Must be one of: ${validOrientations.join(', ')}`);
  }
}

/**
 * Parse margin string (e.g., "20mm", "1in", "2cm")
 */
export function parseMargin(margin: string): string {
  const validUnits = ['mm', 'cm', 'in', 'px', 'pt'];
  const hasValidUnit = validUnits.some(unit => margin.endsWith(unit));
  
  if (!hasValidUnit) {
    throw new ConfigurationError(`Invalid margin unit. Must be one of: ${validUnits.join(', ')}`);
  }
  
  return margin;
}

// Made with Bob
