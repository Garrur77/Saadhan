import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Map2 = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={23}
    height={90}
    fill="none"
    {...props}
  >
    <Path
      stroke="#C8C7CC"
      strokeDasharray="4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.5 24.935v39.69"
    />
    <Path
      fill="#F50"
      fillRule="evenodd"
      d="M11.5 90c1.167 0 6.723-5.643 8.093-7.44C21.7 79.795 23 78.16 23 75.11c0-5.136-5.149-9.3-11.5-9.3S0 69.974 0 75.11c0 3.067 1.205 4.69 3.304 7.45C4.767 84.481 10.334 90 11.5 90Zm0-10.24c3.176 0 5.75-2.082 5.75-4.65 0-2.568-2.574-4.65-5.75-4.65s-5.75 2.082-5.75 4.65c0 2.568 2.574 4.65 5.75 4.65ZM11.5 24.19c1.167 0 6.723-5.643 8.093-7.44C21.7 13.985 23 12.35 23 9.3 23 4.164 17.851 0 11.5 0S0 4.164 0 9.3c0 3.067 1.205 4.69 3.304 7.45 1.463 1.922 7.03 7.44 8.196 7.44Zm0-10.24c3.176 0 5.75-2.082 5.75-4.65 0-2.568-2.574-4.65-5.75-4.65S5.75 6.732 5.75 9.3c0 2.568 2.574 4.65 5.75 4.65Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Map2
