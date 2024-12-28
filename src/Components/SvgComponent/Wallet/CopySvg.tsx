import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"

const CopySvg =(props: SvgProps) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={15}
    height={15}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h15v15H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="scale(.06667)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAA/0lEQVQ4Ea3Tvy5EURAG8J838KfRSDyCWkOipUfolHgGUWjEGwgNLSJoFCQKr0AioVVIRKOQILM5ZzN31y6FSeaeMzPfNzN3JoemjOMYXx260YR1W2N4wjsWUngNB8nuuo7iEdu4wGJCrPcjB/EeW4VwhvlEXsUdrnCddDcwN/hIzhfMJXJ0EzO4xXTR2eLzWcA1MIWBQl7BG3ZwnhIOVXJkHU6Bel3GKyawVGZRYyOZPFi95Zyh1dEJYk1HOE2YwEfR1ifayLJfKgWx6mQC9G37ELHfXtJoO6ZbBxbnJWJFvaRdeS+tqe7x+Rdy+59/yv7ntv+dvFm20Pm6sv3wDSGpTN/YdPqYAAAAAElFTkSuQmCC"
        id="b"
        width={15}
        height={15}
      />
    </Defs>
  </Svg>
  )
}

export default CopySvg



