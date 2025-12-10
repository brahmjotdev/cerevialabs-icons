import * as React from "react";

interface FilledIconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  fill?: string;
  title?: string;
}

export { type FilledIconProps };
