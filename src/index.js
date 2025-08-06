import Phaser from 'phaser';
import StartScene from './js/StartScene';
import MainScene from './js/MainScene';
import GameOverScene from './js/GameOverScene';

const width = window.innerWidth;
const height = window.innerHeight;

class Game {
  #config = {
    type: Phaser.CANVAS,
    width: 1040,
    height: height,
    scene: [
      StartScene,
      MainScene,
      GameOverScene
    ],
    parent: 'container',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: false,
        // debug: true,
      },
    },
    scale: {
      mode:Phaser.Scale.FIT,//자동맞춤
      autoCenter:Phaser.Scale.CENTER_BOTH,//가로세로 모두맞춤
      
    },
    pixelArt: false,
  }
  constructor() {
    console.log('load');
    
    this.game = new Phaser.Game(this.#config);
  }
}

const game = new Game();