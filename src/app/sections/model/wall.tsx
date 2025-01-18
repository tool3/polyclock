/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export default function Wall({ baseProps: baseRawProps, last, ...props }) {
  const { nodes } = useGLTF('/models/wall.glb') as any

  const baseProps = { ...baseRawProps, roughness: 1 }

  return (
    <group
      {...props}
      scale={[0.75, 0.7, 0.8]}
      position={[0, 2.5, 0]}
      dispose={null}
    >
      <mesh castShadow receiveShadow geometry={nodes.wall.geometry}>
        <meshStandardMaterial {...baseProps} />
      </mesh>

      {!last ? (
        <group>
          <mesh castShadow receiveShadow geometry={nodes.frame007.geometry}>
            <meshStandardMaterial {...baseProps} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.frame008.geometry}
            position={[0, -7, 0]}
          >
            <meshStandardMaterial {...baseProps} />
          </mesh>

          <mesh
            castShadow
            receiveShadow
            geometry={nodes.frame009.geometry}
            position={[0, -14, 0]}
          >
            <meshStandardMaterial {...baseProps} />
          </mesh>
        </group>
      ) : null}
    </group>
  )
}

useGLTF.preload('/models/wall.glb')
