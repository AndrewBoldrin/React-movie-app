import React from "react";
import "./App.css";
import { UserContextProvider } from "./context/UserContext/UserContextProvider";
import { AppRouter } from "./Router";

function App() {
  console.log("testing", process.env.REACT_APP_SOME_TEST);

  return (
    <React.StrictMode>
      <div className="App">
        <UserContextProvider>
          <AppRouter />
        </UserContextProvider>
      </div>
    </React.StrictMode>
  );
}

export default App;
