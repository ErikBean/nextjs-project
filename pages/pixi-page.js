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
    const img = new PIXI.Sprite(resources.card.texture);

    img.x = 50;
    img.y = app.renderer.height - img.height - 50;

    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xffffff);
    graphics.drawRoundedRect(img.x, img.y, img.width, img.height, 10);

    graphics.endFill();

    app.stage.addChild(graphics);
    app.stage.addChild(img);
  });
};

export default function Game() {
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
