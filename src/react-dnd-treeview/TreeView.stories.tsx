import "./styles.css";
import { TreeView } from "./TreeView.tsx";

export default { title: "TreeView/demo", component: TreeView };

const initNodes = [
  {
    id: "A",
    title: "A",
    children: [
      { id: "A1", title: "A1" },
      { id: "A2", title: "A2" },
      { id: "A3", title: "A3" },
    ],
  },
  {
    id: "B",
    title: "B",
    children: [
      { id: "B1", title: "B1" },
      { id: "B2", title: "B2" },
    ],
  },
  {
    id: "C",
    title: "C",
    children: [
      {
        id: "C1",
        title: "C1",
        children: [
          { id: "C1x", title: "C1x" },
          { id: "C1y", title: "C1y" },
          { id: "C1z", title: "C1z" },
          { id: "C1zz", title: "C1zz" },
          { id: "C1zzz", title: "C1zzz" },
        ],
      },
    ],
  },
];

export const Exemple = () => <TreeView initNodes={initNodes}></TreeView>;
