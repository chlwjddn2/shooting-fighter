import Phaser from "phaser";

export default class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.isDestroying = false;
    this.health = 10;
    
  }

  preUpdate = (time, delta) => {
    super.preUpdate(time, delta);
    if (this.y > this.scene?.cameras.main.height + this.height) {
      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
    }
  }

  spawn = () => {
    const textures = ['enemy1', 'enemy2'];
    const chosenTexture = Phaser.Utils.Array.GetRandom(textures);
    this.setTexture(chosenTexture);
    this.body.setSize(this.width, this.height);
    this.setVelocityY(100);
    this.setActive(true);
    this.setVisible(true);
    this.body.enable = true;
    this.isDestroying = false;
  }

  destroyEnemy = () => {
    if (this.isDestroying) return;  // 이미 애니메이션 재생 중이면 무시
    
    this.isDestroying = true;
    this.anims.play('destory');
    this.on('animationcomplete', this.destroy);
    this.body.enable = false;
  }
}