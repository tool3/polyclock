/* eslint-disable react/no-unknown-property */

import Loader from '~/components/loader/loader'
import CanvasWithModel from '~/components/mincanvas/minicanvas'

import Clock from './clock'

export default function DisplayClock() {
  return (
    <>
      <Loader />
      <CanvasWithModel style={{ width: '100vw', height: '100vh' }}>
        <Clock />
      </CanvasWithModel>
    </>
  )
}
