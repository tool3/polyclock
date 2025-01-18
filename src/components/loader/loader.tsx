import { Html } from '@react-three/drei'

import s from './loader.module.scss'

export default function Loader() {
  const style = {
    width: '100vw',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  } as any
  return (
    <Html center style={style} className={s.loader}>
      POLYCLOCK
    </Html>
  )
}
