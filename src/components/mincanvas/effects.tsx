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
    enabled,
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
    enabled: true,
    LUTs: folder(
      {
        lutEnabled: true,
        lut: {
          value: '/textures/LUTs/Filmic-1.CUBE',
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
          value: 1.5,
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
          value: 0.4,
          min: 0,
          max: 1
        }
      },
      { collapsed: true }
    )
  })

  const lutTexture = useLoader(LUTCubeLoader, lut)

  return enabled ? (
    <EffectComposer stencilBuffer>
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
      {lutEnabled ? <LUT lut={lutTexture.texture} /> : <></>}
    </EffectComposer>
  ) : null
}

useLoader.preload(LUTCubeLoader, '/textures/LUTs/Filmic-1.CUBE')
