import { config } from "@fortawesome/fontawesome-svg-core";
import { GatsbyBrowser } from "gatsby";

// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/gatsby-browser.js
export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  /* Prevents fontawesome auto css insertion */
  config.autoAddCss = false;
};
