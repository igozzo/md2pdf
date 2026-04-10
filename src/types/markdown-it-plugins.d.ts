/**
 * Type declarations for markdown-it plugins without official types
 */

declare module 'markdown-it-footnote' {
  import MarkdownIt from 'markdown-it';
  const footnote: MarkdownIt.PluginSimple;
  export default footnote;
}

declare module 'markdown-it-task-lists' {
  import MarkdownIt from 'markdown-it';
  interface TaskListsOptions {
    enabled?: boolean;
    label?: boolean;
    labelAfter?: boolean;
  }
  const taskLists: MarkdownIt.PluginWithOptions<TaskListsOptions>;
  export default taskLists;
}

declare module 'markdown-it-attrs' {
  import MarkdownIt from 'markdown-it';
  const attrs: MarkdownIt.PluginSimple;
  export default attrs;
}

// Made with Bob
