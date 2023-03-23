import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useTrimesh } from '@react-three/cannon'

export const DiceRenderer = (props) => {
  const { nodes, materials } = useGLTF('/dice.glb')
  console.log(nodes, materials)

  const [ref] = useTrimesh(
    () => ({
      args: [nodes.Object_2.geometry.attributes.position.array, nodes.Object_2.geometry.index.array],
      mass: 5,
      position: [0, 5, 0],
      ...props
    }),
    useRef()
  )

  return (
    <group ref={ref}>
      <mesh castShadow geometry={nodes.Object_2.geometry} material={materials.default} />
    </group>
  )
}
