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
  useCatch,
} from "@remix-run/react";
import MainNavigation from "./components/MainNavigation";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : [{ rel: "stylesheet", href: styles }]),
];

export function ErrorBoundary({error}) {
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
        <p> {error.message}</p>
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
      <main className = 'error'>
        <h1> An Error Ocurred! </h1>
        <p> {caughtResponse.statusText}</p>
        <p> {caughtResponse.data?.message || 'Something went wrong!'}</p>
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
