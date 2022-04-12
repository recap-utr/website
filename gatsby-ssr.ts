import { dom } from "@fortawesome/fontawesome-svg-core";
import React from "react";

// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/utils.js
const getStyleTag = () =>
  React.createElement("style", {
    key: "gatsby-plugin-fontawesome-css",
    type: "text/css",
    dangerouslySetInnerHTML: { __html: dom.css() },
  });

// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/gatsby-ssr.js
let styleTag = null;

export const onRenderBody = ({ setHeadComponents }) => {
  if (!styleTag) {
    styleTag = getStyleTag();
  }
  setHeadComponents([styleTag]);
};
