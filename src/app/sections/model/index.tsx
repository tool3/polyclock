/* eslint-disable react/no-unknown-property */

import CanvasWithModel from '~/components/mincanvas/minicanvas'

import Clock from './clock'
// import Frame from './frame'

export default function DisplayClock() {
  return (
    <CanvasWithModel style={{ width: '100vw', height: '100vh' }}>
      <Clock />
      {/* <Frame /> */}
    </CanvasWithModel>
  )
}
