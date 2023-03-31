import { Vector3 } from "three";

export type Vec3Array = [number, number, number];
export type Vec3 = {
  x: number;
  y: number;
  z: number;
};
const magnitude = (v: Vector3) => {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
};

const zero = { x: 0, y: 0, z: 0 };

export const vec3 = {
  magnitude,
  zero,
};
