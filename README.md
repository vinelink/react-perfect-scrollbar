# React Perfect Scrollbar

[![npm version](https://img.shields.io/npm/v/@vinelink/react-perfect-scrollbar.svg?style=for-the-badge)](https://www.npmjs.com/package/@vinelink/react-perfect-scrollbar)
[![downloads](https://img.shields.io/npm/dm/@vinelink/react-perfect-scrollbar.svg?style=for-the-badge&color=blue)](https://npm-stat.com/charts.html?package=%40vinelink%2Freact-perfect-scrollbar)

A React component wrapper for [perfect-scrollbar](https://github.com/mdbootstrap/perfect-scrollbar).

## Features

- TypeScript support
- Lightweight wrapper around perfect-scrollbar
- Automatic cleanup of event listeners and observers
- Support for all perfect-scrollbar events and options

## Installation

```bash
npm install @vinelink/react-perfect-scrollbar
```

## Usage

```tsx
import { Container } from "@vinelink/react-perfect-scrollbar";
import "@vinelink/react-perfect-scrollbar/style.css";

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
