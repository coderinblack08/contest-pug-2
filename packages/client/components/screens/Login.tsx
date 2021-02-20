import Link from "next/link";
import React from "react";
import { Button } from "../form/Button";

const footer_links = [
  ["https://coderinblack.now.sh", "Team"],
  ["https://github.com/coderinblack08/contest-pug-2", "Github"],
];

export const Login: React.FC = () => (
  <div>
    <h1 className="font-sans font-bold text-2xl mb-8">Contest Pug</h1>
    <p className="text-lg mb-2">
      🤙 🌸 &nbsp; The smarter way to host online competitions.
    </p>
    <ul className="list-inside list-disc">
      <li>Built for virtual competitions</li>
      <li>Fit for the classroom</li>
      <li>Game night fun</li>
      <li>And more 👀</li>
    </ul>
    <Button href="http://localhost:4000/auth/google" className="w-full mt-8">
      Login with Google
    </Button>
    <footer className="mt-5 flex justify-center">
      {footer_links.map(([href, link], i) => (
        <div className="inline-block text-blue-300" key={i}>
          {i ? (
            <span className="ml-2 mr-1.5 text-gray-200 font-black">·</span>
          ) : null}{" "}
          <Link href={href}>{link}</Link>
        </div>
      ))}
    </footer>
  </div>
);
