import React from "react";
import { Plus } from "lucide-react";
import { Loader2 } from "lucide-react";

interface PlusButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export function PlusButton({ onClick, disabled = false, isLoading = false }: PlusButtonProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={disabled ? undefined : onClick}
      onKeyDown={e => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) onClick?.();
      }}
      className={`w-20 h-20 rounded-full bg-black hover:bg-white dark:bg-white dark:hover:bg-black flex items-center justify-center cursor-pointer text-white hover:text-black dark:text-black dark:hover:text-white border-2 border-transparent hover:border-black dark:hover:border-white transition-all mx-auto my-8 ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      style={{ outline: "none" }}
      aria-disabled={disabled}
    >
      {isLoading ? <Loader2 size={72} className="animate-spin" /> : <Plus size={72} />}
    </div>
  );
}
