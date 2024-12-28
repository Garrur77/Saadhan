import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Clock = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={17}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="m9.807 8.807 2.182 1.26a.451.451 0 0 1 .162.61.442.442 0 0 1-.61.165L9.322 9.56a1.342 1.342 0 1 1-1.27-2.326v-4.1c0-.25.208-.45.448-.45.247 0 .447.208.447.45v4.1a1.343 1.343 0 0 1 .86 1.572ZM8.5 17a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Clock