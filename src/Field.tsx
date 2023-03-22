import React from 'react'
import { Canvas } from '@react-three/fiber'
import { DiceRenderer } from './Dice'
import { Physics } from '@react-three/cannon'
import { Stats, OrbitControls } from '@react-three/drei'

export const Field = () => {
  return (
    <div id='canvas-container' style={{ width: '500px', height: '500px' }}>
      <Canvas shadows camera={{ position: [0, 2, 4] }}>
        <ambientLight intensity={0.1} />
        <directionalLight color='white' position={[0, 4, 8]} />
        <directionalLight color='white' position={[4, 4, -6]} />
        <directionalLight color='white' position={[-4, 4, -6]} />
        <Physics gravity={[0, -9.8, 0]}>
          <DiceRenderer />
        </Physics>
        <OrbitControls enableDamping={false} />
        <Stats />
      </Canvas>
    </div>
  )
}
