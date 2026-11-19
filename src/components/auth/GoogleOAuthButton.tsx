"use client";

interface GoogleOAuthButtonProps {
  label?: string;
  onClick?: () => void;
}

export function GoogleOAuthButton({
  label = "Continuar com Google",
  onClick,
}: GoogleOAuthButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full py-3 px-4 rounded-full bg-[#161922] hover:bg-[#1e222f] border border-white/15 hover:border-amber-500/45 text-white text-sm font-semibold inline-flex items-center justify-center gap-3 transition-colors"
    >
      <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#EA4335"
          d="M12 10.2v3.9h5.5c-.2 1.3-1.5 3.9-5.5 3.9-3.3 0-6-2.7-6-6s2.7-6 6-6c1.9 0 3.1.8 3.8 1.5l2.6-2.5C16.7 3.4 14.6 2.5 12 2.5 6.8 2.5 2.5 6.8 2.5 12s4.3 9.5 9.5 9.5c5.5 0 9.1-3.9 9.1-9.3 0-.6-.1-1.1-.2-1.6H12z"
        />
      </svg>
      <span>{label}</span>
    </button>
  );
}
