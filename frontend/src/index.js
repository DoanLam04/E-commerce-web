import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import App from "./pages/App";
import DashboardApp from "./pages/dashboard/DashboardApp";
import reducer from "./components/store/reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const container = document.getElementById("app");
const root = createRoot(container);

const Root = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<App />} />
        <Route path="/dashboard/*" element={<DashboardApp />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

root.render(<Root />);
