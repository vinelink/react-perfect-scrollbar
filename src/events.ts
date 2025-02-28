import type PerfectScrollbar from 'perfect-scrollbar';

export const PS_EVENTS_NAME_MAP = {
  onScrollY: 'ps-scroll-y',
  onScrollX: 'ps-scroll-x',
  onScrollUp: 'ps-scroll-up',
  onScrollDown: 'ps-scroll-down',
  onScrollLeft: 'ps-scroll-left',
  onScrollRight: 'ps-scroll-right',
  onYReachStart: 'ps-y-reach-start',
  onYReachEnd: 'ps-y-reach-end',
  onXReachStart: 'ps-x-reach-start',
  onXReachEnd: 'ps-x-reach-end',
} as const;

export type PSEventNameType = keyof typeof PS_EVENTS_NAME_MAP;

export type PSEventType = (event: CustomEvent) => void;

export type PSEventListenersType = {
  [K in PSEventNameType]?: PSEventType;
};
