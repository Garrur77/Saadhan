import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Historybottomsvg = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      fill="#9B9B9B"
      d="M0 16.53v-.6A2.93 2.93 0 0 1 2.93 13H17v3.53A3.48 3.48 0 0 1 13.5 20h-10A3.48 3.48 0 0 1 0 16.53ZM17 3.47v8H2.93A4.41 4.41 0 0 0 0 12.63V3.47A3.48 3.48 0 0 1 3.5 0h10A3.48 3.48 0 0 1 17 3.47Zm-6.81 5.1a.76.76 0 0 0-.75-.75H4.65a.75.75 0 0 0 0 1.5h4.79a.75.75 0 0 0 .75-.75ZM13.08 5a.75.75 0 0 0-.75-.75H4.65a.75.75 0 0 0 0 1.5h7.68a.75.75 0 0 0 .75-.75Z"
    />
  </Svg>
)
export default Historybottomsvg
