import React from 'react';
import { TEditor } from '@udecode/slate-plugins-core';
import {
  ClassName,
  RootStyleSet,
  StyledElementProps,
} from '@udecode/slate-plugins-ui-fluent';
import { IStyle } from '@uifabric/styling';
import { Element, Path } from 'slate';

export interface DraggableStyleProps extends ClassName {
  direction: '' | 'top' | 'bottom';
  isDragging: boolean;

  // TODO: tbd
  selected?: boolean;
}

export interface DraggableStyleSet extends RootStyleSet {
  /**
   * Block and gutter.
   */
  blockAndGutter?: IStyle;

  /**
   * Block.
   */
  block?: IStyle;

  /**
   * Gutter at the left side of the editor.
   * It has the height of the block
   */
  gutterLeft?: IStyle;

  /**
   * Block toolbar wrapper in the gutter left.
   * It has the height of a line of the block.
   */
  blockToolbarWrapper?: IStyle;

  /**
   * Block toolbar in the gutter.
   */
  blockToolbar?: IStyle;

  /**
   * Button to dnd the block, in the block toolbar.
   */
  dragHandle?: IStyle;

  /**
   * Icon of the drag button, in the drag icon.
   */
  dragIcon?: IStyle;

  /**
   * Show a dropline above or below the block when dragging a block.
   */
  dropLine?: IStyle;
}

export interface DraggableProps
  extends StyledElementProps<{}, DraggableStyleProps, DraggableStyleSet> {
  componentRef?: any;

  /**
   * An override to render the drag handle.
   */
  onRenderDragHandle?: ({
    element,
  }: { element: Element } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) => JSX.Element;

  level?: number;
  filter?: (editor: TEditor, path: Path) => boolean;
  allowReadOnly?: boolean;
}
