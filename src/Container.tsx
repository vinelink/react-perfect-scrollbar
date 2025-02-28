import PerfectScrollbar from "perfect-scrollbar";
import {
  type JSX,
  useRef,
  useEffect,
  createElement,
  forwardRef,
  useImperativeHandle,
  useCallback,
  useMemo,
} from "react";
import {
  PS_EVENTS_NAME_MAP,
  type PSEventNameType,
  type PSEventListenersType,
} from "./events";

const CLASS_NAME = "react-perfect-scrollbar-container";

interface ContainerProps<TagName extends keyof JSX.IntrinsicElements = "div">
  extends React.HTMLAttributes<TagName>,
    PSEventListenersType {
  children?: React.ReactNode;
  tagName?: TagName;
  options?: PerfectScrollbar.Options;
}

interface ContainerRef {
  ps: PerfectScrollbar | null;
  containerRef: React.RefObject<Element | null>;
}

const Container = forwardRef(
  <TagName extends keyof JSX.IntrinsicElements = "div">(
    {
      children,
      tagName = "div" as TagName,
      options = {},
      className,
      ...props
    }: ContainerProps<TagName>,
    ref: React.Ref<ContainerRef>
  ) => {
    const containerRef = useRef<Element>(null);

    const psRef = useRef<PerfectScrollbar | null>(null);

    const resizeObserver = useRef<ResizeObserver | null>(null);

    const eventListeners = useRef<PSEventListenersType>({});

    const cls = useMemo(() => {
      if (!className) return CLASS_NAME;

      return `${CLASS_NAME} ${className}`;
    }, [className]);

    const setupResizeObserver = useCallback(() => {
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
    }, []);

    const setupEventListeners = useCallback(() => {
      Object.entries(PS_EVENTS_NAME_MAP).forEach(
        ([rEventName, psEventName]) => {
          const existingListener =
            eventListeners.current[rEventName as PSEventNameType];
          if (existingListener && containerRef.current) {
            containerRef.current.removeEventListener(
              psEventName,
              existingListener as EventListener
            );
          }
        }
      );

      eventListeners.current = {};

      if (containerRef.current) {
        Object.entries(PS_EVENTS_NAME_MAP).forEach(
          ([rEventName, psEventName]) => {
            const listener = props[rEventName as PSEventNameType];
            if (listener) {
              containerRef.current?.addEventListener(
                psEventName,
                listener as EventListener
              );
              eventListeners.current[rEventName as PSEventNameType] = listener;
            }
          }
        );
      }

      return () => {
        Object.entries(PS_EVENTS_NAME_MAP).forEach(
          ([rEventName, psEventName]) => {
            const listener =
              eventListeners.current[rEventName as PSEventNameType];
            if (listener && containerRef.current) {
              containerRef.current.removeEventListener(
                psEventName,
                listener as EventListener
              );
            }
          }
        );
        eventListeners.current = {};
      };
    }, [props]);

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

    useImperativeHandle(ref, () => ({
      ps: psRef.current,
      containerRef: containerRef,
    }));

    return createElement(tagName, {
      ref: containerRef,
      className: cls,
      ...props,
      children,
    });
  }
);

Container.displayName = "Container";

export default Container;
