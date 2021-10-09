import game from './main';

game.init({
  'keyCapture': true,
  'mouseCapture': true,
  'mouseLock': false,
});
game.addCube({
  'position': game.v(0, 1, 0),
  'color': 'red'
});
game.getCamera().position.z = 5;
game.on('keydown', (keys) => {
  if (keys.ArrowUp) {
    game.getCamera().translateZ(-game.calcSpeed());
  } else if (keys.ArrowDown) {
    game.getCamera().translateZ(game.calcSpeed() / 2);
  }

  if (keys.KeyE) {
    game.getCamera().translateX(game.calcSpeed());
  } else if (keys.KeyQ) {
    game.getCamera().translateX(-game.calcSpeed());
  }

  if (keys.ShiftLeft || keys.ShiftRight) {
    game.setRun(!game.getRun());
  } else if (!(keys.ShiftLeft || keys.ShiftRight)) {
    game.setRun(false);
  }

  if (keys.ArrowRight) {
    game.getCamera().rotateY(-game.calcSpeed());
  } else if (keys.ArrowLeft) {
    game.getCamera().rotateY(game.calcSpeed());
  }
})
game.on('keypress', (keys) => {
  console.log('down', keys);
})
game.on('keyup', (keys) => {
  console.log('up', keys);
})
game.on('mousedown', (mouse) => {
  console.log('down', JSON.stringify(mouse));
})
