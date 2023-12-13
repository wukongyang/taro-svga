import React, { useRef, forwardRef, useImperativeHandle } from "react";
import { Platform } from "react-native";
import { View } from "@tarojs/components";
import { SVGAView } from "svgaplayer-rn";
import Taro from "@tarojs/taro";


import { SVGAPlayerRefs, SVGAPlayerProps } from "../index.type";
/**
 * @description svga动画组件
 * @supported 
*/
const Svga = forwardRef<SVGAPlayerRefs, SVGAPlayerProps>(
  (
    {
      onFinished = () => {},
      onFrame,
      onPercentage,
      onLoadingEnd = () => {},
      initState = "pause",
      width = 400,
      height = 400,
      loops = 0,
      src,
      style={}
    },
    ref
  ) => {
    const svgaRef = useRef<SVGAView>(null);

    useImperativeHandle(ref, () => {
      return {
        start: () => {
          start();
        },
        pause: () => {
          pause();
        },
        clear: () => {
          clear();
        },
        stepToFrame: (frame: number, play: boolean) => {
          stepToFrame(frame, play);
        },
        stepToPercentage: (percentage: number, play: boolean) => {
          stepToPercentage(percentage, play);
        },
      };
    });
    function start() {
      svgaRef.current?.startAnimation();
    }
    function pause() {
      svgaRef.current?.pauseAnimation();
    }
    function clear() {
      svgaRef.current?.clearAnimation();
    }
    function stepToFrame(frame: number, play: boolean) {
      svgaRef.current?.stepToFrame(frame, play);
    }
    function stepToPercentage(percentage: number, play: boolean) {
      svgaRef.current?.stepToPercentage(percentage, play);
    }
    
    return (
      <>
        {src ? (
          <SVGAView
            // @ts-ignore
            ref={svgaRef}
            source={src}
            style={{
              width: Taro.pxTransform(width),
              height: Taro.pxTransform(height),
              ...style as any
            }}
            loops={loops}
            // 安卓初始化暂停，显示不出动画第一帧需要手动控制
            currentState={Platform.OS === "android" ? "start" : initState as any}
            onFinished={() => {
              onFinished();
            }}
            onLoadingEnd={() => {
              // 安卓需要手动控制
              if (initState === "pause" && Platform.OS === "android") {
                svgaRef.current?.pauseAnimation();
              }
              onLoadingEnd();
            }}
            onPercentage={(value: number) => {
              onPercentage?.(value);
            }}
            onFrame={(value: number) => {
              onFrame?.(value);
            }}
          />
        ) : (
          <View>缺少动画资源</View>
        )}
      </>
    );
  }
);

export default Svga;
