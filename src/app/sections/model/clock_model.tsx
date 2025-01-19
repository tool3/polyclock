/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { createRef, useLayoutEffect } from 'react'

import Frame from './frame_hang'
import Wall from './wall'
import FrameHang from './frame_hang'

export default function DigitModel(props) {
  const { nodes } = useGLTF('/models/clock.glb') as any
  const { to, state, max, color, base, intensity, last } = props

  const [bottom, mid, bottom_left, bottom_right, top, top_right, top_left] =
    Array.from({ length: 7 }, () => createRef()) as any[]

  const animations = {
    '0': [{ ref: mid, axis: 'x', negative: true }],
    '1': [
      { ref: top, axis: 'x', negative: true },
      { ref: mid, axis: 'x', negative: true },
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom, axis: 'x', negative: true },
      { ref: bottom_left, axis: 'y', negative: true }
    ],
    '2': [
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom_right, axis: 'y' }
    ],
    '3': [
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom_left, axis: 'y', negative: true }
    ],
    '4': [
      { ref: top, axis: 'x', negative: true },
      { ref: bottom_left, axis: 'y', negative: true },
      { ref: bottom, axis: 'x' }
    ],
    '5': [
      { ref: top_right, axis: 'y' },
      { ref: bottom_left, axis: 'y', negative: true }
    ],
    '6': [{ ref: top_right, axis: 'y' }],
    '7': [
      { ref: mid, axis: 'x', negative: true },
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom_left, axis: 'y', negative: true },
      { ref: bottom, axis: 'x' }
    ],
    '8': [],
    '9': [{ ref: bottom_left, axis: 'y', negative: true }]
  }

  const resets = {
    '0': [
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom_left, axis: 'y', negative: true }
    ],
    '1': [
      { ref: top, axis: 'x', negative: true },
      { ref: mid, axis: 'x', negative: true },
      { ref: bottom_left, axis: 'y' },
      { ref: bottom, axis: 'x' }
    ],
    '2': [{ ref: bottom_right, axis: 'y' }],
    '3': [{ ref: top_left, axis: 'y', negative: true }],
    '4': [
      { ref: top, axis: 'x', negative: true },
      { ref: bottom, axis: 'x' }
    ],
    '5': [
      { ref: bottom_left, axis: 'y', negative: true },
      { ref: bottom, axis: 'x', negative: true }
    ],
    '6': [{ ref: top_right, axis: 'y' }],
    '7': [
      { ref: mid, axis: 'x', negative: true },
      { ref: top_left, axis: 'y', negative: true },
      { ref: bottom_left, axis: 'y', negative: true },
      { ref: bottom, axis: 'x' }
    ],
    '8': [],
    '9': [{ ref: bottom_left, axis: 'y', negative: true }]
  }

  useLayoutEffect(() => {
    const next = state === '0' ? '9' : state - 1
    if (state === '0' && max !== undefined) {
      to(animations['0'], animations[max])
    } else {
      to(animations[state], resets[next])
    }
  }, [state, max])

  const { frame, wall } = useControls({ frame: true, wall: true })

  const FrameModel = wall ? FrameHang : Frame;

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

  return (
    <group {...props} dispose={null}>
      <group
        ref={bottom}
        position={[0, 1.3, 0]}
        rotation={[0, 0, Math.PI]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group ref={mid} position={[0, 8.3, 0]} scale={0.94}>
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group
        ref={bottom_left}
        position={[-3.5, 4.8, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group
        ref={bottom_right}
        position={[3.5, 4.8, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group
        ref={top}
        position={[0, 15.3, 0]}
        rotation={[0, 0, -Math.PI]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group
        ref={top_right}
        position={[3.5, 11.8, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      <group
        ref={top_left}
        position={[-3.5, 11.8, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={0.94}
      >
        <mesh castShadow receiveShadow geometry={nodes.Circle.geometry}>
          <meshStandardMaterial {...baseProps} />
        </mesh>
        <mesh castShadow receiveShadow geometry={nodes.Circle_1.geometry}>
          <meshStandardMaterial {...lightColorProps} />
        </mesh>
      </group>
      {frame ? <FrameModel {...baseProps} /> : null}
      {wall ? (
        <Wall lightProps={lightColorProps} baseProps={baseProps} last={last} />
      ) : null}
    </group>
  )
}

useGLTF.preload('/models/clock.glb')
