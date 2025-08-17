import Phaser from "phaser";
import Player from "./Player";
import Enemy from "./Enemy";
import Boss from "./Boss";
import Life from "./Life";
import Score from "./Score";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainScene' });
  }

  preload = () => {
    this.load.image('background', './public/assets/background.png');
    this.load.image('missile', './public/assets/missile00.png');

    this.load.image('enemy1', './public/assets/enemy1.png');
    this.load.image('enemy2', './public/assets/enemy2.png');
    this.load.image('boss', './public/assets/enemy3.png');

    this.load.spritesheet('destory', './public/assets/explosion.png', {
      frameWidth: 96,
      frameHeight: 96,
    });

    this.load.spritesheet('player', `./public/assets/player.png`, {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet('hit', `./public/assets/hit.png`, {
      frameWidth: 1024,
      frameHeight: 1024,
    });

    this.load.audio('shooting', './public/assets/audio/shooting.mp3');
    this.load.spritesheet('life', './public/assets/life.png', {
      frameWidth: 120,
      frameHeight: 120,
    });


    //item
    this.load.image('powerItem', './public/assets/item_powerUp.png');
    this.load.image('healthItem', './public/assets/item_healthUp.png');
  }

  create = () => {
    this.#initAnimation(); // 애니메이션 초기화

    const {x, y, width, height} = this.cameras.main;
    const center = {
      x: x + width / 2, 
      y: y + height / 2
    };

    this.background = this.add.tileSprite(x, y, width, height, 'background').setOrigin(0, 0); // 배경 설정

    // 플레이어 생성
    this.player = new Player(this, center.x, height * 4 / 5);
    this.player.body.setCollideWorldBounds(true);
    
    // 적 그룹 생성
    this.enemies = this.physics.add.group({
      classType: Enemy,
      runChildUpdate: true,
      maxSize: 20
    });

    // enemy 1.5초마다 생성
    this.time.addEvent({
      delay: 1000,
      callback: () => {
        const enemy = this.enemies.get(Phaser.Math.Between(50, width - 50), -50);
        if (enemy) enemy.spawn();
      },      
      loop: true
    });

    // 10초 뒤 보스 생성
    this.time.delayedCall(10000, () => {
      this.warning = this.add.text(this.cameras.main.centerX, this.cameras.main.centerY, 'WARNING').setOrigin(0.5).setDepth(999).setFontSize(100).setAlign('center').setColor('yellow');
      
      this.tweens.add({
        targets: this.warning,
        alpha: { from: 1, to: 0 },
        ease: 'Linear',
        duration: 500,
        repeat: 5,
        yoyo: true,
        onComplete: () => {
          this.warning.destroy();
          this.boss = new Boss(this, this.cameras.main.centerX, -100);
          this.boss.spawn();
          this.physics.add.overlap(this.player.missiles, this.boss, this.handleMissileBossCollision, null, this);
        }
      });
    });

    //life 설정
    this.life = new Life(this, 3);

    // 충돌 설정
    this.physics.add.overlap(this.player.missiles, this.enemies, this.handleMissileEnemyCollision, null, this);
    this.physics.add.overlap(this.enemies, this.player, this.handleMissilePlayerCollision, null, this);

    // score 설정
    this.score = new Score(this, 30, 100);
  }

  update = () => {
    this.background.tilePositionY -= 1;
  }

  handleMissileEnemyCollision = (missile, enemy) => { // 미사일과 적 충돌 처리
    missile.body.setVelocity(0, 0);
    missile.body.enable = false;
    missile.setScale(0.2);
    missile.play('hit');
    missile.once('animationcomplete', () => missile.destroy());
    enemy.health -= missile.damage;
    if (enemy.health === 0) {
      enemy.destroyEnemy();
      this.score.updateScore(10); // 점수 업데이트
    }
  } 

  handleMissileBossCollision = (boss, missile) => { // 미사일과 보스 충돌 처리
    missile.body.setVelocity(0, 0);
    missile.body.enable = false;
    missile.setScale(0.2);
    missile.play('hit');
    missile.once('animationcomplete', () => missile.destroy());
    boss.health -= missile.damage;
    if (boss.health === 0) {
      boss.destroyEnemy();
      this.score.updateScore(10); // 점수 업데이트
    }
  }

  handleMissilePlayerCollision = (player, enemy) => { // 플레이어와 적 충돌 처리
    player.body.enable = false;
    this.life.loseLife();    
    this.tweens.add({
      targets: player,
      alpha: { from: 1, to: 0 },
      ease: 'Linear',
      duration: 300,
      repeat: 3,
      yoyo: true,
      onComplete: () => {
        player.body.enable = true;
      }
    });
    this.cameras.main.shake(500, 0.01);
    
    if (this.life.currentLives <= 0) {
      this.scene.transition({ target : 'GameOverScene', duration : 500 });
    }
  }

  #initAnimation = () => {
    this.anims.create({
      key: 'destory',
      frames: this.anims.generateFrameNumbers('destory', { start: 0, end: 11 }),
      frameRate: 10,
    });

    // animation 등록
    this.anims.create({
      key: 'move',
      frames: this.anims.generateFrameNumbers('player', { start: 1, end: 2 }),
      frameRate: 10,
    });

    // animation 등록
    this.anims.create({
      key: 'hit',
      frames: this.anims.generateFrameNumbers('hit', { start: 0, end: 15 }),
      frameRate: 10,
    });
  }
} 