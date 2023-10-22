import { useState } from "react";
import { MoveTreeNodeArgs, TreeNode } from "./types.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TreeViewItemList } from "./Node.tsx";
import { handleMoveNode, handleToggleCollapse } from "./node-utils.ts";

export function renderNode(props: {
  node: TreeNode;
  toggleCollapse: (node: TreeNode) => void;
}) {
  return (
    <div>
      {props.node.children?.length ? (
        <a
          style={{ fontSize: "0.5em", verticalAlign: "middle" }}
          onClick={() => props.toggleCollapse(props.node)}
        >
          {props.node.isCollapsed ? "⊕" : "⊖"}
        </a>
      ) : null}
      Node: {props.node.title}
    </div>
  );
}

export function Treeview({ initNodes }: { initNodes: TreeNode[] }) {
  const [nodes, setNodes] = useState(initNodes);

  const onMoveNode = (moveData: MoveTreeNodeArgs) =>
    handleMoveNode(moveData, nodes, setNodes);
  const toggleCollapse = (node: TreeNode) =>
    handleToggleCollapse(node, nodes, setNodes);
  const render = (node: TreeNode) => renderNode({ node, toggleCollapse });

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={"treeView"}>
        <TreeViewItemList
          parentNode={undefined}
          nodes={nodes}
          renderNode={render}
          onMoveNode={onMoveNode}
        />
      </div>
    </DndProvider>
  );
}
