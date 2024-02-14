/* eslint-disable react/display-name */
import { forwardRef } from "react";
const Tag = forwardRef((props, ref) => {
  const { children } = props;
  return (
    <div ref={ref} className="tag">
      {children}
    </div>
  );
});

export default Tag;
