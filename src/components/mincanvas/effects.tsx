import { useLoader } from '@react-three/fiber'
import {
  Bloom,
  EffectComposer,
  LUT,
  Scanline,
  Vignette
} from '@react-three/postprocessing'
import { folder, useControls } from 'leva'
import { VignetteTechnique } from 'postprocessing'
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
    vignetteStrength,
    vignetteOffset,
    scanlineEnabled,
    scanlineStrength
  } = useControls('Post Processing', {
    LUTs: folder(
      {
        lutEnabled: true,
        lut: {
          value: '/textures/LUTs/Chemical-168.CUBE',
          options: {
            filmic: '/textures/LUTs/Filmic-1.CUBE',
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
        scanlineEnabled: true,
        scanlineStrength: {
          value: 0.05,
          min: 0,
          max: 1
        }
      },
      { collapsed: true }
    ),
    Vignette: folder(
      {
        vignetteEnabled: true,
        vignetteStrength: {
          value: 0.5,
          min: 0,
          max: 1
        },
        vignetteOffset: {
          value: 0.5,
          min: 0,
          max: 1
        }
      },
      { collapsed: true }
    )
  })
  const lutTexture = useLoader(LUTCubeLoader, lut)

  return (
    <EffectComposer multisampling={0} stencilBuffer>
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
      {scanlineEnabled ? <Scanline opacity={scanlineStrength} /> : <></>}
      {vignetteEnabled ? (
        <Vignette
          offset={vignetteOffset}
          darkness={vignetteStrength}
          technique={VignetteTechnique.DEFAULT}
        />
      ) : (
        <></>
      )}
    </EffectComposer>
  )
}
