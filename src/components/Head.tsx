import * as React from "react";
import Icon from "../images/favicon.ico";

export const SiteHead = (props: { title?: string }) => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="author" content="Lucas Pluvinage" />
      <meta name="description" content="Lucas Pluvinage's website" />
      <meta name="keywords" content="" />
      <title>
        {"Lucas Pluvinage" + (props.title ? " - " + props.title : "")}
      </title>
      <link rel="icon" href={Icon} />
    </>
  );
};
