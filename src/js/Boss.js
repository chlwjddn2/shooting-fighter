import Phaser from "phaser";

export default class Boss extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.stopY = 150;
    this.health = 1000; 
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    
    if (!this.stopped && this.y >= this.stopY) {
      this.setVelocityY(0);  // 이동 멈춤
      this.stopped = true;
      this.startSidewaysMovement();
    }

    if (this.movingSideways) {
      const { width } = this.scene.cameras.main;
      if (this.x <= 100 || this.x >= width - 100) {
        this.setVelocityX(-this.body.velocity.x); // 방향 반전
      }
    }
  }

  spawn = () => {
    this.setTexture('boss');
    this.setScale(2);
    this.body.setSize(this.width, this.height);
    this.setPosition(this.scene.cameras.main.centerX, -this.height);
    this.setActive(true);
    this.setVisible(true);
    this.setVelocityY(100);
    this.movingSideways = false;
  }

  destroyEnemy = () => {
    if (this.isDestroying) return;  // 이미 애니메이션 재생 중이면 무시
    this.isDestroying = true;
    this.movingSideways = false;
    this.anims.play('destory');
    this.on('animationcomplete', this.destroy);
  }

  startSidewaysMovement() {
    this.setVelocityX(100); // 오른쪽으로 이동 시작
    this.movingSideways = true;
  }
}