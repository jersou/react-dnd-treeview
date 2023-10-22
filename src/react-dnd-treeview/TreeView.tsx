import { useState } from "react";
import { MoveTreeNodeArgs, TreeNode, TreeNodeID } from "./types.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { handleMoveNode, handleToggleCollapse } from "./node-utils.ts";
import { TreeViewItemList } from "./TreeViewItemList.tsx";
import { RenderNode } from "./RenderNode.tsx";

export function TreeView({ initNodes }: { initNodes: TreeNode[] }) {
  const [nodes, setNodes] = useState(initNodes);
  const [selected, setSelected] = useState<TreeNodeID | undefined>();
  const onMoveNode = (moveData: MoveTreeNodeArgs) =>
    handleMoveNode(moveData, nodes, setNodes);
  const toggleCollapse = (node: TreeNode) =>
    handleToggleCollapse(node, nodes, setNodes);
  const renderNode = (node: TreeNode) => (
    <RenderNode
      {...{
        node,
        toggleCollapse,
        onMoveNode,
        selected,
        setSelected,
      }}
    />
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <TreeViewItemList {...{ nodes, renderNode, onMoveNode }} />
      <div>Selected = {selected}</div>
    </DndProvider>
  );
}
