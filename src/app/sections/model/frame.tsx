/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export default function Frame(props) {
  const { nodes } = useGLTF('/models/frame.glb') as any
  const { color, metalness, roughness } = props

  const baseProps = {
    color,
    metalness,
    roughness
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        position={[-0.002, 1.3, 0.007]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 3.555, 1]}
      >
        <meshStandardMaterial {...baseProps} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/frame.glb')
