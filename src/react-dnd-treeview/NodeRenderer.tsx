import { MoveTreeNode, TreeNode, TreeNodeID } from "./types.ts";
import { useDropNode } from "./UseDropNode.tsx";
import { NodeActions } from "./NodeActions.tsx";
import { NodeEditor } from "./NodeEditor.tsx";

export function NodeRenderer(props: {
  nodes: TreeNode[];
  setNodes: (nodes: TreeNode[]) => void;
  node: TreeNode;
  toggleCollapse: (node: TreeNode) => void;
  onMoveNode: MoveTreeNode;
  selected: TreeNodeID | undefined;
  setSelected: (id: TreeNodeID | undefined) => unknown;
  editMode: boolean;
  setEditMode: (editMode: boolean) => void;
}) {
  const onClick = () => props.toggleCollapse(props.node);
  const { isDropping, dropRef } = useDropNode({
    parentNode: props.node,
    parentChildIndex: props.node.children?.length ?? 0,
    onMoveNode: props.onMoveNode,
  });
  const isSelected = props.selected === props.node.id;
  const setSelected = () => {
    if (props.selected !== props.node.id) {
      props.setEditMode(false);
    }
    props.setSelected(props.node.id);
  };
  return (
    <a onClick={setSelected}>
      {props.editMode && isSelected ? (
        <NodeEditor
          node={props.node}
          nodes={props.nodes}
          setNodes={props.setNodes}
          setEditMode={props.setEditMode}
        />
      ) : (
        <div
          ref={dropRef}
          className={
            "RenderNodeContainer " +
            (isDropping ? "nodeDropping " : "") +
            (isSelected ? "selected" : "")
          }
        >
          {props.node.children?.length ? (
            <a
              className={
                "collapseLink " +
                (props.node.isExpanded ? "expanded" : "folded")
              }
              onClick={onClick}
            >
              ▶
            </a>
          ) : null}

          <div className="RenderNode" onClick={onClick}>
            {props.node.title}
            {isSelected && (
              <NodeActions
                node={props.node}
                nodes={props.nodes}
                setNodes={props.setNodes}
                setEditMode={props.setEditMode}
                setSelected={props.setSelected}
              />
            )}
          </div>
        </div>
      )}
    </a>
  );
}
