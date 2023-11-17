import { useCallback, useEffect, useRef, useState } from "react";

export const throttle = (f) => {
    let token: any = null,
      lastArgs: any = null;
    const invoke = () => {
      f(...lastArgs);
      token = null;
    };
    const result = (...args) => {
      lastArgs = args;
      if (!token) {
        token = requestAnimationFrame(invoke);
      }
    };
    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
  };
  
  const id = (x) => x;

  export const useDraggable = ({ onDrag = id, value=undefined} = {}) => {
    const [pressed, setPressed] = useState(false);
    const position = useRef({ x: 0, y: 0 });
    const ref = useRef();

    const unsubscribe = useRef<any>();
    const legacyRef = useCallback((elem) => {

      ref.current = elem;
      if (unsubscribe.current) {
        unsubscribe.current();
      }
      if (!elem) {
        return;
      }
      const handleMouseDown = (e) => {

        e.target.style.userSelect = "none";
        setPressed(true);
      };
      elem.addEventListener("mousedown", handleMouseDown);
      unsubscribe.current = () => {
        elem.removeEventListener("mousedown", handleMouseDown);
      };
    }, []);

    useEffect(() => {
        if(value) {
            if (!ref.current || !position.current) {
               return;
             }
             position.current = {x: value, y: 0};
             const elem = ref.current;
             elem.style.transform = `translate(${value}px`;
         }
      
    }, [value])
  
    useEffect(() => {
      if (!pressed) {
        return;
      }
  
      const handleMouseMove = throttle((event) => {
        if (!ref.current || !position.current) {
          return;
        }
        const pos = position.current;

        const elem = ref.current;
        position.current = onDrag({
          x: pos.x + event.movementX,
        });
        elem.style.transform = `translate(${pos.x}px`;
      });

      const handleMouseUp = (e) => {
        e.target.style.userSelect = "auto";
        setPressed(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        handleMouseMove.cancel();
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

    }, [pressed, onDrag, value]);

    return [legacyRef, pressed];
  

  };