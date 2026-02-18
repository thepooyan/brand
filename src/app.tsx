import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";
import {QueryClient, QueryClientProvider} from "@tanstack/solid-query"
import { queryConfig } from "./lib/queries";
import FallbackPage from "./components/pages/FallbackPage";
import {Meta, MetaProvider, Title} from "@solidjs/meta"
import { description, nameEn } from "../config/config";
import ErrorPage from "./components/pages/ErrorPage";

export default function App() {

  const qc = new QueryClient(queryConfig)

  return (
    <>
        <QueryClientProvider client={qc}>
          <Modal/>
          <Router
            root={props => (
              <MetaProvider>
                <Title>{nameEn}</Title>
                <Meta name="description" content={description}/>
                <ErrorBoundary fallback={e=> <ErrorPage error={e}/>}>
                  <Suspense fallback={<FallbackPage/>}>{props.children}</Suspense>
                </ErrorBoundary>
              </MetaProvider>
            )}
          >
            <FileRoutes />
          </Router>
        </QueryClientProvider>
    </>
  );
}
