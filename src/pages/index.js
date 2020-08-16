import Head from 'next/head';

const routes = ['/pixi-page', '/cards'];
export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Home</h1>
        <ul className="routes">
          {routes.map((route) => (
            <li>
              <a href={route}>{route.replace('/', '')}</a>
            </li>
          ))}
        </ul>
      </main>

      <style jsx>{`
        .routes {
          list-style: none;
          font-size: 2em;
        }
      `}</style>
    </div>
  );
}
