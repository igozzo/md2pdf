/**
 * Type definitions for md2pdf
 */
export type PageSize = 'A4' | 'A3' | 'A5' | 'Letter' | 'Legal' | 'Tabloid';
export type PageOrientation = 'portrait' | 'landscape';
export type ThemeName = 'default' | 'github' | 'academic' | 'minimal' | 'dark' | 'corporate' | 'ibm' | 'technical-report' | 'book' | 'executive-report' | 'google' | 'microsoft-365';
export interface PageMargins {
    top: string;
    right: string;
    bottom: string;
    left: string;
}
export interface ThemeColors {
    primary?: string;
    secondary?: string;
    background?: string;
    text?: string;
    heading?: string;
    link?: string;
    code?: string;
    codeBackground?: string;
    border?: string;
    tableBorder?: string;
    tableHeaderBackground?: string;
    blockquoteBackground?: string;
    blockquoteBorder?: string;
}
export interface ThemeFonts {
    body?: string;
    heading?: string;
    code?: string;
    size?: string;
    lineHeight?: string;
}
export interface ThemeSpacing {
    paragraphSpacing?: string;
    headingSpacing?: string;
    listSpacing?: string;
    codeBlockSpacing?: string;
}
export interface ThemeCustomization {
    colors?: ThemeColors;
    fonts?: ThemeFonts;
    spacing?: ThemeSpacing;
    customCSS?: string;
}
export interface ConversionOptions {
    pageSize?: PageSize;
    orientation?: PageOrientation;
    margins?: PageMargins | string;
    theme?: ThemeName | string;
    themeCustomization?: ThemeCustomization;
    customCSS?: string;
    enableMermaid?: boolean;
    enableMath?: boolean;
    enableSyntaxHighlight?: boolean;
    enableTableOfContents?: boolean;
    displayHeaderFooter?: boolean;
    headerTemplate?: string;
    footerTemplate?: string;
    title?: string;
    author?: string;
    subject?: string;
    keywords?: string;
    scale?: number;
    printBackground?: boolean;
    preferCSSPageSize?: boolean;
}
export interface MarkdownMetadata {
    title?: string;
    author?: string;
    date?: string;
    [key: string]: any;
}
export interface ProcessedContent {
    html: string;
    metadata: MarkdownMetadata;
    hasMermaid: boolean;
    hasMath: boolean;
    hasCode: boolean;
}
export interface Theme {
    name: string;
    css: string;
    description?: string;
}
export interface ConversionResult {
    success: boolean;
    outputPath?: string;
    error?: Error;
    metadata?: MarkdownMetadata;
}
//# sourceMappingURL=index.d.ts.map