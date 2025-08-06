import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StartScene' });
  }

  preload = () => {
    this.load.image('background', './assets/background.png');
  }

  create = () => {
    const {x, y, width, height} = this.cameras.main;
    const center = {
      x: width / 2,
      y: height / 2
    }

    this.background = this.add.tileSprite(x, y, width, height, 'background').setOrigin(0, 0);
    this.background.setDisplaySize(this.scale.width, this.scale.height);
    this.titleText = this.add.text(center.x, height * 1 / 4, 'Shooting\nFighter').setOrigin(0.5).setDepth(999).setFontSize(50).setAlign('center');
    this.startText = this.add.text(center.x, height * 3 / 4, 'start game').setOrigin(0.5).setDepth(999).setFontSize(30).setAlign('center').setInteractive({ useHandCursor: true });

    this.startText.on('pointerdown', () => {
      this.scene.transition({ target : 'MainScene', duration : 500 });
    });
  }
} 