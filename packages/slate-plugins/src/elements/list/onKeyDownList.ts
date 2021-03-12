import { Editor } from 'slate';
import { setDefaults } from '../../common';
import { isFirstChild } from '../../common/queries';
import { getListItemEntry } from './queries/getListItemEntry';
import { isAcrossListItems } from './queries/isAcrossListItems';
import { moveListItemDown } from './transforms/moveListItemDown';
import { moveListItemUp } from './transforms/moveListItemUp';
import { DEFAULTS_LIST } from './defaults';
import { toggleList } from './transforms';
import { ListOnKeyDownOptions } from './types';

export const onKeyDownList = (options?: ListOnKeyDownOptions) => (
  e: KeyboardEvent,
  editor: Editor
) => {
  let moved: boolean | undefined = false;

  console.log(e.key);

  if (e.key === 'Tab') {
    const res = getListItemEntry(editor, {}, options);
    if (!res) return;

    // TODO: handle multiple li
    if (isAcrossListItems(editor, options)) return;

    const { list, listItem } = res;
    const [, listItemPath] = listItem;

    e.preventDefault();

    // move up with shift+tab
    const shiftTab = e.shiftKey;
    if (shiftTab) {
      moved = moveListItemUp(editor, { list, listItem }, options);
      if (moved) e.preventDefault();
    }

    // move down with tab
    const tab = !e.shiftKey;
    if (tab && !isFirstChild(listItemPath)) {
      moveListItemDown(editor, { list, listItem }, options);
    }
  }

  const keys = ['ol', 'ul'];
  keys.forEach((keyItem) => {
    const keyOptions = setDefaults(options, DEFAULTS_LIST)[keyItem];
    const typeList = keyOptions.type;
    if (e.key === keyOptions.hotkey) {
      toggleList(editor, { typeList, ...keyOptions });
    }
  });
};
