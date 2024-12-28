import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Telegram = (props: SvgProps) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={42}
    height={41}
    fill="none"
    {...props}
  >
    <Path
      fill="#40B3E0"
      d="M21 0C9.92 0 .937 8.983.937 20.064c0 11.08 8.982 20.063 20.063 20.063s20.064-8.982 20.064-20.063S32.08 0 21 0Z"
    />
    <Path
      fill="#fff"
      d="M30.762 11.541 27.18 29.61s-.501 1.253-1.88.652l-8.27-6.34-3.006-1.453-5.062-1.705s-.777-.275-.852-.877c-.075-.601.877-.927.877-.927l20.123-7.894s1.653-.726 1.653.476Z"
    />
    <Path
      fill="#D2E5F1"
      d="M16.395 29.406s-.241-.022-.542-.975c-.301-.952-1.83-5.964-1.83-5.964l12.154-7.718s.702-.426.677 0c0 0 .125.075-.25.426-.377.35-9.548 8.595-9.548 8.595"
    />
    <Path
      fill="#B5CFE4"
      d="m20.201 26.352-3.271 2.982s-.256.194-.535.072l.626-5.54"
    />
  </Svg>
  )
}

export default Telegram



