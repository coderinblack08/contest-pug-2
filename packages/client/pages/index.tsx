import React from 'react';

const footer_links = [
  ['https://coderinblack.now.sh', 'Team'],
  ['https://github.com/coderinblack08/contest-pug', 'Github'],
];

const Home: React.FC = () => {
  return (
    <main className="max-w-3xl mx-auto px-5 py-10 md:py-20 2xl:py-32">
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
      <button className="transition focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-4 focus:ring-offset-gray-900 font-sans w-full bg-gray-100 text-gray-900 font-medium py-2 px-3 rounded mt-8">
        Login with Google
      </button>
      <footer className="mt-5 flex justify-center">
        {footer_links.map(([href, link], i) => (
          <div className="inline-block text-blue-300">
            {i ? (
              <span className="ml-2 mr-1.5 text-gray-200 font-black">·</span>
            ) : null}{' '}
            <a href={href}>{link}</a>
          </div>
        ))}
      </footer>
    </main>
  );
};

export default Home;
