import { isCollapsed, setNodes, someNode } from '@udecode/slate-plugins-common';
import { OnKeyDown, TElement } from '@udecode/slate-plugins-core';
import isHotkey from 'is-hotkey';
import { ResetBlockTypePluginOptions } from './types';

export const getResetNodeOnKeyDown = ({
  rules,
}: ResetBlockTypePluginOptions): OnKeyDown => (editor) => (event) => {
  let reset: boolean | undefined;

  if (editor.selection && isCollapsed(editor.selection)) {
    rules.forEach(({ types, defaultType, hotkey, predicate, onReset }) => {
      if (!event || (hotkey && isHotkey(hotkey, event))) {
        if (predicate(editor) && someNode(editor, { match: { type: types } })) {
          event?.preventDefault();

          setNodes<TElement>(editor, { type: defaultType });

          onReset?.(editor);

          reset = true;
        }
      }
    });
  }

  return reset;
};
