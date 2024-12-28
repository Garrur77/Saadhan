import * as React from "react"
import Svg, {
  SvgProps,
  Path,
  Mask,
  G,
  Defs,
  Pattern,
  Use,
  Image,
} from "react-native-svg"
const PonttualSvg = (props: SvgProps) => (
  <Svg
    // xmlns="http://www.w3.org/2000/svg"
    // xmlnsXlink="http://www.w3.org/1999/xlink"
    width={104}
    height={25}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      d="M5.695 3H2.758a.36.36 0 0 0-.265.605l1.042 1.13a.36.36 0 0 1-.008.498l-.986.997a.36.36 0 0 0 .257.614h2.904a.36.36 0 0 0 .28-.134l1.211-1.503a.36.36 0 0 0 .008-.443l-1.218-1.62A.36.36 0 0 0 5.695 3Z"
    />
    <Path
      fill="#fff"
      d="M9.54 4.534 8.431 3.09A.056.056 0 0 1 8.476 3h2.661a6.022 6.022 0 0 1 0 12.044H6.571c-.04 0-.07.033-.068.072l.272 4.502a3.605 3.605 0 0 1-3.023 3.776l-3.223.52a.373.373 0 0 1-.426-.44l1.167-5.946a.72.72 0 0 1 .113-.27l1.552-2.255a.72.72 0 0 0-.06-.894l-.804-.882a.72.72 0 0 1-.167-.66l.295-1.179a.4.4 0 0 1 .388-.303h8.228a2.12 2.12 0 1 0 0-4.241H8.472a.052.052 0 0 1-.04-.085L9.524 5.43a.72.72 0 0 0 .015-.896ZM24.608 3.431h4.636c2.263 0 3.801 1.472 3.801 3.743 0 2.256-1.618 3.728-3.97 3.728h-1.78V14h-2.687V3.431Zm2.688 2.058V8.88h1.216c1.142 0 1.816-.593 1.816-1.699 0-1.098-.674-1.692-1.802-1.692h-1.23Zm11.88-2.24c3.2-.001 5.215 2.101 5.215 5.47 0 3.37-2.014 5.464-5.215 5.464-3.208 0-5.222-2.095-5.222-5.464s2.021-5.47 5.222-5.47Zm0 2.182c-1.502 0-2.483 1.274-2.483 3.288 0 2.007.974 3.282 2.483 3.282 1.501 0 2.483-1.275 2.483-3.282 0-2.014-.982-3.288-2.483-3.288ZM48.25 14H45.7V3.431h2.147l4.482 6.145h.059V3.431h2.548V14h-2.123l-4.505-6.204h-.058V14Zm13.447 0H59.01V5.6h-2.93V3.43h8.547V5.6h-2.93V14Zm9.228 0h-2.688V5.6h-2.93V3.43h8.548V5.6h-2.93V14Zm6.76-10.569v6.533c0 1.23.667 1.963 1.868 1.963 1.194 0 1.86-.732 1.86-1.963V3.431h2.689v6.819c0 2.373-1.802 3.933-4.549 3.933-2.754 0-4.555-1.56-4.555-3.933V3.431h2.688ZM92.32 14l-.666-2.322h-3.457L87.523 14h-2.74l3.553-10.569h3.288L95.177 14H92.32Zm-2.424-8.328-1.18 4.073h2.41l-1.171-4.073h-.059Zm13.359 6.16V14h-7.06V3.431h2.688v8.401h4.372Z"
    />
    <Mask
      id="b"
      width={67}
      height={8}
      x={30}
      y={17}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: "alpha",
      }}
    >
      <Path fill="url(#a)" d="M30.81 17h66v7.239h-66z" />
    </Mask>
    <G mask="url(#b)">
      <Path fill="#fff" d="M25.273 15.723H97.66v14.052H25.273z" />
    </G>
    <Defs>
      <Pattern
        id="a"
        width={1}
        height={1}
        patternContentUnits="objectBoundingBox"
      >
        <Use xlinkHref="#c" transform="matrix(.00282 0 0 .0257 -.135 -8.71)" />
      </Pattern>
      <Image
        xlinkHref="data:image/png;base64,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UmVhZHlxyWU8AAADJmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNi4wLWMwMDIgMTE2LjE2NDc2NiwgMjAyMS8wMi8xOS0yMzoxMDowNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKE1hY2ludG9zaCkiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NjZCNzJFNkQ3MEEwMTFFREE2NkFGNURFNzYwNzlDOTQiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NjZCNzJFNkU3MEEwMTFFREE2NkFGNURFNzYwNzlDOTQiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo2NkI3MkU2QjcwQTAxMUVEQTY2QUY1REU3NjA3OUM5NCIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo2NkI3MkU2QzcwQTAxMUVEQTY2QUY1REU3NjA3OUM5NCIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqA7YJkAADvBSURBVHja7J0LlB1HeaD/seS3bGmIDfgRWxKwGIwtGdlGNg/JiZxNyAbLgHhtEslkI0MS4jGbXbF7ksN4syfHPifEYnlKZONRQnhYCYwhsAYZPAL8RIJRIMTYSIywwGCDHsZvW7pbNVPX03N1H91dz+77fef0zL237+3b3be6vvqrqqsGGo2GALTlLQMiA5nn7R5XY/2JajlbPX6x+j9fLQvU49PV/5PVMqgeH6/+z1L/T+y6rSLfW/a9IbcXalvd1z2snh9U/x9Vyz71+CH1f49afqiWCfX8++r/v02+r8h3tHvu6jM2r/0h+S20ZzanALrSyGQo7R6XXe9v+7PU3/PU41epxxer/+er//Mn19jui8/39tqGq+312rZYbCvv98xc1ywADarl9A7bbEyKWWSbWm5Xy21q+ZZ69WDH7897rHk+4/o1AGQMToVss96FzKbX/4p67XfUo99Ujy9Vj5/jZP9TkLAr8dqK2uVniqybji8XTC4NWWXW7VXLFvX8ZvX88+rxL3Jtq4ygyxZiEDIUYIBqaujImwfiVC3ne+8c9feN6v9b1P9fnyxYpruvfj4X87Hrz9i99xn1/Cvq/6fU8k9qeaRwdXSZKu0irzVfp5oaOnAEpwB6lvRbHzc8r+/+/UvUskEtD6jlBvXaf3y2hqeRc//zrHezr34+l8LjMsdQZJ30WDfz+WyTDm4w6WKDer6kwOd7/y5539PtOPAwIGNwJmRbwZRbr2OK31bLV2Wq3XCtem1OMpKNLWGfBS/XcnYp6/bfP2cyfUylk6+adDNQQvDlrgXEC8gYokrYX9Ss24K3q8f/ov5fEkSyvsTqS7whpF5mW2XEbSPMw997ifqr0823JtNRGdnayBchAzIG50IOIbmZry1Vyx3q8edE944OEZX7qpp2KcqqVUv7iIiLyHPq+WK1fM6kp6VBo2GEDMgYvEbK/iR4qlo+oR7fboScSlt1f0o4ZJuxlPxc/uc6Pd2unn9C/T/NOhoGQMaQhITdSlC3671DvfY99f+t0ry7NE6BwO5YbNuSU5awiyg4XETc7vnAZPpqTA4k8k5ptifH6NAFgIzBiYTdSfJM9dqY+v8RtcwtJDaXYowVFYeUpOvfv0wUHKpDV/fzMFctH1bL2GT6K/55hAzIGBIQsrtI823q7w61vKbUd4WUrC+x+hRv6Kpo19Fymei02GdfY9Lf20p/H0IGZAzRhGwvpqNNJPyP6rW5HqPudKNml6LzFVm77G1d5FyGrb6eO5kOdXpsTKZLf0IGQMYQLCrunUHrTlpb1f93WEbV1YqaXUTCocSb2iAgPquvp5+/w6TLUwtH2cgXkDEEE7Ib2SxSy11qeYVXSboSYyrtw6lK2EWbsXhYV/75KybTZ2MyndrLF0EDMgbnQraXxqVq+bo0Z+fpp6g4RQlLwderFC3ned55/06fTKeNyfRqL1+EDMgYgkXFvTPcy0WPhtSQE7xLMpSEXW8r9JCZZcZQjn37U1Ehl49aT5Cp0bsuLyx4hAzIGIKIuXh0qHuqblbLUUlItO7jVruWqM8hM11I1l/0fJR6rtPtWxEyIGNIW8K93/sG9fjv1f9Ztaia9iXWFMUbo7d1Oj2sm+h0+w+T6bholI18ARlDIlHxb4lMDj04KxlJ0qErnqir2aGrKWSdjl+LfAEZQ9Wi4nMkT9V0HaNiJFxcmGl36BKZrrJeVEi+CBqQMXgVcvf1urf0F9X/45OQZCgJuxY2cyD7F3IxcR5npvI8vdD2ETIgY3Ce4fbObI9Rfz/bMcNyGfX63n4KVdO+xMscyGXlrdP1qFqOQciAjCFeVNw7U/2Qeny+M9n4lmSKUbNrCTMHsp2AD3++RKYmmShfgAVAxuAxKv599fftSUmw3zp0pSDhUHIuIlm3Hbr08yvU39XIF5AxpBEpTz9eqJYPJiPJKhUIXEiYDl0hIuLW5x9Qf1+AkAEZQwoS1uhblz4uetSifuqwRYcut/tT5PcJ0aGrNyeYe5BnIV9AxhBTws3Hf6L+XxRMTHUa19rne+nQ5T96lsl0/y6PwgdkDJAr05yvlv+djOTqGDW7ljAduuwEfPjzvzTXQbnCAgAyBishT/E+9dqcykiwzlEzcyDnl6jb9uM56vnf9JQvQgZkDB4krF+7RP19fRISrVJU3HC4rTyZfN06dJWNlt1HxFkuN9cD8gVkDJ6FPPO1AbVcn8Q0hLZicynGWFFxSEm6KNC5Hs861pCZM9HXwxEIGZAx+BXyzExtlTTH6Y3d09j2u0JK1pdYQ817HKIq2sccyK6E2/2z+npYVWhfAJAxWETFOt0MVyLSrJJkQ0vTtXhDTbPoIyK2iZZnPtfXxSyEDMgY/Iu5IW9Uf1/iRCZ02ArTltyvHbpCVV9PPz9LpubwBkDG4E3CTa5OYlajqkTFzIFcfn+rOQfy1YWjcUDGnAIoKOSL1d+lXiO6qkTNoaPiFCUsBV/vjzmQ9fXxSgQMyBh8RsXvTL5qWiqw3te2Qg+ZWVTMoeRcJOp12aFLMtcJADIGT0IeFN0e5lo2VE3bb6ufh8x0IVn30bO+/36Q6BiQMfgQ8lvVcqwXKYSSYBUKBP08/aLtPrlaV0TW7Z/r6+RtpaJtQMYAPTKnN3vr8dtPUTEdusrvb7U6dL0593cBMuYUQE4xn6b+viqKTKokyVDH0k8Srm6Hrlea6wYAGYOz6Ph1M4b6S6lqWmqwnjmQ/crZp5A7rzti8roBQMbgMLN8bXDZhIiKqxR1MweyvVil5Lry7/1tqqcBGYOriOVo9Xi5s4w+pbbkKrVVx5QwcyAXk/X082Xm+gFAxmAt5Atlas5WN5FL1STYbx26UpBwKDkXkWy59uQ55vqhAxcgY7AW8iuTknCdOmyFrCGgQ1fIiDj7/JVkIoCMwTYq1lyclISlBuvrMjgIHbrynANkDMgYnLCkdAYZun24UZH1LoXu87106HIRPS8hCwFkDLZRysnq76neM+mQwu7HqNm1hOnQVUTWp5jrCAAZQ2le5nWeXZfvrUtUHTNqZg7k/JItVn19Dh24oBuzOQXQNSMakP+QeSyHPe78Ocn1OZfvzbP+44FyxHerQOjRn7s9lsvfJ3LJu9NMK48+JLJ/QuShe0Qe/DeRn3xL5Md3iTz5cL7f2NXjvGmxyPvyfq778xep5atkKoCMoayQ51vL1LeEy2S+vllwoch3vli8wNDtWCbuSjedHH/y1HLaBZn9Vzv903GRH3xZ5L4viPzoNvXaobKFwvLpzfZ9RWXd/vl8MhPoBtXU0Iv5TqsrU+jQFYIXXFx8X3ut/+Ed1Uo5A8pIp5wn8up1Im//msh/3SPyW+tFnntusbRjm/aKnv8y6xo5riMAZAwlo2LNc51IWDy9t+y2vBdhLnR/LPvuF3n4geqmpxNOEVl6lcgf7VBy/obIS9+ghH1EnGkW88rZXYeu55KhADIGG05KUsJlI81QLHjF9OXl8liqFh134oxXirzpn5SYvyty9iqZUa9b1Vmdusv6ZDpwATIGm+j45MpJOO/kED459kSRU85yFxU3/6fcblyGk18isupGkSu+LvL8l7sRcppzIJ9EZgLIGGw4LsggELEmj/DJwqXuI/y6RMbtIuU/vFvkN94nMvsYu7SUUrQ8/fw4shJAxlA2KtbMdhbRpnSvcSgZuz6WH20XOXSwprnRLJGL3i2ydpvIc89x24nLR4euYu3JR5KhADIGGyEfXwkJl4mafbNgqd2+tnvtqcdEfryj3mnu5LNVlHyXyLm/F27IzPKSzStrImNAxuAtak5HwmXf65PTlFSOmuM+wq9bu3E7Zh8rcvnfi/z6X6njHnD324auopaI6Q+QMSBeZ9G0r7bkEOjbdhZc4H7IzLq2G7fjVf9DSXmTejDLXRqM2aELABlDpSTsOiqORbt2Y9tj6YfIOIuurtZRskshpxItAyBj8CJkl9uo8ghcrTJ2IeEmP7tX5NFf9Fc6POdtIq/7mHQc37RqcyADIGPwIuTQEbTte0PK2MdsTxN39186XHyFyPL/Vfz3rMIcyICMOQVQKkKIJWHbtuTQnPhckZPmu4uKm6/tur0/0+Rr/lzk7Lf6iXxDD5kJgIzBe6SccltyzOjYRVSsH+++u3/Tn66uPuls+/Tj6jNExICMoTLiTaVD18Fnwp/DF3gY/GPXnVNTFPYjRx4v8oZPqNzraLfpsehniIgBGQORcMn3PrI3TmTsSsLNx088LPKze/o3TT7vXJFLrvGTZov8Pi7anQGQMXiTsMvtuXzvg7vCn8czzhOZdXTxfe21vl/bjZtc/GdKyouLCy+VDl0AyBi8CTmmyPO8974I9+jOPkoJebH7MbYn7u7vtDkwS+S1H7IfoStktAyAjMG5nF1H042Snyvy3n/9cpzz1tpu7KJDV79HxppfvXhqPuTU2oyJiAEZQzABu25L9hEJtzL+JZH9Pw1/Dn0M/vHAv4s8+Qjpc/nw1NCjvtKj7wkmAJAxeI9yXcnUVYcuPf3g598XJzJuODqu7LH88C7S6UkvETnrcn9p2VW0jJABGUNSQrbdhu17b/6AyM8Cd+TSA3+c+Dz742p9rd/bjZvowUD0UJkuq6J9zIEMgIwhupBDb6PT+qefFPnA74a/5/gFr3B7rzHtxtM8f7HIGa8qL9eyaYuIGJAxJC1k11J3/d577xD5v38cWMZLy0fFndZTTT3Ny/+L27RW9DMIGZAxeBdwFaLpou+9ZaPI371LvX4ozPn0MfjHLx8SeWgnaVXz0lUiR53oJw26HjITABlDFKmGiKbLvPfmD4r89etFHt3v/1wuuGDq3lhXUXGD6HgGRx6rhPwGP73/fUTLAMgYkhJy7Aj6mzeJ/Nm5IuM3+z2Px8wROfWl7gf/2HUHabTJi1+XPzqNcfsTADIGJNxl/S/uF/mr31LLb4rc67FT1AsvciPhbNQ8QWT8LAtXiMw+OkwnLuQMyBgqJ2df23P93h1fEvmLV4r898Uin7tO5P7vup0dacGF+SWb97h+NC7y9BOkT81Rc0TOeLWf9Fr08wgZCjCbUwA9M54Bx9uxeVxme2Xeu3vH1PKJ94gcN1fkV18m8pzTRI4fFJmjliOPmfpcu3PT6Xzp1/fu6X0MUnBfDz4t8sH/JHLsCd33pde+5lk/Wx33sfNETjlbRaFKeqcuSi/NnrlMZNctbtNd6+9TJK0iZEDG4FzIsR5LgM91eu9jB0S+f1tncbV7nHd92cJD677e85Vy32/73pNfJPKaq0QuulLkiESyk9MuCJcebeQMkIFqaugu4RiPXeyLj/e62Fbq64u+96H7RP75T0T+WkXIe76ViIwvDJ/ei55/AGQMyQo59DZiCDvW9huez8tPvyfywVeJ/Nvn46fZYwdFBheGbyemzRiQMVROzr4ik5BjXLuMSqsQdfd671OPi2x6o8iur8dPp1rGPtMrg4AAMoaoAk5V6jEj6FASrELU/MxTIh9/m8gTB+Km2XkLwtTiuIq8ARlzCsC7MOsy/WLKEkylQKA5sEdk6/WRI+MFcfs5IGRAxlBrIackYanBeh9tyfr/1r9RUXLEe59POCVu2u+2LQBkDJUSsst9Cd0+3KjIepdCz/LEL0X+/Yvx0uwxc/2kP5ttIWRAxlApOccUeUhh1z1q/sHWeGlUj8QVsqBImzEgYwguXZfb9SX7KnfoqkvU/OA98dLukcfTZgzIGIiCc2dIsau0Y0TN/dKD++BT9Uy/tBkDMoa+ytDo0FVcgi5rDmzXZ+duDo0er9u1CG3TKUIGZAy1k7PtNqraoUsC7KurYznpRfHSaKee3KHbiREwIGPwJt2Ycg69jZQizVQkm/e75i+NKOPH4/T2R8iAjCFaFOwrovYV2aRWNV3H25yOPE7k3NfHS7eP/CyNmhuEDMgYggrZRzVdjGi6X6Nm10Jf+gciR58QL80e2BNHwrQZAzKGSgg59YFCUpo8oqpR8Ymnibz2L+Om14d/7K6Xv3hMmwDIGAoJOHVRpxZB1ylqLnJejjpO5O3/ND0CViz27bYrtOW9DhAyIGNIJiKOKefUJNzPVdPHnyTyzi/F7bjV5CfjYQqQZb4DABmDNyGHiKJ9ba+usz2FKhAMDIgsXiXynh0iC18VP70euF/k8b3p1NYA5GA2pwByS3TAweOU9qHI51y/VyKvz7uvndbPOkrk+WeJnHWpyNIrRE45O520+sC42/Ti8jEAMgYr+fkSY8jH4uBzL321yFtN56QyBYzmZ446Vl19Rx/+epltFfrMESLHnmi3Xd1L+vjnpJtuJ25LN50CIGNwGo2mLmcX+9jucxeuFDl7GekiZe77cjxJImQoCW3GkC+D6fW4zGeq2KFr0aWkh5R59KGZ1dR50qqP9NfrOwCQMUSRc6iMz6fI5z5P5Mxz+P1T5t4viRxq+Cuo0aELkDEkI91UMqXQ0fS5K0gTqTP+Sf/pBSEDMoakhJxaRue7SnsRMk4aPR61bi+uSroDQMbgPAKtkpzLfg4Zpx8VH3wmLWEiZEDGgJwd7stpLxb5ldP57ZNNk+pHumtj3DSCdAEZQ1DpusiUqtSrWrP4N0gPKfO9m0R+9u/h0whyBmQM0YXsUs42++VL9lRRV4dbr0tbwggZkDFUQs6uprvzUaU9a7bIy5bz26fKrq0iu+8MW1BDyICMIaqAy2Y2Ve7Q9cILRY47kXSQKv/y38JGvwDIGCobBaccnfR672KqqJNl+8dFfvTNw3+z1AeWAUDG4EXOqXfo4v7i+vHEARUV/5m7NBUqXQIgY7ASsE+52hYIfGWwx8wRefFS0kGKjA6JPPyz8IUzhAzIGJIQcgg5u8rEbL/3nGUis48kDaTGdz4r8s0RNwU1JAzIGCop5LIduqo2TKZmMbM0JcfeCZFP/UGaEs5biAVAxlA6IraNgn1GsC4z0uxrdN5Ki6ceE7nhcpHH98WXcBEBI2ZAxuBUyC6j5dQ7dD3nFJEzziYNJJMWD4l8/HdF9oyHl7AE2B4gY4BSmY5PuYbMBJkYohpsfudUW7FvCfssHAIgYwguZF9txj6Og/uLExfxH4ncvjGMhOnEBcgYkhVw2XVVngP5PGQcPw0eEvn0lSLf+Ej1JYyQARlD0Ii4bIaUkpDPPFvkOafy+8dEd9b6u1VTEXGe3yzFDl0AOZnNKYDCch6wXNfpcZnP+HisoYo6Lvr2pb99vcieb089z5t2Go7fmzet2nwOgMgYCkfHNtGybeQcKpqhijouOz4jct3LRe7/ttvo1mV6IYIGImOIEgW3lu7LrCvzPt8RRrvt6ykTz1nO7x+ax/aJbH6XyDf/MY1IuGz02+0xADIGp+Iquy7FaunWx2ctFTl2Dr93sHSlTvqdIyI3vUfkkQfz/VYhJOyrCQQAGYO1gH1HyynImfbicHzvZiXh/zlVJd08/65kGVvCAMgYkhRy0QwvlpxfznjUftPTIZEdN4l86VqRibvzy7BM2kmxQxcAMgZnQi6zzrbNOIScjz1R5KxX8Hv7YO+PRO76B5Gvb5x67CPSjSVh2owBGUPyEbEvufooYCxaLnLELH57Vzx4n4qCP6+WUZEffGOqfdiHZFOXMFExIGMIFhHbSjdE5Nvp+5qvc0tTeZ55UmTPd0R2bxfZdafI929VEfDu6fU+23+L/Paxe1UDIGOwFnI3AZf9XEptxjFl/Ld/KvKL+w9/vbVjU6f1nd5TZn2R79IS/un31b4r8TYOdn6fr6pnX1Gxj3QHgIzBW7Rclw5dJ50mcsZL4pzTp58QufkjIoeeyS/JMutdbqvb+pCS9SVWelVDQBiBC/ILuNvzMutSmwM5ZlS881siB5+xH/nJxShSsdeHPBbXUycWvR4AkDFYC7jhYZ3rjLDIdmPe0nTf3e5k4luCvteHFnrZiSZcSh+QMacAvEXEttJ1Hfl2Y2BAyThiZHzvXf7HXK5C1BxS6DGnXwRAxuBUyGVlXXbKRV/TJs5/mcjg8yJGxt/0G9FVJWoOHRUjYUDGUGkhu5C1i2jZlahjthc//HORB3b6iejqFDXHOC+uPoeQARlDcAGX3U7MDl0xq6iz7cWupUDVtJv2YSQMyBiSlXOVO3Rl3zfrKJFFy+Kd13vv9iOFUBKsQoEgVluylEibgIwBrARc5LOx24yznH2RyDHHxzvH37/LT0TXT1FxVTp0ASBjiB4RS8l1vntYvzzyEJi681ZomVRJkqGOxaeEETIgYwgiZNcRcdmMrYyQY8r4gR+I/PIX4SO6OnTYinVe6FUNyBgqKWDxsM6VnI+fK/KSC9OMin1HZr6i3ipF3Sm0JQMgY/Aq6xQ6dPXa//MuERmIeBk024ttM/qU2pKr1FYdSsIIGZAxBBNuCCG77NClid1e/P273UVbdNhKt0MXADKG6EJ2vc5lm/H5vxHvvD79pMiub6ch4Tp12ApZQ0CvakDGkLSQY0bLeT/z3DNETn9RvHN63zaRp55IQ8JSg/VVGBwEABlD0IjYV/W1SzkviVxFveOr5SKv0O3DjYqsdyn0EO8FQMaQhMzLrHM5ZGZsGW/7ot95dkMKux+jZlfpEAAZQw6hPuosWraJiF23GespE2PK+Bc/me68FfPe11QkWOeoeerxY2QmgIzBhmecCrhI9OyzQ9fCc0XmnRzvrG79pMihQ3Ei4ZASrVJU7KupYIqnyUoAGYMNjwWNiKXk54rKOXYV9Zf/zkW0FVfYviXpUozxzyGRMSBjsOKh6BGxjw5dF0S8pelbW0R2f89ewlXv0CUB9jXGeWm/3Z/TZgzIGMrRMJlI7/fYC1hKrisTLc8+WuTcV8c7r5/+KzcS9hXR1aFDV+yo+fDPPUSGAsgYbIT8YG5JlhFwjA5dL7tY5Ohj45zPb35R5F/H0pRwSAlWqcOWm5qHB8lMABmDDRPOO3DF7tB1fqT24qceF/nwn1ZTwv3aYcvdOZygmhqQMdjJ2IeAY3boOv/SOGfyw1eJPLCzeOZe9BhTnDyizlFxvm1NkJUAMgYb7i0VxfqMiG2i5RMGRV68JPxZHP0/Iv/vY+FnBqqauFKJqsX573QfWQkgYyjHVGby3dwZkUsBS8l1vcT98l9TqT5gsm8cEvn7905FxVWTMFXT7moeRL5DhgLdmM0pgB5CfkgG5Cfq0anPZi4DloIfyPnc1bosIduL79su8iEl4e/dJrnOXadjyPNYIr839nopkBbCn8Ofiu5NTZsxIGOwFPJ2lbGcWkqoZZ7nlXfeddnHF3hsL9ZTIv7oHpHvfkNk640qFvra1OsDjsVbVgpFxJaSBFMpEJQX9jarAiwgYwDD7Wr5ndIRrsuIuJese2WYb35he0EOeHzc8PBYAnyuTpIMdSztt3W7dY0S1B7ajCEPt+WqYkuxQ5frOZBjPHaxjz7e20+zPdmdl2/k+k0BGQP0yPD19EKP5JJpah26bDLdVCRc5/uS63CbVPf3Pqoe301mAsgYXPCkWrYWFmYx4YeJiF3I2YeoXW+7zOdSui+5Sj24u793bPL6ISoGZAyOZPmF0tFvanMgl3mf70niY0fTLt8bSoLViJq/QCYCyBhciuJzajnkJMIt89z1uiq1GVdFwlUaYSvMserr5fNeC3GAjKHvhPxj0R258mZcvgXczx26+nkO5FSi7nzb0tfLHiQMyBhcC/nTueXpQsi+qq+rKmeX+1LVOZCrNK61ZK4XhAzIGCzk28on1fJ46ejWxT7EmgM5ppxjijyksOsVNT8+eb347msAyBj6kr0qQ/mM0+jXZ/TsM1p2mbH67FXdsDymFCRbzaj5M5PXCxIGZAyeRPGRIAOApDYHcojI19c2Y0m4/zpsZV/7KFExIGPwKWTdKeVOLwOApDwHckg506HLnSRd1hzkX3+ntBt1CyEDMgbHQr6+sBBjR8R17NDlsl25qh26JMC+Fj+W65EwIGMIIeR/Vss9pWRr+xk6dDEHcipRd/tt3WOuDyQMyBi8RMPZ1w6qZThX5lZW0GW3V6UOXVUaMtPle0NFzXEKDMPq8cGu3wWAjMEhm9Wyw5mQ+7FDl295V3XyiCpFxTNf22Gui3zXBAAyBgfRsR7q7+pCGU2dOnRVbZjMsvue0uQR6UfFV6vHh4iKARlDaCHfqpbPlhJi7IjYdbScmqhTi6DrFDW3Xz9qrgeiYkDGEEXI7xY913FZ2foUsJRcR4cu9++t92xQj5qo2E1hDpAxQAkhT6i/f2ElW9v9qHKHrqrOgRxD2OkOLvLn6u8EEgZkDLH5gFrucBr9plZ97avN2FWhJHQ0nVpbcrwCwZ2T6b8R6DcHZAxEwl1e07dy/J5aflko80mxQ1fRzN21GPtttK5UouZy+/pL9Vin+4OlzwsAMgbHQt6p/r6rdPSaakRcNnOtW69q8fTeag8O8qdq+QESBmQMqQl5k/p7g7VMU+vQZSOjqka/dWhL9rv9G9TjESQMyBhSFfIfqb/braJf231LsUOXywg1xQ5dKbYl+9u+Tt9/XPrzAMgYAvCEWlaqZY/T6De1OZBddujyUWCqe1tyvKh7z2T6bsjjTqJ2AGQMHqNjnWG9Ti2PFcqIYvawLrOODl3uJZx2h63H1OPLZxQ0iYoBGUPiQv62+rtKLU8VkmXqtziVjXaRcHWi5vbrdTp+k1q2WRcoAJAxWIu3mJC/qP6+TaTNLDahImZf1ddVlbPLfanqHMjF1x+cTMcN+YLzAgUAMoZAQtZzu/6+tN6LWTa6dXEM/ThkZkyRhxS2+/UHzb3E/+x0+wDIGJwJOf97P2Ei5Kdyi7xqHbpspef7N3Ih9Sp36CoXFT9l0u0nvbRVAyBjcJLZF7t150aZ6tT1y9yfZQ7kchl87CrtGFGze+E/MpleG5Pp1m2BAAAZQxAhd37tS2p5jTR7o8bo0BVzDuSQcqZDl43w96jHrzbp1W3NAQAyhkQkPa6WpWq5q7AQY0fEdezQ5bJduaodumZ+193q70WT6dRH1A2AjMGbeIsL+cdqWaaWj5aSre1n6NDFHMjt12+YrLlptNxH7PpYAJAxeBNv8aj5SbW8Uy3/WT0/YB39uoymq9Shq1/nQHYbNR8w6fAdJl36b6sGQMYQNBLuje5pvUh99mvWQu7HDl2+5V3VySPy/yZfU68tMunQf4EAABlDNCH3fm23Wi4xk0wccBbhuoyIpeTnfI1nXaWBQlKaPGL68cPq/x9Ppjud/kL24AZAxhBN3r1fO6SWj6jXzhZ9X2dzbZ07dIWIYOvUluxG6A2Tvl6qlg+rZ4e87IvrGg1AxgCFo2O7qFl37tIDLVysljtzyzS1OZDp0OX+vfbbutOkKz205Y+jFAgAkDFURsiNGRmnHihkR1/OgRwiiva1vbSErdPPZZPpqWEKeGWFz21OgIyhkkK2+x799/NqOU+mRkO61Soajl197avN2NXvGTqa9t+WfKuRsE4/n5N2TR8xenADIGMILmQ3rzWl/GtqOV8tG2VquMI0O3SVjZCYA9mFJHW6+Jh6fL5JL59TjxtOJEpUDB4ZaDRIKdCBFw+oFNIt9eR8rch787w29XyOTM2X/Bb1XGe6s3N8Jt9zV+/Nu87lZ3w+Dr2N/O99Rv3/qvr/KbVsVo8fKbytUOs/Sn4LyBjKyLioYMMKuclJ6vlK9f83TTQ0mLyAqyTnNCW8X/39ivp/s/o/qpafexGqy/0eQMaAjMFGxikIOf97ZqlliejOOgOTHcAuUMt862jZt3RtpZeSeF1s7/DXJtSyTT2+Tf2/XS3b1eODSUW9edZvIL8FZAw2Mo4dCZeV9tTzE9VyjlpepJ4vNHI+XS0nq+fz1P/j1XKk6KrvKgu5mlXaukr5afX4UfV/v/r/c/X//kn5Dsgu9f8+tXxHPX44OcmW2RYyBmQM3mQcU8jlBR0vIq6znNNqS05vPTKGDtCbGvJTtjdxnvfa3ZNc7D0pjNDFHMjlz0cKcyC7Wg9AZAwAAEBkDAAAAMgYAAAAGQMAACBjTgEAAAAyBgAAQMYAAACAjAEAAJAxAAAAIGMAAABkDAAAAMgYAAAAGQMAAAAyBgAAQMYAAACAjAEAAJAxAAAAIGMAAABkDAAAAMgYAAAAGQMAAAAyBgAAQMYAAACAjAEAAJAxAAAAIGMAAABkDAAAAMgYAAAAGQMAAAAyBgAAQMYAAACAjAEAAJAxAAAAIGMAAABkDAAAAMgYAAAAGQMAAAAyBgAAqDSz2704MDDAmXHHCrUsUcug+b/QLO3YrpZ9Lf9v4RQC9A+NRiP3e8mra/Rb6yetixFII8KyVy1bzLJOLWuNwKqE3t9r1bLN4XnZZrYZ61yU3efBRPctu3RiS6RrwNdS12NynR5WpJpWO+TVvthrub8bIgY/vvIELzJ+9rdMTMbdJH2jkfOgpMegKTzsDHAudprvCnkeUr4gkTEyRsZuWesoz46RVyPjwGLe0KWqN7SENzgoRdqch9Sjz3XIGBkj40rJ2FWt3roIeTIyjrTEknIzEt4raRROfEfKtvu4FhkjY2RcCRm7zPt3IuP8Mq56b+q1phS3LvCP3WzDTaHKfFCm26hXJPo7xWzvBoBieaorFnouiNeKOtza1JTRlgByXGe+Z2GC52GhTHd8S/E3ulHSbO8HgOk8ZFXCckfGFWGFRyE3ZXJtBc7DtYmKr1lYAIA08VGQXyLp1tghY48s8SDkQbPNVRU6D6sC1RSU+X02cNkBJMegxzyO6LgPZZwVsksRL6nweUhNyGslzap0gH7G522jWvILOcX9J+OmiGwz/CqLOHUhXyvVqmkA6AcZ+4QCeJ/KuJnhL7T8fB16ADdHBEuNDUIPa4BUROw7cl0ldODsWxk3M/yypbi1NbvYUiuZ0sMaIA1WBbreaTvuYxmvKBF9LQwQSTYngMgu2xOvKfABPawB4ueRoXo7I+NueByBqyhLzI91o7gdpaeoWH2MUrTX7MeKnBfHteJndK+y4gsxkppE2jfvl5ikOyJUHY+JEbiKsUHCjprmW8gMh+n4gBY6lPLegiW3VIaq9DXk5qoIGZzPixQZI2NkXD6fDT2Eqe+aMGTs6YCudZQA8lZVu5x1yVV76KDj2oKdETI4nxkhMkbGyLgc6yTOmOI+zzFjU3viPWrZ7OgHyhMVL3S4329Syz4H29pntvUeR/uW8nixNwo9rAFC0Kx5K4tNHxdua2xDFTpwuZBQHsm6EtSVarnOw3m4zmzbBWsTziBCTQsJ0M/Y3Gq02TKPC3ErFTL2wC4H0fHCHOtdRGQbzeILV9tfkvDFsMREyADgD5uoeLNZdtUwIEDGPbC97aeXaF1Um+wSd1XJvWoKdjnYTspVRSuEMawBfEbFZQvj+zLBkU1g4HP4TWScsIwHcyROW64UN23EeS6GKx1dkCmzltIzgLdrqywbWyJkmzyZ67uCMvbJoNhXUTcH8QiFi0FCllSgZMqQmQBu0RGxTW/mrIxtmxCRMTKegYtu9hsj7PfGRI7dN1uEzh4ArrBpK75FDm8is5Gxvq7pWV0xGdtGR/t6JAhbNkc4Jy6+swqSYwxrAHfXkk00urnDa3TkQsa52e5x27dImLbidgWMWyKf15C/Px26AOywEZ/ObzZ6CAzKzB+AjCPhoipjV4/Soi/R+8Z3x7aU0GngWi5ZgNLYVFFvLLmO6LhGMnaRAe/qIXvbCDUWtt9dtbbYdVy4AKWFZ1P43tgjf73Fct/6vl9I6jLeIG4a+G/xKKQqR8ahLoCNjtME1VoA4aLPW6R3u7BtH5a+78iVqoyb89y6iIL2RRYmTA1U4vI3oIc1QH5s22XziHaj2NXUlZ3dDhl7SjDrTEa7U9zddrORazE6zckuXFXp08MaIExUvK9AHrrR8pru6+jYp4zLzHN5rbi/93Uz12IS6GquSx1ub4nQoQugF7YdYDd6em+n6BgZ1xSdOHpVj9qO8xyz/dL2u3cF3l/9W1zpcHt05gLwK7gigrXtyGU7OhgyTpjrciagqmJbTRvj2DeKnykmAeDw/MEmKt5eIo+wrYns2+i4zjLOO7uRbTtmzJKcz5HJfP82NB8A+MXn7UzdPmOTr6yQPu2cWVcZ31Ig+rLt5btC4nQkGnRQEIjZy/xKoZc7pMeSim23l4xtCuplC8y0HSPjZwXzpgLvr+rcwK7mYI6F6x7WAM2CeIoMBj4u24E09P7uleIdcRsOZNqXcx3XTcZaxJcWzOBdXLwxOhK5+M7YGZfrHtYARMbxAoTU8jdkHInNJUTcjNBczA0csu3YxeDq2xOJSl33sIb+xkWzU4oy3l7wGKreK7nvqqrrIGMtFN0hyKbK00VnIj1MY4iqlUFxM4NRSh2oNgqDs4C7/MD2+vIRxa4IeFx1GDzDdrrH6tFoNA5bTMJpVGBxJcCFDvfHNxsc7WuR9iTb78rLlghpyPslZrmkGOGkfEwrEryO17o4Zx3yal95WQrLzki/fxT/VlHGe83F4rr7+zZH++ezNLfW0T5uC5z5FikNbxNkjIzj7l/Dcf6y03Z/2uXTHWS8rkYyLpNWkHGAEpKrGZx8i85Fb0LfF9nawJlbEZZI+V6cyBgZuypYb0vout2WU8aDga+dEMuNyDjOid9ilg0mEa+SsDeA73SciFxUoTcnRYhZ9RM6cYdMf8i4fsfkquBqW13tqoC/LqeM10q9RFymlgIZxzygRKPjZpV62XvmBk2m4rqkuzZC5pvCb4GM++eYXLablpmuU1+717qUUU4Z75R6yrhIoQgZ10TGIn46Ee2V/DNSrTDv9VHdtCVS5luWDYKMkXH867jZT6VXL+uFpgDtUopbOom4Rcarairi5vnPG9Ag4xrJOERvxG2ZKvnmEqLj0sJImW/s9j9k3H/H5FNOW9osvtpqV+WUcYw7EUIuefvhrKjacSHjMG1OVUzMqcl40HP1G+Kq7zFtq/g1u62biDMyXlhzERfp61JZGdd9CsWy6Ekm6jQIRZWnLWQMayjLe/pk/23v3tDD4g54XmxH2dMFjloPAoKMu18IdZhVaHsNMiWGzISykqnqVJ0bVbSUZ+x4FyNVhThHtlMrCjLuX3TCubTiQi4zcUaqbK5BoQLCowtxuyq2z7sKpHVbQe2TcLWAtt8Teg4AZIyQEXEH6tZ8AGGu4So1c0zur4qK8+6vbRV1yOvJxXetqmtCRcb5hVyl6q6yM1hVJdLZTrKEggXTN1VkX7WIc6XvgYEBF/P+hpTxLgf5qO08zci4JqXrKlST2s5gVQUulepVPUJcbkm8gNos9BeZY9w2Kt4c4TpyEdTUs+2YW5sKo89NiiPd7BR/7SkppgVXY1h7v8SEW5tSOqYlCV6/OyUzoEiv25kc5tGxqnxtz3+3QUC4tanPStjnmwg0hVJ2cz7n8wuWqqtOHXqJQ5x0o6+VVG71u87sT9GmF9vo0EWVcVlsq8brOdcxkbEVuu1ig8SZKaU5RN9giGSScFpYJ0TGRMbla7lijVy1pdN5yBEVuxjkY13E8z4o/gYBYQSuPpVxNnG5HpO2WyJcF0jCVZCxiN0Y1oiLY9L7c2OgzPfGXsefQ8YuxmwfjHzOXRzDWmSMjLuh2370RA8uh+LbZra5pKKZb4jC0DZBxsjYvqZrnQcx32i2m6sXcA8Ru5izeEMC59qFY7bUScYDbabh0l3mBZwmuiXmIlpiLshOF+Uus+j2o33m/y2cQoAkrl3pUZBoXqtW12+7PLkT5NXVJvtbDxT54QEAAMA99KYGAABAxgAAAMgYAAAAkDEAAAAyBgAAAGQMAACAjAEAAAAZAwAAIGMAAABAxgAAAMgYAAAAkDEAAAAyBgAAAGQMAACAjAEAAAAZAwAAIGMAAABAxgAAAMgYAAAAkDEAAAAyBgAAAGQMAACAjAEAAAAZAwAAIGMAAABAxgAAAMgYAAAAHDK7jgc1MDCQ1P4sXbp0pfq3OPPSyJ133jlB8gOAVhqNRmXyuiL7Cn0o48REPKT+XW+eHlDLECIGAABkHE7EI+rfavN0t1pWKhGPc2YAACALbcZhRHyTWhYjYgAAIDIOI+F56t+oWpaZl65WEl7PmQEAAGQcDi3jYfN4gvZhAADoxUAde8Ol1psaACAv9KZGxpXnoosuWq7+3Zrz7VvN/3GzjKoodr+L/WhpL96ktrvGYltjMl3l3Q3dQawZhY+Z4xkv8z3qcwOO9kmzQy37M/s1prY/5vJ3V/ujbxvT53hxh/3akfmNR32lP7UfRdJfNy5xdY4y50bv26IO6WYsk2b299jesPr3Xtv96pXG2nzvfPVvpTkOvcztcE0XSvstv9lW9bnlFue6kXc7mffmzacmmmn4jjvumLCVsbndsnnL5aIO10zzXI4hY//0czX1spb/641Eh22kbNqMV2ZeWq0zsADV1WeapXlM71XfqzPaIZ8CysGilnPe3C99rtdbnmt9ntdnjrvbPiwyv8Vu8721bsdv03ehW7pZbRZ9Day3/V0cH4eW8HCmcNvrmm6msa0m7Y/XKJ/S5+B6FXRs0uckK+UC53ONOZ95r5mrzDWj87ARlImMy3DAlCS7MT+TKHVJ+yotUp3JW1zEQ21K7cMmOrElG2X2unibGe1n1fFYRecO9qndfunoakhnDkULC0Y0OmO4rEMkMZ7Zp+Wm9D83893Xm0xppcdCUp701wkrEZpoeKwlHTYj4OzxzmuJmOdmot7hgrUxPkS8xhS25rb53vHM+Z3XplZEP/622kbqHSjzpJN5LYVaLeWVSspD5jqwKZw1v3+s5Vy2XjM3ZK6Z/QLIuADjeaqcTMl7TUaiOuGN6ddLJrqhTCJvZnBa8PMcJOKhPNWXJmIcylx4OiLcrz475OE8D+WtUs1Uja3OnBtdWLhGbWO4QKYy1pI5bTXR3GiXzy035+SyTMl/XL/uKXoat6nytGQkk5Fqca3p9huZczpkroMz82bwMjWS3LCPAzAR+lUt0lgvPUavaxP56YKXJCzkw9JJu6pfJd5mjVvz2OYaQU70uv46FM7yXDOt+cgykzcuR8ju6fv7jPWFbTKUxSbKa0pipEQGsiaT4EdM5tHc3lDAYxo1F/gVmZevMkKKea5HTYS+QKbbwjTvNW2RRUWsM2gd+SzvFV3rDEstOnO5pKWgNGYKZLXAZKDZ87O4V2atM9bMNXBF7DsAzKh1WRHr+/R14bhnc4+uSlWL/j2vydTcjFT9d73jjjv2q2WkJZ+SXseWuWbmZtLE5TmvmWY+cnnmmllkrpl56BMZe5OyzKxKvqxEJp0VyvqMjCWkjLMZk/r3/pj70KUApC/yTS1CXp7j/GZFs7xoxGPENL+l4DVao6S8sqXWYn+Bc7M/drugSQPXZ17STSyFq0ZN4eJyk0ZqE8VpKctU08Ju89KZJgjoxGiLiJcXbRYy71/eIuQRAWTsURLjLYJYWTAiOTOTgUyYTKC5vbk9LhpfZAsIlyV2vte0nO+RHpl0Nloq3a5vfpc12cwl0m/jg2wBcqKC+58tXN1k09fBRHa1q041Qh7ulU+ZNL2sRcRlr5nxlu+5LHZNGzKuP9lS4+ICnxvqkKEMd3gcSnj6wt3aIrWUGMpZys+e3/fb3vpjMpeovw20LdBmaz7W9ON50Lcr9VpkusNVawGsU0F82LZvhLnmrslukzEdkLFP9udI5O2itmYJdGs20Zvq75syslnJKT6ssNC1lG+aCy5zLU5Txb27Zr9NNsOtmsyy+7ueTkJd02621mNRm2tGBxLNmrrdDjuwrZfpGqVldepvgYzrQaeouN1rQ5yurrUR7arSs9H8JseZ9GiH76nDuVxtOkNVhct6XEeQn5Ud0oSLwvNot8IzIGNXzO8QZXSKirNR2+52nSNM9c6OTGkydKY/r0Pkn1J03K0qPdtcMOZRXournnhNWsv2VNe39ujer2tS7gFrIrkmO4iKC52vrT0KsK47KI7V6ZpJBSaKOJw1RWQs+dsddUn/hkx0PBbootWFhWfb4RIekUjvV6fRorIX/IRreen7UD1kLPPz3K7VwoSj3swrZeYAD82RqW4wI1PptOdiWNLlJY6x0/fOK3jdEfl2vyZ8ns+JDsELIGNn4lrZIoTRHu/XCb45gMWBbu/XmazJuHQ7zmVmUJGJAIc14rGE7JL9LfIdy5ERuGauw201RxkrwlZxcMuIiSqXdxj6MDtkpH5+k0kXZXoeL5P8Y5RLgdqNCQfX8rxM4apWs6eZqHiowzXeZFFLenBdcAbHUE09ncDXtCTqa3Ik4hltxTneP5IzinZxPPPUko2ODkg9egwz2EB+KTcHwDhPpu4339HmbbqJRdfYTOjCYo0Gc9DCutUsa2om4rFMwXFrh5qGA1yDRMZVStg6o1puLtZsCX9Hr2H+MkMIdiudtrJepofdnOxc47LUmokGVppjykZ6Q4lHB/NzlrznOU4D2e3tdrjprRGHw2yV8ngzrZrjXW6W7L3xzXGpVxYY7vAaT8Nh0g55eD7VvK5Xtwh3TZfodVnz846v/fn8Ksi4CMsKTFOW5aacJemVGdltypPYdQZnotXVmci6SGZ2a6Z9My8HjIhHEv+9shlwqwjGMoWlblXYZcgKc6LuF3ymN6xehjJVns00ucic39BCnIgk49gdxcrmU7qWo9tEJ63NPhOerlWqrJGxc7SE1xfo1DLcUnotEyHozNDX/ZTNNuzh1NvLcnQya7131uVtLytbpN9XmHO9xsxR3exguMjMXDYacD8mzFR9k1OB6kJCiM6G+jsyBdz5Fmk4VAFih8mnehWu9e95WSaNj3q6ZpAxMu5Jc87cXomqKYHxArMPrZGZnWJWl9zHuWYf8katm3KUcPcXOZZEyNZEtLs1bFSd8wPmfC0y1ajWx9dm7unRfs0ITAdDLZSrMjUGoc/HmMysNVoT+PvPtJhdbX5JQeXJpxZnxJp3/HD92zXH+HbWJGYKzsu4ZpBxESZytPuOmAtnsr1MRwc5M/lsW/HWkvu3LBNh55XxSMUkmzeiyPY6HumSuazOnLPlDr5+WGZ2hOn3Uv5oRsYx2m2HM7/xalNrFOI32Zq5HosUjl1EixM5+6eMmcBhmRHr+hw1DdnjGhE3A3Rkz80m7gdHxq6igQkzQlGzem7EVI/t73JhLM9E07vLdtIx1YLLTGl8TQXadH2IeF7LxX1Tl8LGsEy30+sMadim85Cp3biqZfsws4YlxvW4KSPk0V7Xo8NCyLJMLc1IiXTsrbnD9DXR+/Vt89L1JnDoJf2hzGcus81nTF65jGvGD8xnPJU4nx07OseFOOwoMY50iLT7ScRjMnNigKFuGXXL+X5v2aEeTcZ2Q+al99elxkGfE4sZqNb4EkoBhmT6thx9PYaYOzdb1bqsxPlb31LDMuEhn9LivTqbf/Q6L+Yz2SlUbyibNsznslNbXl2ne7eRcTrohLY7W4LskCDnZ0qGB2xKmeazze9c1E/TkZnzOyGHz0080eOc6UwvO+WijhBG8w5Wb+69Xt8i4h11KeGbzHnYZLrri0jM/CarOwgqZOG4OV9vdu7ciSISMelhqMB36nSXnY1ofd5JQ0xT1+oQ0aJJ/1sz52U4x2eGZGZTWqG0oc+luQMke81scjjxBCDjwzKANS0X4/weUbGLxLg+xEWcgCT0Bb3SZAIT5sJunfB8POdvtaZFyLpjyw91ptgpA9UFHSNh/d3ZqumtUq/J5+dnzutVRmIj3cSiq4GNUFprCiYiXo/jLUKeayQyYSL/xR0KWivNsfxQZk46MZHzWtyR+b7Pdjp35rt0D/TxFhFfE6CGZWXmvFyVs9Cg33NT5nkzbazvFARkzuV4y7ncZDPHNHRmoNFo1OZgLrroIp2wbs1UFxWKNk2G3cys9cAfi1tK2z/MCGS+bSZuSqcTmQx0QWsmmGlb1lzi62LPfo/6joG877VES7VUL08TKWWrB7McMJmI/s3O7LAJ5wNWmIztVkdCGrDYh5EOx61lkz3X7X7DrpmtuYXvvQ4Osef1aa65kS5prXk8ndZPDoqR9xatNk0nWXaba3VxhzT3fhOF5v2dGhb5lJbrZ4vmRea3G+pxzSzusn64XURcJ4cQGacTIQ9lSseLWu4dzmZQoy6iKbONvoiOWy5qLeHzdKZf9jyaan6dWV8jhw/9N9dk0Gd2+O4FnkaOSiENj5khMK+Qw0cUWyTT40kvayOby1OKenTB1IjqCml/18KiDiLebdLF/CL3Suu0aArg7dLUmea7WkW11RSShwKel9FM7ZDen9Gcnxs2st3U5ZqZ2+aaaZ5LqqY9Urfe1BMy3fYzUXIba6T9LQD7M9secbjPIznWj1keU979GPPw3uxvM+7yVhUjcp3BDJuIcLnJbFrbw8ZMqX/Mc5V0Nv3FFpn+jUZMdLnSFFwWt0nT46Zwmfd3GXN4rlwey0TmNx63PHfNNLXSfM9yB+ftsJoZy2t6KPvZvENemvesyUTY3Y5vrG63UqbMAFUMAAAAcaGaGgAAABkDAAD0N/9fgAEAJT+5Y9567KIAAAAASUVORK5CYII="
        id="c"
        width={483}
        height={378}
      />
    </Defs>
  </Svg>
)
export default PonttualSvg