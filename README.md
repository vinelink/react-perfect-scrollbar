# React Perfect Scrollbar

A React component wrapper for [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar).

## Features

- TypeScript support
- Lightweight wrapper around perfect-scrollbar
- Automatic cleanup of event listeners and observers
- Support for all perfect-scrollbar events and options

## Installation

```bash
npm install @vinelink/react-prefect-scrollbar
```

## Usage

```tsx
import { Container } from "@vinelink/react-prefect-scrollbar";
import "@vinelink/react-prefect-scrollbar/style.css";

<Container>
  <div style={{ height: "9999px" }} />
</Container>;
```

## Options

The `Container` component accepts all options supported by `perfect-scrollbar`.

```tsx
<Container
  options={{
    theme: "minimal-dark",
    suppressScrollX: true,
    // ... other options
  }}
/>
```

## Events

The `Container` component emits all events supported by `perfect-scrollbar`.

```tsx
<Container
  onScroll={() => console.log("scrolled")}
  onScrollEnd={() => console.log("scroll ended")}
  // ... other events
/>
```

## Hooks

The `useContainer` hook provides access to the `perfect-scrollbar` instance and the container element.

```tsx
const ref = useRef<ContainerRef>(null);
const { getPsInstance, getContainer } = useContainer(ref);

<Container ref={ref}>
  <div style={{ height: "9999px" }} />
</Container>;
```
