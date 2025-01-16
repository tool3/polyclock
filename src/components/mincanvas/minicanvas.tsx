import { Loader, OrbitControls } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { Bloom, EffectComposer } from '@react-three/postprocessing'
import { Leva, useControls } from 'leva'
import { ReactNode, Suspense, useRef, useState } from 'react'
import Debug from '../debug/debug'

export default function CanvasWithModel({
  style,
  children
}: {
  style?: any
  children: ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)
  const { enabled, luminanceThreshold, luminanceSmoothing, intensity } =
    useControls('Bloom', {
      enabled: true,
      luminanceThreshold: {
        value: 0.3,
        min: 0,
        max: 1
      },
      luminanceSmoothing: {
        value: 0.3,
        min: 0,
        max: 1
      },
      intensity: {
        value: 1.5,
        min: 0,
        max: 5
      }
    })
  const { background } = useControls({ background: '#241f1b' })

  return (
    <>
      <Leva collapsed hidden={!active} />
      <Debug set={setActive} />
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance'
        }}
        orthographic
        camera={{
          frustumCulled: true,
          fov: 70,
          position: [0, 0, 50],
          zoom: 20
        }}
        style={style}
      >
        <color attach="background" args={[background]} />
        <Suspense fallback={<Loader />}>
          <Suspense fallback={null}>{children}</Suspense>
          <OrbitControls
            makeDefault
            minZoom={10}
            maxZoom={100}
            target={[0, 0, 0]}
          />
        </Suspense>
        {enabled ? (
          <EffectComposer>
            <Bloom
              intensity={intensity}
              luminanceThreshold={luminanceThreshold}
              luminanceSmoothing={luminanceSmoothing}
              height={1024}
            />
          </EffectComposer>
        ) : null}
      </Canvas>
    </>
  )
}
