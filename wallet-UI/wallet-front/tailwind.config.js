/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xxs: "310px",
      xs: "536px",
      sm: "640px",
      md: "768px",
      lg: "1114px",
      xl: "1280px",
      "2xl": "1536px",
    },
    colors: {
      white: "#fff",
      primary: {
        main: "#477CD1",
        50: "#EFF7FF",
        100: "#DDEDFD",
        200: "#C5DEF7",
        300: "#7DB2E8",
        400: "#528DE0",
        500: "#477CD1",
        600: "#2D67D2",
        700: "#194CB3",
        800: "#123DA1",
        900: "#07205A",
        950: "#041749",
        80012: "rgba(18, 61, 161, 0.12)",
        8008: "rgba(18, 61, 161, 0.08)",
      },
      gray: {
        main: "#6B7280",
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
        950: "#030712",
        90012: "rgba(17, 24, 39, 0.12)",
        9008: "rgba(17, 24, 39, 0.08)",
      },
      red: {
        main: "#F05252",
        50: "#FEF2F2",
        100: "#FEE2E2",
        200: "#FECACA",
        300: "#FCA5A5",
        400: "#F87171",
        500: "#F05252",
        600: "#DC2626",
        700: "#B91C1C",
        800: "#991B1B",
        900: "#7F1D1D",
        950: "#450A0A",
      },
      green: {
        main: "#24C35C",
        50: "#F0FDF4",
        100: "#DCFCE6",
        200: "#BCF6CF",
        300: "#87EEAA",
        400: "#4CDC7E",
        500: "#24C35C",
        600: "#179B45",
        700: "#167F3B",
        800: "#176432",
        900: "#15522C",
        950: "#062D15",
      },
      purple: {
        100: "#EDEBFE",
        800: "#5521B5",
      },

      yellow: {
        main: "#C27803",
        50: "#FDFDEA",
        100: "#FDF6B2",
        200: "#FCE96A",
        300: "#FACA15",
        400: "#E3A008",
        500: "#C27803",
        600: "#9F580A",
        700: "#8E4B10",
        800: "#723B13",
        900: "#633112",
      },
    },
    extend: {
      spacing: {
        128: "32rem",
        144: "36rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
    fontSize: {
      "Banner/52/Bold": [
        "52px",
        {
          lineHeight: "78px",
          fontWeight: "700",
        },
      ],
      "Banner/52/Regular": [
        "52px",
        {
          lineHeight: "78px",
          fontWeight: "400",
        },
      ],
      "Banner/44/Bold": [
        "44px",
        {
          lineHeight: "66px",
          fontWeight: "700",
        },
      ],
      "Banner/44/Regular": [
        "44px",
        {
          lineHeight: "66px",
          fontWeight: "400",
        },
      ],
      "HeadLine/36/Bold": [
        "36px",
        {
          lineHeight: "54px",
          fontWeight: "700",
        },
      ],
      "HeadLine/36/Regular": [
        "36px",
        {
          lineHeight: "54px",
          fontWeight: "400",
        },
      ],
      "HeadLine/32/ExtraBold": [
        "32px",
        {
          lineHeight: "48px",
          fontWeight: "800",
        },
      ],
      "HeadLine/32/Bold": [
        "32px",
        {
          lineHeight: "48px",
          fontWeight: "700",
        },
      ],
      "HeadLine/28/Bold": [
        "28px",
        {
          lineHeight: "48px",
          fontWeight: "700",
        },
      ],
      "HeadLine/28/Light": [
        "28px",
        {
          lineHeight: "48px",
          fontWeight: "300",
        },
      ],
      "HeadLine/28/Regular": [
        "28px",
        {
          lineHeight: "48px",
          fontWeight: "400",
        },
      ],
      "HeadLine/24/Regular": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "400",
        },
      ],
      "HeadLine/24/Medium": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "500",
        },
      ],
      "HeadLine/24/ExtraBold": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "800",
        },
      ],
      "Banner/44/ExtraBold": [
        "44px",
        {
          lineHeight: "66px",
          fontWeight: "800",
        },
      ],
      "HeadLine/24/Bold": [
        "24px",
        {
          lineHeight: "36px",
          fontWeight: "700",
        },
      ],
      "Title/20/Bold": [
        "20px",
        {
          lineHeight: "30px",
          fontWeight: "700",
        },
      ],
      "Title/20/Regular": [
        "20px",
        {
          lineHeight: "30px",
          fontWeight: "400",
        },
      ],
      "Title/16/Regular": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      "Title/16/Bold": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "700",
        },
      ],
      "Title/14/Regular": [
        "14px",
        {
          lineHeight: "21px",
          fontWeight: "400",
        },
      ],
      "Title/14/bold": [
        "14px",
        {
          lineHeight: "21px",
          fontWeight: "700",
        },
      ],
      "SubHeading/18/Bold": [
        "18px",
        {
          lineHeight: "27px",
          fontWeight: "700",
        },
      ],
      "SubHeading/18/Regular": [
        "18px",
        {
          lineHeight: "27px",
          fontWeight: "400",
        },
      ],
      "BodyText/16/Bold": [
        "16px",
        {
          lineHeight: "32px",
          fontWeight: "700",
        },
      ],
      "BodyText/16/Medium": [
        "16px",
        {
          lineHeight: "32px",
          fontWeight: "500",
        },
      ],
      "BodyText/16/Regular": [
        "16px",
        {
          lineHeight: "32px",
          fontWeight: "400",
        },
      ],
      "BodyText/16/Light": [
        "16px",
        {
          lineHeight: "32px",
          fontWeight: "300",
        },
      ],
      "BodyText/14/Bold": [
        "14px",
        {
          lineHeight: "26px",
          fontWeight: "700",
        },
      ],
      "BodyText/14/Medium": [
        "14px",
        {
          lineHeight: "26px",
          fontWeight: "500",
        },
      ],
      "BodyText/14/Regular": [
        "14px",
        {
          lineHeight: "26px",
          fontWeight: "400",
        },
      ],
      "BodyText/14/Light": [
        "14px",
        {
          lineHeight: "26px",
          fontWeight: "300",
        },
      ],
      "BodyText/12/Bold": [
        "12px",
        {
          lineHeight: "22px",
          fontWeight: "700",
        },
      ],
      "BodyText/12/Medium": [
        "12px",
        {
          lineHeight: "22px",
          fontWeight: "500",
        },
      ],
      "BodyText/12/Regular": [
        "12px",
        {
          lineHeight: "22px",
          fontWeight: "400",
        },
      ],
      "BodyText/12/Light": [
        "12px",
        {
          lineHeight: "22px",
          fontWeight: "300",
        },
      ],
      "Body-OneLine/16/Bold": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "700",
        },
      ],
      "Body-OneLine/16/Medium": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "500",
        },
      ],
      "Body-OneLine/16/Regular": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "400",
        },
      ],
      "Body-OneLine/16/Light": [
        "16px",
        {
          lineHeight: "24px",
          fontWeight: "300",
        },
      ],
      "Body-OneLine/14/Bold": [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "700",
        },
      ],
      "Body-OneLine/14/Medium": [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "500",
        },
      ],
      "Body-OneLine/14/Regular": [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "400",
        },
      ],
      "Body-OneLine/14/Light": [
        "14px",
        {
          lineHeight: "20px",
          fontWeight: "300",
        },
      ],
      "Body-OneLine/12/Bold": [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "700",
        },
      ],
      "Body-OneLine/12/Medium": [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "500",
        },
      ],
      "Body-OneLine/12/Regular": [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "400",
        },
      ],
      "Body-OneLine/12/Light": [
        "12px",
        {
          lineHeight: "18px",
          fontWeight: "300",
        },
      ],
      "HelpText/11/Light": [
        "11px",
        {
          lineHeight: "16px",
          fontWeight: "300",
        },
      ],
      "HelpText/11/Regular": [
        "11px",
        {
          lineHeight: "16px",
          fontWeight: "400",
        },
      ],
      chequeText: [
        "10px",
        {
          lineHeight: "16px",
          fontWeight: "700",
        },
      ],
      claimText: [
        "10px",
        {
          lineHeight: "10px",
          fontWeight: "700",
        },
      ],
      smallchequeText: [
        "8px",
        {
          lineHeight: "16px",
          fontWeight: "700",
        },
      ],
    },
    boxShadow: {
      button_sm_hover:
        "1px 1px 2.8px 0px rgba(0, 0, 0, 0.10), -1px 1px 15px 1px rgba(0, 0, 0, 0.10)",
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      // strategy: "base", // only generate global styles
      strategy: "class", // only generate classes
    }),
  ],
  variants: {
    extend: {
      display: ["group-hover"],
    },
  },
};
