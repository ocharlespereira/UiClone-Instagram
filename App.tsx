import { StatusBar } from "expo-status-bar";
import React from "react";

import Routes from "./src/routes";

const App: React.FC = () => {
  return (
    <>
      <Routes />
      <StatusBar backgroundColor="#f5f5f5" style="auto" />
    </>
  );
};

export default App;
