import React from 'react'
import { Canvas } from '@react-three/fiber'
import { DiceRenderer } from './Dice'
import { Physics, Debug } from '@react-three/cannon'
import { Stats, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { useBox } from '@react-three/cannon'

const DiceBox = (props) => {
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
      <mesh ref={backLeftRef} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={backRightRef} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={frontLeftRef} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={frontRightRef} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize / 2]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
      <mesh ref={bottomRef} receiveShadow>
        <planeGeometry args={[boxBottomSize, boxBottomSize]} />
        <meshStandardMaterial attach={'material'} color={'#fff'} />
      </mesh>
    </>
  )
}

export const Field = () => {
  return (
    <div id='canvas-container' style={{ width: '100vw', height: '500px' }}>
      <Canvas shadows={'soft'} orthographic camera={{ zoom: 20, near: -100, far: 100, position: [2, 2, 2] }}>
        <color attach='background' args={['#222']} />
        <ambientLight intensity={0.1} />
        <directionalLight color={'#efefff'} position={[0, 4, 8]} castShadow />
        <directionalLight color={'#efefff'} position={[4, 4, -6]} castShadow />
        <directionalLight color={'#efefff'} position={[-4, 4, -6]} castShadow />
        <Physics gravity={[0, -39.2, 0]}>
          {/* <Debug> */}
          <DiceBox />
          {Array.from({ length: 5 }).map((_, i) => (
            <DiceRenderer position={[0, i * 3 + 12, 0]} key={`${i}-dice`} />
          ))}
          {/* </Debug> */}
        </Physics>
        {/* <OrbitControls enableDamping={false} /> */}

        <Stats />

        <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, 10]} focalLength={0.4} bokehScale={5} height={700} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
