import { useGLTF } from '@react-three/drei'

export const DiceRenderer = () => {
  const { nodes, materials } = useGLTF('/dice.glb')
  console.log(nodes, materials)
  return (
    // <Detailed ref={ref} distances={[0, 65, 80]}>
    <>
      <mesh geometry={nodes.Cube001.geometry} material={materials.main_clr} />
      <mesh geometry={nodes.Cube001_1.geometry} material={materials.white} />
    </>
    // </Detailed>
  )
}
