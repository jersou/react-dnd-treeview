import { DragSourceMonitor, useDrag } from "react-dnd";
import { DraggedNode, MoveTreeNode, TreeNode, TreeNodeID, TYPE } from "./types";
import { InsertTarget } from "./InsertTarget";

function gatherNodeIDs(node: TreeNode): Set<TreeNodeID> {
  const nodeIDs = new Set<TreeNodeID>([node.id]);
  node.children?.forEach((node) =>
    gatherNodeIDs(node).forEach((id) => nodeIDs.add(id)),
  );
  return nodeIDs;
}

export type TreeViewItemProps = {
  readonly parentNode: TreeNode | undefined;
  readonly parentChildIndex: number;
  readonly node: TreeNode;
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
};

export function DraggableTreeViewItem(props: TreeViewItemProps) {
  const [{ isDragging }, dragRef] = useDrag({
    type: TYPE,
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: monitor.isDragging(),
    }),
    item: {
      type: TYPE,
      node: props.node,
      allSourceIDs: gatherNodeIDs(props.node),
      parentNode: props.parentNode,
      parentChildIndex: props.parentChildIndex,
    } as DraggedNode,
  });

  return (
    <div
      ref={dragRef}
      className={isDragging ? "node nodeDragging" : "node"}
      key={props.node.id}
    >
      <div>{props.renderNode(props.node)}</div>
      {props.node.isCollapsed ? null : (
        <div className={"nodeChildren"}>
          {props.node.children && props.node.children.length > 0 ? (
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

// TODO: add a mechanism to apply the CSS equivalent:
// .nodePositioningWrapper:hover {
//   /* otherwise drop targets interfere with drag start */
//   z-index: 2;
// }

export type TreeViewItemListProps = {
  readonly parentNode: TreeNode | undefined;
  readonly nodes: TreeNode[];
  readonly renderNode: (node: TreeNode) => JSX.Element;
  readonly onMoveNode: MoveTreeNode;
};

export function TreeViewItemList(props: TreeViewItemListProps) {
  return (
    <div className={"nodeList"}>
      {props.nodes.map((node, index) => (
        <div
          key={node.id}
          style={{ position: "relative" }}
          className={"nodePositioningWrapper"}
        >
          {index === 0 ? (
            <InsertTarget
              insertBefore={true}
              parentNode={props.parentNode}
              parentChildIndex={index}
              onMoveNode={props.onMoveNode}
            />
          ) : null}
          <InsertTarget
            insertBefore={false}
            parentNode={props.parentNode}
            parentChildIndex={index + 1}
            onMoveNode={props.onMoveNode}
          />
          <DraggableTreeViewItem
            parentNode={props.parentNode}
            parentChildIndex={index}
            node={node}
            renderNode={props.renderNode}
            onMoveNode={props.onMoveNode}
          />
        </div>
      ))}
    </div>
  );
}
