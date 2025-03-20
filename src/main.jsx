import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux"; // Redux Provider import
import { store } from "./app/store.js"; // Redux Store import

import "@fortawesome/fontawesome-free/css/all.min.css"; // Font Awesome
import "boxicons/css/boxicons.min.css"; // Boxicons
import "./assets/style/tailwind.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
    <Provider store={store}>
      <App />
    </Provider>
);
