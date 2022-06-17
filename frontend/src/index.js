import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import "./styles/main.scss"
import { Provider } from "react-redux"
import store from "./store.js"
import App from "./App"
import "bootstrap-icons/font/bootstrap-icons.css"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
