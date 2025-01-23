/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import gsap from 'gsap'
import { useLayoutEffect, useRef } from 'react'

export default function Dot(props) {
  const { nodes } = useGLTF('/models/dot.glb') as any
  const { color, intensity, base, seconds } = props
  const group = useRef() as any

  const lightColorProps = {
    color,
    emissive: color,
    emissiveIntensity: intensity,
    toneMapped: false
  }
  const baseProps = {
    color: base,
    metalness: 1,
    roughness: 0.5,
    toneMapped: false
  }

  useLayoutEffect(() => {
    if (Number(seconds) % 10 === 0 && group) {
      gsap.to(group.current.rotation, {
        z: '+=' + -(180 * Math.PI) / 180,
        ease: 'back.inOut(4)',
        duration: 0.3
      })
    }
  }, [seconds])

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      rotation={[0, 0, -Math.PI / 4]}
    >
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_2.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/dot.glb')
