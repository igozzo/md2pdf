#!/usr/bin/env node

/**
 * CLI interface for md2pdf
 */

import { Command } from 'commander';
import chalk from 'chalk';
import * as path from 'path';
import * as fs from 'fs-extra';
import { convertMarkdownToPDF } from './converter';
import { ConversionOptions } from './types';

const program = new Command();

program
  .name('md2pdf')
  .description('Convert Markdown files to PDF with support for Mermaid diagrams, math equations, and syntax highlighting')
  .version('1.0.0');

program
  .argument('<input>', 'Input markdown file')
  .argument('[output]', 'Output PDF file (optional, defaults to input name with .pdf extension)')
  .option('-t, --theme <theme>', 'Theme to use (default, github, academic, minimal, dark, corporate, ibm, technical-report, book, executive-report, google, microsoft-365)', 'default')
  .option('-p, --page-size <size>', 'Page size (A4, A3, A5, Letter, Legal, Tabloid)', 'A4')
  .option('-o, --orientation <orientation>', 'Page orientation (portrait, landscape)', 'portrait')
  .option('-m, --margins <margins>', 'Page margins (e.g., "20mm" or "20mm 30mm 20mm 30mm")', '20mm')
  .option('--no-mermaid', 'Disable Mermaid diagram rendering')
  .option('--no-math', 'Disable math equation rendering')
  .option('--no-syntax-highlight', 'Disable syntax highlighting')
  .option('--toc', 'Enable table of contents')
  .option('--title <title>', 'Document title')
  .option('--author <author>', 'Document author')
  .option('--subject <subject>', 'Document subject')
  .option('--keywords <keywords>', 'Document keywords')
  .option('--header-footer', 'Display header and footer')
  .option('--config <path>', 'Path to configuration file')
  .option('-v, --verbose', 'Verbose output')
  .action(async (input: string, output: string | undefined, options: any) => {
    try {
      // Determine output path
      const outputPath = output || input.replace(/\.md$/i, '.pdf');

      if (options.verbose) {
        console.log(chalk.blue('Input:'), input);
        console.log(chalk.blue('Output:'), outputPath);
        console.log(chalk.blue('Theme:'), options.theme);
      }

      // Load config file if specified
      let configOptions: ConversionOptions = {};
      if (options.config) {
        try {
          const configContent = await fs.readFile(options.config, 'utf-8');
          configOptions = JSON.parse(configContent);
          if (options.verbose) {
            console.log(chalk.blue('Loaded config from:'), options.config);
          }
        } catch (error) {
          console.error(chalk.red('Error loading config file:'), error);
          process.exit(1);
        }
      }

      // Parse margins
      let margins: any = options.margins;
      if (typeof margins === 'string') {
        const parts = margins.split(/\s+/);
        if (parts.length === 1) {
          margins = parts[0];
        } else if (parts.length === 4) {
          margins = {
            top: parts[0],
            right: parts[1],
            bottom: parts[2],
            left: parts[3],
          };
        }
      }

      // Build conversion options
      const conversionOptions: ConversionOptions = {
        ...configOptions,
        theme: options.theme,
        pageSize: options.pageSize,
        orientation: options.orientation,
        margins,
        enableMermaid: options.mermaid !== false,
        enableMath: options.math !== false,
        enableSyntaxHighlight: options.syntaxHighlight !== false,
        enableTableOfContents: options.toc || false,
        displayHeaderFooter: options.headerFooter || false,
        title: options.title,
        author: options.author,
        subject: options.subject,
        keywords: options.keywords,
      };

      // Show progress
      console.log(chalk.cyan('Converting markdown to PDF...'));

      // Convert
      const result = await convertMarkdownToPDF(input, outputPath, conversionOptions);

      if (result.success) {
        console.log(chalk.green('✓ PDF generated successfully:'), result.outputPath);
        
        if (result.metadata && Object.keys(result.metadata).length > 0) {
          console.log(chalk.gray('Metadata:'));
          for (const [key, value] of Object.entries(result.metadata)) {
            console.log(chalk.gray(`  ${key}:`), value);
          }
        }
      } else {
        console.error(chalk.red('✗ Conversion failed:'), result.error?.message);
        process.exit(1);
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// Batch conversion command
program
  .command('batch')
  .description('Convert multiple markdown files to PDF')
  .argument('<pattern>', 'File pattern (e.g., "*.md" or "docs/**/*.md")')
  .option('-o, --output-dir <dir>', 'Output directory', './output')
  .option('-t, --theme <theme>', 'Theme to use', 'default')
  .option('--config <path>', 'Path to configuration file')
  .action(async (pattern: string, options: any) => {
    try {
      const glob = require('glob');
      const files = glob.sync(pattern);

      if (files.length === 0) {
        console.log(chalk.yellow('No files found matching pattern:'), pattern);
        return;
      }

      console.log(chalk.cyan(`Found ${files.length} file(s) to convert`));

      // Ensure output directory exists
      await fs.ensureDir(options.outputDir);

      // Load config if specified
      let configOptions: ConversionOptions = {};
      if (options.config) {
        const configContent = await fs.readFile(options.config, 'utf-8');
        configOptions = JSON.parse(configContent);
      }

      const conversionOptions: ConversionOptions = {
        ...configOptions,
        theme: options.theme,
      };

      let successCount = 0;
      let failCount = 0;

      for (const file of files) {
        const basename = path.basename(file, '.md');
        const outputPath = path.join(options.outputDir, `${basename}.pdf`);

        console.log(chalk.gray(`Converting: ${file}`));

        const result = await convertMarkdownToPDF(file, outputPath, conversionOptions);

        if (result.success) {
          console.log(chalk.green(`  ✓ ${outputPath}`));
          successCount++;
        } else {
          console.log(chalk.red(`  ✗ Failed: ${result.error?.message}`));
          failCount++;
        }
      }

      console.log(chalk.cyan('\nBatch conversion complete:'));
      console.log(chalk.green(`  Success: ${successCount}`));
      if (failCount > 0) {
        console.log(chalk.red(`  Failed: ${failCount}`));
      }
    } catch (error) {
      console.error(chalk.red('Error:'), error);
      process.exit(1);
    }
  });

// List themes command
program
  .command('themes')
  .description('List available themes')
  .action(() => {
    console.log(chalk.cyan('Available themes:'));
    const themes = [
      { name: 'default', description: 'Clean, professional styling' },
      { name: 'github', description: 'GitHub-style documentation' },
      { name: 'academic', description: 'Academic paper formatting' },
      { name: 'minimal', description: 'Minimalist design' },
      { name: 'dark', description: 'Dark mode theme' },
      { name: 'corporate', description: 'Corporate/business style' },
      { name: 'ibm', description: 'IBM Design Language inspired' },
      { name: 'technical-report', description: 'Technical documentation' },
      { name: 'book', description: 'Book-style formatting' },
      { name: 'executive-report', description: 'Executive summary style' },
      { name: 'google', description: 'Google Material styling' },
      { name: 'microsoft-365', description: 'Microsoft 365 Fluent UI styling' },
    ];

    for (const theme of themes) {
      console.log(chalk.green(`  ${theme.name.padEnd(20)}`), chalk.gray(theme.description));
    }
  });

program.parse();

// Made with Bob
