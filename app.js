
var LEFT_KEY = 37;
var UP_KEY = 38;
var RIGHT_KEY = 39;
var DOWN_KEY = 40;
var SPACE_KEY = 32;
var HERO_MOVEMENT = 7;

var lastLoopRun = 0;
var score = 0;
var iterations = 0;

var controller = new Object();
var enemies = [];

var hero = createSprite('hero', 680, 860, 20, 20);
var laser = createSprite('laser', 0, -120, 5, 50);


function createSprite(element, x, y, w, h) {
  var result = new Object();
  result.element = element;
  result.x = x;
  result.y = y;
  result.w = w;
  result.h = h;
  return result;
}

function initializeKey(keyCode, isPressed) {
  if (keyCode == LEFT_KEY) {
    controller.left = isPressed;
  }
  if (keyCode == RIGHT_KEY) {
    controller.right = isPressed;
  }
  if (keyCode == UP_KEY) {
    controller.up = isPressed;
  }
  if (keyCode == DOWN_KEY) {
    controller.down = isPressed;
  }
  if (keyCode == SPACE_KEY) {
    controller.space = isPressed;
  }
}

document.onkeydown = function(evt) {
  initializeKey(evt.keyCode, true);
};

document.onkeyup = function(evt) {
  initializeKey(evt.keyCode, false);
};


function collides(a, b) {
  return a.x < b.x + b.w && a.x + a.w > b.x &&
         a.y < b.y + b.h && a.y + a.h > b.y;
}

function ensureBounds(sprite, ignoreY) {
  if (sprite.x < 40) {
    sprite.x = 40;
  }
  if (!ignoreY && sprite.y < 40) {
    sprite.y = 40;
  }
  if (sprite.x + sprite.w > 1680) {
    sprite.x = 1680 - sprite.w;
  }
  if (!ignoreY && sprite.y + sprite.h > 520) {
    sprite.y = 520 - sprite.h;
  }
}

function setPosition(sprite) {
  var e = document.getElementById(sprite.element);
  e.style.left = sprite.x + 'px';
  e.style.top = sprite.y + 'px';
}

function handleControls() {
  if (controller.up) {
    hero.y -= HERO_MOVEMENT;
  }
  if (controller.down) {
    hero.y += HERO_MOVEMENT;
  }
  if (controller.left) {
    hero.x -= HERO_MOVEMENT;
  }
  if (controller.right) {
    hero.x += HERO_MOVEMENT;
  }
  if (controller.space && laser.y <= -120) {
    laser.x = hero.x + 10;
    laser.y = hero.y - laser.h;
  }

  ensureBounds(hero);
}

function checkCollisions() {
  for (var i = 0; i < enemies.length; i++) {
    if (collides(laser, enemies[i])) {
      var element = document.getElementById(enemies[i].element);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
      laser.y = -laser.h;
      score += 100;
    } else if (collides(hero, enemies[i])) {
      gameOver();
    } else if (enemies[i].y + enemies[i].h >= 580) {
      var element = document.getElementById(enemies[i].element);
      element.style.visibility = 'hidden';
      element.parentNode.removeChild(element);
      enemies.splice(i, 1);
      i--;
    }
  }
}

function gameOver() {
  var element = document.getElementById(hero.element);
  element.style.visibility = 'hidden';
  element = document.getElementById('gameover');
  element.style.visibility = 'visible';

  var noEnemies = document.getElementById(enemies.element);
  element.style.visibility = 'hidden';
  element = document.getElementById('gameover');
  element.style.visibility = 'visible';

}

function showSprites() {
  setPosition(hero);
  setPosition(laser);
  for (var i = 0; i < enemies.length; i++) {
    setPosition(enemies[i]);
  }
  var scoreElement = document.getElementById('score');
  scoreElement.innerHTML = 'SCORE: ' + score;
}

function updatePositions() {
  for (var i = 0; i < enemies.length; i++) {
    enemies[i].y += 15;
    enemies[i].x += getRandom(50);
    ensureBounds(enemies[i], true);
  }
  laser.y -= 20;
}

function addEnemy() {
  var interval = 35;
  if (iterations > 1500) {
    interval = 15;
  } else if (iterations > 1000) {
    interval = 25;
  } else if (iterations > 500) {
    interval = 45;
  }

  if (getRandom(interval) == 0) {
    var elementName = 'enemy' + getRandom(10000000);
    var enemy = createSprite(elementName, getRandom(500), -40, 35, 35);

    var element = document.createElement('div');
    element.id = enemy.element;
    element.className = 'enemy';
    document.children[0].appendChild(element);

    enemies[enemies.length] = enemy;
  }
}

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

function loop() {
  if (new Date().getTime() - lastLoopRun > 35) {
    updatePositions();
    handleControls();
    checkCollisions();

    addEnemy();

    showSprites();

    lastLoopRun = new Date().getTime();
    iterations++;
  }
  setTimeout('loop();', 2);
}


loop();
