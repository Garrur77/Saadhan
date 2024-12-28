import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Downarrow = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={55}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#9B9B9B"
      d="M47.981 1.037c2.215-.889 5.002-.778 5.82.93.818 1.708-.083 3.903-1.762 5.02L29.947 14.96c-1.964.735-2.952.702-4.895 0L2.964 6.987c-1.529-.942-2.899-2.81-1.889-5.02 1.01-2.21 4.071-1.694 6.01-.93L27.5 8.67 47.98 1.037Z"
    />
  </Svg>
)
export default Downarrow
