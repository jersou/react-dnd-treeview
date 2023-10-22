import "./App.css";
import { Treeview } from "./react-dnd-treeview/Treeview.tsx";
import "./react-dnd-treeview/styles.css";

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

function App() {
  return <Treeview initNodes={initNodes}></Treeview>;
}

export default App;
