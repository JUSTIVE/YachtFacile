import { useRecoilValue } from "recoil";
import { ACLAtom } from "./atom/acl";

export const Logger = () => {
  const acl = useRecoilValue(ACLAtom);

  return (
    <div style={{ position: "absolute" }}>
      {acl.map((item, i) => (
        <div key={`${item}-${i}`}>{`${Math.round(item * 1000) / 1000}`}</div>
        // <div key={`${item}-${i}`}>{`${item}`}</div>
      ))}
    </div>
  );
};
