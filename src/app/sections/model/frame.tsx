/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'

export default function Frame(props) {
  const { nodes } = useGLTF('/models/rods.glb') as any
  return (
    <group {...props} dispose={null} position={[0, -4.5, -0.4]} scale={0.8}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder003.geometry}
        material={nodes.Cylinder003.material}
        position={[0, 13.99, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder004.geometry}
        material={nodes.Cylinder004.material}
        position={[0, 13.99, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder006.geometry}
        material={nodes.Cylinder006.material}
        position={[-5, 0, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder007.geometry}
        material={nodes.Cylinder007.material}
        position={[-20, 0, 0]}
      />
    </group>
  )
}

useGLTF.preload('/models/rods.glb')
