import { Effects } from '@react-three/drei'
import { extend, useLoader } from '@react-three/fiber'
import { LUTCubeLoader, LUTPass, UnrealBloomPass, FilmPass } from 'three-stdlib'

extend({ LUTPass, UnrealBloomPass, FilmPass })

export default function Grading() {
  const { texture3D } = useLoader(LUTCubeLoader, '/textures/cubicle-99.CUBE')
  return (
    <Effects>
      {/* <lUTPass lut={texture3D} intensity={0.75} /> */}
      <filmPass noiseIntensity={0.5} grayscale={false} />
    </Effects>
  )
}
