import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { useDraggable } from "./hooks";
import {style} from './style'


export const DraggableBox = (props: any) => {
  const {onDrag, onMouseDown, onMouseUp, value,} = props

  const handleDrag = useCallback(
    ({ x, y }) =>  {
        if(onDrag) {
            onDrag(x, y)
        }
        return {
            x: Math.max(0, x),
            y: Math.max(0, y)
          }
    },
    []
  );

  const [ ref, pressed] = useDraggable({
    onDrag: handleDrag,
    value: value
  });

  useEffect(() => {
    if(pressed && onMouseDown) {
        onMouseDown(pressed)
    }
    if(!pressed && onMouseUp) {
        onMouseUp(!pressed)
    }
  }, [pressed])
  
  const styleValue = useMemo(() => {
    if(value) {}
      return value ? {transform: `translate(${value}px` } : {}
  }, [value])

  return (
    <>
        <div ref ={ref} style={{...style.boxstyle,}} />
    </>
   
  );
};
