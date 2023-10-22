import { MoveTreeNodeArgs, TreeNode, TreeNodeID } from "./types.ts";
import { create } from "mutative";

export function findNodeById(
  nodes: TreeNode[],
  id: TreeNodeID,
): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) {
      return node;
    } else if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) {
        return found;
      }
    }
  }
  return undefined;
}

export function handleToggleCollapse(
  node: TreeNode,
  nodes: TreeNode[],
  setNodes: (nodes: TreeNode[]) => void,
) {
  const newNodes = create(nodes, (draft) => {
    const found = findNodeById(draft, node.id);
    if (found) {
      found.isCollapsed = !found.isCollapsed;
    }
  });
  setNodes(newNodes);
}

export function handleMoveNode(
  moveData: MoveTreeNodeArgs,
  nodes: TreeNode[],
  setNodes: (nodes: TreeNode[]) => void,
) {
  const newNodes = create(nodes, (draft) => {
    if (moveData.newParentNode) {
      const newParentNode = findNodeById(draft, moveData.newParentNode?.id);
      if (newParentNode) {
        const oldParentNode = findNodeById(draft, moveData.oldParentNode.id);
        if (oldParentNode?.children) {
          oldParentNode.children.splice(moveData.oldParentChildIndex, 1);
          if (!newParentNode.children) {
            newParentNode.children = [];
          }
          newParentNode.children.splice(
            moveData.newParentChildIndex,
            0,
            moveData.node,
          );
        }
      }
    }
  });
  setNodes(newNodes);
}
