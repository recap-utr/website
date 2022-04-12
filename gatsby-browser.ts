import { config } from "@fortawesome/fontawesome-svg-core";

// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/gatsby-browser.js
export const onClientEntry = () => {
  /* Prevents fontawesome auto css insertion */
  config.autoAddCss = false;
};
