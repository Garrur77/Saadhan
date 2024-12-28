import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"
const Done = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={96}
    height={96}
    fill="none"
    {...props}
  >
    <Path
      fill="#4CE5B1"
      fillRule="evenodd"
      d="M48 96c26.51 0 48-21.49 48-48S74.51 0 48 0 0 21.49 0 48s21.49 48 48 48Zm30.092-58.373-35.65 35.47a3.111 3.111 0 0 1-4.384 0l-20.15-20.048a3.073 3.073 0 0 1 0-4.362l4.384-4.362a3.111 3.111 0 0 1 4.384 0L40.25 57.83l29.074-28.926a3.111 3.111 0 0 1 4.384 0l4.384 4.361a3.073 3.073 0 0 1 0 4.362Z"
      clipRule="evenodd"
    />
  </Svg>
)
export default Done
