import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Cross= (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M1 19 19 1M1 1l18 18"
    />
  </Svg>
)
export default Cross