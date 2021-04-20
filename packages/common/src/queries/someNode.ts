import { TEditor, TNode } from '@udecode/slate-plugins-core';
import { findNode, FindNodeOptions } from './findNode';

/**
 * Iterate through all of the nodes in the editor and break early for the first truthy match. Otherwise
 * returns false.
 */
export const someNode = <T extends TNode = TNode>(
  editor: TEditor,
  options: FindNodeOptions<T>
) => {
  return !!findNode<T>(editor, options);
};
