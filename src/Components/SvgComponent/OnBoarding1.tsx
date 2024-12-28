import * as React from "react"
import Svg, { SvgProps, Mask, Path, G } from "react-native-svg"


const OnBoarding1 =  (props: SvgProps)=> {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={278}
    height={278}
    fill="none"
    {...props}
  >
    <Mask
      id="a"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M0 0h278v278H0V0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#a)">
      <Path
        fill="#EFF3F9"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.233 0 139s62.233 139 139 139 139-62.233 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      d="M105.924 231.359c-9.985 0-18.078-8.094-18.078-18.078 0-9.985 8.093-18.078 18.078-18.078 9.984 0 18.078 8.093 18.078 18.078 0 9.984-8.094 18.078-18.078 18.078ZM69.366 193.943a5.277 5.277 0 1 1 0-10.554 5.277 5.277 0 0 1 0 10.554ZM155.909 220.314a3.517 3.517 0 1 1 .001-7.033 3.517 3.517 0 0 1-.001 7.033ZM204.568 54.293a3.516 3.516 0 1 1 0-7.032 3.516 3.516 0 0 1 0 7.032Z"
      clipRule="evenodd"
    />
    <Path
      fill="#E0E8F6"
      fillRule="evenodd"
      d="M188.822 86.24h7.873v-.686a4.188 4.188 0 0 0-4.189-4.189h-22.598a4.188 4.188 0 0 0-4.188 4.189v66.797h17.562V91.779a5.54 5.54 0 0 1 5.54-5.54Z"
      clipRule="evenodd"
    />
    <Mask
      id="b"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M0 278h278V0H0v278Z"
        clipRule="evenodd"
      />
    </Mask>
    <G fillRule="evenodd" clipRule="evenodd" mask="url(#b)">
      <Path fill="#D0DBF0" d="M141.944 152.35h19.206V94.56h-19.206v57.79Z" />
      <Path
        fill="#E0E8F6"
        d="M189.642 78.188h-16.87a1.167 1.167 0 0 1-1.168-1.167v-6.846c0-.644.523-1.167 1.168-1.167h16.87c.646 0 1.168.523 1.168 1.167v6.846c0 .645-.522 1.167-1.168 1.167Z"
      />
      <Path
        fill="#D0DBF0"
        d="M137.785 152.351h-39.1V53.966a3.32 3.32 0 0 1 4.123-3.221l32.46 8.097a3.32 3.32 0 0 1 2.517 3.221v90.288Z"
      />
      <Path
        fill="#E0E8F6"
        d="M81.35 152.35v-34.006a5.523 5.523 0 0 1 5.523-5.522h6.263v39.528H81.35Z"
      />
      <Path
        fill="#C0CBE2"
        d="M179.821 145.878c-.81 0-1.467-.656-1.467-1.466v-51.62a1.466 1.466 0 1 1 2.933 0v51.62c0 .81-.656 1.466-1.466 1.466ZM171.684 145.878c-.81 0-1.466-.656-1.466-1.466v-51.62a1.465 1.465 0 1 1 2.932 0v51.62c0 .81-.656 1.466-1.466 1.466Z"
      />
      <Path
        fill="#C1CAE7"
        d="M130.369 73.598H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.295 2.295 0 0 1 0 4.59ZM130.369 83.66H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.296 2.296 0 0 1 0 4.59ZM130.369 93.722H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.295 2.295 0 0 1 0 4.59ZM130.369 103.784H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.296 2.296 0 0 1 0 4.59ZM130.369 113.845H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.296 2.296 0 0 1 0 4.59ZM130.369 123.908H107.22a2.295 2.295 0 0 1 0-4.591h23.149a2.296 2.296 0 0 1 0 4.591ZM130.369 133.969H107.22a2.295 2.295 0 1 1 0-4.59h23.149a2.296 2.296 0 0 1 0 4.59ZM130.369 144.032H107.22a2.295 2.295 0 1 1 0-4.591h23.149a2.295 2.295 0 0 1 0 4.591Z"
      />
      <Path
        fill="#E0E8F6"
        d="M72.332 152.35H41.356V91.246a5.007 5.007 0 0 1 5.008-5.008h20.96a5.007 5.007 0 0 1 5.008 5.008v61.104Z"
      />
      <Path
        fill="#C1CAE7"
        d="M66.467 99.413H47.22a1.952 1.952 0 0 1-1.951-1.951v-.074c0-1.078.874-1.953 1.951-1.953h19.246c1.078 0 1.951.875 1.951 1.953v.074a1.951 1.951 0 0 1-1.951 1.951ZM66.467 108.132H47.22a1.951 1.951 0 0 1-1.951-1.951v-.074c0-1.079.874-1.953 1.951-1.953h19.246c1.078 0 1.951.874 1.951 1.953v.074a1.95 1.95 0 0 1-1.951 1.951ZM66.467 116.852H47.22a1.952 1.952 0 0 1-1.951-1.952v-.074c0-1.078.874-1.952 1.951-1.952h19.246c1.078 0 1.951.874 1.951 1.952v.074a1.951 1.951 0 0 1-1.951 1.952ZM66.467 125.571H47.22a1.952 1.952 0 0 1-1.951-1.952v-.074c0-1.078.874-1.952 1.951-1.952h19.246c1.078 0 1.951.874 1.951 1.952v.074a1.952 1.952 0 0 1-1.951 1.952ZM66.467 134.29H47.22a1.952 1.952 0 0 1-1.951-1.951v-.074c0-1.078.874-1.953 1.951-1.953h19.246c1.078 0 1.951.875 1.951 1.953v.074a1.951 1.951 0 0 1-1.951 1.951ZM66.467 143.009H47.22a1.951 1.951 0 0 1-1.951-1.951v-.074c0-1.078.874-1.952 1.951-1.952h19.246c1.078 0 1.951.874 1.951 1.952v.074a1.95 1.95 0 0 1-1.951 1.951Z"
      />
      <Path
        fill="#E0E8F6"
        d="M223.07 155.124h-37.915V94.552c0-3.06 2.48-5.54 5.539-5.54h26.836c3.06 0 5.54 2.48 5.54 5.54v60.572Z"
      />
      <Path
        fill="#C1CAE7"
        d="M216.292 102.187h-24.358a1.989 1.989 0 1 1 0-3.978h24.358a1.99 1.99 0 0 1 0 3.978ZM216.292 110.907h-24.358a1.99 1.99 0 0 1 0-3.978h24.358a1.989 1.989 0 1 1 0 3.978ZM216.292 119.625h-24.358a1.989 1.989 0 1 1 0-3.978h24.358a1.99 1.99 0 0 1 0 3.978Z"
      />
      <Path
        fill="#D0DBF0"
        d="M90.772 89.131a5.495 5.495 0 0 1-5.495-5.495V73.561H64.935v9.19h5.322a5.745 5.745 0 0 1 5.745 5.745v63.854h3.033v-36.089a6.097 6.097 0 0 1 6.098-6.097h8.003V89.131h-2.364Z"
      />
      <Path
        fill="#E0E8F6"
        d="M186.71 63.057h-11.005a1.167 1.167 0 0 1-1.168-1.168v-5.42c0-.645.523-1.167 1.168-1.167h11.005c.645 0 1.167.522 1.167 1.167v5.42c0 .646-.522 1.168-1.167 1.168ZM183.283 53.117h-4.15V42.332c0-.44.356-.796.795-.796h2.559c.44 0 .796.357.796.796v10.785Z"
      />
      <Path
        fill="#7E89A0"
        d="M193.574 162.521H71.539a3.12 3.12 0 0 1 0-6.242h122.035a3.121 3.121 0 0 1 0 6.242Z"
      />
      <Path
        fill="#919DB6"
        d="M267.854 168.069c0-8.288-6.719-15.008-15.007-15.008H36.858a4.285 4.285 0 1 1 0-8.571h1.263v-6.435h-8.109c-8.288 0-15.007 6.718-15.007 15.006 0 8.289 6.72 15.008 15.007 15.008h218.549a4.285 4.285 0 1 1 0 8.571h-29.119a3.219 3.219 0 1 0 0 6.436h33.582v-.009c8.206-.096 14.83-6.77 14.83-14.998Z"
      />
      <Path
        fill="#919DB6"
        d="M203.801 176.64h-20.763a3.218 3.218 0 0 0 0 6.436h20.763a3.218 3.218 0 1 0 0-6.436Z"
      />
      <Path
        fill="#E9E3D5"
        d="M189.429 113.753v4.594h4.24v-2.474a3.18 3.18 0 0 0-3.181-3.18c-.585 0-1.059.474-1.059 1.06Z"
      />
      <Path
        fill="#FFB545"
        d="M220.581 146.885c-.507-.499-.766-1.198-.766-1.909v-6.843a12.71 12.71 0 0 0-2.544-7.63l-7.632-10.177a8.478 8.478 0 0 0-6.785-3.392h-20.568a8.479 8.479 0 0 0-7.325 4.207l-7.439 12.753-8.908 1.068a8.355 8.355 0 0 0-.808.136l-6.678 8.213v7.543a4.24 4.24 0 0 0 4.24 4.24h61.762a4.24 4.24 0 0 0 4.239-4.24v-2.081c0-.709-.284-1.39-.788-1.888Z"
      />
      <Path
        fill="#FF7E40"
        d="M220.583 146.887c-.508-.5-.768-1.199-.768-1.91V138.133c0-2.641-.84-5.358-2.544-7.63l-7.632-10.177a8.48 8.48 0 0 0-3.314-2.647 4.243 4.243 0 0 0-.078 5.191l4.929 6.571-4.358 4.453h4.49c2.328 0 4.254 1.867 4.267 4.195V145.005c.003.771-.868 1.232-1.483.769a11.592 11.592 0 0 0-6.997-2.34c-4.934 0-9.159 3.081-10.86 7.42h-2.566v-29.68h-4.24v29.68h-16.93c-1.639-3.74-5.373-6.36-9.712-6.36-4.336 0-8.069 2.621-9.707 6.36h-1.952a4.24 4.24 0 0 0 4.24 4.24h61.762a4.24 4.24 0 0 0 4.24-4.24v-2c0-.732-.266-1.453-.787-1.967Z"
      />
      <Path
        fill="#35404A"
        d="M180.878 139.195h4.239a1.06 1.06 0 1 0 0-2.121h-4.239a1.06 1.06 0 0 0 0 2.121ZM197.837 139.195h4.24a1.06 1.06 0 1 0 0-2.121h-4.24a1.06 1.06 0 0 0 0 2.121Z"
      />
      <Path
        fill="#447876"
        d="m178.624 123.276-6.193 10.617h16.998v-12.72h-7.142a4.255 4.255 0 0 0-3.663 2.103ZM210.698 128.806l-4.452-5.936a4.235 4.235 0 0 0-3.392-1.696h-9.186v12.72h14.486a3.18 3.18 0 0 0 2.544-5.088Z"
      />
      <Path
        fill="#C5324F"
        d="M216.281 138.134a2.12 2.12 0 0 0 0 4.24h3.533v-4.24h-3.533Z"
      />
      <Path
        fill="#E9E3D5"
        d="m152.289 139.03-.02.036a8.468 8.468 0 0 0-1.141 4.246h2.438a4.24 4.24 0 0 0 4.24-4.241v-3.973c-2.299.497-4.321 1.905-5.517 3.932Z"
      />
      <Path
        fill="#596775"
        d="M162.787 162.514c-4.091 0-7.419-3.329-7.419-7.42 0-4.091 3.328-7.42 7.419-7.42 4.092 0 7.42 3.329 7.42 7.42 0 4.091-3.328 7.42-7.42 7.42Z"
      />
      <Path
        fill="#35404A"
        d="M164.305 147.83a4.24 4.24 0 0 0 .731 5.015l-4.497 4.497a4.244 4.244 0 0 0-5.016-.732c.703 3.366 3.693 5.903 7.264 5.903 4.092 0 7.421-3.328 7.421-7.42 0-3.571-2.539-6.56-5.903-7.263Z"
      />
      <Path
        fill="#E9E3D5"
        d="M165.967 155.093a3.18 3.18 0 1 1-6.36 0 3.179 3.179 0 0 1 3.18-3.179 3.179 3.179 0 0 1 3.18 3.179Z"
      />
      <Path
        fill="#596775"
        d="M207.095 162.514c-4.091 0-7.419-3.329-7.419-7.42 0-4.091 3.328-7.42 7.419-7.42 4.092 0 7.42 3.329 7.42 7.42 0 4.091-3.328 7.42-7.42 7.42Z"
      />
      <Path
        fill="#35404A"
        d="M208.612 147.83a4.24 4.24 0 0 0 .731 5.015l-4.498 4.497a4.24 4.24 0 0 0-5.014-.732c.702 3.366 3.693 5.903 7.263 5.903 4.092 0 7.421-3.328 7.421-7.42 0-3.571-2.537-6.56-5.903-7.263Z"
      />
      <Path
        fill="#E9E3D5"
        d="M210.275 155.093a3.18 3.18 0 1 1-6.36 0 3.18 3.18 0 0 1 6.36 0Z"
      />
    </G>
    <Mask
      id="c"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#c)">
      <Path
        fill="#DBAA79"
        fillRule="evenodd"
        d="m142.239 134.875-11.259 9.452a4.524 4.524 0 0 1-5.816-6.929l12.353-10.369a3.098 3.098 0 0 1 4.363.381l.915 1.093a4.521 4.521 0 0 1-.556 6.372Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="d"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#d)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="m141.843 132.88-12.759 10.709a3.544 3.544 0 0 1-4.994-.436l-.396-.472a3.545 3.545 0 0 1 .436-4.994l12.759-10.71a3.543 3.543 0 0 1 4.993.437l.397.472a3.545 3.545 0 0 1-.436 4.994Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="e"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#e)">
      <Path
        fill="#DBAA79"
        fillRule="evenodd"
        d="M96.604 179.85c-.169.677-2.031 34.197-1.523 34.366.507.168 26.409-14.052 26.409-14.052l3.047-17.436-27.933-2.878Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="f"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#f)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M131.479 177.479c-.847 2.031-2.085 21.509-11.173 32.165-10.54 12.359-17.606 11.343-19.13 11.682-.675 1.35-1.884 3.501-3.15 5.693-2.316 4.009-6.418 6.692-11.027 7.121-.581.053-1.215.127-1.906.221-5.483.756-5.925 3.556-9.819 5.756-3.893 2.201-8.295 5.248-14.39 2.201-6.967-3.484-12.528 3.047-12.528 3.047l24.717-42.999s-1.016-28.612 3.894-36.907c4.91-8.295 20.653-23.87 20.653-23.87s10.666 8.973-6.94 22.515c0 5.418-.34 9.481-.34 9.481s13.375 3.894 9.312 33.181c8.803 0 16.252-2.031 18.622-10.156 2.37-5.756 3.894-8.296 3.894-8.296-2.031 0 1.693-45.201 1.693-45.201l7.618 34.366Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="g"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#g)">
      <Path
        fill="#535565"
        fillRule="evenodd"
        d="M124.974 196.64H94.255a8.135 8.135 0 0 1-8.135-8.136v-76.193a8.136 8.136 0 0 1 8.135-8.135h30.719a8.135 8.135 0 0 1 8.135 8.135v76.193a8.135 8.135 0 0 1-8.135 8.136Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="h"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#h)">
      <Path
        fill="#FFE3E0"
        fillRule="evenodd"
        d="M123.216 194.257H96.013a7.51 7.51 0 0 1-7.511-7.511V114.07a7.51 7.51 0 0 1 7.51-7.51h27.204a7.51 7.51 0 0 1 7.511 7.51v72.676a7.511 7.511 0 0 1-7.511 7.511Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="i"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#i)">
      <Path
        fill="#F50"
        fillRule="evenodd"
        d="M123.216 194.257H96.013a7.51 7.51 0 0 1-7.511-7.511V114.07a7.51 7.51 0 0 1 7.51-7.51h27.204a7.51 7.51 0 0 1 7.511 7.51v72.676a7.511 7.511 0 0 1-7.511 7.511Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="j"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#j)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M121.119 133.603c0 6.354-5.151 11.504-11.505 11.504-6.353 0-11.504-5.15-11.504-11.504 0-6.354 5.151-11.504 11.504-11.504 6.354 0 11.505 5.15 11.505 11.504Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="k"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#k)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M105.052 128.956a6.563 6.563 0 0 1 4.563-1.839c1.772 0 3.379.701 4.563 1.839"
      />
    </G>
    <Mask
      id="l"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#l)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M114.67 137.931a6.575 6.575 0 0 1-5.055 2.364 6.577 6.577 0 0 1-5.056-2.364"
      />
    </G>
    <Mask
      id="m"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#m)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M103.167 132.347a6.565 6.565 0 0 0 1.391 5.583"
      />
    </G>
    <Mask
      id="n"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#n)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M114.67 137.93a6.56 6.56 0 0 0 1.392-5.583"
      />
    </G>
    <Mask
      id="o"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#o)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M105.052 128.955a6.578 6.578 0 0 0-1.885 3.392"
      />
    </G>
    <Mask
      id="p"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#p)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M114.178 128.955a6.585 6.585 0 0 1 1.885 3.392"
      />
    </G>
    <Mask
      id="q"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#q)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="m109.765 135.247-.15-.003c-.051 0-.101.003-.151.003"
      />
    </G>
    <Mask
      id="r"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#r)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M114.671 137.93c-.952-1.564-2.787-2.634-4.905-2.683"
      />
    </G>
    <Mask
      id="s"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#s)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M109.465 135.248c-2.119.049-3.953 1.119-4.905 2.683"
      />
    </G>
    <Mask
      id="t"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#t)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M109.766 135.247c3.105-.038 5.68-1.269 6.297-2.9"
      />
    </G>
    <Mask
      id="u"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#u)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="m109.765 135.248-.15.002-.151-.002"
      />
    </G>
    <Mask
      id="v"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#v)">
      <Path
        stroke="#F50"
        strokeWidth={1.718}
        d="M109.465 135.247c-3.106-.038-5.681-1.269-6.298-2.9"
      />
    </G>
    <Mask
      id="w"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#w)">
      <Path
        fill="#535565"
        fillRule="evenodd"
        d="M116.394 109.86h-13.558a3.073 3.073 0 0 1-3.074-3.073v-1.365h19.705v1.365a3.073 3.073 0 0 1-3.073 3.073Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="x"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#x)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M108.782 184.391c-6.503-1.459-10.582-7.912-9.126-14.406a.625.625 0 0 1 .605-.487l2.774-.017a.623.623 0 0 1 .617.51l.579 3.113a.623.623 0 0 1-.333.672l-1.819.913a9.646 9.646 0 0 0 3.486 5.503l1.602-1.255a.626.626 0 0 1 .751-.015l2.566 1.855a.625.625 0 0 1 .198.776l-1.201 2.5a.624.624 0 0 1-.699.338Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="y"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#y)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M110.855 174.626a1.172 1.172 0 1 1-2.343.001 1.172 1.172 0 0 1 2.343-.001Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="z"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#z)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M114.621 174.626a1.172 1.172 0 1 1-2.344 0 1.172 1.172 0 0 1 2.344 0Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="A"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#A)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M118.388 174.626a1.172 1.172 0 1 1-2.345 0 1.172 1.172 0 0 1 2.345 0Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="B"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#B)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M121.912 154.004H98.09a1.045 1.045 0 1 1 0-2.09h23.822a1.045 1.045 0 0 1 0 2.09Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="C"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#C)">
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M116.757 158.85h-13.511a1.045 1.045 0 1 1 0-2.09h13.511a1.045 1.045 0 0 1 0 2.09Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="D"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#D)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M84.716 173.223c15.787 2.971 16.58 14.535 15.65 33.642-14.992-1.916-17.855-19.682-17.855-19.682l2.205-13.96Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="E"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#E)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M75.246 169.96c3.583-17.452 17.115-28.674 17.115-28.674s10.746 10.298-6.143 24.726c0 6.21.123 7.859.123 7.859"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="F"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#F)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M134.017 159.948h-5.076a4.77 4.77 0 0 1 0-9.541h5.076a4.77 4.77 0 0 1 0 9.541Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="G"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#G)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M132.103 170.783h-3.555a4.378 4.378 0 0 1-4.378-4.378v-.786a4.378 4.378 0 0 1 4.378-4.377h3.555a4.378 4.378 0 0 1 4.378 4.377v.786a4.379 4.379 0 0 1-4.378 4.378Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="H"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#H)">
      <Path
        fill="#EAC897"
        fillRule="evenodd"
        d="M133.261 182.294h-.702a4.77 4.77 0 1 1 0-9.539h.702a4.77 4.77 0 1 1 0 9.539Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="I"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#I)">
      <Path
        fill="#ECDBD0"
        fillRule="evenodd"
        d="M130.203 158.719h.14c.576-.008.83-.702.435-1.122a3.525 3.525 0 0 1 0-4.838c.391-.416.148-1.111-.423-1.121h-.064a3.54 3.54 0 0 0-3.541 3.546c.003 1.884 1.57 3.487 3.453 3.535Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="J"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#J)">
      <Path
        fill="#ECDBD0"
        fillRule="evenodd"
        d="M129.783 169.562c.214.007.423-.006.626-.037a.46.46 0 0 0 .235-.811 3.527 3.527 0 0 1 .038-5.371.462.462 0 0 0-.216-.815 3.541 3.541 0 0 0-4.11 3.474c-.011 1.884 1.545 3.499 3.427 3.56Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="K"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#K)">
      <Path
        fill="#ECDBD0"
        fillRule="evenodd"
        d="M131.857 180.333c.507.123.998.105 1.446-.02.173-.048.204-.277.059-.381a2.835 2.835 0 0 1-1.194-2.371c.021-1.13 1.643-2.004 1.664-2.533.016-.414-.788-.319-1.23-.308-1.648.041-2.997 1.337-2.899 3.023a2.866 2.866 0 0 0 2.154 2.59Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="L"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#L)">
      <Path
        fill="#ECECEC"
        fillRule="evenodd"
        d="m90.645 240.324-29.88-23.365 4.38-5.602 29.88 23.365-4.38 5.602Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="M"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#M)">
      <Path
        fill="#535565"
        fillRule="evenodd"
        d="m75.594 266.631-36.733-28.724 18.477-23.629 36.733 28.725-18.477 23.628Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="N"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#N)">
      <Path
        fill="#CFCFCF"
        fillRule="evenodd"
        d="m70.457 224.537-10.352-8.096 4.38-5.601 10.352 8.096-4.38 5.601Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="O"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139S215.767 0 139 0Z"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#O)">
      <Path
        fill="#38414A"
        fillRule="evenodd"
        d="m50.11 246.904-11.264-8.808 18.476-23.628 11.265 8.808-18.478 23.628Z"
        clipRule="evenodd"
      />
    </G>
    <Mask
      id="P"
      width={278}
      height={278}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "luminance",
      }}
    >
      <Path
        fill="#fff"
        fillRule="evenodd"
        d="M139 0C62.233 0 0 62.232 0 139s62.233 139 139 139 139-62.232 139-139"
        clipRule="evenodd"
      />
    </Mask>
    <G mask="url(#P)">
      <Path
        fill="#ECDBD0"
        fillRule="evenodd"
        d="M90.513 142.993s1.304 2.167 1.304 2.865c0 .699-4.642 5.966-6.022 6.431-.542.184-3.264.473-3.264.473s4.068-6.376 7.982-9.769Z"
        clipRule="evenodd"
      />
    </G>
  </Svg>
  )
}

export default OnBoarding1





