import Head from 'next/head';
import dynamic from 'next/dynamic';

const Game = dynamic(async () => (await import('../cribbage/Game')).Game, {
  ssr: false,
});

export default function GamePage() {
  return (
    <div className="page-container">
      <Head>
        <title>PIXIXX</title>
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css"
        />
      </Head>
      <Game />
      <style jsx>{`
        .page-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
        }
      `}</style>
    </div>
  );
}
