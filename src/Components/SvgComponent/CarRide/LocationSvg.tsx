import * as React from "react"
import Svg, { SvgProps, G, Rect, Path, Defs } from "react-native-svg"
/* SVGR has dropped some elements not supported by react-native-svg: filter */
const SvgComponent = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={34}
    height={38}
    fill="none"
    {...props}
  >
    <G filter="url(#a)">
      <Rect
        width={10.833}
        height={4.167}
        x={11.5}
        y={22.834}
        fill="#B3B3B3"
        fillOpacity={0.8}
        rx={2.083}
      />
    </G>
    <G filter="url(#b)">
      <Path
        fill="#F50"
        fillRule="evenodd"
        d="M17.01 22.833c.813 0 4.683-4.86 5.637-6.408 1.467-2.38 2.373-3.788 2.373-6.415a8.01 8.01 0 0 0-16.02 0c0 2.64.84 4.04 2.301 6.415 1.02 1.656 4.896 6.408 5.709 6.408Z"
        clipRule="evenodd"
      />
      <Path
        stroke="#fff"
        strokeWidth={2}
        d="M17.01 23.833c.275 0 .5-.094.627-.157.145-.071.28-.16.4-.248.24-.176.5-.408.76-.662a28.138 28.138 0 0 0 1.743-1.911c1.199-1.422 2.442-3.068 2.958-3.905l.132-.214c1.39-2.252 2.39-3.872 2.39-6.726a9.01 9.01 0 1 0-18.02 0c0 2.945.982 4.555 2.45 6.939.55.895 1.815 2.544 3.024 3.952a27.55 27.55 0 0 0 1.754 1.887c.261.25.522.478.762.65.12.087.256.174.4.243.127.061.35.152.62.152Z"
      />
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M17.01 14.015a4.005 4.005 0 1 0 0-8.01 4.005 4.005 0 0 0 0 8.01Z"
      clipRule="evenodd"
    />
    <Defs></Defs>
  </Svg>
)
export default SvgComponent
