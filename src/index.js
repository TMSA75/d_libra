import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { persistor, store } from "./Redux/Store/strore";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import ThemeContorller from "./ThemeContorller";
import "./scss/main.scss";
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeContorller>
          <App />
        </ThemeContorller>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
