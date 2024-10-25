import React, { useId, ForwardedRef } from "react";

type SelectProps = {
  options: string[]; // Array of string options for the select dropdown
  label?: string; // Optional label for the select
  className?: string; // Optional className for additional styling
} & React.SelectHTMLAttributes<HTMLSelectElement>; // Include standard select element props

function Select(
  { options, label, className, ...props }: SelectProps,
  ref: ForwardedRef<HTMLSelectElement>
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="font-bold">
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
