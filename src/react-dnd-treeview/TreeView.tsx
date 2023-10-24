import { useState } from "react";
import { MoveTreeNodeArgs, TreeNode, TreeNodeID } from "./types.ts";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import { handleMoveNode, handleToggleCollapse } from "./node-utils.ts";
import { TreeViewItemList } from "./TreeViewItemList.tsx";
import { NodeRenderer } from "./NodeRenderer.tsx";
import { isTouchDevice } from "../isTouchDevice.ts";

const backend = isTouchDevice() ? TouchBackend : HTML5Backend;

export function TreeView({ initNodes }: { initNodes: TreeNode[] }) {
  const [nodes, setNodes] = useState(initNodes);
  const [editMode, setEditMode] = useState(false);
  const [selected, setSelected] = useState<TreeNodeID | undefined>();
  const onMoveNode = (moveData: MoveTreeNodeArgs) =>
    handleMoveNode(moveData, nodes, setNodes);
  const toggleCollapse = (node: TreeNode) =>
    handleToggleCollapse(node, nodes, setNodes);
  const renderNode = (node: TreeNode) => (
    <NodeRenderer
      {...{
        nodes,
        setNodes,
        node,
        toggleCollapse,
        onMoveNode,
        selected,
        setSelected,
        editMode,
        setEditMode,
      }}
    />
  );

  return (
    <DndProvider backend={backend}>
      <TreeViewItemList {...{ nodes, renderNode, onMoveNode }} />
    </DndProvider>
  );
}
