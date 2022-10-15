import { useRef, useCallback, useEffect } from 'react';

const useEventCallback = <Args extends unknown[], R>(
  handler: (...args: Args) => R,
  dependencies: any[]
) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler, dependencies]);

  return useCallback(
    (...args: Args) => {
      const fn = handlerRef.current;
      return fn(...args);
    },
    [handlerRef]
  );
};

export default useEventCallback;
