import React, { Ref } from "react";
import { useGLTF } from "@react-three/drei";
import { DiceRendererProps } from "./Dice.props";
import { Group } from "three";

export const DiceRenderer = (props: DiceRendererProps) => {
  const { nodes, materials } = useGLTF("/dice.glb") as unknown as {
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    nodes: any;
    // rome-ignore lint/suspicious/noExplicitAny: <explanation>
    materials: any;
  };

  return (
    <>
      <group
        ref={props.colliderRef as unknown as Ref<Group> | undefined}
        {...props}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Object_2.geometry}
          material={materials[""]}
          scale={0.1}
        />
      </group>
    </>
  );
};
