import { ReactEditor } from 'slate-react';
import { getCodeLineEntry } from './queries/getCodeLineEntry';
import { getIndentDepth } from './queries/getIndentDepth';
import { insertCodeLine } from './transforms/insertCodeLine';
import { WithCodeBlockOptions, WithCodeLineOptions } from './types';

export const withCodeBlock = (
  options: WithCodeBlockOptions & WithCodeLineOptions = {}
) => <T extends ReactEditor>(editor: T) => {
  const { insertBreak, insertText } = editor;
  const insertBreakCodeBlock = () => {
    if (editor.selection) return;
    const res = getCodeLineEntry(editor, {}, options);
    if (!res) return;
    const { codeBlock, codeLine } = res;
    const indentDepth = getIndentDepth(editor, {
      codeBlock,
      codeLine,
    });
    insertCodeLine(editor, indentDepth, options);
    return true;
  };
  editor.insertBreak = () => {
    if (insertBreakCodeBlock()) return;
    insertBreak();
  };
  /*

Editor.node(editor, Path.next(currentPath))


  editor.insertText = (text) => {
    const { selection } = editor;
    // FIXME: Make this an array rather than a single type
    const type = code_block_container.type;
    const [start] = Editor.nodes(editor, {
      match: matchCells,
      at: selection?.anchor.path,
    });
    const [end] = Editor.nodes(editor, {
      match: matchCells,
      at: selection?.focus.path,
    });
    const [startNode, startPath] = start;
    const prevElement = Path.next(startPath);
    const [endNode, endPath] = end;
    const nextElement = Path.next(endPath);
    if (nextElement.type === type) {
      // select the element before and call insertText
    } else if (prevElement.type === type) {
      // select the element after and call insertText
    } else if (
      //start or end of document
     ) {
        // select and insert a new default element
     } else {
       insertText(text);
     }
  };
   */

  return editor;
};
