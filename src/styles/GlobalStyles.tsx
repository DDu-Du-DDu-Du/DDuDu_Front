import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyles = createGlobalStyle`
  ${reset}

  html {  
    width: 100dvw;
    height: 100dvh;
    font-size: 62.5%;
    font-family: "Spoqa Han Sans Neo";
  }

  input[type="text"] {
    outline: none;
    border: none;
  }

  input {
    outline: none;
    border: none;
  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    cursor: pointer;
  }



  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input {
    box-sizing: border-box;
  }

  body {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;

    font-size: 1.4rem;

    overflow: hidden;
  }

  #app {
    width: 100%;
    max-width: 60rem;
    height: 100%;

    position: relative;
    overflow: scroll;

    box-shadow: 0px 0px 5rem 0 rgba(0, 0, 0, 0.1);

    &::-webkit-scrollbar {
      display: none;
    }
    scrollbar-width: none;
    -ms-overflow-style: none;
  }
`;

export default GlobalStyles;
