/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export default function Dot(props) {
  const { nodes, materials } = useGLTF('/models/dot.glb') as any
  const { color, intensity } = props
  return (
    <group {...props} dispose={null}>
      <group rotation={[Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Circle_1.geometry}
          material={materials.base}
        />
        <mesh castShadow receiveShadow geometry={nodes.Circle_2.geometry}>
          <meshStandardMaterial
            emissive={color}
            emissiveIntensity={intensity}
          />
        </mesh>
      </group>
    </group>
  )
}

useGLTF.preload('/models/dot.glb')
