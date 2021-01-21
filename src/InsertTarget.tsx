import React from "react";
import { DropTargetMonitor, useDrop } from "react-dnd";

import { TreeNode, MoveTreeNode } from "./react-dnd-treeview";
import { TYPE, DraggedNode } from "./DraggedNode";
import { Styles } from "./InsertTarget.styles";

export interface TreeViewInsertTargetProps {
  readonly parentNode: TreeNode;
  readonly parentChildIndex: number;
  readonly precedingNode: TreeNode;
  readonly insertBefore: boolean;
  readonly onMoveNode: MoveTreeNode;
}

const handleCanDrop = (
  item: DraggedNode,
  _monitor: DropTargetMonitor,
  props: TreeViewInsertTargetProps
) =>
  !(
    props.parentNode === item.parentNode &&
    (props.parentChildIndex === item.parentChildIndex ||
      props.parentChildIndex === item.parentChildIndex + 1)
  ) && !item.allSourceIDs.has(props.parentNode ? props.parentNode.id : null);

const handleDrop = (
  item: DraggedNode,
  _monitor: DropTargetMonitor,
  props: TreeViewInsertTargetProps
) => (
  props.onMoveNode({
    oldParentNode: item.parentNode,
    oldParentChildIndex: item.parentChildIndex,
    oldPrecedingNode: item.precedingNode,
    node: item.node,
    newParentNode: props.parentNode,
    newParentChildIndex: props.parentChildIndex,
    newPrecedingNode: props.precedingNode,
  }),
  {
    parentNode: props.parentNode,
    parentChildIndex: props.parentChildIndex,
  }
);

const collectNodeDropProps = (monitor: DropTargetMonitor) => ({
  canDrop: monitor.canDrop(),
  isDropping: monitor.isOver({ shallow: true }) && monitor.canDrop(),
});

export function DroppableTreeViewInsertTarget(
  props: TreeViewInsertTargetProps
) {
  const [{ canDrop, isDropping }, dropRef] = useDrop({
    accept: TYPE,
    collect: collectNodeDropProps,
    drop: (item: DraggedNode, monitor) =>
      monitor.didDrop()
        ? undefined // some child already handled drop
        : handleDrop(item as any, monitor, props),
    canDrop: (item, monitor) => handleCanDrop(item, monitor, props),
  });

  return (
    <div
      ref={dropRef}
      style={Object.assign(
        {},
        props.insertBefore
          ? Styles.insertBeforeTarget
          : Styles.insertAfterTarget,
        canDrop ? Styles.insertTargetCanDrop : {},
        isDropping ? Styles.insertTargetDropping : {}
      )}
    >
      <div style={isDropping ? Styles.insertTargetMarkerDropping : {}} />
    </div>
  );
}
