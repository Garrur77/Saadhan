import * as React from "react"
import {  Platform} from "react-native"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,

} from "react-native-svg"
import { WIDTH, HEIGHT } from "../../../Components/Helpers/Dimentions";
const platformtype=Platform.OS;
const MapImage = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    // xmlnsXlink="http://www.w3.org/1999/xlink"
    // resizeMode={'cover'}
    width={platformtype=='ios' ? 400: 260} 
    height={178}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h270v178H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use
          xlinkHref="#b"
          transform="matrix(.00123 0 0 .00187 -.195 -1.858)"
        />
      </Pattern>
      <Image
        id="b"
        width={1125}
        height={2556}
      />
    </Defs>
  </Svg>
)
export default MapImage