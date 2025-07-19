import { cn } from "@/lib/utils";

const Loader = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "w-full h-full flex flex-col gap-2 justify-center items-center",
        className
      )}
    >
      <svg
        className="animate-spin h-8 w-8 text-[#000000]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="#000000"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="#000000"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm text-[#000000] font-medium">Please wait...</span>
    </div>
  );
};

export default Loader;
