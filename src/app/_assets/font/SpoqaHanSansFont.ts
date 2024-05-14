import localFont from "next/font/local";

const SpoqaHanSansFont = localFont({
  src: [
    {
      path: "../../../../public/fonts/SpoqaHanSans/bold/SpoqaHanSansNeo-Bold.woff",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/bold/SpoqaHanSansNeo-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/semiBold/SpoqaHanSansNeo-Medium.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/semiBold/SpoqaHanSansNeo-Medium.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/medium/SpoqaHanSansNeo-Regular.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/medium/SpoqaHanSansNeo-Regular.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/regular/SpoqaHanSansNeo-Light.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/regular/SpoqaHanSansNeo-Light.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/thin/SpoqaHanSansNeo-Thin.woff",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../../public/fonts/SpoqaHanSans/thin/SpoqaHanSansNeo-Thin.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  fallback: ["sans-serif", "Noto Sans KR"],
});

export default SpoqaHanSansFont;
