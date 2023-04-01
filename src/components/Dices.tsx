import React, { useEffect, useRef } from "react";
import { DiceRenderer } from "./Dice";
import { Vec3, Vec3Array, vec3 } from "../util/vector";
import { useSetRecoilState } from "recoil";
import { ACLAtom } from "../atom/acl";
import { useBox } from "@react-three/cannon";
import { Vector3 } from "three";

export const Dices = () => {
  const diceAmount = 5;
  const aclRef = useRef<Accelerometer | null>(null);
  const prevAcl = useRef<Vec3 | null>(null);
  const setACLAtom = useSetRecoilState(ACLAtom);
  const dices = Array.from({ length: diceAmount }).map((_) =>
    useBox(() => ({
      mass: 0.1,
      args: [2, 2, 2],
      position: [(Math.random() - 0.5) * 5, 10, (Math.random() - 0.5) * 5],
      rotation: [Math.random() * 6, Math.random() * 6, Math.random() * 6],
    })),
  );

  useEffect(() => {
    aclRef.current = new Accelerometer({ frequency: 5 });
    aclRef.current.onerror = (event) => {
      if (event.error.name === "NotAllowedError") {
        console.log("Permission to access sensor was denied.");
      } else if (event.error.name === "NotReadableError") {
        console.log("Cannot connect to the sensor.");
      }
    };
  }, []);
  useEffect(() => {
    if (!aclRef.current) return;

    aclRef.current.onreading = (e) => {
      const target = e.target as Accelerometer;
      if (!target) return;

      if (!prevAcl.current) {
        prevAcl.current = {
          x: target.x ?? 0,
          y: target.y ?? 0,
          z: target.z ?? 0,
        };
        return;
      }
      const intensity = 1;
      const diffAcl: Vec3Array = [
        -(prevAcl.current.x - (target.x ?? 0)) * intensity,
        Math.abs((prevAcl.current.y - (target.y ?? 0)) * intensity * 2),
        -(prevAcl.current.z - (target.z ?? 0)) * intensity,
      ];

      // console.log(prevAcl.current, e.target.x, e.target.y, e.target.z, diffAcl)
      setACLAtom(diffAcl);

      for (let i = 0; i < diceAmount; i++) {
        const velocity: Vector3 = new Vector3();
        dices[i][1].velocity.copy(velocity);
        if (vec3.magnitude(velocity) === 0)
          dices[i][1].applyForce(diffAcl, [0, 0, 0]);
      }

      // api.applyLocalForce([e.target.x * damper, e.target.y * damper * 10, e.target.z * damper], [0, 0, 0])
      prevAcl.current = {
        x: target.x ?? 0,
        y: target.y ?? 0,
        z: target.z ?? 0,
      };
    };
    aclRef.current.start();
  }, [aclRef.current]);
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <DiceRenderer diceId={i} colliderRef={dices[i][0]} key={`${i}-dice`} />
      ))}
    </>
  );
};
