import { MoveTreeNode, TreeNode } from "./types";
import { InsertTarget } from "./InsertTarget";
import { TreeViewItemList } from "./TreeViewItemList.tsx";
import { ReactElement } from "react";
import { useDragNode } from "./UseDragNode.tsx";

export function DraggableTreeViewItem(props: {
  parentNode: TreeNode | undefined;
  parentChildIndex: number;
  node: TreeNode;
  renderNode: (node: TreeNode) => ReactElement;
  onMoveNode: MoveTreeNode;
}) {
  const { isDragging, dragRef } = useDragNode({
    node: props.node,
    parentNode: props.parentNode,
    parentChildIndex: props.parentChildIndex,
  });

  return (
    <div
      ref={dragRef}
      className={isDragging ? "node nodeDragging" : "node"}
      key={props.node.id}
    >
      <div>{props.renderNode(props.node)}</div>
      {!props.node.isExpanded && props.node.children?.length ? null : (
        <div className="nodeChildren">
          {props.node.children?.length ? (
            <TreeViewItemList
              parentNode={props.node}
              nodes={props.node.children ? props.node.children : []}
              renderNode={props.renderNode}
              onMoveNode={props.onMoveNode}
            />
          ) : (
            <InsertTarget
              insertBefore={false}
              parentNode={props.node}
              parentChildIndex={0}
              onMoveNode={props.onMoveNode}
            />
          )}
        </div>
      )}
    </div>
  );
}
