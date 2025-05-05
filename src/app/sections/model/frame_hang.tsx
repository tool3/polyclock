/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

export default function FrameHang(props) {
  const { nodes } = useGLTF('/models/frame_hang.glb') as any
  const { metalness, roughness } = props

  const { frameColor } = useControls(
    {
      frameColor: '#000000'
    },
    { order: 2 }
  )

  const baseProps = {
    color: frameColor,
    metalness,
    roughness
  }

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.frame005.geometry}
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
