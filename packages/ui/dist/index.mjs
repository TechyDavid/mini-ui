// src/Button.tsx
import { jsx } from "react/jsx-runtime";
function Button({ children }) {
  return /* @__PURE__ */ jsx(
    "button",
    {
      style: {
        background: "#0070f3",
        color: "white",
        border: "none",
        padding: "0.6rem 1.2rem",
        borderRadius: "6px",
        cursor: "pointer"
      },
      children
    }
  );
}
export {
  Button
};
//# sourceMappingURL=index.mjs.map