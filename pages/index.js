import Head from 'next/head';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          <a href="/pixi-page">Next</a>
        </h1>
      </main>

      <style jsx>{``}</style>

      <style jsx global>{``}</style>
    </div>
  );
}
