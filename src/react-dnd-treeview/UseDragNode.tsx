import { DraggedNode, TreeNode, TYPE } from "./types.ts";
import { DragSourceMonitor, useDrag } from "react-dnd";
import { gatherNodeIDs } from "./node-utils.ts";

export function useDragNode(props: {
  node: TreeNode;
  parentNode: TreeNode | undefined;
  parentChildIndex: number;
}) {
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
  return { isDragging, dragRef };
}
