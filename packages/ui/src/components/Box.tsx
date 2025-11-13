// packages/ui/src/components/Box.tsx
import React from 'react';

type BoxProps = React.HTMLAttributes<HTMLElement> & {
  as?: React.ElementType;
  p?: string;
  px?: string;
  py?: string;
  m?: string;
  display?: React.CSSProperties['display'];
  w?: string;
  h?: string;
  bg?: string;
  color?: string;
  style?: React.CSSProperties;
};

export const Box: React.FC<BoxProps> = ({ as = 'div', children, style, p, px, py, m, display, w, h, bg, color, ...rest }) => {
  const Tag: React.ElementType = as;
  const resolvedStyle: React.CSSProperties = {
    padding: p,
    paddingLeft: px ?? undefined,
    paddingRight: px ?? undefined,
    paddingTop: py ?? undefined,
    paddingBottom: py ?? undefined,
    margin: m,
    display,
    width: w,
    height: h,
    background: bg ? `var(${bg})` : undefined,
    color: color ? `var(${color})` : undefined,
    ...style,
  };
  return (
    <Tag style={resolvedStyle} {...rest}>
      {children}
    </Tag>
  );
};
