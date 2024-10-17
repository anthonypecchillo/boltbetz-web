import typography from "@tailwindcss/typography";
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import type { PluginUtils } from "tailwindcss/types/config";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      aria: {
        "current-page": 'current="page"',
      },
      borderWidth: {
        0.5: "0.5px",
        9.5: "9.5px",
      },
      boxShadow: {
        custom: "0px 4px 29px 0px rgba(0, 0, 0, 0.07)", // Converted #00000012 to rgba(0, 0, 0, 0.07)
      },
      divideWidth: {
        0.5: "0.5px",
      },
      typography: ({ theme }: PluginUtils) => ({
        DEFAULT: {
          css: {
            pre: {
              backgroundColor: theme("colors.gray.50"),
            },
          },
        },
      }),
      spacing: {
        "4.5": "1.125rem",
        "10.5": "2.625rem",
        // 18: "4.5rem",
      },
      // TODO: Get background image from Eric
      // backgroundImage: {
      //   "snes-mushroom-kingdom": "url('~/assets/background-image.svg')",
      // },
      colors: {
        sidebarActiveBgColor: "#ffffff1a",
        sidebarInactiveText: "#ffffffb3",
        pink: {
          "50": "#fff1fb",
          "100": "#ffe2f8",
          "200": "#ffc4f0",
          "300": "#ff96e0",
          "400": "#ff57cd",
          "500": "#ff1ac0",
          "600": "#ff00cf",
          "700": "#d600aa",
          "800": "#ae0088",
          "900": "#820263",
          "950": "#61004a",
        },
        blue: {
          "50": "#f0f7fe",
          "100": "#ddecfc",
          "200": "#c3dffa",
          "300": "#99ccf7",
          "400": "#69b0f1",
          "500": "#4692eb",
          "600": "#3075e0",
          "700": "#2963d4",
          "800": "#264ea7",
          "900": "#244484",
          "950": "#1a2b51",
        },
        green: {
          "50": "#eefff5",
          "100": "#d8ffea",
          "200": "#b4fed6",
          "300": "#7afbb6",
          "400": "#39ef8e",
          "500": "#0fd86e",
          "600": "#05a651",
          "700": "#088d48",
          "800": "#0d6e3c",
          "900": "#0d5a33",
          "950": "#00331a",
        },
        red: {
          "50": "#fef2f3",
          "100": "#fee2e4",
          "200": "#ffc9cd",
          "300": "#fda4aa",
          "400": "#fa6f78",
          "500": "#f1424e",
          "600": "#df2935",
          "700": "#bb1a25",
          "800": "#9b1922",
          "900": "#801c23",
          "950": "#46090d",
        },
        orange: {
          "50": "#fff8ec",
          "100": "#fff0d3",
          "200": "#ffdda5",
          "300": "#ffc36d",
          "400": "#ff9e32",
          "500": "#ff800a",
          "600": "#ff6700",
          "700": "#cc4902",
          "800": "#a1390b",
          "900": "#82310c",
          "950": "#461604",
        },
        // TODO: Migrate from gray to grayNew
        gray: {
          "50": "#ffffff",
          "100": "#fafafa",
          "200": "#f2f2f2",
          "300": "#c9cbcb",
          "400": "#a5abab",
          "500": "#8b9292",
          "600": "#5c6667",
          "700": "#313e3f",
          "800": "#182628",
          "900": "#071619",
          "950": "#000000",
        },
      },
      outlineWidth: {
        1.5: "1.5px",
      },
      minHeight(utils) {
        return utils.theme("spacing");
      },
      maxHeight(utils) {
        return utils.theme("spacing");
      },
      maxWidth(utils) {
        return utils.theme("spacing");
      },
      minWidth(utils) {
        return utils.theme("spacing");
      },
      textUnderlineOffset: {
        6: "6px",
      },
    },
    fontFamily: {
      manrope: ["Manrope", "Manrope fallback"],
    },
    fontSize: {
      xs: ["0.75rem", { lineHeight: "1rem" }],
      sm: ["14px", { lineHeight: "1.125rem" }],
      base: ["16px", { lineHeight: "1.25rem" }],
      lg: ["1.125rem", { lineHeight: "1.75rem" }],
      xl: ["1.25rem", { lineHeight: "1.75rem" }],
      "2xl": ["1.5rem", { lineHeight: "2rem" }],
      "3xl": ["1.875rem", { lineHeight: "2.25rem" }],
      "4xl": ["2.25rem", { lineHeight: "2.5rem" }],
      "5xl": ["3rem", { lineHeight: "1" }],
      "6xl": ["3.75rem", { lineHeight: "1" }],
      "7xl": ["4.5rem", { lineHeight: "1" }],
      "8xl": ["6rem", { lineHeight: "1" }],
      "9xl": ["8rem", { lineHeight: "1" }],

      title1: ["2.75rem", { lineHeight: "3.25rem", fontWeight: "800" }], // 44pt
      title2: ["2rem", { lineHeight: "2.5rem", fontWeight: "800" }], // 32pt
      title3: ["1.375rem", { lineHeight: "1.625rem", fontWeight: "800" }], // 22pt
      subtitle1: ["1.125rem", { lineHeight: "1.5rem", fontWeight: "800" }], // 18pt
      subtitle2: ["1rem", { lineHeight: "1.375rem", fontWeight: "800" }], // 16pt
      body1: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "800" }], // 14pt ExtraBold
      body2: ["0.875rem", { lineHeight: "1rem", fontWeight: "700" }], // 14pt Bold
      body3: ["0.875rem", { lineHeight: "1.25rem", fontWeight: "500" }], // 14pt Medium
      caption1: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }], // 12pt Bold
      caption2: ["0.75rem", { lineHeight: "1rem", fontWeight: "500" }], // 12pt Medium
      caption3: ["0.75rem", { lineHeight: "1rem", fontWeight: "700" }], // 12pt Bold with underline
      caption4: ["0.75rem", { lineHeight: "1rem", fontWeight: "400" }], // 12pt Regular
      caption5: ["0.625rem", { lineHeight: "0.75rem", fontWeight: "700" }], // 10pt Bold
    },
  },
  plugins: [
    typography({ target: "modern" }),
    plugin(function ({ addVariant }) {
      addVariant("user-invalid", "&:user-invalid");
    }),
  ],
} satisfies Config;
