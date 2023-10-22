import { MoveTreeNode, TreeNode } from "./types";
import { useDropNode } from "./UseDropNode.tsx";

export function InsertTarget({
  parentNode,
  parentChildIndex,
  insertBefore,
  onMoveNode,
}: {
  parentNode: TreeNode | undefined;
  parentChildIndex: number;
  insertBefore: boolean;
  onMoveNode: MoveTreeNode;
}) {
  const { canDrop, isDropping, dropRef } = useDropNode({
    parentNode,
    parentChildIndex,
    onMoveNode,
  });

  return (
    <div
      ref={dropRef}
      className={
        "insertTarget " +
        (insertBefore ? "insertBeforeTarget " : "insertAfterTarget ") +
        (canDrop ? "insertTargetCanDrop " : "") +
        (isDropping ? "insertTargetDropping" : "")
      }
    >
      <div className={isDropping ? "insertTargetMarkerDropping" : ""} />
    </div>
  );
}
