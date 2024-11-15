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

    /* Utility Classes for margin depending on screen size */
    @media (min-width: 576px) {
    .mr-sm-0 { margin-right: 0; }
    .mr-sm-1 { margin-right: 0.25rem; }
    .mr-sm-2 { margin-right: 0.5rem; }
    .mr-sm-3 { margin-right: 1rem; }
    .mr-sm-4 { margin-right: 1.5rem; }
    .mr-sm-5 { margin-right: 3rem; }

    .ml-sm-0 { margin-left: 0; }
    .ml-sm-1 { margin-left: 0.25rem; }
    .ml-sm-2 { margin-left: 0.5rem; }
    .ml-sm-3 { margin-left: 1rem; }
    .ml-sm-4 { margin-left: 1.5rem; }
    .ml-sm-5 { margin-left: 3rem; }

    .mt-sm-0 { margin-top: 0; }
    .mt-sm-1 { margin-top: 0.25rem; }
    .mt-sm-2 { margin-top: 0.5rem; }
    .mt-sm-3 { margin-top: 1rem; }
    .mt-sm-4 { margin-top: 1.5rem; }
    .mt-sm-5 { margin-top: 3rem; }

    .mb-sm-0 { margin-bottom: 0; }
    .mb-sm-1 { margin-bottom: 0.25rem; }
    .mb-sm-2 { margin-bottom: 0.5rem; }
    .mb-sm-3 { margin-bottom: 1rem; }
    .mb-sm-4 { margin-bottom: 1.5rem; }
    .mb-sm-5 { margin-bottom: 3rem; }

    .mx-sm-0 { margin-left: 0; margin-right: 0; }
    .mx-sm-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
    .mx-sm-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .mx-sm-3 { margin-left: 1rem; margin-right: 1rem; }
    .mx-sm-4 { margin-left: 1.5rem; margin-right: 1.5rem; }
    .mx-sm-5 { margin-left: 3rem; margin-right: 3rem; }

    .my-sm-0 { margin-top: 0; margin-bottom: 0; }
    .my-sm-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
    .my-sm-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .my-sm-3 { margin-top: 1rem; margin-bottom: 1rem; }
    .my-sm-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
    .my-sm-5 { margin-top: 3rem; margin-bottom: 3rem; }

    }

    @media (min-width: 768px) {
    .mr-md-0 { margin-right: 0; }
    .mr-md-1 { margin-right: 0.25rem; }
    .mr-md-2 { margin-right: 0.5rem; }
    .mr-md-3 { margin-right: 1rem; }
    .mr-md-4 { margin-right: 1.5rem; }
    .mr-md-5 { margin-right: 3rem; }

    .ml-md-0 { margin-left: 0; }
    .ml-md-1 { margin-left: 0.25rem; }
    .ml-md-2 { margin-left: 0.5rem; }
    .ml-md-3 { margin-left: 1rem; }
    .ml-md-4 { margin-left: 1.5rem; }
    .ml-md-5 { margin-left: 3rem; }

    .mt-md-0 { margin-top: 0; }
    .mt-md-1 { margin-top: 0.25rem; }
    .mt-md-2 { margin-top: 0.5rem; }
    .mt-md-3 { margin-top: 1rem; }
    .mt-md-4 { margin-top: 1.5rem; }
    .mt-md-5 { margin-top: 3rem; }

    .mb-md-0 { margin-bottom: 0; }
    .mb-md-1 { margin-bottom: 0.25rem; }
    .mb-md-2 { margin-bottom: 0.5rem; }
    .mb-md-3 { margin-bottom: 1rem; }
    .mb-md-4 { margin-bottom: 1.5rem; }
    .mb-md-5 { margin-bottom: 3rem; }

    .mx-md-0 { margin-left: 0; margin-right: 0; }
    .mx-md-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
    .mx-md-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .mx-md-3 { margin-left: 1rem; margin-right: 1rem; }
    .mx-md-4 { margin-left: 1.5rem; margin-right: 1.5rem; }
    .mx-md-5 { margin-left: 3rem; margin-right: 3rem; }

    .my-md-0 { margin-top: 0; margin-bottom: 0; }
    .my-md-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
    .my-md-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .my-md-3 { margin-top: 1rem; margin-bottom: 1rem; }
    .my-md-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
    .my-md-5 { margin-top: 3rem; margin-bottom: 3rem; }
    }

    @media (min-width: 992px) {
    .mr-lg-0 { margin-right: 0; }
    .mr-lg-1 { margin-right: 0.25rem; }
    .mr-lg-2 { margin-right: 0.5rem; }
    .mr-lg-3 { margin-right: 1rem; }
    .mr-lg-4 { margin-right: 1.5rem; }
    .mr-lg-5 { margin-right: 3rem; }

    .ml-lg-0 { margin-left: 0; }
    .ml-lg-1 { margin-left: 0.25rem; }
    .ml-lg-2 { margin-left: 0.5rem; }
    .ml-lg-3 { margin-left: 1rem; }
    .ml-lg-4 { margin-left: 1.5rem; }
    .ml-lg-5 { margin-left: 3rem; }

    .mt-lg-0 { margin-top: 0; }
    .mt-lg-1 { margin-top: 0.25rem; }
    .mt-lg-2 { margin-top: 0.5rem; }
    .mt-lg-3 { margin-top: 1rem; }
    .mt-lg-4 { margin-top: 1.5rem; }
    .mt-lg-5 { margin-top: 3rem; }

    .mb-lg-0 { margin-bottom: 0; }
    .mb-lg-1 { margin-bottom: 0.25rem; }
    .mb-lg-2 { margin-bottom: 0.5rem; }
    .mb-lg-3 { margin-bottom: 1rem; }
    .mb-lg-4 { margin-bottom: 1.5rem; }
    .mb-lg-5 { margin-bottom: 3rem; }

    .mx-lg-0 { margin-left: 0; margin-right: 0; }
    .mx-lg-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
    .mx-lg-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .mx-lg-3 { margin-left: 1rem; margin-right: 1rem; }
    .mx-lg-4 { margin-left: 1.5rem; margin-right: 1.5rem; }
    .mx-lg-5 { margin-left: 3rem; margin-right: 3rem; }

    .my-lg-0 { margin-top: 0; margin-bottom: 0; }
    .my-lg-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
    .my-lg-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .my-lg-3 { margin-top: 1rem; margin-bottom: 1rem; }
    .my-lg-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
    .my-lg-5 { margin-top: 3rem; margin-bottom: 3rem; }
    }

    @media (min-width: 1200px) {
    .mr-xl-0 { margin-right: 0; }
    .mr-xl-1 { margin-right: 0.25rem; }
    .mr-xl-2 { margin-right: 0.5rem; }
    .mr-xl-3 { margin-right: 1rem; }
    .mr-xl-4 { margin-right: 1.5rem; }
    .mr-xl-5 { margin-right: 3rem; }

    .ml-xl-0 { margin-left: 0; }
    .ml-xl-1 { margin-left: 0.25rem; }
    .ml-xl-2 { margin-left: 0.5rem; }
    .ml-xl-3 { margin-left: 1rem; }
    .ml-xl-4 { margin-left: 1.5rem; }
    .ml-xl-5 { margin-left: 3rem; }

    .mt-xl-0 { margin-top: 0; }
    .mt-xl-1 { margin-top: 0.25rem; }
    .mt-xl-2 { margin-top: 0.5rem; }
    .mt-xl-3 { margin-top: 1rem; }
    .mt-xl-4 { margin-top: 1.5rem; }
    .mt-xl-5 { margin-top: 3rem; }

    .mb-xl-0 { margin-bottom: 0; }
    .mb-xl-1 { margin-bottom: 0.25rem; }
    .mb-xl-2 { margin-bottom: 0.5rem; }
    .mb-xl-3 { margin-bottom: 1rem; }
    .mb-xl-4 { margin-bottom: 1.5rem; }
    .mb-xl-5 { margin-bottom: 3rem; }

    .mx-xl-0 { margin-left: 0; margin-right: 0; }
    .mx-xl-1 { margin-left: 0.25rem; margin-right: 0.25rem; }
    .mx-xl-2 { margin-left: 0.5rem; margin-right: 0.5rem; }
    .mx-xl-3 { margin-left: 1rem; margin-right: 1rem; }
    .mx-xl-4 { margin-left: 1.5rem; margin-right: 1.5rem; }
    .mx-xl-5 { margin-left: 3rem; margin-right: 3rem; }

    .my-xl-0 { margin-top: 0; margin-bottom: 0; }
    .my-xl-1 { margin-top: 0.25rem; margin-bottom: 0.25rem; }
    .my-xl-2 { margin-top: 0.5rem; margin-bottom: 0.5rem; }
    .my-xl-3 { margin-top: 1rem; margin-bottom: 1rem; }
    .my-xl-4 { margin-top: 1.5rem; margin-bottom: 1.5rem; }
    .my-xl-5 { margin-top: 3rem; margin-bottom: 3rem; }
    }



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

    /* Utility Classes for padding depending on screen size */

    @media (min-width: 576px) {
    .pr-sm-0 { padding-right: 0; }
    .pr-sm-1 { padding-right: 0.25rem; }
    .pr-sm-2 { padding-right: 0.5rem; }
    .pr-sm-3 { padding-right: 1rem; }
    .pr-sm-4 { padding-right: 1.5rem; }
    .pr-sm-5 { padding-right: 3rem; }

    .pl-sm-0 { padding-left: 0; }
    .pl-sm-1 { padding-left: 0.25rem; }
    .pl-sm-2 { padding-left: 0.5rem; }
    .pl-sm-3 { padding-left: 1rem; }
    .pl-sm-4 { padding-left: 1.5rem; }
    .pl-sm-5 { padding-left: 3rem; }

    .pt-sm-0 { padding-top: 0; }
    .pt-sm-1 { padding-top: 0.25rem; }
    .pt-sm-2 { padding-top: 0.5rem; }
    .pt-sm-3 { padding-top: 1rem; }
    .pt-sm-4 { padding-top: 1.5rem; }
    .pt-sm-5 { padding-top: 3rem; }

    .pb-sm-0 { padding-bottom: 0; }
    .pb-sm-1 { padding-bottom: 0.25rem; }
    .pb-sm-2 { padding-bottom: 0.5rem; }
    .pb-sm-3 { padding-bottom: 1rem; }
    .pb-sm-4 { padding-bottom: 1.5rem; }
    .pb-sm-5 { padding-bottom: 3rem; }

    .px-sm-0 { padding-left: 0; padding-right: 0; }
    .px-sm-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
    .px-sm-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-sm-3 { padding-left: 1rem; padding-right: 1rem; }
    .px-sm-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .px-sm-5 { padding-left: 3rem; padding-right: 3rem; }

    .py-sm-0 { padding-top: 0; padding-bottom: 0; }
    .py-sm-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-sm-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-sm-3 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-sm-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .py-sm-5 { padding-top: 3rem; padding-bottom: 3rem; }
    }

    @media (min-width: 768px) {
    .pr-md-0 { padding-right: 0; }
    .pr-md-1 { padding-right: 0.25rem; }
    .pr-md-2 { padding-right: 0.5rem; }
    .pr-md-3 { padding-right: 1rem; }
    .pr-md-4 { padding-right: 1.5rem; }
    .pr-md-5 { padding-right: 3rem; }

    .pl-md-0 { padding-left: 0; }
    .pl-md-1 { padding-left: 0.25rem; }
    .pl-md-2 { padding-left: 0.5rem; }
    .pl-md-3 { padding-left: 1rem; }
    .pl-md-4 { padding-left: 1.5rem; }
    .pl-md-5 { padding-left: 3rem; }

    .pt-md-0 { padding-top: 0; }
    .pt-md-1 { padding-top: 0.25rem; }
    .pt-md-2 { padding-top: 0.5rem; }
    .pt-md-3 { padding-top: 1rem; }
    .pt-md-4 { padding-top: 1.5rem; }
    .pt-md-5 { padding-top: 3rem; }

    .pb-md-0 { padding-bottom: 0; }
    .pb-md-1 { padding-bottom: 0.25rem; }
    .pb-md-2 { padding-bottom: 0.5rem; }
    .pb-md-3 { padding-bottom: 1rem; }
    .pb-md-4 { padding-bottom: 1.5rem; }
    .pb-md-5 { padding-bottom: 3rem; }

    .px-md-0 { padding-left: 0; padding-right: 0; }
    .px-md-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
    .px-md-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-md-3 { padding-left: 1rem; padding-right: 1rem; }
    .px-md-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .px-md-5 { padding-left: 3rem; padding-right: 3rem; }

    .py-md-0 { padding-top: 0; padding-bottom: 0; }
    .py-md-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-md-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-md-3 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-md-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .py-md-5 { padding-top: 3rem; padding-bottom: 3rem; }
    }

    @media (min-width: 992px) {
    .pr-lg-0 { padding-right: 0; }
    .pr-lg-1 { padding-right: 0.25rem; }
    .pr-lg-2 { padding-right: 0.5rem; }
    .pr-lg-3 { padding-right: 1rem; }
    .pr-lg-4 { padding-right: 1.5rem; }
    .pr-lg-5 { padding-right: 3rem; }

    .pl-lg-0 { padding-left: 0; }
    .pl-lg-1 { padding-left: 0.25rem; }
    .pl-lg-2 { padding-left: 0.5rem; }
    .pl-lg-3 { padding-left: 1rem; }
    .pl-lg-4 { padding-left: 1.5rem; }
    .pl-lg-5 { padding-left: 3rem; }

    .pt-lg-0 { padding-top: 0; }
    .pt-lg-1 { padding-top: 0.25rem; }
    .pt-lg-2 { padding-top: 0.5rem; }
    .pt-lg-3 { padding-top: 1rem; }
    .pt-lg-4 { padding-top: 1.5rem; }
    .pt-lg-5 { padding-top: 3rem; }

    .pb-lg-0 { padding-bottom: 0; }
    .pb-lg-1 { padding-bottom: 0.25rem; }
    .pb-lg-2 { padding-bottom: 0.5rem; }
    .pb-lg-3 { padding-bottom: 1rem; }
    .pb-lg-4 { padding-bottom: 1.5rem; }
    .pb-lg-5 { padding-bottom: 3rem; }

    .px-lg-0 { padding-left: 0; padding-right: 0; }
    .px-lg-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
    .px-lg-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-lg-3 { padding-left: 1rem; padding-right: 1rem; }
    .px-lg-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .px-lg-5 { padding-left: 3rem; padding-right: 3rem; }

    .py-lg-0 { padding-top: 0; padding-bottom: 0; }
    .py-lg-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-lg-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-lg-3 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-lg-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .py-lg-5 { padding-top: 3rem; padding-bottom: 3rem; }
    }

    @media (min-width: 1200px) {
    .pr-xl-0 { padding-right: 0; }
    .pr-xl-1 { padding-right: 0.25rem; }
    .pr-xl-2 { padding-right: 0.5rem; }
    .pr-xl-3 { padding-right: 1rem; }
    .pr-xl-4 { padding-right: 1.5rem; }
    .pr-xl-5 { padding-right: 3rem; }

    .pl-xl-0 { padding-left: 0; }
    .pl-xl-1 { padding-left: 0.25rem; }
    .pl-xl-2 { padding-left: 0.5rem; }
    .pl-xl-3 { padding-left: 1rem; }
    .pl-xl-4 { padding-left: 1.5rem; }
    .pl-xl-5 { padding-left: 3rem; }

    .pt-xl-0 { padding-top: 0; }
    .pt-xl-1 { padding-top: 0.25rem; }
    .pt-xl-2 { padding-top: 0.5rem; }
    .pt-xl-3 { padding-top: 1rem; }
    .pt-xl-4 { padding-top: 1.5rem; }
    .pt-xl-5 { padding-top: 3rem; }

    .pb-xl-0 { padding-bottom: 0; }
    .pb-xl-1 { padding-bottom: 0.25rem; }
    .pb-xl-2 { padding-bottom: 0.5rem; }
    .pb-xl-3 { padding-bottom: 1rem; }
    .pb-xl-4 { padding-bottom: 1.5rem; }
    .pb-xl-5 { padding-bottom: 3rem; }

    .px-xl-0 { padding-left: 0; padding-right: 0; }
    .px-xl-1 { padding-left: 0.25rem; padding-right: 0.25rem; }
    .px-xl-2 { padding-left: 0.5rem; padding-right: 0.5rem; }
    .px-xl-3 { padding-left: 1rem; padding-right: 1rem; }
    .px-xl-4 { padding-left: 1.5rem; padding-right: 1.5rem; }
    .px-xl-5 { padding-left: 3rem; padding-right: 3rem; }

    .py-xl-0 { padding-top: 0; padding-bottom: 0; }
    .py-xl-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
    .py-xl-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
    .py-xl-3 { padding-top: 1rem; padding-bottom: 1rem; }
    .py-xl-4 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
    .py-xl-5 { padding-top: 3rem; padding-bottom: 3rem; }
    }



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
  .text-muted { color: #6c757d; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }


  /* Overflow */
    .overflow-hidden { overflow: hidden; }
    .overflow-visible { overflow: visible; }
    .overflow-scroll { overflow: scroll; }
    .overflow-auto { overflow: auto; }


    /* Border */
    .border-bottom { border-bottom: 1px solid #ededf5 !important; }
    .border-top { border-top: 1px solid #ededf5 !important; }
    .border-left { border-left: 1px solid #ededf5 !important; }
    .border-right { border-right: 1px solid #ededf5 !important; }
    .border-primary {
    border-color: #6f42c1 !important;
    }
    .borderless {
        border: none !important;
    }

    /* Scrollbar */

    ::-webkit-scrollbar {
        height: 4px;
    -webkit-transition: background .3s;
    transition: background .3s;
    width: 4px;
    }

    ::-webkit-scrollbar-thumb {
    background: #1cd5ae33;
    }

    ::-webkit-scrollbar-thumb:hover {
    background: #adb5bd;
    }

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

.SelectBox {
padding: 5px 8px;
}

/* Width */

.w-100{ 
    width: 100%;
}

.w-75 {
    width: 75%;
}

.w-85 {
    width: 85%;
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
    cursor: pointer;
    }

.i-hover:hover {
    transform: rotate(-270deg);
}

.btn-close {
  box-sizing: content-box;
  width: 1em;
  height: 1em;
  padding: 0.25em 0.25em;
  background: transparent
    url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23000'%3e%3cpath d='M.293.293a1 1 0 011.414 0L8 6.586 14.293.293a1 1 0 111.414 1.414L9.414 8l6.293 6.293a1 1 0 01-1.414 1.414L8 9.414l-6.293 6.293a1 1 0 01-1.414-1.414L6.586 8 .293 1.707a1 1 0 010-1.414z'/%3e%3c/svg%3e")
    center/1em auto no-repeat;
  border: 0;
  border-radius: 0.25rem;
  line-height: 1;
  background-image: none;
  color: ${(props) => props.theme.colors.purple200};
}

.btn-continue {
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.red};
  text-align: center;
  vertical-align: middle;
  user-select: none;
  line-height: 1.5;
  }

.icon-modal {
  font-size: 100px;
  color: #f34343;
  display: inline-block !important;
  line-height: 1 !important;
}

/* native bootstrap classes */

hr {
border-top: 1px solid #ededf5;
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    margin: 1rem 0;
    color: inherit;
    background-color: currentColor;
    opacity: 0.25;
}

h5 {
    font-size: 1.09375rem;
    margin-bottom: 0.5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-top: 0;
}

h6 {
    font-size: .875rem;
    margin-bottom: .5rem;
    font-weight: 500;
    line-height: 1.2;
    margin-bottom: .5rem;

}



/* Tree */

.tree {
    margin: 0;
    padding: 0;
    list-style: none;
}

.tree ul {
    margin: 0;
    padding: 0;
    list-style: none;
    margin-left: 1em;
    position: relative;
}

.tree li {
    padding: 1em 1.5em 0.4em 1.5em !important;
    margin: 0;
    line-height: 2em;
    color: ${(props) => props.theme.colors.white};
    position: relative;
    border: 1px solid #ebecf1;
    margin: 10px 0;
    border-radius: 5px;
    line-height: 30px;
}

.Mui-selected {
    background-color: transparent !important;
}

/* Form */

.form-control {
    padding: 0.375rem 0.75rem;
    border: 1px solid #ededf5;
    color: ${(props) => props.theme.colors.white};
    display: block;
    width: 100%;
    height: 40px;
    padding: 0.375rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 2;
    background-clip: padding-box;
    border-radius: 5px;
    transition: border-color 0.15s ease-in-out,
    box-shadow 0.15s ease-in-out;
    background-color: ${(props) => props.theme.colors.black300};
    }

  

  
  

.form-control-sm {
    height: calc(1.5em + 0.5rem + 2px);
    min-height: calc(1.5em + 0.5rem + 2px);
    padding: 0.25rem 0.5rem !important;
    font-size: 0.875rem;
    line-height: 1.5;
    border-radius: 0.2rem;
}

input {
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
}

.port-input-div input:focus {
  outline: 1px solid #d61a1a !important;
}

.port-input-div .form-control {
  border: 1px solid #C35353 !important;
}




/* Panels */

.r-a-t {
  position: relative;
  // left: 0;
  // top: 0;
  width: 100%;
  height: 100%;

  &,
  & * {
    box-sizing: border-box;
  }

  .add-wrapper {
    position: absolute;
    top: 0;
    left: calc(100% - 35px);
    width: 35px;
    height: 35px;
    background: #f9f9f9;
    transition: background ease 0.3s;

    &::before {
      content: "";
      display: block;
      position: absolute;
      left: 9px;
      top: 16px;
      width: 17px;
      height: 3px;
      background: #bbb;
    }

    &::after {
      content: "";
      display: block;
      position: absolute;
      left: 16px;
      top: 9px;
      width: 3px;
      height: 17px;
      background: #bbb;
    }

    &:hover {
      background: #f3f3f3;
    }
  }

  .tab-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 35px;
    // background: #aaa;
    padding-left: 15px;

    &.with-add {
      width: calc(100% - 35px);
    }

    .tab-button {
      position: absolute;
      // width: 115px;
      height: 27px;
      user-select: none;

      &:hover {
        cursor: default;
      }

      &:not(.active):hover {
        .tab,
        .icon.loading,
        .icon.loading .mask {
          background: $transparent-hover;
        }

        .shadow {
          background: linear-gradient(to right, transparent, #f8f8f8);
        }
      }

      &.active {
        z-index: 999 !important;

        .tab {
          // background: #fff;
          border-width: 0 0 3px 0;
          border-style: solid;
          border-color: #b099d9;
        }

        .icon.loading,
        .icon.loading .mask {
          background: #fff;
        }

        .shadow {
          background: linear-gradient(to right, transparent, #fff);
        }
      }
    }

    .tab {
      position: absolute;
      left: 0;
      top: -4px;
      width: calc(100%);
      height: 36px;
      display: inline-block;
      vertical-align: top;
      margin-top: 4px;
      padding: 0 30px;
      background: rgba(255, 255, 255, 0);
      z-index: 0;
      transition: background ease 0.3s;
      user-select: none;
    }

    .text {
      position: absolute;
      font-weight: 600;
      left: 15px;
      top: 12px;
      z-index: 999;
      font-size: 12px;
      width: calc(100% - 30px);
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: ${(props) => props.theme.colors.white};

      &.with-close {
        width: calc(100% - 45px);
      }

      > * {
        position: relative;
        vertical-align: top;
      }

      .icon {
        position: relative;
        display: inline-block;
        box-sizing: border-box;
        margin-right: 8px;
      }

      .icon.loading {
        margin-top: 2px;
        width: 12px;
        height: 12px;
        border-style: solid;
        border-width: 2px;
        border-color: rgb(4, 159, 217);
        border-radius: 50%;
        background: #f9f9f9;
        transform: rotateZ(30deg);
        animation-name: IconLoading;
        animation-duration: 1s;
        animation-timing-function: linear;
        animation-iteration-count: infinite;
        transition: background ease 0.3s;

        & .mask {
          position: absolute;
          left: -3px;
          top: -3px;
          width: 14px;
          height: 14px;
          background: #f9f9f9;
          clip: rect(0px, 14px, 14px, 7px);
          transition: background ease 0.3s;
        }
      }

      .icon.warning {
        margin-top: 2px;
        width: 12px;
        height: 12px;

        &::before {
          content: "";
          position: absolute;
          top: 0;
          left: 5px;
          width: 2px;
          height: 8px;
          background: red;
        }

        &::after {
          content: "";
          position: absolute;
          top: 10px;
          left: 5px;
          width: 2px;
          height: 2px;
          background: red;
        }
      }
    }

    .close {
      position: absolute;
      left: calc(100% - 30px);
      top: 12px;
      width: 15px;
      height: 15px;
      border-radius: 50%;
      transform: rotateZ(45deg);

      &:hover {
        background: #c35353;

        &::before,
        &::after {
          background: white;
        }
      }

      &::before {
        content: "";
        display: block;
        position: absolute;
        left: 3px;
        top: 7px;
        width: 9px;
        height: 1px;
        background: #888;
      }

      &::after {
        content: "";
        display: block;
        position: absolute;
        left: 7px;
        top: 3px;
        width: 1px;
        height: 9px;
        background: #888;
      }
    }
  }

  .panel-wrapper {
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    height: calc(100% - 35px);
    border-top: 1px solid #cccccc;
    z-index: 998;
    overflow: scroll;

    .panel {
      position: absolute;
      display: none;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: white;
      z-index: -1;

      &.active {
        display: block;
        z-index: 1;
      }
    }
  }

  .tooltip {
    opacity: 0;
    display: none; !important;
    // position: absolute;
    // left: 100px;
    // top: 40px;
    // z-index: 999;
    // padding: 5px 15px;
    // white-space: nowrap;
    // background-color: #fff;
    // color: #333;
    // font-size: 12px;
    // border: 1px solid #ddd;
    // border-radius: 2px;
    // box-shadow: 1px 1px 2px rgba(206,206,206,.8);
    // opacity: .95;
  }
}

/* Table */ 

.table {
    border: 1px solid #ededf5;
    color: #22252f;
    margin-bottom: 1rem;
    width: 100%!important;
    vertical-align: top;
    border-collapse: collapse;
    caption-side: bottom;
}

.table >thead {
    vertical-align: bottom;

}

thead {
    border: 0 #ededf5;
}

.table thead th {
    border-bottom-width: 1px;
    border-top-width: 0;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: .5px;
    padding: 10px 15px;
    text-transform: capitalize;    
}

.table th {
    border-top: 1px solid #f0f0f8;
    padding: .75rem;
    vertical-align: middle;
}

th {
text-align: inherit;
}

.table>:not(:last-child)>:last-child>* {
border-bottom-color: #ededf5;
}

.table>:not(:first-child) {
border-top: 1px solid #ededf5!important;
}

.table>tbody {
 vertical-align: inherit;
}

tbody {
 border: 0 #ededf5;
}

.table tbody tr {
    background-color: ${(props) => props.theme.colors.black300};
}

tr {
border: 0 #ededf5;
}

.table td {
    border-top: 1px solid #f0f0f8;
    padding: .75rem;
    vertical-align: middle;
    font-size: 13px;
    line-height: 1.462;
    padding: 9px 15px;
}

.table>:not(caption)>*>* {
    background-color: #0000;
    border-bottom-width: 1px;
    box-shadow: inset 0 0 0 9999px #0000;
    padding: .5rem;
}

.text-nowrap {
 white-space: nowrap !important; 
}

td {
border: 0 #ededf5;
}







`;

export default GlobalStyles;
