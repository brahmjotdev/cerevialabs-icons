import * as React from "react";

interface OutlineIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  stroke?: string;
  strokeWidth?: number;
  strokeLinecap?: "inherit" | "butt" | "round" | "square";
  strokeLinejoin?: "inherit" | "round" | "bevel" | "miter";
  title?: string;
}

export { type OutlineIconProps };
