import type { V2_MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "New Davidcito's App" },
    { name: "description", content: "Welcome to Davidcito!" },
  ];
};

export default function Index() {
  return (
    <main id='content'>
      <h1> A better way of keeping track of your notes</h1>
      <p> Try our early beta and never loose track of your notes again!</p>
      <p id= "cta">
        <Link to="/demo"> Try now</Link>
      </p>
    </main>
  )
}
