import { TreeNode, TreeNodeID } from "./types.ts";
import { addNodeAfter, addNodeInto, deleteNode } from "./node-utils.ts";

export function NodeActions({
  nodes,
  node,
  setNodes,
  setEditMode,
  setSelected,
}: {
  nodes: TreeNode[];
  node: TreeNode;
  setNodes: (nodes: TreeNode[]) => void;
  setEditMode: (editMode: boolean) => void;
  setSelected: (id: TreeNodeID | undefined) => unknown;
}) {
  const rm = () => deleteNode(nodes, node.id, setNodes);
  const addInto = () => {
    const newId = addNodeInto(nodes, node.id, setNodes);
    if (newId) {
      setTimeout(() => {
        setSelected(newId);
        setEditMode(true);
      }, 0);
    }
  };
  const addAfter = () => {
    const newId = addNodeAfter(nodes, node.id, setNodes);
    if (newId) {
      setTimeout(() => {
        setSelected(newId);
        setEditMode(true);
      }, 0);
    }
  };
  const edit = () => setEditMode(true);

  return (
    <span className="NodeActions">
      <a onClick={edit}>✏️</a>
      <a onClick={rm}>❌</a>
      <a onClick={addInto}>⏩</a>
      <a onClick={addAfter}>⏬</a>
    </span>
  );
}
