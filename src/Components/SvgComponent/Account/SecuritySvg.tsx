import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const SecuritySvg = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={25}
    height={25}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h25v25H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.00467)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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"
        id="b"
        width={214}
        height={214}
      />
    </Defs>
  </Svg>
)
export default SecuritySvg
