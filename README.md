# taro-svga

## Installing

```
yarn add taro-svga
```

### Extra Installing For React Native

Go to your ios folder and run:

```
pod install
```

## Basic Usage

```tsx
import SvgaPlayer, { SvgaPlayerRefs } from "taro-svga";
import { useRef } from "react";

const App = () => {
  const SvgaRef = useRef<SvgaPlayerRefs>();
  return (
    <SvgaPlayer
      ref={SvgaRef}
      src="https://cdn.jsdelivr.net/gh/svga/SVGA-Samples@master/angel.svga"
    />
  );
};
```
