# taro-svga

## Supporting platforms

**weapp h5 tt rn**

## Installing

```
yarn add taro-svga
```

### Extra Installing For React Native
> Based on [svgaplayer-rn](https://github.com/wukongyang/SVGAPlayer-rn)

android

```
react-native link svgaplayer-rn
```

OR
auto link

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
![img](./angle.gif)

## Component API

> Based on [taro-svga](https://github.com/wukongyang/taro-svga)

|       Prop       |               Description                | Default | Platform |
| :--------------: | :--------------------------------------: | :-----: | :------: |
|     **src**      |           Animation Resources            |         |   all    |
|  **initState**   |          Initialization status           | `pause` |   all    |
|    **loops**     |             Number of cycles             |   `0`   |   all    |
|    **width**     |                  width                   |  `400`  |   all    |
|    **loops**     |                  height                  |  `400`  |   all    |
|    **style**     |               style sheet                |         |   all    |
|  **onFinished**  |  Callback function for ending animation  |         |   all    |
| **onPercentage** |  Callback function for progress changes  |         |   all    |
|   **onFrame**    | Callback function for frame rate changes |         |   all    |
| **onLoadingEnd** |     Load completed callback function     |         |   all    |

## Component Refs

> Based on [taro-svga](https://github.com/wukongyang/taro-svga)

|                                                               |                                  |
| :-----------------------------------------------------------: | :------------------------------: |
|                       **start(): void**                       |         Start animation          |
|                       **pause(): void**                       |         Pause animation          |
|                       **clear(): void**                       |         Clear animation          |
|      **stepToFrame(frame: number, play: boolean): void**      | Jump to the specified frame rate |
| **stepToPercentage(percentage: number, play: boolean): void** |    Jump to specified progress    |


## Possible issues
**Building an OSAtomicCompareAndSwapPtrBarrier error when using SVGA on the iOS**  

Build using xcode, locate the error file and add it at the top
```
#include <libkern/OSAtomic.h>
```
