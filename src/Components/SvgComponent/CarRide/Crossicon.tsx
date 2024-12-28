import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Crossicon = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#C8C7CC"
      fillRule="evenodd"
      d="M0 10C0 4.477 4.477 0 10 0s10 4.477 10 10-4.477 10-10 10S0 15.523 0 10Zm10.917.025 3.716-3.716a.667.667 0 0 0-.942-.942l-3.666 3.665-3.288-3.665a.667.667 0 0 0-.942.942l3.288 3.666-3.716 3.716a.667.667 0 0 0 .942.942l3.666-3.665 3.288 3.665a.667.667 0 0 0 .942-.942l-3.288-3.666Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Crossicon
