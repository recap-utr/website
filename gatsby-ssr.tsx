import { dom } from "@fortawesome/fontawesome-svg-core";
import { GatsbySSR } from "gatsby";
import React from "react";

// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/utils.js
// https://github.com/jzabala/gatsby-plugin-fontawesome-css/blob/master/gatsby-ssr.js

export const onRenderBody: GatsbySSR["onRenderBody"] = ({
  setHeadComponents,
}) => {
  setHeadComponents([
    <style
      key="fontawesome-css"
      type="text/css"
      dangerouslySetInnerHTML={{ __html: dom.css() }}
    />,
  ]);
};
