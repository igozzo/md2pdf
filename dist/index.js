"use strict";
/**
 * md2pdf - Markdown to PDF Converter
 * Main library export
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathRenderError = exports.MermaidRenderError = exports.ConfigurationError = exports.PdfGenerationError = exports.ThemeNotFoundError = exports.InvalidMarkdownError = exports.FileNotFoundError = exports.Md2PdfError = exports.isDirectory = exports.validateTheme = exports.validateMarkdownContent = exports.validateOutputPath = exports.validateInputFile = exports.DEFAULT_OPTIONS = exports.normalizeMargins = exports.validateOptions = exports.mergeOptions = exports.MathProcessor = exports.MermaidProcessor = exports.CodeProcessor = exports.PdfGenerator = exports.HtmlRenderer = exports.MarkdownParser = exports.convertStringToPDF = exports.convertMarkdownToPDF = exports.MarkdownConverter = void 0;
// Main converter class and functions
var converter_1 = require("./converter");
Object.defineProperty(exports, "MarkdownConverter", { enumerable: true, get: function () { return converter_1.MarkdownConverter; } });
Object.defineProperty(exports, "convertMarkdownToPDF", { enumerable: true, get: function () { return converter_1.convertMarkdownToPDF; } });
Object.defineProperty(exports, "convertStringToPDF", { enumerable: true, get: function () { return converter_1.convertStringToPDF; } });
// Parser
var parser_1 = require("./parser");
Object.defineProperty(exports, "MarkdownParser", { enumerable: true, get: function () { return parser_1.MarkdownParser; } });
// Renderer
var renderer_1 = require("./renderer");
Object.defineProperty(exports, "HtmlRenderer", { enumerable: true, get: function () { return renderer_1.HtmlRenderer; } });
// PDF Generator
var pdf_generator_1 = require("./pdf-generator");
Object.defineProperty(exports, "PdfGenerator", { enumerable: true, get: function () { return pdf_generator_1.PdfGenerator; } });
// Processors
var code_1 = require("./processors/code");
Object.defineProperty(exports, "CodeProcessor", { enumerable: true, get: function () { return code_1.CodeProcessor; } });
var mermaid_1 = require("./processors/mermaid");
Object.defineProperty(exports, "MermaidProcessor", { enumerable: true, get: function () { return mermaid_1.MermaidProcessor; } });
var math_1 = require("./processors/math");
Object.defineProperty(exports, "MathProcessor", { enumerable: true, get: function () { return math_1.MathProcessor; } });
// Utilities
var config_1 = require("./utils/config");
Object.defineProperty(exports, "mergeOptions", { enumerable: true, get: function () { return config_1.mergeOptions; } });
Object.defineProperty(exports, "validateOptions", { enumerable: true, get: function () { return config_1.validateOptions; } });
Object.defineProperty(exports, "normalizeMargins", { enumerable: true, get: function () { return config_1.normalizeMargins; } });
Object.defineProperty(exports, "DEFAULT_OPTIONS", { enumerable: true, get: function () { return config_1.DEFAULT_OPTIONS; } });
var validators_1 = require("./utils/validators");
Object.defineProperty(exports, "validateInputFile", { enumerable: true, get: function () { return validators_1.validateInputFile; } });
Object.defineProperty(exports, "validateOutputPath", { enumerable: true, get: function () { return validators_1.validateOutputPath; } });
Object.defineProperty(exports, "validateMarkdownContent", { enumerable: true, get: function () { return validators_1.validateMarkdownContent; } });
Object.defineProperty(exports, "validateTheme", { enumerable: true, get: function () { return validators_1.validateTheme; } });
Object.defineProperty(exports, "isDirectory", { enumerable: true, get: function () { return validators_1.isDirectory; } });
// Errors
var errors_1 = require("./utils/errors");
Object.defineProperty(exports, "Md2PdfError", { enumerable: true, get: function () { return errors_1.Md2PdfError; } });
Object.defineProperty(exports, "FileNotFoundError", { enumerable: true, get: function () { return errors_1.FileNotFoundError; } });
Object.defineProperty(exports, "InvalidMarkdownError", { enumerable: true, get: function () { return errors_1.InvalidMarkdownError; } });
Object.defineProperty(exports, "ThemeNotFoundError", { enumerable: true, get: function () { return errors_1.ThemeNotFoundError; } });
Object.defineProperty(exports, "PdfGenerationError", { enumerable: true, get: function () { return errors_1.PdfGenerationError; } });
Object.defineProperty(exports, "ConfigurationError", { enumerable: true, get: function () { return errors_1.ConfigurationError; } });
Object.defineProperty(exports, "MermaidRenderError", { enumerable: true, get: function () { return errors_1.MermaidRenderError; } });
Object.defineProperty(exports, "MathRenderError", { enumerable: true, get: function () { return errors_1.MathRenderError; } });
// Made with Bob
//# sourceMappingURL=index.js.map