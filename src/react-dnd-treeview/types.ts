export type TreeNodeID = string | number;

export type TreeNode = {
  readonly id: TreeNodeID;
  title: string;
  isExpanded?: boolean;
  children?: TreeNode[];
};

export type MoveTreeNodeArgs = {
  oldParentNode: TreeNode;
  oldParentChildIndex: number;
  node: TreeNode;
  newParentNode: TreeNode | undefined;
  newParentChildIndex: number;
};

export type MoveTreeNode = (args: MoveTreeNodeArgs) => void;

export const TYPE = "TreeNode";

export type DraggedNode = {
  type: string;
  node: TreeNode;
  allSourceIDs: Set<TreeNodeID>;
  parentNode: TreeNode;
  parentChildIndex: number;
};
