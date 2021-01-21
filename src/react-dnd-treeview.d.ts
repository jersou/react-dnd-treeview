export type TreeNodeID = string | number;

export interface TreeNode {
  readonly id: TreeNodeID;
  readonly isCollapsed?: boolean;
  readonly children?: TreeNodeList;
}

export type TreeNodeList = TreeNode[];

export interface MoveTreeNodeArgs {
  oldParentNode: TreeNode;
  oldParentChildIndex: number;
  oldPrecedingNode: TreeNode;
  node: TreeNode;
  newParentNode: TreeNode;
  newParentChildIndex: number;
  newPrecedingNode: TreeNode;
}

export interface MoveTreeNode {
  (args: MoveTreeNodeArgs): void;
}

export interface TreeViewClassNames {
  readonly treeView: string;
  readonly nodeList: string;
  readonly node: string;
  readonly nodePositioningWrapper: string;
  readonly nodeDragging: string;
  readonly nodeChildren: string;
}

export interface TreeViewProps {
  readonly rootNodes: TreeNodeList;
  readonly classNames: TreeViewClassNames;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
}

export const TreeView: React.Factory<TreeViewProps>;
