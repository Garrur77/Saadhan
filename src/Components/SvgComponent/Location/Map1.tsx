import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Map1 = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={120}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#F50"
      strokeWidth={2}
      d="M20 10.5a9.5 9.5 0 1 1-19 0 9.5 9.5 0 0 1 19 0Z"
    />
    <Path
      stroke="#C8C7CC"
      strokeDasharray="4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 23.5v66.66"
    />
    <Path
      fill="#F50"
      fillRule="evenodd"
      d="M10.25 15.5a5.25 5.25 0 1 0 0-10.5 5.25 5.25 0 0 0 0 10.5ZM10.26 113.083c.939 0 5.413-5.618 6.516-7.408 1.696-2.751 2.742-4.379 2.742-7.416A9.26 9.26 0 1 0 1 98.26c0 3.053.97 4.67 2.66 7.416 1.178 1.914 5.66 7.408 6.6 7.408Zm0-10.194a4.63 4.63 0 1 0 0-9.26 4.63 4.63 0 0 0 0 9.26Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Map1
