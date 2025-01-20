import { useLoader } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  LUT,
  Scanline,
  Vignette
} from '@react-three/postprocessing'
import { folder, useControls } from 'leva'
import { LUTCubeLoader } from 'three-stdlib'

export default function Effects() {
  const {
    lut,
    lutEnabled,
    bloomEnabled,
    intensity,
    luminanceSmoothing,
    luminanceThreshold,
    vignetteEnabled,
    scanlineEnabled
  } = useControls('Post Processing', {
    LUTs: folder(
      {
        lutEnabled: true,
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
      },
      { collapsed: true }
    ),
    Bloom: folder(
      {
        bloomEnabled: true,
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
          value: 0.5,
          min: 0,
          max: 10
        }
      },
      { collapsed: true }
    ),
    Scanline: folder(
      {
        scanlineEnabled: true
      },
      { collapsed: true }
    ),
    Vignette: folder(
      {
        vignetteEnabled: true
      },
      { collapsed: true }
    )
  })
  const lutTexture = useLoader(LUTCubeLoader, lut)

  return (
    <EffectComposer multisampling={0}>
      {lutEnabled ? <LUT lut={lutTexture.texture} /> : <></>}
      {bloomEnabled ? (
        <Bloom
          mipmapBlur
          intensity={intensity}
          luminanceThreshold={luminanceThreshold}
          luminanceSmoothing={luminanceSmoothing}
        />
      ) : (
        <></>
      )}
      {scanlineEnabled ? <Scanline opacity={0.05} /> : <></>}
      {vignetteEnabled ? <Vignette darkness={0.5} /> : <></>}
    </EffectComposer>
  )
  return null
}
