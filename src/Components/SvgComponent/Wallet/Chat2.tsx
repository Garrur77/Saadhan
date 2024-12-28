import * as React from "react"
import Svg, { SvgProps, Path } from "react-native-svg"

const Chat2 = (props: SvgProps) => {
  return (
    <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={218}
    height={61}
    fill="none"
    {...props}
  >
    <Path
      fill="#EFEFF4"
      fillRule="evenodd"
      d="M13.75 50 0 61V12C0 5.373 5.373 0 12 0h194c6.627 0 12 5.373 12 12v26c0 6.627-5.373 12-12 12H13.75Z"
      clipRule="evenodd"
    />
    <Path
      fill="#262628"
      d="M21.021 28.8V16.822h-1.494V28.8h1.494Zm3.932-7.504v-4.474h-1.328v4.474h1.328Zm2.503 7.504h1.428V16.299h-1.428v12.5Zm3.874 0h1.427V16.299H31.33v12.5Zm12.627.157c2.266 0 3.752-1.834 3.752-4.631 0-2.814-1.478-4.632-3.752-4.632-1.229 0-2.316.606-2.806 1.569h-.133v-4.964h-1.427v12.5h1.361v-1.427h.133c.564.996 1.627 1.585 2.872 1.585Zm-.332-7.977c1.635 0 2.606 1.254 2.606 3.346 0 2.091-.97 3.345-2.606 3.345-1.627 0-2.64-1.278-2.64-3.345s1.013-3.346 2.64-3.346Zm9.484-.024c1.42 0 2.366 1.046 2.4 2.63h-4.931c.107-1.584 1.104-2.63 2.531-2.63Zm2.358 5.528c-.374.788-1.154 1.212-2.308 1.212-1.519 0-2.507-1.12-2.581-2.889v-.066h6.433v-.548c0-2.78-1.47-4.5-3.885-4.5-2.457 0-4.034 1.827-4.034 4.641 0 2.83 1.552 4.623 4.034 4.623 1.959 0 3.337-.938 3.769-2.473h-1.428Zm8.36-8.948v2.316h-1.444v1.195h1.444v5.429c0 1.71.74 2.39 2.582 2.39.282 0 .556-.033.838-.083V27.58a6.029 6.029 0 0 1-.664.033c-.93 0-1.328-.448-1.328-1.503v-5.063h1.992v-1.195h-1.992v-2.316h-1.428ZM69.08 28.8h1.427v-5.296c0-1.51.88-2.524 2.482-2.524 1.353 0 2.067.789 2.067 2.375V28.8h1.428v-5.794c0-2.1-1.196-3.312-3.088-3.312-1.37 0-2.308.58-2.756 1.569h-.133v-4.964H69.08v12.5Zm13.17-7.844c1.42 0 2.365 1.046 2.399 2.63h-4.931c.108-1.584 1.104-2.63 2.532-2.63Zm2.357 5.528c-.373.788-1.154 1.212-2.308 1.212-1.519 0-2.506-1.12-2.581-2.889v-.066h6.433v-.548c0-2.78-1.47-4.5-3.885-4.5-2.457 0-4.034 1.827-4.034 4.641 0 2.83 1.552 4.623 4.034 4.623 1.96 0 3.337-.938 3.769-2.473h-1.428Zm3.375 2.316h1.428v-5.545c0-1.262.988-2.175 2.35-2.175.281 0 .796.05.912.083v-1.428a6.11 6.11 0 0 0-.714-.041c-1.187 0-2.216.614-2.482 1.486h-.132v-1.328H87.98V28.8Zm9.385-7.844c1.42 0 2.366 1.046 2.4 2.63h-4.932c.108-1.584 1.104-2.63 2.532-2.63Zm2.358 5.528c-.374.788-1.154 1.212-2.308 1.212-1.52 0-2.507-1.12-2.582-2.889v-.066h6.434v-.548c0-2.78-1.47-4.5-3.885-4.5-2.457 0-4.034 1.827-4.034 4.641 0 2.83 1.552 4.623 4.034 4.623 1.959 0 3.337-.938 3.768-2.473h-1.427Zm7.796 2.316h1.428v-8.948h-1.428V28.8Zm.714-10.766a1 1 0 0 0 .996-.996 1 1 0 0 0-.996-.997.999.999 0 0 0-.996.997c0 .547.448.996.996.996ZM111.26 28.8h1.428v-5.296c0-1.569.921-2.524 2.349-2.524 1.428 0 2.108.764 2.108 2.375V28.8h1.428v-5.794c0-2.125-1.12-3.312-3.129-3.312-1.37 0-2.241.58-2.69 1.569h-.133v-1.411h-1.361V28.8Zm16.662-1.096c-1.038 0-1.81-.531-1.81-1.444 0-.897.598-1.37 1.959-1.461l2.407-.158v.822c0 1.278-1.087 2.241-2.556 2.241Zm-.266 1.253c1.195 0 2.175-.522 2.756-1.477h.133v1.32h1.361v-6.126c0-1.86-1.22-2.98-3.403-2.98-1.91 0-3.321.946-3.512 2.382h1.445c.199-.705.946-1.112 2.017-1.112 1.336 0 2.025.606 2.025 1.71v.813l-2.581.158c-2.084.125-3.263 1.046-3.263 2.648 0 1.635 1.287 2.665 3.022 2.665Zm11.465-.157h1.428v-7.753h2.05v-1.195h-2.05v-.83c0-1.005.481-1.437 1.336-1.437.283 0 .606.034.797.075v-1.195a5.025 5.025 0 0 0-.88-.083c-1.726 0-2.681.763-2.681 2.598v.872h-1.486v1.195h1.486V28.8Zm8.339-7.844c1.42 0 2.366 1.046 2.399 2.63h-4.931c.108-1.584 1.104-2.63 2.532-2.63Zm2.358 5.528c-.374.788-1.154 1.212-2.308 1.212-1.519 0-2.507-1.12-2.582-2.889v-.066h6.434v-.548c0-2.78-1.47-4.5-3.885-4.5-2.457 0-4.034 1.827-4.034 4.641 0 2.83 1.552 4.623 4.034 4.623 1.959 0 3.337-.938 3.768-2.473h-1.427Zm14.631-6.632h-1.436l-1.76 7.155h-.133l-2.001-7.155h-1.369l-2.001 7.155h-.132l-1.76-7.155h-1.445l2.507 8.948h1.445l1.992-6.923h.133l2 6.923h1.453l2.507-8.948Zm5.887 8.948h1.427v-5.545c0-1.262.905-2.274 2.076-2.274 1.128 0 1.867.68 1.867 1.743V28.8h1.428v-5.753c0-1.137.83-2.067 2.075-2.067 1.262 0 1.884.648 1.884 1.968V28.8h1.428v-6.184c0-1.876-1.021-2.922-2.847-2.922-1.237 0-2.258.622-2.739 1.569h-.133c-.415-.93-1.262-1.57-2.474-1.57-1.195 0-2.091.574-2.498 1.57h-.133v-1.411h-1.361V28.8Zm14.415 0h1.428v-8.948h-1.428V28.8Zm.714-10.766a.999.999 0 0 0 .996-.996.999.999 0 0 0-.996-.997.999.999 0 0 0-.996.997c0 .547.448.996.996.996Zm3.026 10.766h1.428v-5.296c0-1.569.921-2.524 2.349-2.524 1.428 0 2.108.764 2.108 2.375V28.8h1.428v-5.794c0-2.125-1.12-3.312-3.129-3.312-1.37 0-2.241.58-2.69 1.569h-.132v-1.411h-1.362V28.8Zm9.31-6.5c0 1.295.764 2.017 2.441 2.424l1.535.374c.955.232 1.42.647 1.42 1.261 0 .822-.863 1.395-2.067 1.395-1.145 0-1.859-.482-2.1-1.237h-1.469c.157 1.486 1.527 2.44 3.519 2.44 2.034 0 3.586-1.104 3.586-2.706 0-1.286-.813-2.017-2.498-2.423l-1.378-.332c-1.054-.258-1.553-.64-1.553-1.254 0-.797.831-1.336 1.893-1.336 1.079 0 1.776.473 1.967 1.187h1.411c-.19-1.47-1.494-2.4-3.37-2.4-1.901 0-3.337 1.121-3.337 2.607Z"
    />
  </Svg>
  )
}

export default Chat2


