/* eslint-disable react/no-unknown-property */
import { Environment, OrbitControls, Stats } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import { button, Leva, useControls } from 'leva'
import { Perf } from 'r3f-perf'
import { ReactNode, Suspense, useRef, useState } from 'react'

import Debug from '../debug/debug'
import Loader from '../loader/loader'
import Effects from './effects'

export default function CanvasWithModel({
  style,
  children
}: {
  style?: any
  children: ReactNode
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [active, setActive] = useState(false)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { fps } = useControls({
    fps: false,
    background: '#454545'
  })

  return (
    <>
      <Leva collapsed hidden={!active} />
      {fps ? <Stats /> : null}
      <Debug set={setActive} />
      <Canvas
        ref={canvasRef}
        dpr={[1, 2]}
        orthographic
        camera={{
          frustumCulled: true,
          fov: 70,
          position: [0, 0, 50],
          zoom: 20
        }}
        style={style}
      >
        {/* <color attach="background" args={[background]} /> */}
        {fps ? <Perf position="bottom-left" logsPerSecond={1} /> : null}
        <Wrapper>{children}</Wrapper>
        <Environment
          files={'/textures/environments/studio_small_03_1k.hdr'}
          environmentRotation={[0, 0, -Math.PI / 2]}
        />
        <Effects />
      </Canvas>
    </>
  )
}

function Wrapper({ children }) {
  const target = useRef() as any

  useControls({
    ['reset camera']: button(() => {
      target.current.reset()
    })
  })

  return (
    <Suspense fallback={<Loader />}>
      {children}
      <OrbitControls ref={target} makeDefault minZoom={10} maxZoom={100} />
    </Suspense>
  )
}
