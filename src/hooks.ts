import type { ContainerRef } from './Container';
import useMemoizedFn from './utils/useMemoizedFn';

export const useContainer = (ref: React.RefObject<ContainerRef | null>) => {
  const getPsInstance = useMemoizedFn(() => {
    return ref.current?.psRef?.current;
  });

  const getContainer = useMemoizedFn(() => {
    return ref.current?.containerRef?.current;
  });

  return {
    getPsInstance,
    getContainer,
  };
};
