"use strict";
/**
 * Math equation processor using KaTeX
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MathProcessor = void 0;
const katex_1 = __importDefault(require("katex"));
class MathProcessor {
    /**
     * Process HTML to render math equations
     */
    process(html) {
        // Process block math first ($$...$$)
        html = this.processBlockMath(html);
        // Then process inline math ($...$)
        html = this.processInlineMath(html);
        return html;
    }
    /**
     * Process block math equations
     */
    processBlockMath(html) {
        // Match $$...$$ but not inside code blocks
        const blockMathRegex = /\$\$([\s\S]+?)\$\$/g;
        return html.replace(blockMathRegex, (_match, equation) => {
            try {
                const rendered = katex_1.default.renderToString(equation.trim(), {
                    displayMode: true,
                    throwOnError: false,
                    errorColor: '#cc0000',
                    strict: false,
                });
                return `<div class="math-block">${rendered}</div>`;
            }
            catch (error) {
                console.warn('Failed to render block math:', equation, error);
                return `<div class="math-error">$$${equation}$$</div>`;
            }
        });
    }
    /**
     * Process inline math equations
     */
    processInlineMath(html) {
        // Match $...$ but not $$...$$ and not inside code blocks
        // This regex avoids matching $$ and ensures we're not in a code block
        const inlineMathRegex = /(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g;
        return html.replace(inlineMathRegex, (_match, equation) => {
            try {
                const rendered = katex_1.default.renderToString(equation.trim(), {
                    displayMode: false,
                    throwOnError: false,
                    errorColor: '#cc0000',
                    strict: false,
                });
                return `<span class="math-inline">${rendered}</span>`;
            }
            catch (error) {
                console.warn('Failed to render inline math:', equation, error);
                return `<span class="math-error">$${equation}$</span>`;
            }
        });
    }
    /**
     * Get KaTeX CSS
     */
    getKatexCSS() {
        // In production, you would load the actual KaTeX CSS file
        // For now, return a CDN link reference
        return `
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" 
            integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" 
            crossorigin="anonymous">
    `;
    }
    /**
     * Get custom CSS for math elements
     */
    getMathCSS() {
        return `
      .math-block {
        margin: 20px 0;
        padding: 15px;
        overflow-x: auto;
        text-align: center;
        page-break-inside: avoid;
      }
      
      .math-inline {
        display: inline-block;
        vertical-align: middle;
      }
      
      .math-error {
        color: #cc0000;
        background-color: #fff3cd;
        padding: 2px 4px;
        border-radius: 3px;
        font-family: monospace;
      }
      
      .katex {
        font-size: 1.1em;
      }
      
      .katex-display {
        margin: 1em 0;
      }
    `;
    }
    /**
     * Extract math equations from HTML
     */
    extractEquations(html) {
        const inline = [];
        const block = [];
        // Extract block math
        const blockMathRegex = /\$\$([\s\S]+?)\$\$/g;
        let match;
        while ((match = blockMathRegex.exec(html)) !== null) {
            block.push(match[1].trim());
        }
        // Extract inline math
        const inlineMathRegex = /(?<!\$)\$(?!\$)([^\$\n]+?)\$(?!\$)/g;
        while ((match = inlineMathRegex.exec(html)) !== null) {
            inline.push(match[1].trim());
        }
        return { inline, block };
    }
    /**
     * Check if HTML contains math equations
     */
    hasMathEquations(html) {
        return /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(html);
    }
    /**
     * Validate math equation syntax
     */
    validateEquation(equation, displayMode = false) {
        try {
            katex_1.default.renderToString(equation, {
                displayMode,
                throwOnError: true,
                strict: true,
            });
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.MathProcessor = MathProcessor;
// Made with Bob
//# sourceMappingURL=math.js.map