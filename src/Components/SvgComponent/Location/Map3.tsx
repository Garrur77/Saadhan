import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Map3 = (props: SvgProps) => (
  <Svg
    //xmlns="http://www.w3.org/2000/svg"
    width={10}
    height={46}
    fill="none"
    {...props}
  >
    <Path
      stroke="#C8C7CC"
      strokeDasharray="4 4"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 13.344v21.029"
    />
    <Path
      fill="#F50"
      fillRule="evenodd"
      d="M4.998 13c.507 0 2.922-3.033 3.518-3.999.915-1.485 1.48-2.363 1.48-4.003a4.998 4.998 0 0 0-9.996 0c0 1.648.524 2.52 1.436 4.003C2.072 10.034 4.491 13 4.998 13Zm0-5.503a2.5 2.5 0 1 0 0-4.998 2.5 2.5 0 0 0 0 4.998ZM4.998 46c.507 0 2.922-3.033 3.518-3.999.915-1.485 1.48-2.363 1.48-4.003a4.998 4.998 0 1 0-9.996 0c0 1.648.524 2.52 1.436 4.003C2.072 43.034 4.491 46 4.998 46Zm0-5.503a2.5 2.5 0 1 0 0-4.998 2.5 2.5 0 0 0 0 4.998Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Map3