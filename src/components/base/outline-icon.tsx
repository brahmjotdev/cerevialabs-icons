import * as React from "react";
import { OutlineIconProps } from "../../props/outline-icon-props";

const OutlineIcon = React.forwardRef<SVGSVGElement, OutlineIconProps>(
  (
    {
      size = 24,
      width,
      height,
      viewBox = "0 0 24 24",
      fill = "none",
      stroke = "currentColor",
      strokeWidth = 2,
      strokeLinecap = "round",
      strokeLinejoin = "round",
      title,
      children,
      ...props
    },
    ref
  ) => {
    const applyStrokeToChildren = (
      children: React.ReactNode
    ): React.ReactNode => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (
            child.type === "path" ||
            child.type === "circle" ||
            child.type === "rect" ||
            child.type === "line" ||
            child.type === "polyline" ||
            child.type === "polygon" ||
            child.type === "ellipse"
          ) {
            return React.cloneElement(child as React.ReactElement<any>, {
              stroke,
              strokeWidth,
              strokeLinecap,
              strokeLinejoin,
            });
          }
          if ((child.props as any)?.children) {
            return React.cloneElement(child as React.ReactElement<any>, {
              children: applyStrokeToChildren((child.props as any).children),
            });
          }
        }
        return child;
      });
    };

    return (
      <svg
        ref={ref}
        data-slot={`${title} icon`}
        width={width ?? size}
        height={height ?? size}
        viewBox={viewBox}
        fill="none"
        role={title ? "img" : "presentation"}
        aria-hidden={title ? undefined : "true"}
        {...props}
      >
        {title && <title>{title}</title>}
        {applyStrokeToChildren(children)}
      </svg>
    );
  }
);

OutlineIcon.displayName = "OutlineIcon";

export { OutlineIcon };
