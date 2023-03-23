import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export const DiceRenderer = (props) => {
  const { nodes, materials } = useGLTF('/dice.glb')
  console.log(nodes, materials)

  const [ref] = useBox(() => ({
    mass: 50,
    args: [2, 2, 2],
    ...props
  }))

  return (
    <group ref={ref} {...props}>
      <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials['']} scale={0.1} />
    </group>
  )
}
