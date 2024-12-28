import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const RateDriver =  (props: SvgProps) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width={26}
    height={23}
    fill="none"
    {...props}
  >
    <Path fill="url(#a)" d="M0 0h26v23H0z" />
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#b" transform="matrix(.0305 0 0 .03448 -.003 0)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACEAAAAdCAYAAAAkXAW5AAACZklEQVRYCb2XS6hOYRSGn8h9oBhIHYkRkchl4Bi5jAhzAyVCRiiXgZRyRkohI4yEMlFKicglJeVaLrmn3EooJiJ6a32n9/y+/Z+993/OXvW39re+9b7v2t9tfz90ZkuBd8Dizmjqo4cCr4C/4dVu3LZEASpCv81NVzAG+NJSxEdA8cZsrxVwzp73NFXBBOBHCD8LUXlNieLjmijkqL358hBcYbFDg13EFOB3CN5sEVNbo/ELUN6g2Vl747ktKmqnnXKqpa9ycxgwHVgF7ACOAzeAzyaixZiz85ajfOGOBY/4xCv+/2wZcAC4ALw0kvRWOS+ynM0siZeO9KS7RERv2wDVdw04CewHNgILc+oW6468nsAJ305DBdEFPLZCHgBTjXQgH8X70LQeAROTwFjgjnVeBEalzgHyo4FLpnELkG4fGxnzlNbAbWB8n4z6DR1g96wArYcRRXRDYh5TIc+BSUXJJeOa7hdWgHabdPq1fQZ6D0zrF5FPmAF8MC59cyqZdkIaka/AnEpomA18N471FfG96duMZGVvtNzDasNuLQfJZ+02osn5lMKovh9pJHcVZpXoOBNEmo469jPwp+uAEyYdYldSIOPbjdD1KEI8tWw48CdIDmYYFgFXo19e7VY7Ev3iEV9lmx8Emte1hnbxNOfJa8S8mA3GMc84Sj9qSyXyWUF+2WLq+wacCJ9y5ZWnYhZY/rrSypZ42Aj0hi7yCdhut2vdsncCinuevqCpXevapwtJIkhef3Y2tTn39T3Q/4/XGawWaWXz0+4JsKYig/KfWjG1tvkb4D6gk68TE153lLtFJP8A7yrs/yZMwUoAAAAASUVORK5CYII="
        id="b"
        width={33}
        height={29}
      />
    </Defs>
  </Svg>
  )
}

export default RateDriver






