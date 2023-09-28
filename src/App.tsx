import "./App.css";
import Router from "./routers/router";
import {Toaster} from "sonner";

function App() {
  return (
    <>
      <Router />
      <Toaster toastOptions={{
        style: {
          background: "transparent",
          backdropFilter: "blur(15px)",
          color: "white",
        }
      }} position="top-right" />
    </>
  );
}

export default App;
