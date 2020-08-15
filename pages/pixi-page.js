import Head from 'next/head';
// import * as PIXI from 'pixi.js';
import { useEffect } from 'react';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

const loadPIXI = () => {
  const PIXI = require('pixi.js');
  if (typeof window === 'undefined') return;
  const app = new PIXI.Application();
  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.getElementById('pixi-container').appendChild(app.view);

  // load the texture we need
  app.loader.add('katie', '/katie.jpg').load((loader, resources) => {
    // This creates a texture from a 'katie.png' image
    const img = new PIXI.Sprite(resources.katie.texture);

    // Setup the position of the bunny
    img.x = app.renderer.width / 2;
    img.y = app.renderer.height / 2;
    img.width = img.width / 4;
    img.height = img.height / 4;
    // Rotate around the center
    img.anchor.x = 0.5;
    img.anchor.y = 0.5;

    // Add the bunny to the scene we are building
    app.stage.addChild(img);

    // Listen for frame updates
    app.ticker.add(() => {
      // each frame we spin the bunny around a bit
      img.rotation += 0.01;
    });
  });
};

export default function AnotherPage() {
  useEffect(loadPIXI, []);
  return (
    <div className="container">
      <Head>
        <title>Next</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title">
        <a href="/">Back</a>
      </h1>
      <main id="pixi-container" />
    </div>
  );
}
