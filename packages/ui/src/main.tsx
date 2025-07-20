import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";
import { RouterProvider } from "react-router-dom";
import { Routers } from "./routers.tsx";

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={Routers} />
    </StrictMode>,
  );
} else {
  console.log("Falha no serviço de renderização do vite");
}
