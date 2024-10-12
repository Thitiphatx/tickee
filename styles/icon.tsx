export function IconAccount(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            height="1em"
            width="1em"
            {...props}
        >
            <path d="M12 4a4 4 0 014 4 4 4 0 01-4 4 4 4 0 01-4-4 4 4 0 014-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4z" />
        </svg>
    );
}

export function IconGoogle(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg fill="none" viewBox="0 0 24 24" height="1em" width="1em" {...props}>
            <path
                fill="currentColor"
                d="M6 12a6 6 0 0011.659 2H12v-4h9.805v4H21.8c-.927 4.564-4.962 8-9.8 8-5.523 0-10-4.477-10-10S6.477 2 12 2a9.99 9.99 0 018.282 4.393l-3.278 2.295A6 6 0 006 12z"
            />
        </svg>
    );
}
export function IconArrowBackOutline(props) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={48}
          d="M244 400L100 256l144-144M120 256h292"
        />
      </svg>
    );
  }

  export function IconArrowForwardOutline(props) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={48}
          d="M268 112l144 144-144 144M392 256H100"
        />
      </svg>
    );
  }

  export function IconBold(props) {
    return (
      <svg
        viewBox="0 0 384 512"
        fill="currentColor"
        height="1.5em"
        width="1.5em"
        {...props}
      >
        <path d="M0 64c0-17.7 14.3-32 32-32h192c70.7 0 128 57.3 128 128 0 31.3-11.3 60.1-30 82.3 37.1 22.4 62 63.1 62 109.7 0 70.7-57.3 128-128 128H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h16V96H32C14.3 96 0 81.7 0 64zm224 160c35.3 0 64-28.7 64-64s-28.7-64-64-64H112v128h112zm-112 64v128h144c35.3 0 64-28.7 64-64s-28.7-64-64-64H112z" />
      </svg>
    );
  }

  export function IconItalic(props) {
    return (
      <svg
        viewBox="0 0 384 512"
        fill="currentColor"
        height="1.5em"
        width="1.5em"
        {...props}
      >
        <path d="M128 64c0-17.7 14.3-32 32-32h192c17.7 0 32 14.3 32 32s-14.3 32-32 32h-58.7L160 416h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32h58.7L224 96h-64c-17.7 0-32-14.3-32-32z" />
      </svg>
    );
  }

  export function IconFontColors(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="red"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M904 816H120c-4.4 0-8 3.6-8 8v80c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-80c0-4.4-3.6-8-8-8zm-650.3-80h85c4.2 0 8-2.7 9.3-6.8l53.7-166h219.2l53.2 166c1.3 4 5 6.8 9.3 6.8h89.1c1.1 0 2.2-.2 3.2-.5a9.7 9.7 0 006-12.4L573.6 118.6a9.9 9.9 0 00-9.2-6.6H462.1c-4.2 0-7.9 2.6-9.2 6.6L244.5 723.1c-.4 1-.5 2.1-.5 3.2-.1 5.3 4.3 9.7 9.7 9.7zm255.9-516.1h4.1l83.8 263.8H424.9l84.7-263.8z" />
      </svg>
    );
  }

  export function IconFormatListBulleted(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M7 5h14v2H7V5m0 8v-2h14v2H7M4 4.5A1.5 1.5 0 015.5 6 1.5 1.5 0 014 7.5 1.5 1.5 0 012.5 6 1.5 1.5 0 014 4.5m0 6A1.5 1.5 0 015.5 12 1.5 1.5 0 014 13.5 1.5 1.5 0 012.5 12 1.5 1.5 0 014 10.5M7 19v-2h14v2H7m-3-2.5A1.5 1.5 0 015.5 18 1.5 1.5 0 014 19.5 1.5 1.5 0 012.5 18 1.5 1.5 0 014 16.5z" />
      </svg>
    );
  }
  
  export function IconOrderedList(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M920 760H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-568H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H336c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM216 712H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h72.4v20.5h-35.7c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h35.7V838H100c-2.2 0-4 1.8-4 4v34c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4V716c0-2.2-1.8-4-4-4zM100 188h38v120c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4V152c0-4.4-3.6-8-8-8h-78c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4zm116 240H100c-2.2 0-4 1.8-4 4v36c0 2.2 1.8 4 4 4h68.4l-70.3 77.7a8.3 8.3 0 00-2.1 5.4V592c0 2.2 1.8 4 4 4h116c2.2 0 4-1.8 4-4v-36c0-2.2-1.8-4-4-4h-68.4l70.3-77.7a8.3 8.3 0 002.1-5.4V432c0-2.2-1.8-4-4-4z" />
      </svg>
    );
  }

  
