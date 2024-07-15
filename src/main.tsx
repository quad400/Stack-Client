import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.tsx";
import { store } from "./features/store.ts";
import "./index.css";
import ModalProvider from "./components/modals/ModalProvider.tsx";
import { Toaster } from "sonner";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster position="bottom-left" />
      <ModalProvider />
      <App />
    </Provider>
  </React.StrictMode>
);
