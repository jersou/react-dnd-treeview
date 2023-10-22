import { DropTargetMonitor, useDrop } from "react-dnd";
import { DraggedNode, MoveTreeNode, TreeNode, TYPE } from "./types";

export type InsertTargetProps = {
  readonly parentNode: TreeNode | undefined;
  readonly parentChildIndex: number;
  readonly insertBefore: boolean;
  readonly onMoveNode: MoveTreeNode;
};

export function InsertTarget(props: InsertTargetProps) {
  const [{ canDrop, isDropping }, dropRef] = useDrop({
    accept: TYPE,
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isDropping: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: DraggedNode, monitor) =>
      monitor.didDrop()
        ? undefined // some child already handled drop
        : props.onMoveNode({
            oldParentNode: item.parentNode,
            oldParentChildIndex: item.parentChildIndex,
            node: item.node,
            newParentNode: props.parentNode,
            newParentChildIndex: props.parentChildIndex,
          }),
    canDrop: (item) =>
      !(
        props.parentNode === item.parentNode &&
        (props.parentChildIndex === item.parentChildIndex ||
          props.parentChildIndex === item.parentChildIndex + 1)
      ) &&
      (!props.parentNode || !item.allSourceIDs.has(props.parentNode.id)),
  });

  return (
    <div
      ref={dropRef}
      className={
        "insertTarget " +
        (props.insertBefore ? "insertBeforeTarget " : "insertAfterTarget ") +
        (canDrop ? "insertTargetCanDrop " : "") +
        (isDropping ? "insertTargetDropping" : "")
      }
    >
      <div className={isDropping ? "insertTargetMarkerDropping" : ""} />
    </div>
  );
}
