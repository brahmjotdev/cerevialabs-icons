import * as React from "react";
import { OutlineIcon } from "../base/outline-icon";
import type { OutlineIconProps } from "../../props/outline-icon-props";

const Heart = React.forwardRef<SVGSVGElement, OutlineIconProps>(
  (props, ref) => {
    return (
      <OutlineIcon ref={ref} {...props}>
        <path
      d="M11.6575 6.82202C11.8836 7.37665 12 7.5 12 7.5C12 7.5 12.1164 7.37665 12.3425 6.82202C12.5687 6.26739 12.9002 5.76344 13.318 5.33894C13.7359 4.91444 14.232 4.57772 14.7779 4.34798C15.3239 4.11824 15.9091 4 16.5 4C17.0909 4 17.6761 4.11824 18.2221 4.34798C18.768 4.57772 19.2641 4.91444 19.682 5.33894C20.0998 5.76344 20.4313 6.26739 20.6575 6.82202C20.8836 7.37665 21 7.9711 21 8.57143C21 15.4286 12 20 12 20C12 20 3 15.4286 3 8.57143C3 7.9711 3.1164 7.37665 3.34254 6.82202C3.56869 6.26739 3.90016 5.76344 4.31802 5.33894C4.73588 4.91444 5.23196 4.57772 5.77792 4.34798C6.32389 4.11824 6.90905 4 7.5 4C8.09095 4 8.67611 4.11824 9.22208 4.34798C9.76804 4.57772 10.2641 4.91444 10.682 5.33894C11.0998 5.76344 11.4313 6.26739 11.6575 6.82202Z"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
      </OutlineIcon>
    );
  }
);

Heart.displayName = "Heart";

export { Heart };
