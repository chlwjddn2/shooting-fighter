import Phaser from "phaser";
import WebFont from 'webfontloader';

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload = () => {
    this.load.image('background', './assets/background.png');
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      },
      active: () => {
        this.fontsReady = true;
      }
    });
  }

  create = () => {
    // 카메라 위치
    const {x, y, width, height} = this.cameras.main;
    const center = {
      x: width / 2,
      y: height / 2
    }

    // 배경 설정
    this.background = this.add.tileSprite(x, y, width, height, 'background').setOrigin(0, 0);
    this.background.setDisplaySize(this.scale.width, this.scale.height);

    // 텍스트 생성
    this.titleText = this.add.text(center.x, height * 1 / 4, 'Shooting\nFighter', { fontFamily: '"Press Start 2P"' }).setOrigin(0.5).setDepth(999).setFontSize(50).setAlign('center');
    this.startText = this.add.text(center.x, height * 3 / 4, 'start game', { fontFamily: '"Press Start 2P"' }).setOrigin(0.5).setDepth(999).setFontSize(30).setAlign('center').setInteractive({ useHandCursor: true });

    // startText 클릭 이벤트
    this.startText.on('pointerdown', () => {
      this.scene.transition({ target : 'MainScene', duration : 500 });
    });
  }
} 