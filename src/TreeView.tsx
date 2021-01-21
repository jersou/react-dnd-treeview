import React from "react";

import { TreeViewProps } from "./react-dnd-treeview";
import "./InsertTarget";
import { TreeViewItemList } from "./Node";

export function TreeView(props: TreeViewProps) {
  return (
    <div className={props.classNames.treeView}>
      <TreeViewItemList
        parentNode={null}
        nodes={props.rootNodes}
        renderNode={props.renderNode}
        classNames={props.classNames}
        onMoveNode={props.onMoveNode}
      />
    </div>
  );
}
