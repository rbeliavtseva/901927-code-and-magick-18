'use strict';

var CLOUD_HEIGHT = 270;
var CLOUD_WIDTH = 420;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var INNER_GAP = 30;
var FONT_GAP = 20;
var TEXT_HEIGHT = 50;
var BAR_HEIGHT = 150;
var BAR_WIDTH = 40;
var BAR_GAP = 50;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', CLOUD_X + INNER_GAP, INNER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + INNER_GAP, INNER_GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  var getRandomColor = function () {
    return 'hsl(240,' + Math.round(Math.random() * 100) + '%, 80%)';
  };

  for (var i = 0; i < players.length; i++) {
    var coordinateX = CLOUD_X + INNER_GAP + (BAR_WIDTH + BAR_GAP) * i;
    var coordinateY = CLOUD_Y + INNER_GAP + TEXT_HEIGHT + BAR_HEIGHT;
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], coordinateX, coordinateY);

    ctx.fillStyle = players[i] === 'Вы' ? PLAYER_COLOR : getRandomColor();

    var proportionalBarHeight = (BAR_HEIGHT * -times[i]) / maxTime;

    ctx.fillRect(coordinateX, coordinateY, BAR_WIDTH, proportionalBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), coordinateX, coordinateY - FONT_GAP + proportionalBarHeight);
  }
};
