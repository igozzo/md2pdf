/**
 * Input validation utilities
 */

import * as fs from 'fs-extra';
import * as path from 'path';
import { FileNotFoundError, InvalidMarkdownError } from './errors';

/**
 * Validate that a file exists and is readable
 */
export async function validateInputFile(filePath: string): Promise<void> {
  try {
    const stats = await fs.stat(filePath);
    if (!stats.isFile()) {
      throw new FileNotFoundError(filePath);
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new FileNotFoundError(filePath);
    }
    throw error;
  }
}

/**
 * Validate markdown content
 */
export function validateMarkdownContent(content: string): void {
  if (!content || content.trim().length === 0) {
    throw new InvalidMarkdownError('Content is empty');
  }
}

/**
 * Validate output path
 */
export async function validateOutputPath(outputPath: string): Promise<void> {
  const dir = path.dirname(outputPath);
  
  try {
    await fs.ensureDir(dir);
  } catch (error) {
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
export async function isDirectory(filePath: string): Promise<boolean> {
  try {
    const stats = await fs.stat(filePath);
    return stats.isDirectory();
  } catch {
    return false;
  }
}

/**
 * Validate theme name or path
 */
export function validateTheme(theme: string): boolean {
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
