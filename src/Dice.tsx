import { useGLTF } from '@react-three/drei'
import { useTrimesh } from '@react-three/cannon'

export const DiceRenderer = (props) => {
  const { nodes, materials } = useGLTF('/dice.glb')
  const [ref] = useTrimesh(() => ({
    args: [nodes.Cube001.geometry.attributes.position.array, nodes.Cube001.geometry.index.array],
    mass: 1,
    position: [0, 5, 0],
    ...props
  }))
  // console.log(nodes, materials)

  return (
    <group ref={ref}>
      <mesh geometry={nodes.Cube001.geometry} material={materials.main_clr} />
      <mesh geometry={nodes.Cube001_1.geometry} material={materials.white} />
    </group>
  )
}
