import React, { useRef, useEffect, Ref } from 'react'
import { ACLAtom } from '../atom/acl'
import { useSetRecoilState } from 'recoil'
import { useSphere, Api } from '@react-three/cannon'
import { SphereRendererProps } from './Sphere.props'
import { Vec3Array, Vec3 } from '../util/vector';
import { BufferGeometry, Material, Mesh, Object3D } from 'three'

export const SphereRenderer = (props: SphereRendererProps) => {
  const aclRef = useRef<Accelerometer | null>(null)
  const prevAcl = useRef<Vec3 | null>(null)

  const setACLAtom = useSetRecoilState(ACLAtom)

  const [ref]: Api<Object3D<Event>> = useSphere(() => ({ args: [0.75], mass: 1, ...props }))

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
      const intensity = 5
      const diffAcl: Vec3Array = [
        Math.abs(target.x??0 * intensity),
        0,
        Math.abs(target.y??0 * intensity)
      ]

      // console.log(prevAcl.current, e.target.x, e.target.y, e.target.z, diffAcl)
      setACLAtom(diffAcl)
      // api.applyLocalForce(diffAcl, [0, 0, 0])
      // api.applyLocalForce([e.target.x * damper, e.target.y * damper * 10, e.target.z * damper], [0, 0, 0])
      prevAcl.current = {
        x: target.x??0 * intensity,
        y: target.z??0 * intensity,
        z: target.y??0 * intensity
      }
    }
    aclRef.current.start()
  }, [aclRef.current])
  return (
    ref && (
      <mesh
        ref={(ref as unknown as Ref<Mesh<BufferGeometry, Material | Material[]>> | undefined)}
        castShadow
        scale={prevAcl.current ? [prevAcl.current.x, prevAcl.current.y, prevAcl.current.z] : [1, 1, 1]}
      >
        <sphereGeometry />
        <meshNormalMaterial />
      </mesh>
    )
  )
}
