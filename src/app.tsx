import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";
import FallbackPage from "./components/pages/FallbackPage";
import {Meta, MetaProvider, Title} from "@solidjs/meta"
import ErrorPage from "./components/pages/ErrorPage";
import { description, name, nameEn } from "../config/config";
import { updateThemeSignal } from "./lib/theme";

export default function App() {

  updateThemeSignal()

  return (
    <>
      <Modal/>
      <Router
        root={props => (
          <MetaProvider>
            <Title> {name} | {nameEn} </Title>
            <Meta name="description" content={description}/>
            <ErrorBoundary fallback={e=> <ErrorPage error={e}/>}>
              <Suspense fallback={<FallbackPage/>}>{props.children}</Suspense>
            </ErrorBoundary>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
