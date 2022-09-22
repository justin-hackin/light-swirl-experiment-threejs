import React from "react";
import { Scene } from "./Scene";
import { Leva } from "leva";

function App() {
  return (
    <div id="canvas-container">
      <Leva oneLineLabels={true} />
      <Scene/>
    </div>
  )

}

export default App;
