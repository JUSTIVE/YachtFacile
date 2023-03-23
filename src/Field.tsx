import React from 'react'
import { Canvas } from '@react-three/fiber'
import { DiceRenderer } from './Dice'
import { Physics, Debug } from '@react-three/cannon'
import { Stats, OrbitControls } from '@react-three/drei'
import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { DoubleSide } from 'three'
import { usePlane } from '@react-three/cannon'

const GreenSquare = (props) => {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))
  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={[15, 15, 0]} receiveShadow>
      <planeBufferGeometry args={[25, 25]} />
      <meshBasicMaterial side={DoubleSide} color={'white'} />
    </mesh>
  )
}

export const Field = () => {
  return (
    <div id='canvas-container' style={{ width: '100vw', height: '500px' }}>
      <Canvas shadows={'soft'} orthographic camera={{ zoom: 30, near: -100, far: 100, position: [2, 2, 2] }}>
        <color attach='background' args={['#222']} />
        <ambientLight intensity={0.1} />
        <directionalLight color='white' position={[0, 4, 8]} castShadow />
        {/* <directionalLight color='white' position={[4, 4, -6]} castShadow />
        <directionalLight color='white' position={[-4, 4, -6]} castShadow /> */}
        <Physics>
          {/* <Debug> */}
          <GreenSquare rotation={[-Math.PI / 2, 0, 0]} />
          {Array.from({ length: 5 }).map((_, i) => (
            <DiceRenderer position={[0, i * 3 + 2, 0]} key={`${i}-dice`} />
          ))}
          {/* </Debug> */}
        </Physics>
        <OrbitControls enableDamping={false} />

        <Stats />

        <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, 10]} focalLength={0.4} bokehScale={5} height={700} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
