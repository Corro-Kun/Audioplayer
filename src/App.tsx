import "./App.css";
import Router from "./routers/router";
import {Toaster} from "sonner";

function App() {
  return (
    <>
      <Router />
      <Toaster />
    </>
  );
}

export default App;
