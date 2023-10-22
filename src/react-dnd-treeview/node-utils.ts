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
      found.isExpanded = !found.isExpanded;
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
    const root = { children: draft, isExpanded: true };
    const newParentNode = moveData.newParentNode
      ? findNodeById(draft, moveData.newParentNode?.id)
      : root;

    if (newParentNode) {
      const oldParentNode = moveData.oldParentNode
        ? findNodeById(draft, moveData.oldParentNode.id)
        : root;
      if (oldParentNode?.children) {
        oldParentNode.children.splice(moveData.oldParentChildIndex, 1);
        if (!newParentNode.children) {
          newParentNode.children = [];
          newParentNode.isExpanded = true;
        }
        const newParentChildIndex =
          newParentNode === oldParentNode &&
          moveData.newParentChildIndex > moveData.oldParentChildIndex
            ? moveData.newParentChildIndex - 1
            : moveData.newParentChildIndex;
        newParentNode.children.splice(newParentChildIndex, 0, moveData.node);
      }
    }
  });

  setNodes(newNodes);
}

export function gatherNodeIDs(
  node: TreeNode,
  nodeIDs = new Set<TreeNodeID>(),
): Set<TreeNodeID> {
  nodeIDs.add(node.id);
  node.children?.forEach((node) => gatherNodeIDs(node, nodeIDs));
  return nodeIDs;
}
