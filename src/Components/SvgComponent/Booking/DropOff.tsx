import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const DropOff = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M4.62 2.174 0 0v13.714l4.62 2.174V2.174Zm1.142 13.698 4.548-2.05V.11L5.762 2.158v13.714ZM16 16l-4.547-2.153V.133L16 2.286V16Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default DropOff
