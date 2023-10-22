import { MoveTreeNode, TreeNode, TreeNodeID } from "./types.ts";
import { useDropNode } from "./UseDropNode.tsx";

export function RenderNode(props: {
  node: TreeNode;
  toggleCollapse: (node: TreeNode) => void;
  onMoveNode: MoveTreeNode;
  selected: TreeNodeID | undefined;
  setSelected: (id: TreeNodeID | undefined) => unknown;
}) {
  const onClick = () => props.toggleCollapse(props.node);
  const { isDropping, dropRef } = useDropNode({
    parentNode: props.node,
    parentChildIndex: props.node.children?.length ?? 0,
    onMoveNode: props.onMoveNode,
  });

  return (
    <a onClick={() => props.setSelected(props.node.id)}>
      <div
        ref={dropRef}
        className={
          (isDropping ? "nodeDropping " : "") +
          (props.selected === props.node.id ? "selected" : "")
        }
      >
        {props.node.children?.length ? (
          <a className="collapseLink" onClick={onClick}>
            {props.node.isExpanded ? "⊖" : "⊕"}
          </a>
        ) : null}
        {props.node.title}
      </div>
    </a>
  );
}
