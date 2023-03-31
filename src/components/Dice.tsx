import React, { Ref } from 'react'
import { useGLTF } from '@react-three/drei'
import { DiceRendererProps } from './Dice.props'
import { Group } from 'three';

export const DiceRenderer = (props: DiceRendererProps) => {

  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
const    { nodes, materials } = (useGLTF('/dice.glb') as unknown as {nodes:any,materials:any})

  return (
    <>
      <group ref={(props.colliderRef as unknown as Ref<Group> | undefined)} {...props}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials['']} scale={0.1} />
      </group>
    </>
  )
}
