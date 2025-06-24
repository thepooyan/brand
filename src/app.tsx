import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";
import {QueryClient, QueryClientProvider} from "@tanstack/solid-query"
import { queryConfig } from "./lib/queries";

export default function App() {

  const qc = new QueryClient(queryConfig)

  return (
    <>
      <QueryClientProvider client={qc}>
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
      </QueryClientProvider>
    </>
  );
}
