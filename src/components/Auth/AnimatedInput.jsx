import React, { useState } from "react";

export default function AnimatedInput({
  label,
  type,
  name,
  value,
  onChange,
  icon,
  onIconClick,
}) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative w-full mt-5">
      {/* Label encima */}
      <label
        className={`absolute left-3 -top-5 px-1 text-sm font-medium transition-colors
          ${isFocused ? "text-[#0083E6]" : "text-gray-500"}
          bg-white/50 dark:bg-slate-900`}
      >
        {label}
      </label>

      {/* Input */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full border-2 mb-5 rounded-xl px-3 py-2 focus:outline-none transition-colors
          ${isFocused ? "border-[#0083E6]" : "border-gray-300"}
          bg-white dark:bg-slate-800 text-black dark:text-white`}
        placeholder=" "
      />

      {/* Icono (Ojo para password) */}
      {icon && (
        <span
          onClick={onIconClick}
          className="absolute right-3 top-8/23 -translate-y-1/2 cursor-pointer text-gray-500"
        >
          {icon}
        </span>
      )}
    </div>
  );
}
