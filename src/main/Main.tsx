import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { style } from './style'

import { DraggableBox } from './DraggableBox'

const Main = () => {

  const [pos, setPos] = useState(0)
  const [contWidth, setContWidth] = useState(0)
  const [scrollWidth, setScrollWidth] = useState(0)
  const ref = useRef<any>()
  const [mouseState, setMouseState] = useState<'up' | 'down'>('up')
  const [value, setValue] = useState<undefined | number>(undefined);

  const [mouseContainerState, setMouseContainerState] = useState(false)
  
  const handleDrag = (pos) => {
    setPos(pos)
  }

  useEffect(() => {
    setContWidth(ref?.current?.clientWidth)
    setScrollWidth(ref?.current?.scrollWidth -ref?.current?.clientWidth)
  }, [ref, pos])

   useEffect(() => {
      if(pos) {
        let offset = pos < 0 ? 0 : 
        pos >=  contWidth  ? contWidth : pos
        const boxpercent = (offset /  contWidth) * 100
        const offsetWidth  =  ((boxpercent  /  100) * scrollWidth)
        ref.current.scrollLeft = offsetWidth; 
      }
   }, [pos])
   

   const handleScroll = (e) => {
        if(mouseState === 'down') return 
        const { scrollWidth:sWidth = 0, scrollLeft = 0 } = e.target
        const percent = ( (scrollLeft / (sWidth - contWidth) ) * 100) / 100
        const leftvalue =   (percent * contWidth - 30) <= 0 ? 0 :  (percent * contWidth) - 30
        setValue(leftvalue)
    }

   const handleMouseDown = () => {
    setMouseContainerState(true)
   }
   const handleMouseUp = () => {
    setMouseContainerState(false)
   }

  return (
    <div 
        ref={ref}
        style={style.main}
        onScroll={handleScroll}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
     >
        <div style={style.table}>
            <div style={style.debuggerData}>
                <h2>
                    <div>postionbox: {pos}</div>
                    <div>Container Width: {contWidth}</div>
                    <div>Scroll Width: {scrollWidth}</div>
                    <div>mouse State: {mouseState}</div>
                    <div>mouse container state: {mouseContainerState ? 'down' : 'up'}</div>
                </h2>
            </div>
        </div>
        <DraggableBox 
            onDrag={handleDrag}
            value={mouseContainerState ? value : undefined}
            onMouseDown={() => {
                setMouseState('down')
            }}
            onMouseUp={() => {
                setMouseState('up')
            }}
        />
    </div>
  )
}

export default Main