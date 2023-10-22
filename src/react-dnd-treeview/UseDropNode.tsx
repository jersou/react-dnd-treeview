import { DraggedNode, MoveTreeNode, TreeNode, TYPE } from "./types.ts";
import { DropTargetMonitor, useDrop } from "react-dnd";

export function useDropNode({
  parentNode,
  parentChildIndex,
  onMoveNode,
}: {
  parentNode: TreeNode | undefined;
  parentChildIndex: number;
  onMoveNode: MoveTreeNode;
}) {
  const [{ canDrop, isDropping }, dropRef] = useDrop({
    accept: TYPE,
    collect: (monitor: DropTargetMonitor) => ({
      canDrop: monitor.canDrop(),
      isDropping: monitor.isOver({ shallow: true }) && monitor.canDrop(),
    }),
    drop: (item: DraggedNode, monitor) =>
      monitor.didDrop()
        ? undefined // some child already handled drop
        : onMoveNode({
            oldParentNode: item.parentNode,
            oldParentChildIndex: item.parentChildIndex,
            node: item.node,
            newParentNode: parentNode,
            newParentChildIndex: parentChildIndex,
          }),
    canDrop: (item) =>
      !(
        parentNode === item.parentNode &&
        (parentChildIndex === item.parentChildIndex ||
          parentChildIndex === item.parentChildIndex + 1)
      ) &&
      (!parentNode || !item.allSourceIDs.has(parentNode.id)),
  });
  return { canDrop, isDropping, dropRef };
}
