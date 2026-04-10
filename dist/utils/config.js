"use strict";
/**
 * Configuration utilities for md2pdf
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_OPTIONS = exports.DEFAULT_MARGINS = void 0;
exports.normalizeMargins = normalizeMargins;
exports.mergeOptions = mergeOptions;
exports.validateOptions = validateOptions;
exports.parseMargin = parseMargin;
const errors_1 = require("./errors");
exports.DEFAULT_MARGINS = {
    top: '20mm',
    right: '20mm',
    bottom: '20mm',
    left: '20mm',
};
exports.DEFAULT_OPTIONS = {
    pageSize: 'A4',
    orientation: 'portrait',
    margins: exports.DEFAULT_MARGINS,
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
function normalizeMargins(margins) {
    if (!margins) {
        return exports.DEFAULT_MARGINS;
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
function mergeOptions(userOptions = {}) {
    const merged = {
        ...exports.DEFAULT_OPTIONS,
        ...userOptions,
    };
    // Normalize margins
    merged.margins = normalizeMargins(userOptions.margins);
    // Merge theme customization
    if (userOptions.themeCustomization) {
        merged.themeCustomization = {
            ...exports.DEFAULT_OPTIONS.themeCustomization,
            ...userOptions.themeCustomization,
            colors: {
                ...exports.DEFAULT_OPTIONS.themeCustomization.colors,
                ...userOptions.themeCustomization.colors,
            },
            fonts: {
                ...exports.DEFAULT_OPTIONS.themeCustomization.fonts,
                ...userOptions.themeCustomization.fonts,
            },
            spacing: {
                ...exports.DEFAULT_OPTIONS.themeCustomization.spacing,
                ...userOptions.themeCustomization.spacing,
            },
        };
    }
    return merged;
}
/**
 * Validate conversion options
 */
function validateOptions(options) {
    if (options.scale !== undefined && (options.scale <= 0 || options.scale > 2)) {
        throw new errors_1.ConfigurationError('Scale must be between 0 and 2');
    }
    const validPageSizes = ['A4', 'A3', 'A5', 'Letter', 'Legal', 'Tabloid'];
    if (options.pageSize && !validPageSizes.includes(options.pageSize)) {
        throw new errors_1.ConfigurationError(`Invalid page size. Must be one of: ${validPageSizes.join(', ')}`);
    }
    const validOrientations = ['portrait', 'landscape'];
    if (options.orientation && !validOrientations.includes(options.orientation)) {
        throw new errors_1.ConfigurationError(`Invalid orientation. Must be one of: ${validOrientations.join(', ')}`);
    }
}
/**
 * Parse margin string (e.g., "20mm", "1in", "2cm")
 */
function parseMargin(margin) {
    const validUnits = ['mm', 'cm', 'in', 'px', 'pt'];
    const hasValidUnit = validUnits.some(unit => margin.endsWith(unit));
    if (!hasValidUnit) {
        throw new errors_1.ConfigurationError(`Invalid margin unit. Must be one of: ${validUnits.join(', ')}`);
    }
    return margin;
}
// Made with Bob
//# sourceMappingURL=config.js.map