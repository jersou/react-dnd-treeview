import { isTouchDevice } from "./isTouchDevice";
import { useEffect, useState } from "react";

export default { title: "isTouchDevice" };

export const IsTouch = () => {
  const [isTouchDev, setIsTouchDev] = useState(false);
  useEffect(() => {
    setIsTouchDev(isTouchDevice());
  }, [setIsTouchDev]);
  return <div>isTouchDevice={isTouchDev ? "yes" : "no"}</div>;
};
