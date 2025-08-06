import Phaser from "phaser";

export default class Life extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, maxLives) {
    super(scene, maxLives);
    this.scene = scene;
    this.maxLives = maxLives;
    this.currentLives = maxLives
    this.hearts = [];
    this.#createHearts();
  }

  #createHearts = () => {
    for (let i = 0; i < this.maxLives; i++) {
      const heart = this.scene.add.image(40 + i * 40, 50, 'life').setScale(0.4);
      this.hearts.push(heart);
    }
  }

  loseLife = () => {
    if (this.currentLives > 0) {
      this.currentLives--;
      const heart = this.hearts[this.currentLives];
      heart.setVisible(false);
      heart.setActive(false);
    }    
  }
}