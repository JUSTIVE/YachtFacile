import React from 'react'
import { Canvas } from '@react-three/fiber'
import { DiceRenderer } from './Dice'
import { Physics, Debug } from '@react-three/cannon'
import { Stats, OrbitControls } from '@react-three/drei'
// import { EffectComposer, DepthOfField } from '@react-three/postprocessing'
import { DoubleSide } from 'three'
import { usePlane } from '@react-three/cannon'

const GreenSquare = (props) => {
  const [ref] = usePlane(() => ({ mass: 0, ...props }))
  return (
    <mesh ref={ref} position={[0, 0, 0]} scale={[10, 10, 10]} receiveShadow>
      <planeBufferGeometry />
      <meshBasicMaterial color='green' side={DoubleSide} />
    </mesh>
  )
}

export const Field = () => {
  return (
    <div id='canvas-container' style={{ width: '500px', height: '500px' }}>
      <Canvas shadows orthographic camera={{ position: [2, 2, 4] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color='white' position={[0, 4, 8]} />
        <directionalLight color='white' position={[4, 4, -6]} />
        <directionalLight color='white' position={[-4, 4, -6]} />
        <Physics>
          {/* <Debug> */}
          <GreenSquare rotation={[-Math.PI / 2, 0, 0]} receiveShadow />
          <DiceRenderer />
          {/* </Debug> */}
        </Physics>
        <OrbitControls enableDamping={false} />
        <Stats />
        {/* <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={14} height={700} />
        </EffectComposer> */}
      </Canvas>
    </div>
  )
}
