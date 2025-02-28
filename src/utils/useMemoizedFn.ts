import { useRef } from 'react';

type AnyFunction = (...args: never[]) => unknown;

const useMemoizedFn = <T extends AnyFunction>(fn: T) => {
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const memoizedFn = useRef((...args: Parameters<T>) => {
    return fnRef.current(...args);
  });

  return memoizedFn.current as T;
};

export default useMemoizedFn;
