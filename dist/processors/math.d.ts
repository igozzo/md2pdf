/**
 * Math equation processor using KaTeX
 */
export declare class MathProcessor {
    /**
     * Process HTML to render math equations
     */
    process(html: string): string;
    /**
     * Process block math equations
     */
    private processBlockMath;
    /**
     * Process inline math equations
     */
    private processInlineMath;
    /**
     * Get KaTeX CSS
     */
    getKatexCSS(): string;
    /**
     * Get custom CSS for math elements
     */
    getMathCSS(): string;
    /**
     * Extract math equations from HTML
     */
    extractEquations(html: string): {
        inline: string[];
        block: string[];
    };
    /**
     * Check if HTML contains math equations
     */
    hasMathEquations(html: string): boolean;
    /**
     * Validate math equation syntax
     */
    validateEquation(equation: string, displayMode?: boolean): boolean;
}
//# sourceMappingURL=math.d.ts.map