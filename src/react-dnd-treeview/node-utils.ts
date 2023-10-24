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

export function findPosition(
  parentNode: TreeNode,
  id: TreeNodeID,
): { parentNode: TreeNode; parentIndex: number } | undefined {
  if (parentNode.children) {
    for (const [parentIndex, node] of parentNode.children.entries()) {
      if (node.id === id) {
        return { parentNode, parentIndex };
      } else if (node.children) {
        const found = findPosition(node, id);
        if (found) {
          return found;
        }
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

export function deleteNode(
  nodes: TreeNode[],
  id: TreeNodeID,
  setNodes: (nodes: TreeNode[]) => void,
) {
  const newNodes = create(nodes, (draft) => {
    deleteNodeDraft(draft, id);
  });
  setNodes(newNodes);
}

function deleteNodeDraft(nodes: TreeNode[], id: TreeNodeID): boolean {
  for (const [index, node] of nodes.entries()) {
    if (node.id === id) {
      nodes.splice(index, 1);
      return true;
    } else if (node.children?.length && deleteNodeDraft(node.children, id)) {
      return true;
    }
  }
  return false;
}

export function addNodeAfter(
  nodes: TreeNode[],
  id: TreeNodeID,
  setNodes: (nodes: TreeNode[]) => void,
) {
  let newId: TreeNodeID | undefined = undefined;
  const newNodes = create(nodes, (draft) => {
    const pos = findPosition(
      { id: "root", children: draft, title: "root" },
      id,
    );
    if (pos) {
      newId = genNewId(nodes);
      const newNode: TreeNode = { id: newId, title: "--TODO--" };
      pos.parentNode.children?.splice(pos.parentIndex + 1, 0, newNode);
    }
  });
  setNodes(newNodes);
  return newId;
}

export function addNodeInto(
  nodes: TreeNode[],
  id: TreeNodeID,
  setNodes: (nodes: TreeNode[]) => void,
) {
  let newId: TreeNodeID | undefined = undefined;
  const newNodes = create(nodes, (draft) => {
    const node = findNodeById(draft, id);
    if (node) {
      newId = genNewId(nodes);
      const newNode: TreeNode = { id: newId, title: "--TODO--" };
      if (node.children) {
        node.children.push(newNode);
      } else {
        node.children = [newNode];
      }
      node.isExpanded = true;
    }
  });
  setNodes(newNodes);
  return newId;
}

function genNewId(nodes: TreeNode[]) {
  // TODO
  return crypto.randomUUID();
}

export function setNodeTitle(
  nodes: TreeNode[],
  id: TreeNodeID,
  newTitle: string,
  setNodes: (nodes: TreeNode[]) => void,
) {
  const newNodes = create(nodes, (draft) => {
    const node = findNodeById(draft, id);
    if (node) {
      node.title = newTitle;
    }
  });
  setNodes(newNodes);
}