export function IconHr(props) {
    return (
      <svg
        fill="currentColor"
        viewBox="0 0 16 16"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M12 3H4a1 1 0 00-1 1v2.5H2V4a2 2 0 012-2h8a2 2 0 012 2v2.5h-1V4a1 1 0 00-1-1zM2 9.5h1V12a1 1 0 001 1h8a1 1 0 001-1V9.5h1V12a2 2 0 01-2 2H4a2 2 0 01-2-2V9.5zm-1.5-2a.5.5 0 000 1h15a.5.5 0 000-1H.5z" />
      </svg>
    );
  }

  export function IconReturnDownForwardSharp(props) {
    return (
      <svg
        viewBox="0 0 512 512"
        fill="currentColor"
        height="3em"
        width="3em"
        {...props}
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit={10}
          strokeWidth={32}
          d="M400 352l64-64-64-64"
        />
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="square"
          strokeMiterlimit={10}
          strokeWidth={32}
          d="M448 288H48V160"
        />
      </svg>
    );
  }

  export function IconAlignLeft(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M120 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm0 424h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm784 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
      </svg>
    );
  }
  export function IconAlignRight(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M904 158H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 424H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 212H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
      </svg>
    );
  }

  export function IconAlignCenter(props) {
    return (
      <svg
        viewBox="0 0 1024 1024"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M264 230h496c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm496 424c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H264c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h496zm144 140H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0-424H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8z" />
      </svg>
    );
  }

  export function IconBxImageAdd(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M4 5h13v7h2V5c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h8v-2H4V5z" />
        <path d="M8 11l-3 4h11l-4-6-3 4z" />
        <path d="M19 14h-2v3h-3v2h3v3h2v-3h3v-2h-3z" />
      </svg>
    );
  }

  export function IconImageResizeLandscape(props) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        height="2em"
        width="2em"
        {...props}
      >
        <path d="M13 11H2a1 1 0 00-1 1v9a1 1 0 001 1h11a1 1 0 001-1v-9a1 1 0 00-1-1zm-5.56 9l1.93-1.93a.3.3 0 01.5 0L11.79 20zM12 17.38l-.72-.71a2.41 2.41 0 00-3.33 0L4.61 20H3v-7h9zM2 4.11a1 1 0 00.86-.49A1.05 1.05 0 003.05 3 1 1 0 002 2a1 1 0 00-1 1v.1a1 1 0 001 1.01zM9.91 4h.19a1 1 0 000-2h-.19a1 1 0 000 2zM2 8.78a1 1 0 001-1v-.22a1 1 0 10-2 0v.22a1 1 0 001 1zM14.09 2h-.19a1 1 0 000 2h.19a1 1 0 000-2zM5.91 4h.19a1 1 0 000-2h-.19a1 1 0 000 2zM22 6.4a1 1 0 00-1 1v.21a1 1 0 002 0V7.4a1 1 0 00-1-1zM17.12 20h-.24a1 1 0 100 2h.24a1 1 0 000-2zM21.9 2a1 1 0 00-.9 1 1 1 0 00.1.42 1 1 0 001.9-.31V3a1.09 1.09 0 00-1.1-1zm.1 8.9a1 1 0 00-1 1v.22a1 1 0 002 0v-.22a1 1 0 00-1-1zM18.09 2h-.19a1 1 0 000 2h.19a1 1 0 000-2zM22 20a.93.93 0 00-.44.11A1 1 0 0021 21a1 1 0 001 1 1.09 1.09 0 001-1.1 1 1 0 00-1-.9zm0-4.56a1 1 0 00-1 1v.22a1 1 0 102 0v-.26a1 1 0 00-1-1z" />
      </svg>
    );
  }
  
  
 
 

  

  
