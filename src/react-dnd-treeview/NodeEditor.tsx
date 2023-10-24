import { TreeNode } from "./types.ts";
import { useEffect, useRef } from "react";
import { setNodeTitle } from "./node-utils.ts";

export function NodeEditor(props: {
  node: TreeNode;
  nodes: TreeNode[];
  setNodes: (nodes: TreeNode[]) => void;
  setEditMode: (editMode: boolean) => void;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const edit = () => {
    const newTitle = ref.current?.value;
    setNodeTitle(props.nodes, props.node.id, newTitle ?? "", props.setNodes);
    props.setEditMode(false);
  };
  useEffect(() => {
    if (ref.current) {
      ref.current.value = props.node.title;
    }
  });
  return (
    <div className="nodeEditor">
      <input ref={ref} />
      <a onClick={edit}>✅</a>
      <a onClick={() => props.setEditMode(false)}>↩️</a>
    </div>
  );
}
