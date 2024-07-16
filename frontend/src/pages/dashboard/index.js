import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";

import DashboardApp from "./DashboardApp";
import reducer from "../../components/store/reducer";

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const container = document.getElementById("wrapper");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <DashboardApp />
    </BrowserRouter>
  </Provider>
);
