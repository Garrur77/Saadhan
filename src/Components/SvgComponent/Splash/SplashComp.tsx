import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const SplashComp = (props: SvgProps)=> {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={82}
    height={99}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M27.313 0H9.877a.36.36 0 0 0-.265.605l7.792 8.447a.36.36 0 0 1-.008.498L9.66 17.376a.36.36 0 0 0 .257.614H27.32a.36.36 0 0 0 .28-.135l6.71-8.331a.36.36 0 0 0 .008-.443L27.601.144A.36.36 0 0 0 27.313 0Z"
    />
    <Path
      fill="#fff"
      d="M45.925 8.851 39.462.421A.262.262 0 0 1 39.669 0h12.455C67.69 0 80.307 12.618 80.307 28.183c0 15.566-12.618 28.184-28.183 28.184H30.751a.32.32 0 0 0-.318.338l1.996 33.048a3.605 3.605 0 0 1-3.023 3.776L.529 98.196a.373.373 0 0 1-.426-.44l5.945-30.303a.721.721 0 0 1 .114-.27l8.77-12.742a.72.72 0 0 0-.061-.895l-6.136-6.735a.721.721 0 0 1-.167-.66l1.941-7.764a.72.72 0 0 1 .7-.546h39.406c5.482 0 9.926-4.444 9.926-9.926s-4.444-9.925-9.926-9.925H39.597a.216.216 0 0 1-.168-.354l6.48-7.889a.72.72 0 0 0 .016-.896Z"
    />
  </Svg>
  )
}

export default SplashComp





