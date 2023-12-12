import React, {
    forwardRef,
    useImperativeHandle,
    useRef,
    useLayoutEffect,
  } from "react";
  import { Canvas } from "@tarojs/components";
  import { Parser, Player } from "svgaplayer-tt";
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
        style={}
      },
      ref
    ) => {
      const player = useRef<Player | null>(null);
      useLayoutEffect(() => {
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
        const parser = new Parser();
        player.current = new Player();
        const videoItem = await parser.load(src);
        player.current.loops = loops;
        player.current.onFinished(onFinished);
        player.current.onFrame(onFrame);
        player.current.onPercentage(onPercentage);
        await player.current.setCanvas("#svgCanvas").then(async () => {
          await player.current?.setVideoItem(videoItem);
          if (initState === "start") {
            player.current?.startAnimation();
          }
        });
      }
      return (
        <Canvas
          type='2d'
          id='svgCanvas'
          style={{
            width: Taro.pxTransform(width),
            height: Taro.pxTransform(height),
            ...style
          }}
        />
      );
    }
  );
  export default Svga;
  