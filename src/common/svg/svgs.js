const svgs = {
  customize: (name, width, height, strokeColor, backgroundColor = 'none', fillColor = 'none') => {
    return {
      arrowLeft:
        `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="${width}"
        height="${height}"
      >
        <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
        <path
          d="M10.828 12l4.95 4.95-1.414 1.414L8 12l6.364-6.364 1.414 1.414z"
          fill="${strokeColor}"
        />
      </svg>`,
      arrowRight:
        `<svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="${width}"
        height="${height}"
      >
        <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
        <path
          d="M13.172 12l-4.95-4.95 1.414-1.414L16 12l-6.364 6.364-1.414-1.414z"
          fill="${strokeColor}"
        />
      </svg>`,
      caretDown:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M12 13.172l4.95-4.95 1.414 1.414L12 16 5.636 9.636 7.05 8.222z"
            fill="${strokeColor}"
          />
        </svg>`,
      circlesSquare:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M6.5 11.5a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm.5 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm10-10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zm0 10a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9zM6.5 9.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm.5 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm10-10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zm0 10a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"
            fill="${strokeColor}"
          />
        </svg>`,
      film:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM8 5v14h8V5H8zM4 5v2h2V5H4zm14 0v2h2V5h-2zM4 9v2h2V9H4zm14 0v2h2V9h-2zM4 13v2h2v-2H4zm14 0v2h2v-2h-2zM4 17v2h2v-2H4zm14 0v2h2v-2h-2z"
            fill="${strokeColor}"
          />
        </svg>`,
      gear:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M9.954 2.21a9.99 9.99 0 0 1 4.091-.002A3.993 3.993 0 0 0 16 5.07a3.993 3.993 0 0 0 3.457.261A9.99 9.99 0 0 1 21.5 8.876 3.993 3.993 0 0 0 20 12c0 1.264.586 2.391 1.502 3.124a10.043 10.043 0 0 1-2.046 3.543 3.993 3.993 0 0 0-3.456.261 3.993 3.993 0 0 0-1.954 2.86 9.99 9.99 0 0 1-4.091.004A3.993 3.993 0 0 0 8 18.927a3.993 3.993 0 0 0-3.457-.26A9.99 9.99 0 0 1 2.5 15.121 3.993 3.993 0 0 0 4 11.999a3.993 3.993 0 0 0-1.502-3.124 10.043 10.043 0 0 1 2.046-3.543A3.993 3.993 0 0 0 8 5.071a3.993 3.993 0 0 0 1.954-2.86zM12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"
            fill="${strokeColor}"
          />
        </svg>`,
      heartShake:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M3.161 4.469a6.5 6.5 0 0 1 8.84-.328 6.5 6.5 0 0 1 9.178 9.154l-7.765 7.79a2 2 0 0 1-2.719.102l-.11-.101-7.764-7.791a6.5 6.5 0 0 1 .34-8.826zm1.414 1.414a4.5 4.5 0 0 0-.146 6.21l.146.154L12 19.672l5.303-5.304-3.535-3.535-1.06 1.06a3 3 0 1 1-4.244-4.242l2.102-2.103a4.501 4.501 0 0 0-5.837.189l-.154.146zm8.486 2.828a1 1 0 0 1 1.414 0l4.242 4.242.708-.706a4.5 4.5 0 0 0-6.211-6.51l-.153.146-3.182 3.182a1 1 0 0 0-.078 1.327l.078.087a1 1 0 0 0 1.327.078l.087-.078 1.768-1.768z"
            fill="${strokeColor}"
          />
        </svg>`,
      layout:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M11 13v8H4a1 1 0 0 1-1-1v-7h8zm2-10h7a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-7V3zM3 4a1 1 0 0 1 1-1h7v8H3V4z"
            fill="${strokeColor}"
          />
        </svg>`,
      mapPinUser:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M17.084 15.812a7 7 0 1 0-10.168 0A5.996 5.996 0 0 1 12 13a5.996 5.996 0 0 1 5.084 2.812zm-8.699 1.473L12 20.899l3.615-3.614a4 4 0 0 0-7.23 0zM12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0L12 23.728zM12 10a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 2a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"
            fill="${strokeColor}"
          />
        </svg>`,
      news:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M2 3.993A1 1 0 0 1 2.992 3h18.016c.548 0 .992.445.992.993v16.014a1 1 0 0 1-.992.993H2.992A.993.993 0 0 1 2 20.007V3.993zM4 5v14h16V5H4zm2 2h6v6H6V7zm2 2v2h2V9H8zm-2 6h12v2H6v-2zm8-8h4v2h-4V7zm0 4h4v2h-4v-2z"
            fill="${strokeColor}"
          />
        </svg>`,
      pc:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M4 16h16V5H4v11zm9 2v2h4v2H7v-2h4v-2H2.992A.998.998 0 0 1 2 16.993V4.007C2 3.451 2.455 3 2.992 3h18.016c.548 0 .992.449.992 1.007v12.986c0 .556-.455 1.007-.992 1.007H13z"
            fill="${strokeColor}"
          />
        </svg>`,
      stack:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M20.083 10.5l1.202.721a.5.5 0 0 1 0 .858L12 17.65l-9.285-5.571a.5.5 0 0 1 0-.858l1.202-.721L12 15.35l8.083-4.85zm0 4.7l1.202.721a.5.5 0 0 1 0 .858l-8.77 5.262a1 1 0 0 1-1.03 0l-8.77-5.262a.5.5 0 0 1 0-.858l1.202-.721L12 20.05l8.083-4.85zM12.514 1.309l8.771 5.262a.5.5 0 0 1 0 .858L12 13 2.715 7.429a.5.5 0 0 1 0-.858l8.77-5.262a1 1 0 0 1 1.03 0z"
            fill="${strokeColor}"
          />
        </svg>`,
      stars:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          class="icon icon-tabler icon-tabler-stars"
          width="${width}"
          height="${height}"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="${strokeColor}"
          fill="${fillColor}"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path stroke="none" d="M0 0h24v24H0z" fill="${backgroundColor}" />
          <path
            d="M17.8 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
          />
          <path
            d="M6.2 19.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
          />
          <path
            d="M12 9.817l-2.172 1.138a0.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a0.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a0.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a0.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a0.39 .39 0 0 1 -.567 .411l-2.172 -1.138z"
          />
        </svg>`,
      thumbUp:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M14.6 8H21a2 2 0 0 1 2 2v2.104a2 2 0 0 1-.15.762l-3.095 7.515a1 1 0 0 1-.925.619H2a1 1 0 0 1-1-1V10a1 1 0 0 1 1-1h3.482a1 1 0 0 0 .817-.423L11.752.85a.5.5 0 0 1 .632-.159l1.814.907a2.5 2.5 0 0 1 1.305 2.853L14.6 8zM7 10.588V19h11.16L21 12.104V10h-6.4a2 2 0 0 1-1.938-2.493l.903-3.548a.5.5 0 0 0-.261-.571l-.661-.33-4.71 6.672c-.25.354-.57.644-.933.858zM5 11H3v8h2v-8z"
            fill="${strokeColor}"
          />
        </svg>`,
      userFolder:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M12.414 5H21a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h7.414l2 2zM4 5v14h16V7h-8.414l-2-2H4zm4 13a4 4 0 1 1 8 0H8zm4-5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"
            fill="${strokeColor}"
          />
        </svg>`,
      userStar:
        `<svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="${width}"
          height="${height}"
        >
          <path fill="${backgroundColor}" d="M0 0h24v24H0z" />
          <path
            d="M12 14v2a6 6 0 0 0-6 6H4a8 8 0 0 1 8-8zm0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6 6 2.685 6 6-2.685 6-6 6zm0-2c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm6 10.5l-2.939 1.545.561-3.272-2.377-2.318 3.286-.478L18 14l1.47 2.977 3.285.478-2.377 2.318.56 3.272L18 21.5z"
            fill="${strokeColor}"
          />
        </svg>`,
    }[name]
  }
}

export default svgs
