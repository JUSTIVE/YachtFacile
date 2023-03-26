import React, { useEffect, useRef,Ref } from 'react'
import { useGLTF } from '@react-three/drei'
import { useBox } from '@react-three/cannon'
import { ACLAtom } from '../atom/acl'
import { useSetRecoilState } from 'recoil'
import { DiceRendererProps } from './Dice.props'
import { Group } from 'three';
import { Vec3, Vec3Array } from '../util/vector';

export const DiceRenderer = (props: DiceRendererProps) => {
  const aclRef = useRef<Accelerometer | null>(null)
  const prevAcl = useRef<Vec3 | null>(null)
  // rome-ignore lint/suspicious/noExplicitAny: <explanation>
const  { nodes, materials } = (useGLTF('/dice.glb') as unknown as {nodes:any,materials:any})
  const setACLAtom = useSetRecoilState(ACLAtom)
  // console.log(nodes, materials)

  const [ref, api] = useBox(() => ({
    mass: 1,
    args: [2, 2, 2],
    ...props
  }))

  useEffect(() => {
    aclRef.current = new Accelerometer({ frequency: 60 })
    aclRef.current.onerror = (event) => {
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
      const target = (e.target as Accelerometer)
      if (!target) return

      if (!prevAcl.current) {
        prevAcl.current = {
          x: target.x??0,
          y: target.y??0,
          z: target.z??0
        }
        return
      }
      const intensity = 50
      const diffAcl: Vec3Array = [
        (prevAcl.current.x - (target.x??0)) * intensity,
        Math.abs((prevAcl.current.y - (target.y??0)) * intensity),
        (prevAcl.current.z - (target.z??0)) * intensity
      ]

      // console.log(prevAcl.current, e.target.x, e.target.y, e.target.z, diffAcl)
      setACLAtom(diffAcl)
      api.applyLocalForce(diffAcl, [0, 0, 0])
      // api.applyLocalForce([e.target.x * damper, e.target.y * damper * 10, e.target.z * damper], [0, 0, 0])
      prevAcl.current = {
        x: target.x??0,
        y: target.y??0,
        z: target.z??0
      }
    }
    aclRef.current.start()
  }, [aclRef.current])

  return (
    <>
      <group ref={(ref as unknown as Ref<Group> | undefined)} {...props}>
        <mesh castShadow receiveShadow geometry={nodes.Object_2.geometry} material={materials['']} scale={0.1} />
      </group>
    </>
  )
}
