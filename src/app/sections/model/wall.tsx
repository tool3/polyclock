/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'

export default function Wall({ last, dotsHolder, ...props }) {
  const { nodes } = useGLTF('/models/wall.glb') as any

  const { wallColor } = useControls(
    {
      wallColor: '#000000'
    },
    { order: 2 }
  )

  const baseProps = { color: wallColor, roughness: 0.8 }

  return (
    <group
      {...props}
      scale={[0.75, 0.7, 0.8]}
      position={[0, 2.5, -0.3]}
      dispose={null}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.wall.geometry}
        position={[0, 0, -0.2]}
      >
        <meshStandardMaterial {...baseProps} />
      </mesh>
      {!last ? (
        <group>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.frame001.geometry}
            position={[8.098, 15.3, -1.793]}
          >
            <meshStandardMaterial {...baseProps} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.frame002.geometry}
            position={[8.098, 8.3, -1.793]}
          >
            <meshStandardMaterial {...baseProps} />
          </mesh>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.frame003.geometry}
            position={[8.098, 1.3, -1.793]}
          >
            <meshStandardMaterial {...baseProps} />
          </mesh>
          {dotsHolder ? (
            <>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.frame004.geometry}
                position={[8.098, 15.3, -0.444]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.808, 1, 1]}
              >
                <meshStandardMaterial {...baseProps} />
              </mesh>
              <mesh
                castShadow
                receiveShadow
                geometry={nodes.frame010.geometry}
                position={[8.098, 1.3, -0.444]}
                rotation={[0, Math.PI / 2, 0]}
                scale={[0.808, 1, 1]}
              >
                <meshStandardMaterial {...baseProps} />
              </mesh>
            </>
          ) : null}
        </group>
      ) : null}
    </group>
  )
}

useGLTF.preload('/models/wall.glb')
