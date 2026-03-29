import * as React from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";

const Select = ({ value, onValueChange, children, className }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const selectRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  const contentRef = React.useRef(null);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if click is outside both the select container AND the dropdown content
      if (
        selectRef.current && 
        !selectRef.current.contains(event.target) &&
        contentRef.current &&
        !contentRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={selectRef} className={cn("relative", className)}>
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            isOpen,
            setIsOpen,
            value,
            onValueChange,
            triggerRef,
            contentRef,
          });
        }
        return child;
      })}
    </div>
  );
};

const SelectTrigger = React.forwardRef(
  ({ className, children, isOpen, setIsOpen, value, placeholder, triggerRef, ...props }, ref) => {
    return (
      <button
        ref={(node) => {
          if (triggerRef) triggerRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        <span className={cn(!value && "text-muted-foreground")}>
          {value || placeholder || "Selecciona..."}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 opacity-50 transition-transform",
            isOpen && "rotate-180"
          )}
        />
      </button>
    );
  }
);
SelectTrigger.displayName = "SelectTrigger";

const SelectContent = React.forwardRef(
  ({ className, children, isOpen, onValueChange, triggerRef, setIsOpen, contentRef, ...props }, ref) => {
    const [position, setPosition] = React.useState({ top: 0, left: 0, width: 0, maxHeight: 300 });
    const [placement, setPlacement] = React.useState('bottom');

    React.useEffect(() => {
      if (isOpen && triggerRef?.current) {
        const rect = triggerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        
        // Calculate available space above and below the trigger
        const spaceBelow = viewportHeight - rect.bottom;
        const spaceAbove = rect.top;
        
        // Determine optimal placement
        const shouldPlaceAbove = spaceBelow < 200 && spaceAbove > spaceBelow;
        
        // Calculate max height based on available space
        const maxDropdownHeight = 300;
        const padding = 8; // Extra padding from viewport edge
        const availableSpace = shouldPlaceAbove 
          ? Math.min(spaceAbove - padding, maxDropdownHeight)
          : Math.min(spaceBelow - padding, maxDropdownHeight);
        
        // Calculate position (relative to viewport for position: fixed)
        let top;
        if (shouldPlaceAbove) {
          top = rect.top - availableSpace - 4;
        } else {
          top = rect.bottom + 4;
        }
        
        // Ensure left position doesn't overflow viewport
        let left = rect.left;
        const maxLeft = viewportWidth - rect.width - padding;
        if (left > maxLeft) {
          left = maxLeft;
        }
        
        setPlacement(shouldPlaceAbove ? 'top' : 'bottom');
        setPosition({
          top,
          left: Math.max(padding, left),
          width: rect.width,
          maxHeight: Math.max(150, availableSpace), // Minimum 150px
        });
      }
    }, [isOpen, triggerRef]);

    if (!isOpen) return null;

    return createPortal(
      <div
        ref={(node) => {
          if (contentRef) contentRef.current = node;
          if (typeof ref === 'function') ref(node);
          else if (ref) ref.current = node;
        }}
        className={cn(
          "fixed z-[9999] min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95",
          className
        )}
        style={{
          top: `${position.top}px`,
          left: `${position.left}px`,
          width: `${position.width}px`,
        }}
        {...props}
      >
        <div 
          className="overflow-auto p-1"
          style={{ maxHeight: `${position.maxHeight}px` }}
        >
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, { onValueChange, setIsOpen });
            }
            return child;
          })}
        </div>
      </div>,
      document.body
    );
  }
);
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(
  ({ className, children, value, onValueChange, setIsOpen, ...props }, ref) => {
    return (
      <div
        ref={ref}
        onClick={() => {
          onValueChange(value);
          setIsOpen(false);
        }}
        className={cn(
          "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 px-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);
SelectItem.displayName = "SelectItem";

const SelectValue = ({ placeholder, value }) => {
  return <span>{value || placeholder || "Selecciona..."}</span>;
};

export { Select, SelectTrigger, SelectContent, SelectItem, SelectValue };

