import type { Config } from "tailwindcss";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white_100: "#FFFFFF",
        black_500: "#000000",

        transparent_10: "#23232310",
        transparent_30: "#23232330",
        transparent_50: "#23232350",
        transparent_90: "#23232390",

        example_gray_100: "#F5F5F5",
        example_gray_300: "#E6E6E6",
        example_gray_500: "#D3D3D3",
        example_gray_700: "#D9D9D9",
        example_gray_900: "#B6B6B6",

        background: "#FFFFFF",

        placeholder_100: "#DDDDE3",

        text_primary: "",
        text_secondary: "",

        // 임시 컬러
        example_green_100: "#00C73C",
        example_yellow_500: "#FFD400",
        example_red_500: "#ED4044",
        example_orange_500: "#FFA500",
      },

      borderRadius: {
        radius5: "0.5rem",
        radius10: "1rem",
        radius15: "1.5rem",
        circle: "9999rem",
      },

      fontSize: {
        size10: "1rem",
        size11: "1.1rem",
        size12: "1.2rem",
        size13: "1.3rem",
        size14: "1.4rem",
        size15: "1.5rem",
        size16: "1.6rem",
        size17: "1.7rem",
        size18: "1.8rem",
      },

      fontWeight: {
        regular: "400",
        medium: "500",
        semiBold: "600",
        bold: "700",
        extraBold: "800",
        black: "900",
      },

      boxShadow: {
        /* TODO
          추후 디자인 고려하여 값 추가
        */
        shadow_300: "",
        shadow_500: "0.3rem 0.3rem 2rem 0 rgba(0, 0, 0, 0.06)",
        shadow_700: "0 0.4rem 0.4rem 0 rgba(0, 0, 0, 0.25)",
        shadow_900: "",
      },

      screens: {
        example_min: { min: "900px" },
        example_max: { max: "900px" },
      },

      zIndex: {
        // 각 컴포넌트별 z index => 0 ~ 100
        header: "300",

        modal: "500",

        toast: "600",

        spinner: "800",
      },
    },
  },
  plugins: [
    require("tailwindcss-animated"),
    require("tailwind-scrollbar-hide"),
    require("daisyui"),
  ],
} satisfies Config;

export default config;
