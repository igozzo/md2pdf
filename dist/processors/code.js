"use strict";
/**
 * Code syntax highlighting processor
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeProcessor = void 0;
const highlight_js_1 = __importDefault(require("highlight.js"));
class CodeProcessor {
    /**
     * Process HTML to add syntax highlighting to code blocks
     */
    process(html) {
        // Match code blocks with language specification
        const codeBlockRegex = /<pre><code class="language-(\w+)">([\s\S]*?)<\/code><\/pre>/g;
        return html.replace(codeBlockRegex, (match, lang, code) => {
            try {
                // Decode HTML entities
                const decodedCode = this.decodeHtmlEntities(code);
                // Highlight code
                const highlighted = highlight_js_1.default.highlight(decodedCode, {
                    language: lang,
                    ignoreIllegals: true,
                });
                return `<pre><code class="hljs language-${lang}">${highlighted.value}</code></pre>`;
            }
            catch (error) {
                // If highlighting fails, return original code block
                console.warn(`Failed to highlight code block with language: ${lang}`, error);
                return match;
            }
        });
    }
    /**
     * Get CSS for syntax highlighting theme
     */
    getHighlightCSS(theme = 'github') {
        // Return the CSS for the specified highlight.js theme
        // In a real implementation, you would load the actual CSS file
        // For now, we'll return a placeholder
        return `/* Highlight.js ${theme} theme will be loaded */`;
    }
    /**
     * Decode HTML entities in code
     */
    decodeHtmlEntities(text) {
        return text
            .replace(/&/g, '&')
            .replace(/</g, '<')
            .replace(/>/g, '>')
            .replace(/"/g, '"')
            .replace(/'/g, "'")
            .replace(/&#x2F;/g, '/');
    }
    /**
     * Get list of supported languages
     */
    getSupportedLanguages() {
        return highlight_js_1.default.listLanguages();
    }
    /**
     * Check if a language is supported
     */
    isLanguageSupported(language) {
        return highlight_js_1.default.getLanguage(language) !== undefined;
    }
}
exports.CodeProcessor = CodeProcessor;
// Made with Bob
//# sourceMappingURL=code.js.map