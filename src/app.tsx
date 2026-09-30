import { createAsync, Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createEffect, ErrorBoundary, Suspense } from "solid-js";
import "./app.css";
import Modal from "./components/layout/Modal";
import FallbackPage from "./components/pages/FallbackPage";
import {Meta, MetaProvider, Title} from "@solidjs/meta"
import ErrorPage from "./components/pages/ErrorPage";
import { description, name, nameEn } from "../config/config";
import { getClassname, theme } from "./lib/theme";
import { getThemeSession } from "./lib/session";

export default function App() {

  const initialTheme = createAsync(() => getThemeSession())
  const finalTheme = () => theme() ?? initialTheme()

  return (
    <>
      <Modal/>
      <Router
        root={props => (
          <MetaProvider>
            <Title> {name} | {nameEn} </Title>
            <Meta name="description" content={description}/>
            <ErrorBoundary fallback={e=> <ErrorPage error={e}/>}>
              <Suspense fallback={<FallbackPage/>}>
                <div class={getClassname(finalTheme() || "plain")}>
                  {props.children}
                </div>
              </Suspense>
            </ErrorBoundary>
          </MetaProvider>
        )}
      >
        <FileRoutes />
      </Router>
    </>
  );
}
