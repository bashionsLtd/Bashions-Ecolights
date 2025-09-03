import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react"; // close icon

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

export const Dialog = ({ open, onOpenChange, children }: DialogProps) => {
  return open
    ? createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          {children}
        </div>,
        document.body
      )
    : null;
};

// Optional Trigger
interface DialogTriggerProps {
  children: ReactNode;
  onClick?: () => void;
}
export const DialogTrigger = ({ children, onClick }: DialogTriggerProps) => {
  return (
    <button onClick={onClick} className="inline-flex items-center">
      {children}
    </button>
  );
};

interface DialogContentProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const DialogContent = ({
  children,
  className = "",
  onClose,
}: DialogContentProps) => {
  return (
    <div
      className={`relative z-50 w-full max-w-3xl h-[90vh] 
      overflow-y-auto bg-white shadow-lg p-6 
      rounded-2xl [overflow-y:overlay] ${className}`}
    >
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-3 right-3 rounded-full p-2 text-gray-500 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      {children}
    </div>
  );
};

export const DialogHeader = ({ children }: { children: ReactNode }) => (
  <div className="mb-4">{children}</div>
);

export const DialogFooter = ({ children }: { children: ReactNode }) => (
  <div className="mt-4 flex justify-end gap-2">{children}</div>
);

export const DialogTitle = ({ children }: { children: ReactNode }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);

export const DialogDescription = ({ children }: { children: ReactNode }) => (
  <p className="text-gray-500 text-sm mt-1">{children}</p>
);

