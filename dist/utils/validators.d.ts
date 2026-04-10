/**
 * Input validation utilities
 */
/**
 * Validate that a file exists and is readable
 */
export declare function validateInputFile(filePath: string): Promise<void>;
/**
 * Validate markdown content
 */
export declare function validateMarkdownContent(content: string): void;
/**
 * Validate output path
 */
export declare function validateOutputPath(outputPath: string): Promise<void>;
/**
 * Check if a path is a directory
 */
export declare function isDirectory(filePath: string): Promise<boolean>;
/**
 * Validate theme name or path
 */
export declare function validateTheme(theme: string): boolean;
//# sourceMappingURL=validators.d.ts.map