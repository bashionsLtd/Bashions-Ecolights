import React from "react";
import clsx from "clsx";

/* eslint-disable @typescript-eslint/no-empty-object-type */
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
/* eslint-enable @typescript-eslint/no-empty-object-type */


export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          "w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500",
          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";
