import React, { useEffect, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { ACLAtom } from './atom/acl'
import { useSetRecoilState } from 'recoil'

export const DiceRenderer = (props) => {
  const aclRef = useRef(null)
  const posval = useRef(null)
  const { nodes, materials } = useGLTF('/dice.glb')
  const setACLAtom = useSetRecoilState(ACLAtom)
  // console.log(nodes, materials)

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [2, 2, 2],
    ...props
  }))

  const intensity = 10

  const randomForce = () => {
    return (Math.random() - 0.5) * intensity
  }

  useEffect(() => {
    // api.velocity.set(randomForce(), 0, randomForce())
    // api.angularVelocity.set(randomForce(), randomForce(), randomForce())
    // console.log(api)
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
    const damper = 1
    if (!aclRef.current) return

    aclRef.current.onreading = (e) => {
      console.log(e)
      setACLAtom([e.target.x, e.target.y, e.target.z])
      api.applyLocalForce([e.target.x * damper, e.target.y * damper * 10, e.target.z * damper], [0, 0, 0])
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
