import React from "react";

export const CustomArrowIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`inline-block shrink-0 stroke-current stroke-[2.5] stroke-linecap-round stroke-linejoin-round ${className}`}
  >
    <path d="M3 12h17.5" />
    <path d="M14 5.5C16.2 8.5 18.2 10.5 21 12C18.2 13.5 16.2 15.5 14 18.5" />
  </svg>
);

export default CustomArrowIcon;
