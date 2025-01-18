/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export default function FrameHang(props) {
  const { nodes } = useGLTF('/models/frame_hang.glb') as any
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
        geometry={nodes.Cylinder005.geometry}
        position={[3.498, 8.3, -0.393]}
        rotation={[-Math.PI / 2, Math.PI / 2, 0]}
        scale={[1, 0.355, 1]}
      >
        <meshStandardMaterial {...baseProps} />
      </mesh>
    </group>
  )
}

useGLTF.preload('/models/frame_hang.glb')
