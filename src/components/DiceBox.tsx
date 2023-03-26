import React, { Ref } from 'react'
import { useBox } from '@react-three/cannon'
import { DiceBoxProps } from './DiceBox.props'
import { Mesh, BufferGeometry, Material } from 'three';

export const DiceBox = (props:DiceBoxProps) => {
  const boxBottomSize = 15

  const [backLeftRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize / 2, 0.01],
    position: [-boxBottomSize / 2, boxBottomSize / 4, 0],
    rotation: [0, Math.PI / 2, 0],
    ...props
  }))

  const [backRightRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize / 2, 0.01],
    position: [0, boxBottomSize / 4, -boxBottomSize / 2],
    rotation: [0, 0, 0],
    ...props
  }))

  const [frontLeftRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize / 2, 0.01],
    position: [0, boxBottomSize / 4, boxBottomSize / 2],
    rotation: [0, Math.PI, 0],
    ...props
  }))

  const [frontRightRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize / 2, 0.01],
    position: [boxBottomSize / 2, boxBottomSize / 4, 0],
    rotation: [0, -Math.PI / 2, 0],
    ...props
  }))

  const [bottomRef] = useBox(() => ({
    mass: 0,
    args: [boxBottomSize, boxBottomSize, 0.01],
    rotation: [-Math.PI / 2, 0, 0],
    ...props
  }))
  return (
    <>
      <mesh ref={(backLeftRef as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={(backRightRef as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={(frontLeftRef as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={(frontRightRef as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={(bottomRef as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
    </>
  )
}
