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
var BAR__WIDTH = 40;
var BAR_GAP = 50;

var renderCloud = function(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
}

var getMaxElement = function(arr) {
  var maxElement = arr[0];

  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

window.renderStatistics = function(ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff');

  ctx.fillStyle = '#000';
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillText('Ура, вы победили!', CLOUD_X + INNER_GAP, INNER_GAP);
  ctx.fillText('Список результатов:', CLOUD_X + INNER_GAP, INNER_GAP + FONT_GAP);

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000';
    ctx.fillText(players[i], CLOUD_X + INNER_GAP + (BAR__WIDTH + BAR_GAP) * i, CLOUD_Y + INNER_GAP + TEXT_HEIGHT + BAR_HEIGHT);

    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240,' + Math.round(Math.random() * 100) +'%, 80%)';
    }

    var proportionalBarHeight = (BAR_HEIGHT * -times[i]) / maxTime;

    ctx.fillRect(CLOUD_X + INNER_GAP + (BAR__WIDTH + BAR_GAP) * i, CLOUD_Y + INNER_GAP + TEXT_HEIGHT + BAR_HEIGHT, BAR__WIDTH, proportionalBarHeight);

    ctx.fillStyle = '#000';
    ctx.fillText(Math.floor(times[i]), CLOUD_X + INNER_GAP + (BAR__WIDTH + BAR_GAP) * i, CLOUD_Y + INNER_GAP + TEXT_HEIGHT - FONT_GAP + BAR_HEIGHT + proportionalBarHeight);
  }
};
