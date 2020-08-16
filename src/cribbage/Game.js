import { useEffect } from 'react';
import { gameState } from './mockData';
const hand1 = gameState['coolguy@gmail.com'].hand.revealed;
const hand2 = gameState['lamedude@hotmail.com'].hand.revealed;
const PIXI = require('pixi.js');

const suits = {
  S: 'spades',
  C: 'clubs',
  H: 'hearts',
  D: 'diamonds',
};

const getValue = (num) => {
  const nonNumeric = {
    1: 'ace',
    11: 'jack',
    12: 'queen',
    13: 'king',
  };
  return nonNumeric[num] || num;
};

const cardToPath = (cardString) => {
  const numericValue = cardString.substr(1);
  const suit = suits?.[cardString.charAt(0)];
  const value = getValue(numericValue);
  return `${value}_of_${suit}.png`;
};

const renderCards = async (initX, initY, app, cards, sheet) => {
  for (let cardString of cards) {
    await new Promise((resolve, reject) => {
      const offset = 50 * cards.indexOf(cardString);

      const card = new PIXI.Sprite(sheet.textures[cardToPath(cardString)]);
      card.x = initX + offset;
      card.y = initY;
      card.scale.set(0.5, 0.5);

      const cardBG = new PIXI.Graphics();
      cardBG.beginFill(0xffffff);
      cardBG.drawRoundedRect(card.x, card.y, card.width, card.height, 10);
      cardBG.endFill();
      cardBG.addChild(card);

      app.stage.addChild(cardBG);
      resolve();
    });
  }
};

const loadCardResources = () => {
  const getSheet = () =>
    PIXI.Loader.shared.resources['/spritesheet.json']?.spritesheet;
  return getSheet()
    ? Promise.resolve(spritesheet)
    : new Promise((resolve) => {
        PIXI.Loader.shared
          .add('/spritesheet.json')
          .load(() => resolve(getSheet()));
      });
};

const loadGame = () => {
  const app = new PIXI.Application({ backgroundColor: '0xfff' });

  app.resizeTo = document.getElementById('pixi-container');
  document.getElementById('pixi-container').appendChild(app.view);

  const renderHand1 = (sheet) => renderCards(0, 0, app, hand1, sheet);
  const renderHand2 = (sheet) =>
    renderCards(0, app.renderer.height - 200, app, hand2, sheet);

  loadCardResources().then((sheet) => {
    renderHand1(sheet);
    renderHand2(sheet);
  });
};

export const Game = () => {
  useEffect(loadGame, []);
  return (
    <>
      <main id="pixi-container" />
      <style jsx>{`
        #pixi-container {
          height: 98%;
          width: 98%;
        }
      `}</style>
    </>
  );
};
