import classnames from "classnames";
import React from "react";
import { DragSourceMonitor, useDrag } from "react-dnd";

import {
  TreeNode,
  TreeNodeID,
  TreeNodeList,
  MoveTreeNode,
  TreeViewClassNames,
} from "./react-dnd-treeview";
import { DraggedNode, TYPE } from "./DraggedNode";
import { DroppableTreeViewInsertTarget } from "./InsertTarget";

const EMPTY_NODELIST: TreeNode[] = [];

export interface TreeViewItemProps {
  readonly parentNode: TreeNode;
  readonly parentChildIndex: number;
  readonly precedingNode: TreeNode;
  readonly node: TreeNode;
  readonly classNames: TreeViewClassNames;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
}

const gatherNodeIDs = (node: TreeNode): Set<TreeNodeID> => {
  const nodeIDs = new Set<TreeNodeID>([node.id]);
  if (node.children) {
    node.children.forEach((node) =>
      gatherNodeIDs(node).forEach((id) => nodeIDs.add(id))
    );
  }
  return nodeIDs;
};

const collectNodeDragProps = (monitor: DragSourceMonitor) => ({
  isDragging: monitor.isDragging(),
});

export function DraggableTreeViewItem(props: TreeViewItemProps) {
  const [{ isDragging }, dragRef] = useDrag({
    item: {
      type: TYPE,
      node: props.node,
      allSourceIDs: gatherNodeIDs(props.node),
      parentNode: props.parentNode,
      parentChildIndex: props.parentChildIndex,
      precedingNode: props.precedingNode,
    } as DraggedNode,
    collect: collectNodeDragProps,
  });

  return (
    <div
      ref={dragRef}
      className={classnames(props.classNames.node, {
        [props.classNames.nodeDragging]: isDragging,
      })}
      key={props.node.id}
    >
      <div>{props.renderNode(props.node)}</div>
      {props.node.isCollapsed ? null : (
        <div className={props.classNames.nodeChildren}>
          {props.node.children && props.node.children.length > 0 ? (
            <TreeViewItemList
              parentNode={props.node}
              nodes={props.node.children ? props.node.children : EMPTY_NODELIST}
              classNames={props.classNames}
              renderNode={props.renderNode}
              onMoveNode={props.onMoveNode}
            />
          ) : (
            <DroppableTreeViewInsertTarget
              insertBefore={false}
              parentNode={props.node}
              parentChildIndex={0}
              precedingNode={null}
              onMoveNode={props.onMoveNode}
            />
          )}
        </div>
      )}
    </div>
  );
}

export interface TreeViewItemListProps {
  readonly parentNode: TreeNode;
  readonly nodes: TreeNodeList;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly classNames: TreeViewClassNames;
  readonly onMoveNode: MoveTreeNode;
}

const nodesWithPredecessors = (
  nodes: TreeNode[]
): { node: TreeNode; precedingNode: TreeNode }[] =>
  nodes.map((node, index) => ({ node, precedingNode: nodes[index - 1] }));

// TODO: add a mechanism to apply the CSS equivalent:
// .nodePositioningWrapper:hover {
//   /* otherwise drop targets interfere with drag start */
//   z-index: 2;
// }

export function TreeViewItemList(props: TreeViewItemListProps) {
  return (
    <div className={props.classNames.nodeList}>
      {nodesWithPredecessors(props.nodes).map((node, index) => (
        <div
          key={node.node.id}
          style={{ position: "relative" }}
          className={props.classNames.nodePositioningWrapper}
        >
          {index === 0 ? (
            <DroppableTreeViewInsertTarget
              insertBefore={true}
              parentNode={props.parentNode}
              parentChildIndex={index}
              precedingNode={null}
              onMoveNode={props.onMoveNode}
            />
          ) : null}
          <DroppableTreeViewInsertTarget
            insertBefore={false}
            parentNode={props.parentNode}
            parentChildIndex={index + 1}
            precedingNode={node.node}
            onMoveNode={props.onMoveNode}
          />
          <DraggableTreeViewItem
            parentNode={props.parentNode}
            parentChildIndex={index}
            precedingNode={node.precedingNode}
            node={node.node}
            classNames={props.classNames}
            renderNode={props.renderNode}
            onMoveNode={props.onMoveNode}
          />
        </div>
      ))}
    </div>
  );
}
