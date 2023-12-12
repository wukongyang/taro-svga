import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
} from "react";
import SVGA from "svgaplayerweb";
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
      onFrame = () => {},
      onPercentage = () => {},
      initState = "pause",
      width = 400,
      height = 400,
      loops = 0,
      src,
      style = {},
    },
    ref
  ) => {
    const player = useRef<SVGA.Player | null>(null);
    useEffect(() => {
      loadAnimation();
    }, []);
    useImperativeHandle(ref, () => {
      return {
        start: () => {
          player.current?.startAnimation();
        },
        pause: () => {
          player.current?.pauseAnimation();
        },
        clear: () => {
          player.current?.clear();
        },
        stepToFrame: (frame: number, play: boolean) => {
          player.current?.stepToFrame(frame, play);
        },
        stepToPercentage: (percentage: number, play: boolean) => {
          player.current?.stepToPercentage(percentage, play);
        },
      };
    });

    async function loadAnimation() {
      const parser = new SVGA.Parser();
      player.current = new SVGA.Player("#svgaPlayer");
      player.current.loops = loops;
      player.current.onFinished(onFinished);
      player.current.onFrame(onFrame);
      player.current.onPercentage(onPercentage);
      await parser.load(src, (videoItem) => {
        player.current?.setVideoItem(videoItem);
        if (initState === "start") {
          player.current?.startAnimation();
        }
      });
    }
    return (
      <div
        id='svgaPlayer'
        style={{
          width: Taro.pxTransform(width),
          height: Taro.pxTransform(height),
          ...style,
        }}
      />
    );
  }
);
export default Svga;
