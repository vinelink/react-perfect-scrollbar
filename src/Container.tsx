import PerfectScrollbar from 'perfect-scrollbar';
import {
  type JSX,
  useRef,
  useEffect,
  createElement,
  forwardRef,
  useImperativeHandle,
  useMemo,
} from 'react';
import {
  PS_EVENTS_NAME_MAP,
  type PSEventNameType,
  type PSEventListenersType,
} from './events';
import useMemoizedFn from './utils/useMemoizedFn';

const CLASS_NAME = 'react-perfect-scrollbar-container';

const PS_EVENTS_NAME_MAP_ENTRIES = Object.entries(PS_EVENTS_NAME_MAP);

export interface ContainerProps<
  TagName extends keyof JSX.IntrinsicElements = 'div',
> extends React.HTMLAttributes<TagName>,
    PSEventListenersType {
  children?: React.ReactNode;
  tagName?: TagName;
  options?: PerfectScrollbar.Options;
}

export interface ContainerRef {
  psRef: React.RefObject<PerfectScrollbar | null>;
  containerRef: React.RefObject<Element | null>;
}

const Container = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = 'div'>(
    {
      children,
      tagName = 'div' as TagName,
      options = {},
      className,
      ...props
    }: ContainerProps<TagName>,
    ref: React.ForwardedRef<ContainerRef>,
  ) => {
    const containerRef = useRef<Element>(null);
    const psRef = useRef<PerfectScrollbar | null>(null);

    useImperativeHandle(ref, () => ({
      psRef,
      containerRef,
    }));

    const resizeObserver = useRef<ResizeObserver | null>(null);

    const eventListeners = useRef<PSEventListenersType>({});

    const cls = useMemo(() => {
      if (!className) return CLASS_NAME;

      return `${CLASS_NAME} ${className}`;
    }, [className]);

    const setupResizeObserver = useMemoizedFn(() => {
      if (containerRef.current) {
        resizeObserver.current = new ResizeObserver(() => {
          if (psRef.current) {
            psRef.current.update();
          }
        });
        resizeObserver.current.observe(containerRef.current);
      }

      return () => {
        resizeObserver.current?.disconnect();
      };
    });

    const setupEventListeners = useMemoizedFn(() => {
      for (const [rEventName, psEventName] of PS_EVENTS_NAME_MAP_ENTRIES) {
        const existingListener =
          eventListeners.current[rEventName as PSEventNameType];
        if (existingListener && containerRef.current) {
          containerRef.current.removeEventListener(
            psEventName,
            existingListener as EventListener,
          );
        }
      }

      eventListeners.current = {};

      if (containerRef.current) {
        for (const [rEventName, psEventName] of PS_EVENTS_NAME_MAP_ENTRIES) {
          const listener = props[rEventName as PSEventNameType];
          if (listener) {
            containerRef.current?.addEventListener(
              psEventName,
              listener as EventListener,
            );
            eventListeners.current[rEventName as PSEventNameType] = listener;
          }
        }
      }

      return () => {
        for (const [rEventName, psEventName] of PS_EVENTS_NAME_MAP_ENTRIES) {
          const listener =
            eventListeners.current[rEventName as PSEventNameType];
          if (listener && containerRef.current) {
            containerRef.current.removeEventListener(
              psEventName,
              listener as EventListener,
            );
          }
        }

        eventListeners.current = {};
      };
    });

    useEffect(() => {
      const disconnectObservers = setupResizeObserver();
      const disconnectEventListeners = setupEventListeners();

      return () => {
        disconnectObservers();
        disconnectEventListeners();
      };
    }, [setupResizeObserver, setupEventListeners]);

    useEffect(() => {
      if (containerRef.current) {
        psRef.current = new PerfectScrollbar(containerRef.current, options);
      }

      return () => {
        psRef.current?.destroy();
        psRef.current = null;
      };
    }, [options]);

    return createElement(tagName, {
      ref: containerRef,
      className: cls,
      ...props,
      children,
    });
  },
);

Container.displayName = 'Container';

export default Container;
