"use strict";
/**
 * Markdown parser with support for extended features
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarkdownParser = void 0;
const markdown_it_1 = __importDefault(require("markdown-it"));
const markdown_it_footnote_1 = __importDefault(require("markdown-it-footnote"));
const markdown_it_task_lists_1 = __importDefault(require("markdown-it-task-lists"));
const markdown_it_attrs_1 = __importDefault(require("markdown-it-attrs"));
const errors_1 = require("./utils/errors");
class MarkdownParser {
    constructor() {
        this.md = new markdown_it_1.default({
            html: true,
            linkify: true,
            typographer: true,
            breaks: false,
        })
            .use(markdown_it_footnote_1.default)
            .use(markdown_it_task_lists_1.default, { enabled: true })
            .use(markdown_it_attrs_1.default);
        // Customize rendering for better PDF output
        this.customizeRenderer();
    }
    /**
     * Parse markdown content to HTML
     */
    parse(markdown) {
        if (!markdown || markdown.trim().length === 0) {
            throw new errors_1.InvalidMarkdownError('Content is empty');
        }
        // Extract metadata from frontmatter if present
        const { content, metadata } = this.extractMetadata(markdown);
        // Parse markdown to HTML
        const html = this.md.render(content);
        // Detect features used in the document
        const hasMermaid = this.detectMermaid(content);
        const hasMath = this.detectMath(content);
        const hasCode = this.detectCode(content);
        return {
            html,
            metadata,
            hasMermaid,
            hasMath,
            hasCode,
        };
    }
    /**
     * Extract YAML frontmatter metadata
     */
    extractMetadata(markdown) {
        const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
        const match = markdown.match(frontmatterRegex);
        if (!match) {
            return { content: markdown, metadata: {} };
        }
        const frontmatter = match[1];
        const content = markdown.slice(match[0].length);
        const metadata = {};
        // Simple YAML parser for common fields
        const lines = frontmatter.split('\n');
        for (const line of lines) {
            const colonIndex = line.indexOf(':');
            if (colonIndex > 0) {
                const key = line.slice(0, colonIndex).trim();
                const value = line.slice(colonIndex + 1).trim().replace(/^["']|["']$/g, '');
                metadata[key] = value;
            }
        }
        return { content, metadata };
    }
    /**
     * Detect Mermaid diagrams in markdown
     */
    detectMermaid(markdown) {
        return /```mermaid\s/i.test(markdown);
    }
    /**
     * Detect math equations in markdown
     */
    detectMath(markdown) {
        // Detect inline math: $...$
        // Detect block math: $$...$$
        return /\$\$[\s\S]+?\$\$|\$[^\$\n]+?\$/.test(markdown);
    }
    /**
     * Detect code blocks in markdown
     */
    detectCode(markdown) {
        return /```[\s\S]*?```|`[^`]+?`/.test(markdown);
    }
    /**
     * Customize markdown-it renderer for better PDF output
     */
    customizeRenderer() {
        // Store original rules
        const defaultRender = this.md.renderer.rules;
        // Customize table rendering
        this.md.renderer.rules.table_open = () => '<table class="md-table">\n';
        this.md.renderer.rules.table_close = () => '</table>\n';
        // Customize code block rendering
        const originalFence = defaultRender.fence;
        this.md.renderer.rules.fence = (tokens, idx, options, env, slf) => {
            const token = tokens[idx];
            const info = token.info ? token.info.trim() : '';
            const langName = info.split(/\s+/g)[0];
            // Check if it's a mermaid diagram
            if (langName.toLowerCase() === 'mermaid') {
                return `<div class="mermaid">\n${token.content}</div>\n`;
            }
            // Check if it's a math block
            if (langName.toLowerCase() === 'math') {
                return `<div class="math-block">$$${token.content}$$</div>\n`;
            }
            // Default code block rendering
            if (originalFence) {
                return originalFence(tokens, idx, options, env, slf);
            }
            return `<pre><code class="language-${langName}">${token.content}</code></pre>\n`;
        };
        // Customize heading rendering with anchors
        for (let i = 1; i <= 6; i++) {
            const headingOpen = `heading_open`;
            const originalHeadingOpen = defaultRender[headingOpen];
            this.md.renderer.rules[headingOpen] = (tokens, idx, options, env, slf) => {
                const token = tokens[idx];
                const level = token.tag;
                const nextToken = tokens[idx + 1];
                if (nextToken && nextToken.type === 'inline' && nextToken.content) {
                    const id = this.slugify(nextToken.content);
                    return `<${level} id="${id}" class="md-heading">`;
                }
                if (originalHeadingOpen) {
                    return originalHeadingOpen(tokens, idx, options, env, slf);
                }
                return `<${level} class="md-heading">`;
            };
        }
        // Customize blockquote rendering
        this.md.renderer.rules.blockquote_open = () => '<blockquote class="md-blockquote">\n';
        this.md.renderer.rules.blockquote_close = () => '</blockquote>\n';
        // Customize list rendering
        this.md.renderer.rules.bullet_list_open = () => '<ul class="md-list">\n';
        this.md.renderer.rules.ordered_list_open = () => '<ol class="md-list">\n';
    }
    /**
     * Create URL-friendly slug from text
     */
    slugify(text) {
        return text
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/[\s_-]+/g, '-')
            .replace(/^-+|-+$/g, '');
    }
}
exports.MarkdownParser = MarkdownParser;
// Made with Bob
//# sourceMappingURL=parser.js.map