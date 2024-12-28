import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Cross = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    width={16}
    height={16}
    fill="none"
    {...props}
  >
    <Path
      fill="#000"
      d="m9.562 8 6.115-6.115A1.105 1.105 0 0 0 14.115.323L8 6.438 1.885.323A1.105 1.105 0 0 0 .323 1.885L6.438 8 .323 14.115a1.105 1.105 0 0 0 1.562 1.562L8 9.562l6.115 6.115a1.105 1.105 0 0 0 1.562-1.562L9.562 8Z"
    />
  </Svg>
)
export default Cross