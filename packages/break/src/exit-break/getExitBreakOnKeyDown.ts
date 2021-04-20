import {
  ELEMENT_DEFAULT,
  getBlockAbove,
  insertNodes,
  isExpanded,
  isSelectionAtBlockEnd,
  isSelectionAtBlockStart,
  queryNode,
} from '@udecode/slate-plugins-common';
import { OnKeyDown, TEditor, TElement } from '@udecode/slate-plugins-core';
import isHotkey from 'is-hotkey';
import { Editor, Path } from 'slate';
import { ExitBreakOnKeyDownOptions } from './types';

/**
 * Check if the selection is at the edge of its parent block.
 * If it is and if the selection is expanded, delete its content.
 */
export const exitBreakAtEdges = (
  editor: TEditor,
  {
    start,
    end,
  }: {
    start?: boolean;
    end?: boolean;
  }
) => {
  let queryEdge = false;
  let isEdge = false;
  let isStart = false;
  if (start || end) {
    queryEdge = true;

    if (start && isSelectionAtBlockStart(editor)) {
      isEdge = true;
      isStart = true;
    }

    if (end && isSelectionAtBlockEnd(editor)) {
      isEdge = true;
    }

    if (isEdge && isExpanded(editor.selection)) {
      editor.deleteFragment();
    }
  }

  return {
    queryEdge,
    isEdge,
    isStart,
  };
};

export const getExitBreakOnKeyDown = ({
  rules = [
    { hotkey: 'mod+enter' },
    { hotkey: 'mod+shift+enter', before: true },
  ],
}: ExitBreakOnKeyDownOptions = {}): OnKeyDown => (editor) => (event) => {
  const entry = getBlockAbove(editor);
  if (!entry) return;

  rules.forEach(
    ({
      hotkey,
      query = {},
      level = 0,
      before,
      defaultType = ELEMENT_DEFAULT,
    }) => {
      if (isHotkey(hotkey, event) && queryNode(entry, query)) {
        if (!editor.selection) return;

        const { queryEdge, isEdge, isStart } = exitBreakAtEdges(editor, query);
        if (isStart) before = true;

        if (queryEdge && !isEdge) return;

        event.preventDefault();

        const selectionPath = Editor.path(editor, editor.selection);

        let insertPath;
        if (before) {
          insertPath = selectionPath.slice(0, level + 1);
        } else {
          insertPath = Path.next(selectionPath.slice(0, level + 1));
        }

        insertNodes<TElement>(
          editor,
          { type: defaultType, children: [{ text: '' }] },
          {
            at: insertPath,
            select: !isStart,
          }
        );
      }
    }
  );
};
