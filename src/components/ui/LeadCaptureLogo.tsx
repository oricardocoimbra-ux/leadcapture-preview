import Link from "next/link";

interface LeadCaptureLogoProps {
  className?: string;
  showWordmark?: boolean;
  size?: "sm" | "md" | "lg";
}

export function LeadCaptureLogo({
  className = "",
  showWordmark = true,
  size = "md",
}: LeadCaptureLogoProps) {
  const iconSizes = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-10 h-10",
  };
  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 group focus:outline-none ${className}`}
      aria-label="LeadCapture — Ir para o início"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 64 64"
        fill="none"
        className={`${iconSizes[size]} transition-transform duration-200 group-hover:scale-105`}
      >
        <g transform="translate(32 32) rotate(-45)">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#F5B800"
            d="M-21 -21 H21 V-3 H5 V-9 H-5 V-3 H-21 V-21 Z M-15 -15 V-9 H-9 V-15 H-15 Z M9 -15 V-9 H15 V-15 H9 Z"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            fill="#F5B800"
            d="M-21 3 H-5 V9 H5 V3 H21 V21 H-21 V3 Z M-15 9 V15 H-9 V9 H-15 Z M9 9 V15 H15 V9 H9 Z"
          />
        </g>
      </svg>
      {showWordmark && (
        <span className={`${textSizes[size]} font-extrabold tracking-tight text-white`}>
          Lead<span className="text-white">Capture</span>
          <sup className="text-[10px] text-[#F5B800] ml-0.5 font-semibold">®</sup>
        </span>
      )}
    </Link>
  );
}
