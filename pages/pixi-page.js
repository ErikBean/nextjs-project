import Head from 'next/head';
// import * as PIXI from 'pixi.js';
import { useEffect } from 'react';
import debounce from 'lodash.debounce';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container

const loadPIXI = () => {
  if (typeof window === 'undefined') return;
  const PIXI = require('pixi.js');
  const { innerHeight: height, innerWidth: width } = window;
  const app = new PIXI.Application({
    backgroundColor: '0xfff',
    height,
    width,
  });
  app.resizeTo = window;

  // The application will create a canvas element for you that you
  // can then insert into the DOM
  document.getElementById('pixi-container').appendChild(app.view);

  // load the texture we need
  app.loader.add('card', '/png/9_of_clubs.png').load((loader, resources) => {
    // This creates a texture from a 'card.png' image
    const img = new PIXI.Sprite(resources.card.texture);

    // Setup the position of the bunny
    img.x = app.renderer.width / 2;
    img.y = app.renderer.height / 2;

    // img.width = img.width / 4;
    // img.height = img.height / 4;
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
        <title>PIXI</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main id="pixi-container" />
    </div>
  );
}
