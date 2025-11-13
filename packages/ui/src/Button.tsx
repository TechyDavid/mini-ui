import React from "react";

export function Button({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        background: "#0070f3",
        color: "white",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      {children}
    </button>
  );
}
