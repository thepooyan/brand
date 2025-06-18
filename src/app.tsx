import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";

export default function App() {
  return (
    <>
      <Modal/>
      <Router
        root={props => (
          <>
            <Suspense>{props.children}</Suspense>
          </>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
