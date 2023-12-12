import { ComponentType } from "react";

import { SVGAPlayerProps, SVGAPlayerRefs } from "./index.type";

let implementation;
if (process.env.TARO_ENV === "weapp") {
  implementation = require("./lib/mp");
} else if (process.env.TARO_ENV === "h5") {
  implementation = require("./lib/h5");
} else if (process.env.TARO_ENV === "tt") {
  implementation = require("./lib/tt");
} else {
  implementation = require("./lib/rn");
}
export interface SvgaPlayerProps extends SVGAPlayerProps {}
export interface SvgaPlayerRefs extends SVGAPlayerRefs {}

const SvgaPlayer: ComponentType<SvgaPlayerProps> =
  implementation.default || implementation;



export default SvgaPlayer;
