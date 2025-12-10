import * as React from "react";
import { FilledIconProps } from "../../props/filled-icon-props";

const FilledIcon = React.forwardRef<SVGSVGElement, FilledIconProps>(
  (
    {
      size = 24,
      width,
      height,
      viewBox = "0 0 24 24",
      fill = "currentColor",
      title,
      children,
      ...props
    },
    ref
  ) => {
    const applyFillToChildren = (
      children: React.ReactNode
    ): React.ReactNode => {
      return React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          if (
            child.type === "path" ||
            child.type === "circle" ||
            child.type === "rect" ||
            child.type === "polygon" ||
            child.type === "ellipse"
          ) {
            return React.cloneElement(child as React.ReactElement<any>, {
              fill,
            });
          }
          if ((child.props as any)?.children) {
            return React.cloneElement(child as React.ReactElement<any>, {
              children: applyFillToChildren((child.props as any).children),
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
        {applyFillToChildren(children)}
      </svg>
    );
  }
);

FilledIcon.displayName = "FilledIcon";

export { FilledIcon };
