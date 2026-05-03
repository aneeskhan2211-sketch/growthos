import { useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

export function CenterFAB() {
  const navigate = useNavigate();

  const handleTap = () => {
    navigate({ to: "/fab" });
  };

  return (
    <div
      className="fixed z-50 flex flex-col items-center pointer-events-none"
      style={{
        bottom: "calc(28px + env(safe-area-inset-bottom))",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <motion.button
        className="pointer-events-auto w-[60px] h-[60px] rounded-full flex items-center justify-center cursor-pointer"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.6 0.25 253), oklch(0.65 0.2 200))",
          boxShadow: "0 0 0 0 oklch(0.6 0.25 253 / 0.5)",
        }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            "0 0 0 0px oklch(0.6 0.25 253 / 0.5)",
            "0 0 0 12px oklch(0.6 0.25 253 / 0)",
            "0 0 0 0px oklch(0.6 0.25 253 / 0)",
          ],
        }}
        transition={{
          boxShadow: {
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeOut",
          },
          scale: { duration: 0.15, ease: "easeOut" },
        }}
        onClick={handleTap}
        aria-label="Get Clients Now"
        data-ocid="fab.get_clients_button"
      >
        {/* Lightning bolt icon */}
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13 2L4.5 13H11L10 22L20.5 10H14L13 2Z"
            fill="white"
            strokeLinejoin="round"
          />
        </svg>
      </motion.button>
    </div>
  );
}
