import { cn } from "@/lib/utils";

const Loader = ({
  className,
  message = "Loading...",
  color = "#1976D2", // Default color
  size = 24,
}: {
  className?: string;
  message?: string;
  color?: string;
  size?: number;
}) => {
  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <svg
        className="animate-spin"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke={color}
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill={color}
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        />
      </svg>
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loader;
