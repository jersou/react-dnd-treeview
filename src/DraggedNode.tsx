import { TreeNode, TreeNodeID } from "./react-dnd-treeview";

export const TYPE = "TreeNode";

export interface DraggedNode {
  type: string;
  node: TreeNode;
  allSourceIDs: Set<TreeNodeID>;
  parentNode: TreeNode;
  parentChildIndex: number;
  precedingNode: TreeNode;
}
