export default class Score {
  constructor(scene, x, y, fontSize = '20px') {
    this.scene = scene;
    this.value = 0;

    this.text = scene.add.text(x, y, 'Score: 0', {
      fontSize: fontSize,
      fill: '#fff',
      fontFamily: '"Press Start 2P"'
    }).setDepth(999);
  }

  updateScore = (point) => {
    this.value += point;
    this.text.setText('Score: ' + this.value);
  }
}