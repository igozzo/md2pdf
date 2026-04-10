"use strict";
/**
 * Input validation utilities
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateInputFile = validateInputFile;
exports.validateMarkdownContent = validateMarkdownContent;
exports.validateOutputPath = validateOutputPath;
exports.isDirectory = isDirectory;
exports.validateTheme = validateTheme;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const errors_1 = require("./errors");
/**
 * Validate that a file exists and is readable
 */
async function validateInputFile(filePath) {
    try {
        const stats = await fs.stat(filePath);
        if (!stats.isFile()) {
            throw new errors_1.FileNotFoundError(filePath);
        }
    }
    catch (error) {
        if (error.code === 'ENOENT') {
            throw new errors_1.FileNotFoundError(filePath);
        }
        throw error;
    }
}
/**
 * Validate markdown content
 */
function validateMarkdownContent(content) {
    if (!content || content.trim().length === 0) {
        throw new errors_1.InvalidMarkdownError('Content is empty');
    }
}
/**
 * Validate output path
 */
async function validateOutputPath(outputPath) {
    const dir = path.dirname(outputPath);
    try {
        await fs.ensureDir(dir);
    }
    catch (error) {
        throw new Error(`Cannot create output directory: ${dir}`);
    }
    // Check if file extension is .pdf
    if (path.extname(outputPath).toLowerCase() !== '.pdf') {
        throw new Error('Output file must have .pdf extension');
    }
}
/**
 * Check if a path is a directory
 */
async function isDirectory(filePath) {
    try {
        const stats = await fs.stat(filePath);
        return stats.isDirectory();
    }
    catch {
        return false;
    }
}
/**
 * Validate theme name or path
 */
function validateTheme(theme) {
    const builtInThemes = [
        'default',
        'github',
        'academic',
        'minimal',
        'dark',
        'corporate',
        'ibm',
        'technical-report',
        'book',
        'executive-report',
    ];
    // Check if it's a built-in theme
    if (builtInThemes.includes(theme)) {
        return true;
    }
    // Check if it's a valid file path
    if (theme.endsWith('.css')) {
        return fs.existsSync(theme);
    }
    return false;
}
// Made with Bob
//# sourceMappingURL=validators.js.map