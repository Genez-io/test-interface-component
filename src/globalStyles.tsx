// globalStyles.js
import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  /* Apply global styles */
  * { 
    margin: 0; 
    padding: 0;
    box-sizing: border-box;
    transition: background-color 0.3s ease-out;
    font-family: "Inter", serif;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) => props.theme.background};
  }

  /* Utility Classes for Margin */
  .m-0 { margin: 0; }
  .m-1 { margin: 0.25rem; }
  .m-2 { margin: 0.5rem; }
  .m-3 { margin: 1rem; }
  .m-4 { margin: 1.5rem; }
  .m-5 { margin: 3rem; }


  .mt-0 { margin-top: 0; }
  .mt-1 { margin-top: 0.25rem; }
  .mt-2 { margin-top: 0.5rem; }
  .mt-3 { margin-top: 1rem; }
  .mt-4 { margin-top: 1.5rem; }
  .mt-5 { margin-top: 3rem; }

  .mb-0 { margin-bottom: 0; }
  .mb-1 { margin-bottom: 0.25rem; }
  .mb-2 { margin-bottom: 0.5rem; }
  .mb-3 { margin-bottom: 1rem; }
  .mb-4 { margin-bottom: 1.5rem; }
  .mb-5 { margin-bottom: 3rem; }

  .ml-0 { margin-left: 0; }
  .ml-1 { margin-left: 0.25rem; }
  .ml-2 { margin-left: 0.5rem; }
  .ml-3 { margin-left: 1rem; }
  .ml-4 { margin-left: 1.5rem; }
  .ml-5 { margin-left: 3rem; }

  .mr-0 { margin-right: 0; }
  .mr-1 { margin-right: 0.25rem; }
  .mr-2 { margin-right: 0.5rem; }
  .mr-3 { margin-right: 1rem; }
  .mr-4 { margin-right: 1.5rem; }
  .mr-5 { margin-right: 3rem; }


  /* Utility Classes for Padding */
  .p-0 { padding: 0; }
  .p-1 { padding: 0.25rem; }
  .p-2 { padding: 0.5rem; }
  .p-3 { padding: 1rem; }
  .p-4 { padding: 1.5rem; }
  .p-5 { padding: 3rem; }

    .pt-0 { padding-top: 0; }
  .pt-1 { padding-top: 0.25rem; }
  .pt-2 { padding-top: 0.5rem; }
  .pt-3 { padding-top: 1rem; }
  .pt-4 { padding-top: 1.5rem; }
  .pt-5 { padding-top: 3rem; }

  .pb-0 { padding-bottom: 0; }
  .pb-1 { padding-bottom: 0.25rem; }
  .pb-2 { padding-bottom: 0.5rem; }
  .pb-3 { padding-bottom: 1rem; }
  .pb-4 { padding-bottom: 1.5rem; }
  .pb-5 { padding-bottom: 3rem; }

  .pl-0 { padding-left: 0; }
  .pl-1 { padding-left: 0.25rem; }
  .pl-2 { padding-left: 0.5rem; }
  .pl-3 { padding-left: 1rem; }
  .pl-4 { padding-left: 1.5rem; }
  .pl-5 { padding-left: 3rem; }

  .pr-0 { padding-right: 0; }
    .pr-1 { padding-right: 0.25rem; }
    .pr-2 { padding-right: 0.5rem; }
    .pr-3 { padding-right: 1rem; }
    .pr-4 { padding-right: 1.5rem; }
    .pr-5 { padding-right: 3rem; }

  /* Utility Classes for Horizontal Padding (px) */
  .px-0 { padding-left: 0; padding-right: 0; }
  .px-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
  .px-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
  .px-3 { padding-left: 1rem; padding-right: 1rem; }
  .px-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
  .px-5 { padding-left: 3rem; padding-right: 3rem; }

  /* Utility Classes for Vertical Padding (py) */
  .py-0 { padding-top: 0; padding-bottom: 0; }
  .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
  .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
  .py-3 { padding-top: 1rem; padding-bottom: 1rem; }
  .py-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
  .py-5 { padding-top: 3rem; padding-bottom: 3rem; }

  /* Utility Classes for Horizontal Margin (mx) */
  .mx-0 { margin-left: 0; margin-right: 0; }
  .mx-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
  .mx-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
  .mx-3 { margin-left: 1rem; margin-right: 1rem; }
  .mx-4 { margin-left: 1.5rem; margin-right: 1.5rem; }
  .mx-5 { margin-left: 3rem; margin-right: 3rem; }

  /* Utility Classes for Vertical Margin (my) */
  .my-0 { margin-top: 0; margin-bottom: 0; }
  .my-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
  .my-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
  .my-3 { margin-top: 1rem; margin-bottom: 1rem; }
  .my-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
  .my-5 { margin-top: 3rem; margin-bottom: 3rem; }

  /* Flexbox Utility Classes */
  /* Display */
  .d-flex { display: flex; }
  .d-inline-flex { display: inline-flex; }
  .d-inline { display: inline; }

  /* Flex Direction */
  .flex-row { flex-direction: row; }
  .flex-row-reverse { flex-direction: row-reverse; }
  .flex-column { flex-direction: column; }
  .flex-column-reverse { flex-direction: column-reverse; }

  /* Justify Content */
  .justify-content-start { justify-content: flex-start; }
  .justify-content-end { justify-content: flex-end; }
  .justify-content-center { justify-content: center; }
  .justify-content-between { justify-content: space-between; }
  .justify-content-around { justify-content: space-around; }
  .justify-content-evenly { justify-content: space-evenly; }

  /* Align Items */
  .align-items-start { align-items: flex-start; }
  .align-items-end { align-items: flex-end; }
  .align-items-center { align-items: center; }
  .align-items-baseline { align-items: baseline; }
  .align-items-stretch { align-items: stretch; }

  /* Align Self */
  .align-self-auto { align-self: auto; }
  .align-self-start { align-self: flex-start; }
  .align-self-end { align-self: flex-end; }
  .align-self-center { align-self: center; }
  .align-self-baseline { align-self: baseline; }
  .align-self-stretch { align-self: stretch; }

  /* Flex Wrap */
  .flex-wrap { flex-wrap: wrap; }
  .flex-nowrap { flex-wrap: nowrap; }
  .flex-wrap-reverse { flex-wrap: wrap-reverse; }

  /* Text */
  .text-center { text-align: center}

  /* Font */
.fw-bold {
    font-weight: 700;
}

.fw-bolder {
    font-weight: bolder;
}

.fw-normal {
    font-weight: 400;
}

.fw-light {
    font-weight: 300;
}

.fw-lighter {
    font-weight: lighter;
}

.fw-semibold {
    font-weight: 600;
}

.fw-medium {
    font-weight: 500;
}

.fw-thin {
    font-weight: 200;
}

.fw-extralight {
    font-weight: 100;
}

/* Cursor */
.cursor-pointer {
    cursor: pointer;
};

.text-decoration-none {
    text-decoration: none;
};

iframe {
    border: 0;
}

/* Width */

.w-100{ 
    width: 100%;
}

/* Height */

.h-100 {
    height: 100%;
}

.avatar { 
    border-radius: 100%;
}

.i-hover {
    transition: transform 0.5s ease-in-out;
}

/* Cols */



`;

export default GlobalStyles;
