import { useLoader } from '@react-three/fiber'
import { EffectComposer, Bloom, LUT, Scanline, Vignette } from '@react-three/postprocessing'
import { useControls } from 'leva'
import { LUTCubeLoader } from 'three-stdlib'

export default function Effects() {
  const { lut } = useControls({
    lut: {
      value: '/textures/LUTs/Chemical-168.CUBE',
      options: {
        bourbon: '/textures/LUTs/Bourbon-64.CUBE',
        chemical: '/textures/LUTs/Chemical-168.CUBE',
        clayton: '/textures/LUTs/Clayton-33.CUBE',
        cubicle: '/textures/LUTs/Cubicle-99.CUBE',
        remy: '/textures/LUTs/Remy-24.CUBE'
      }
    }
  })
  const lutTexture = useLoader(LUTCubeLoader, lut)

  const { enabled, luminanceThreshold, luminanceSmoothing, intensity } =
    useControls(
      'Bloom',
      {
        enabled: true,
        luminanceThreshold: {
          value: 1.0,
          min: 0,
          max: 1
        },
        luminanceSmoothing: {
          value: 1.0,
          min: 0,
          max: 1
        },
        intensity: {
          value: 1.5,
          min: 0,
          max: 10
        }
      },
      { order: 1 }
    )

  return enabled ? (
    <EffectComposer stencilBuffer>
      <Bloom
        mipmapBlur
        intensity={intensity}
        luminanceThreshold={luminanceThreshold}
        luminanceSmoothing={luminanceSmoothing}
      />
      <Scanline opacity={0.05} />
      <Vignette darkness={0.5} />
      <LUT lut={lutTexture.texture} />
    </EffectComposer>
  ) : null
}
