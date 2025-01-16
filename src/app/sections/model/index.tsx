/* eslint-disable react/no-unknown-property */

import CanvasWithModel from '~/components/mincanvas/minicanvas'

import Clock from './clock'

export default function DisplayClock() {
  return (
    <CanvasWithModel style={{ width: '100vw', height: '100vh' }}>
      <Clock />
    </CanvasWithModel>
  )
}
