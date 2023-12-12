import { CSSProperties } from "react";

export interface SVGAPlayerProps {
  /**
   * 动画宽度
   * @default 400
   */
  width?: number;
   /**
   * 动画高度
   * @default 400
   */
  height?: number;
  /**
   * 动画资源
   */
  src: string;
  /**
   * 初始化的状态
   * @default start
   */
  initState?: "start" | "pause";
  /**
   * 次数 0表示循环
   * @default 0
   */
  loops?: number;
  /**
   * 完成动画后的回调 loops=0时不会调用
   *
   */
  onFinished?(): void;
  /**
   * 完成帧数的百分比变化
   */
  onPercentage?(percentage: number): void;
  /**
   * 帧数变化
   */
  onFrame?(frame: number): void;
  /**
   * 加载完成
   */
  onLoadingEnd?(): void;
  style?: CSSProperties;
}
export interface SVGAPlayerRefs {
  start(): void;
  pause(): void;
  clear(): void;
  stepToFrame(frame: number, play: boolean): void;
  stepToPercentage(percentage: number, play: boolean): void;
}
