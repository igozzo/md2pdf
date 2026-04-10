/**
 * Configuration utilities for md2pdf
 */
import { ConversionOptions, PageMargins } from '../types';
export declare const DEFAULT_MARGINS: PageMargins;
export declare const DEFAULT_OPTIONS: Required<ConversionOptions>;
/**
 * Normalize margins to PageMargins object
 */
export declare function normalizeMargins(margins: PageMargins | string | undefined): PageMargins;
/**
 * Merge user options with defaults
 */
export declare function mergeOptions(userOptions?: ConversionOptions): Required<ConversionOptions>;
/**
 * Validate conversion options
 */
export declare function validateOptions(options: ConversionOptions): void;
/**
 * Parse margin string (e.g., "20mm", "1in", "2cm")
 */
export declare function parseMargin(margin: string): string;
//# sourceMappingURL=config.d.ts.map