

import * as React from "react"
import Svg, { SvgProps, Path, Mask, G } from "react-native-svg"
const Cancel = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <Path fill="red" fillOpacity={0.01} d="M0 0h24v24H0z" />
    <Path
      fill="#000"
      d="m13.562 12 6.115-6.115a1.105 1.105 0 0 0-1.562-1.562L12 10.438 5.885 4.323a1.105 1.105 0 0 0-1.562 1.562L10.438 12l-6.115 6.115a1.105 1.105 0 0 0 1.562 1.562L12 13.562l6.115 6.115a1.105 1.105 0 0 0 1.562-1.562L13.562 12Z"
    />
    <Mask
      id="a"
      width={16}
      height={16}
      x={4}
      y={4}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        d="m13.562 12 6.115-6.115a1.105 1.105 0 0 0-1.562-1.562L12 10.438 5.885 4.323a1.105 1.105 0 0 0-1.562 1.562L10.438 12l-6.115 6.115a1.105 1.105 0 0 0 1.562 1.562L12 13.562l6.115 6.115a1.105 1.105 0 0 0 1.562-1.562L13.562 12Z"
      />
    </Mask>
    <G mask="url(#a)">
      <Path fill="#4A4A4A" d="M0 0h24v24H0z" />
    </G>
  </Svg>
)
export default Cancel


