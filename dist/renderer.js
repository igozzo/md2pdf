"use strict";
/**
 * HTML renderer that combines markdown, processors, and themes
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
exports.HtmlRenderer = void 0;
const fs = __importStar(require("fs-extra"));
const path = __importStar(require("path"));
const code_1 = require("./processors/code");
const mermaid_1 = require("./processors/mermaid");
const math_1 = require("./processors/math");
const errors_1 = require("./utils/errors");
class HtmlRenderer {
    constructor() {
        this.codeProcessor = new code_1.CodeProcessor();
        this.mermaidProcessor = new mermaid_1.MermaidProcessor();
        this.mathProcessor = new math_1.MathProcessor();
    }
    /**
     * Render complete HTML document from processed markdown
     */
    async render(content, options) {
        let html = content.html;
        // Apply processors based on options and content
        if (options.enableSyntaxHighlight && content.hasCode) {
            html = this.codeProcessor.process(html);
        }
        if (options.enableMermaid && content.hasMermaid) {
            html = this.mermaidProcessor.process(html);
        }
        if (options.enableMath && content.hasMath) {
            html = this.mathProcessor.process(html);
        }
        // Build complete HTML document
        return this.buildHtmlDocument(html, content, options);
    }
    /**
     * Build complete HTML document with head and body
     */
    async buildHtmlDocument(bodyHtml, content, options) {
        const title = options.title || content.metadata.title || 'Document';
        const author = options.author || content.metadata.author || '';
        return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${this.escapeHtml(title)}</title>
  ${author ? `<meta name="author" content="${this.escapeHtml(author)}">` : ''}
  ${options.subject ? `<meta name="subject" content="${this.escapeHtml(options.subject)}">` : ''}
  ${options.keywords ? `<meta name="keywords" content="${this.escapeHtml(options.keywords)}">` : ''}
  
  ${await this.getStylesheets(options, content)}
  ${this.getScripts(options, content)}
</head>
<body>
  ${options.enableTableOfContents ? this.generateTableOfContents(bodyHtml) : ''}
  <div class="markdown-body">
    ${bodyHtml}
  </div>
</body>
</html>`;
    }
    /**
     * Get all required stylesheets
     */
    async getStylesheets(options, content) {
        const styles = [];
        // Add theme CSS
        const themeCSS = await this.loadTheme(options.theme);
        styles.push(`<style>\n${themeCSS}\n</style>`);
        // Add syntax highlighting CSS
        if (options.enableSyntaxHighlight && content.hasCode) {
            styles.push(`<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css">`);
        }
        // Add KaTeX CSS
        if (options.enableMath && content.hasMath) {
            styles.push(this.mathProcessor.getKatexCSS());
            styles.push(`<style>\n${this.mathProcessor.getMathCSS()}\n</style>`);
        }
        // Add Mermaid CSS
        if (options.enableMermaid && content.hasMermaid) {
            styles.push(`<style>\n${this.mermaidProcessor.getMermaidCSS()}\n</style>`);
        }
        // Add custom CSS from theme customization
        if (options.themeCustomization.customCSS) {
            styles.push(`<style>\n${options.themeCustomization.customCSS}\n</style>`);
        }
        // Add theme customization CSS
        const customizationCSS = this.buildCustomizationCSS(options.themeCustomization);
        if (customizationCSS) {
            styles.push(`<style>\n${customizationCSS}\n</style>`);
        }
        // Add custom CSS
        if (options.customCSS) {
            styles.push(`<style>\n${options.customCSS}\n</style>`);
        }
        return styles.join('\n  ');
    }
    /**
     * Get required scripts
     */
    getScripts(options, content) {
        const scripts = [];
        // Add Mermaid script
        if (options.enableMermaid && content.hasMermaid) {
            scripts.push(this.mermaidProcessor.getMermaidScript());
        }
        return scripts.join('\n  ');
    }
    /**
     * Load theme CSS
     */
    async loadTheme(themeName) {
        // Check if it's a built-in theme
        const builtInThemes = [
            'default', 'github', 'academic', 'minimal', 'dark',
            'corporate', 'ibm', 'technical-report', 'book', 'executive-report'
        ];
        if (builtInThemes.includes(themeName)) {
            const themePath = path.join(__dirname, 'styles', 'themes', `${themeName}.css`);
            try {
                return await fs.readFile(themePath, 'utf-8');
            }
            catch (error) {
                // If theme file doesn't exist yet, fall back to default
                if (themeName !== 'default') {
                    console.warn(`Theme '${themeName}' not found, falling back to default`);
                    const defaultPath = path.join(__dirname, 'styles', 'themes', 'default.css');
                    return await fs.readFile(defaultPath, 'utf-8');
                }
                throw new errors_1.ThemeNotFoundError(themeName);
            }
        }
        // Check if it's a custom theme file path
        if (themeName.endsWith('.css')) {
            try {
                return await fs.readFile(themeName, 'utf-8');
            }
            catch (error) {
                throw new errors_1.ThemeNotFoundError(themeName);
            }
        }
        throw new errors_1.ThemeNotFoundError(themeName);
    }
    /**
     * Build CSS from theme customization
     */
    buildCustomizationCSS(customization) {
        const cssRules = [];
        if (customization.colors) {
            const colorVars = [];
            if (customization.colors.primary)
                colorVars.push(`--primary-color: ${customization.colors.primary};`);
            if (customization.colors.secondary)
                colorVars.push(`--secondary-color: ${customization.colors.secondary};`);
            if (customization.colors.background)
                colorVars.push(`--background-color: ${customization.colors.background};`);
            if (customization.colors.text)
                colorVars.push(`--text-color: ${customization.colors.text};`);
            if (customization.colors.heading)
                colorVars.push(`--heading-color: ${customization.colors.heading};`);
            if (customization.colors.link)
                colorVars.push(`--link-color: ${customization.colors.link};`);
            if (customization.colors.code)
                colorVars.push(`--code-color: ${customization.colors.code};`);
            if (customization.colors.codeBackground)
                colorVars.push(`--code-background: ${customization.colors.codeBackground};`);
            if (customization.colors.border)
                colorVars.push(`--border-color: ${customization.colors.border};`);
            if (colorVars.length > 0) {
                cssRules.push(`:root {\n  ${colorVars.join('\n  ')}\n}`);
            }
        }
        if (customization.fonts) {
            const fontRules = [];
            if (customization.fonts.body)
                fontRules.push(`font-family: ${customization.fonts.body};`);
            if (customization.fonts.size)
                fontRules.push(`font-size: ${customization.fonts.size};`);
            if (customization.fonts.lineHeight)
                fontRules.push(`line-height: ${customization.fonts.lineHeight};`);
            if (fontRules.length > 0) {
                cssRules.push(`body {\n  ${fontRules.join('\n  ')}\n}`);
            }
            if (customization.fonts.heading) {
                cssRules.push(`h1, h2, h3, h4, h5, h6 {\n  font-family: ${customization.fonts.heading};\n}`);
            }
            if (customization.fonts.code) {
                cssRules.push(`code, pre {\n  font-family: ${customization.fonts.code};\n}`);
            }
        }
        if (customization.spacing) {
            const spacingRules = [];
            if (customization.spacing.paragraphSpacing) {
                spacingRules.push(`p { margin-bottom: ${customization.spacing.paragraphSpacing}; }`);
            }
            if (customization.spacing.headingSpacing) {
                spacingRules.push(`h1, h2, h3, h4, h5, h6 { margin-top: ${customization.spacing.headingSpacing}; }`);
            }
            if (customization.spacing.listSpacing) {
                spacingRules.push(`ul, ol { margin-bottom: ${customization.spacing.listSpacing}; }`);
            }
            if (customization.spacing.codeBlockSpacing) {
                spacingRules.push(`pre { margin: ${customization.spacing.codeBlockSpacing} 0; }`);
            }
            cssRules.push(...spacingRules);
        }
        return cssRules.join('\n\n');
    }
    /**
     * Generate table of contents from headings
     */
    generateTableOfContents(html) {
        const headingRegex = /<h([1-6])[^>]*id="([^"]+)"[^>]*>(.*?)<\/h\1>/g;
        const headings = [];
        let match;
        while ((match = headingRegex.exec(html)) !== null) {
            headings.push({
                level: parseInt(match[1]),
                id: match[2],
                text: match[3].replace(/<[^>]+>/g, ''), // Strip HTML tags
            });
        }
        if (headings.length === 0) {
            return '';
        }
        let toc = '<nav class="table-of-contents">\n<h2>Table of Contents</h2>\n<ul>\n';
        for (const heading of headings) {
            const indent = '  '.repeat(heading.level - 1);
            toc += `${indent}<li><a href="#${heading.id}">${this.escapeHtml(heading.text)}</a></li>\n`;
        }
        toc += '</ul>\n</nav>\n\n';
        return toc;
    }
    /**
     * Escape HTML special characters
     */
    escapeHtml(text) {
        return text
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, String.fromCharCode(38) + '#39;');
    }
}
exports.HtmlRenderer = HtmlRenderer;
// Made with Bob
//# sourceMappingURL=renderer.js.map