// components/ui/label.tsx
import * as React from "react";

/* eslint-disable @typescript-eslint/no-empty-object-type */
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */


export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => (
    <label
      ref={ref}
      className={`block text-sm font-medium text-gray-700 ${className ?? ""}`}
      {...props}
    />
  )
);

Label.displayName = "Label";
