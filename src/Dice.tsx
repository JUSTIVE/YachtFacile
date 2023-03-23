import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'

export const DiceRenderer = (props) => {
  const aclRef = useRef(null)
  const posval = useRef(null)
  const { nodes, materials } = useGLTF('/dice.glb')
  // console.log(nodes, materials)

  const [ref, api] = useBox(() => ({
    mass: 50,
    args: [2, 2, 2],
    ...props
  }))

  const intensity = 10

  const randomForce = () => {
    return (Math.random() - 0.5) * intensity
  }

  useEffect(() => {
    api.velocity.set(randomForce(), 0, randomForce())
    api.angularVelocity.set(randomForce(), randomForce(), randomForce())

    // api.torque.set(randomForce(), randomForce(), randomForce())
  }, [api, aclRef.current])

  useEffect(() => {
    aclRef.current = new Accelerometer({ frequency: 60 })
    aclRef.current.onerror = (event) => {
      // Handle runtime errors.
      if (event.error.name === 'NotAllowedError') {
        console.log('Permission to access sensor was denied.')
      } else if (event.error.name === 'NotReadableError') {
        console.log('Cannot connect to the sensor.')
      }
    }
  }, [])

  useEffect(() => {
    if (!aclRef.current) return

    aclRef.current.onreading = (e) => {
      console.log(e), (posval.current = e)
    }
    aclRef.current.start()
  }, [aclRef.current])

  return (
    <>
      <group ref={ref} {...props}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials['']} scale={0.1} />
      </group>
    </>
  )
}
