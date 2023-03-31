import { atom } from "recoil";
import { Vec3Array } from "../util/vector";

export const ACLAtom = atom<Vec3Array>({
	key: "acl",
	default: [0, 0, 0],
});
