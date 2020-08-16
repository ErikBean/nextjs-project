import Head from 'next/head';
import { useEffect } from 'react';
import { gameState } from '../mockData';

const suits = {
  S: 'spades',
  C: 'clubs',
  H: 'hearts',
  D: 'diamonds',
};

const withFaces = (num) => {
  const faces = {
    1: 'ace',
    11: 'jack',
    12: 'queen',
    13: 'king',
  };
  return faces[num] || num;
};

const cardToPath = (cardString) => {
  const numericValue = cardString.substr(1);
  const suit = suits?.[cardString.charAt(0)];
  const value = withFaces(numericValue);
  return `/png/${value}_of_${suit}.png`;
};

const isAceOrFace = () => {};
const renderCards = async (initX, initY, app, PIXI, cards) => {
  console.log(cards);
  for (let cardString of cards) {
    console.log(cardString);
    await new Promise((resolve, reject) => {
      const offset = 50 * cards.indexOf(cardString);
      const resource = `card-${cardString}`;
      app.loader.onLoad.add(resolve);
      app.loader
        .add(resource, cardToPath(cardString))
        .load((loader, resources) => {
          const card = new PIXI.Sprite(resources[resource].texture);
          card.x = initX + offset;
          card.y = initY;
          card.scale.set(0.5, 0.5);

          const cardBG = new PIXI.Graphics();
          cardBG.beginFill(0xffffff);
          cardBG.drawRoundedRect(card.x, card.y, card.width, card.height, 10);
          cardBG.endFill();
          cardBG.addChild(card);
          app.stage.addChild(cardBG);
        });
    });
  }
};

const loadPIXI = (gameState) => () => {
  if (typeof window === 'undefined') return;
  const PIXI = require('pixi.js');
  const app = new PIXI.Application({ backgroundColor: '0xfff' });
  app.resizeTo = document.getElementById('pixi-container');
  document.getElementById('pixi-container').appendChild(app.view);
  renderCards(
    0,
    0,
    app,
    PIXI,
    gameState['coolguy@gmail.com'].hand.revealed,
  ).then(() => {
    renderCards(
      0,
      app.renderer.height - 200,
      app,
      PIXI,
      gameState['lamedude@hotmail.com'].hand.revealed,
    );
  });
};

export default function Game() {
  useEffect(loadPIXI(gameState), []);
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
      <main id="pixi-container" />
      <style jsx>{`
        .page-container {
          height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
          background-color: black;
        }
        #pixi-container {
          height: 98%;
          width: 98%;
        }
      `}</style>
    </div>
  );
}
