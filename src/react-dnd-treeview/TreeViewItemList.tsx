import { MoveTreeNode, TreeNode } from "./types.ts";
import { InsertTarget } from "./InsertTarget.tsx";
import { DraggableTreeViewItem } from "./DraggableTreeViewItem.tsx";
import { ReactElement } from "react";

export function TreeViewItemList({
  nodes,
  parentNode,
  onMoveNode,
  renderNode,
}: {
  parentNode?: TreeNode;
  nodes: TreeNode[];
  renderNode: (node: TreeNode) => ReactElement;
  onMoveNode: MoveTreeNode;
}) {
  return (
    <div>
      {nodes.map((node, parentChildIndex) => (
        <div key={node.id} className="nodePositioningWrapper">
          {parentChildIndex === 0 ? (
            <InsertTarget
              insertBefore={true}
              {...{ onMoveNode, parentNode, parentChildIndex }}
            />
          ) : null}
          <InsertTarget
            insertBefore={false}
            parentChildIndex={parentChildIndex + 1}
            {...{ onMoveNode, parentNode }}
          />
          <DraggableTreeViewItem
            {...{ renderNode, onMoveNode, node, parentNode, parentChildIndex }}
          />
        </div>
      ))}
    </div>
  );
}
