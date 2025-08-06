import Phaser from "phaser";

export default class Missile extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.setTexture('missile');
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.shootSound = this.scene.sound.add('shooting');

    this.setDepth(6);
    this.speed = 500;
    this.damage = 10;
  }

  fire = () => { // 발사 메서드
    this.body.enable = true; 
    this.setActive(true);
    this.setVisible(true);
    this.setPosition(this.x, this.y);
    this.setVelocityY(-this.speed);
    this.shootSound.play();
  }

  preUpdate = (time, delta) => {
    super.preUpdate(time, delta);
    if (this.y < -50) {
      this.setActive(false);
      this.setVisible(false);
      this.body.enable = false;
    }
  }
}