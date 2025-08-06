import Phaser from "phaser";
import Missile from "./Missile";

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.scene = scene;
    this.setTexture('player'); // 플레이어 텍스쳐 설정
    this.setPosition(x, y); // 초기 위치 설정
    this.setDepth(6); // 깊이 설정
    this.scene.add.existing(this); // 씬에 추가
    this.scene.physics.add.existing(this); // 물리 엔진에 추가

    this.speed = 7 // 움직임 속도;
    this.isMoving = false;
    this.fireRate = 300; // 발사 간격
    this.lastFired = 0; // 속도 저징

    // key 등록
    this.key = {
      up:scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP),
      down:scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN),
      left:scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right:scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT)
    };

    // missile 객채 생성 준비
    this.missiles = this.scene.physics.add.group({
      classType: Missile,
      runChildUpdate: true,
      maxSize: 50
    });
  }

  preUpdate = (time, delta) => {
    super.preUpdate(time, delta);
    this.#initPlayerMove();
    this.#handleShooting(time); 
  }

  #initPlayerMove = () => {
    const { up, down, left, right } = this.key;
    this.isMoving = up.isDown || down.isDown || left.isDown || right.isDown;
    if (up.isDown) this.y -= this.speed;
    if (down.isDown) this.y += this.speed;
    if (left.isDown) {
      this.x -= this.speed
      this.setFlipX(false);
      this.anims.play('move');
    }
    if (right.isDown) {
      this.x += this.speed;
      this.setFlipX(true);
      this.anims.play('move');
    }
    if (!this.isMoving) {
      this.anims.stop();
      this.setFrame(0); 
    }
  }

  #handleShooting = (time) => {
    if (time > this.lastFired + this.fireRate) {
      const missile = this.missiles.get(this.x, this.y - this.height / 2);
      if (!missile) return;
      missile.fire();
      missile.setActive(true);
      missile.setVisible(true);
      this.lastFired = time;
    }
  }
}