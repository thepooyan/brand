import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";
import {Meta, MetaProvider, Title} from "@solidjs/meta"
import ErrorPage from "./components/pages/ErrorPage";
import { description, name, nameEn } from "../config/config";
import { WrapWithTheme } from "./lib/theme";
import { ThemeProvider } from "./lib/themeProvider";
import FallbackPage from "./components/pages/FallbackPage";

export default function App() {
  return (
    <>
      <ThemeProvider>
        <Modal/>
        <Router
          root={props => (
            <MetaProvider>
              <Title> {name} | {nameEn} </Title>
              <Meta name="description" content={description}/>
              <ErrorBoundary fallback={e=> <ErrorPage error={e}/>}>
                <Suspense fallback={<FallbackPage/>}>
                  <WrapWithTheme>{props.children}</WrapWithTheme>
                </Suspense>
              </ErrorBoundary>
            </MetaProvider>
          )}
        >
          <FileRoutes />
        </Router>
      </ThemeProvider>
    </>
  );
}
