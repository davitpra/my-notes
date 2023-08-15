import { cssBundleHref } from "@remix-run/css-bundle";
import styles from './styles/main.css'
import type { LinksFunction } from "@remix-run/node";
import {
  Link,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useCatch,
  useRouteError,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [{ rel: "stylesheet", href: styles }]),
];

export function ErrorBoundary() {

  const error = useRouteError()

    // when true, this is what used to go to `CatchBoundary`
    if (isRouteErrorResponse(error)) {
      return (
        <div>
          <h1>Oops</h1>
          <p>Status: {error.status}</p>
          <p>{error.data.message}</p>
        </div>
      );
    }
  
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
      <title> An error ocurred! </title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>
      <main className = 'error'>
        <h1> An Error Ocurred! </h1>
        <p> Something go wrong</p>
        <p> Back to <Link to='/' > safety</Link>! </p>
      </main>
      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  )
}

export function CatchBoundary () {
  const caughtResponse = useCatch()
  return (
    <html lang="en">
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <Meta />
      <Links />
      <title> {caughtResponse.statusText} </title>
    </head>
    <body>
      <header>
        <MainNavigation />
      </header>

      <Outlet />
      <ScrollRestoration />
      <Scripts />
      <LiveReload />
    </body>
  </html>
  )
}
export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <MainNavigation />
        </header>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
