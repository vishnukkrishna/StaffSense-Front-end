import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Button, Card, Typography } from "@material-tailwind/react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className="text-3xl font-bold underline italic text-red-900">
        Hello world!
      </h1>
      <Button>Button</Button>
    </>
  );
}

export default App;
