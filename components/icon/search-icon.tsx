import * as React from "react";

function SearchIcon(props: React.SVGProps<SVGSVGElement> | undefined) {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="30" height="30" fill="white" />
      <path
        d="M43.7503 23.9587C43.7503 34.8962 34.8962 43.7503 23.9587 43.7503C13.0212 43.7503 4.16699 34.8962 4.16699 23.9587C4.16699 13.0212 13.0212 4.16699 23.9587 4.16699"
        stroke="#080808"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M45.8337 45.8337L41.667 41.667"
        stroke="#080808"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30.2082 12.7711C29.479 10.4794 30.3332 7.62525 32.7498 6.85442C34.0207 6.43775 35.5832 6.79192 36.479 8.02108C37.3123 6.75025 38.9373 6.45858 40.1873 6.85442C42.604 7.62525 43.4582 10.4794 42.729 12.7711C41.5832 16.4169 37.5832 18.3127 36.479 18.3127C35.354 18.3127 31.3957 16.4586 30.2082 12.7711Z"
        stroke="#080808"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default SearchIcon;
