const LAST_LEVEL = 2;
const LEFT = 0;
const RIGHT = 1;

// TS: 정사각형 타일의 한 변의 픽셀크기
// TL: 한 퍼즐에 몇개의 타일이 들어가는가? 예시) TL이 8이면 한 퍼즐에 타일이 8x8개 들어있음!
const TS = 32;
const TL = 8;

var MAP = []; // Create empty 2d array
var nowLevel = 1;

var levels = [];
var level_design = [['A', 'C', 'B'], ['A', 'B', 'C']];
var level_answer = [[['A', 'C'], ['C', 'B']], [['A', 'B'], ['C', 'B']]];
var level_doorLayer = ['B'];
var level_needKey = [1, 1];

var blank_pos = [1, 1];

var doorTile;
var keyTiles = [];
var MapSquare = 2; // At first, 2x2 Puzzles!

var isPlayMode = false;
var nowDirection = RIGHT;
var isIdle = true;
var directionSuffix = ['-left', '-right'];
var spacePressed = 0;
var playerTotalKey = 0;
var playerIn;


function findDoorAndKey(layer)
{
	for(var i = 0; i<TL; i++)
	{
		for(var j = 0; j<TL; j++)
		{
			if(layer.layer.data[i][j].index == 2)
				doorTile = layer.layer.data[i][j];
			else if(layer.layer.data[i][j].index == 4)
				keyTiles.push(layer.layer.data[i][j]);
		}
	}
}

function checkPlayerCollideDoor(player, doorTile)
{
	if(doorTile.getLeft() <= player.x+player.width && doorTile.getRight() >= player.x && doorTile.getBottom() >= player.y && doorTile.getTop() <= player.y+player.height)
		return true;
	else
		return false;
}

function checkPlayerCollideKey(player)
{
	for(var i = 0; i<keyTiles.length; i++)
	{
	if(keyTiles[i].getLeft() <= player.x+player.width && keyTiles[i].getRight() >= player.x && keyTiles[i].getBottom() >= player.y && keyTiles[i].getTop() <= player.y+player.height)
		{
			var layer = keyTiles[i].tilemapLayer;
			layer.removeTileAt(keyTiles[i].x, keyTiles[i].y);
			keyTiles.pop();
			return true;
		}
	}
	return false;
}

function getNameOfLayer(layer)
{
	if(!(layer == undefined || layer.layer == undefined))
		return layer.layer.name;
}

function playerInLayer(player, layer)
{
	if(player.x >= layer.x && player.x <= layer.x+TS*TL && player.y >= layer.y && player.y <= layer.y+TS*TL)
		return true;
	else
		return false;
}

function checkCanMove(LeftOrUp, RightOrDown)
{
	for(var i = 0; i<level_answer[nowLevel-1].length; i++)
	{
		if(level_answer[nowLevel-1][i][0] == LeftOrUp && level_answer[nowLevel-1][i][1] == RightOrDown)
			return true;
	}
	return false;
}

function checkPlayerMoveLayer(scene)
{
	//var layer = MAP[parseInt(scene.player.y/(TS*TL))][parseInt(scene.player.x[0]/(TS*TL))];
	
	//console.log(scene.player.x, layer.x+TS*TL);
	if(scene.player.x+TS > playerIn.x+TS*TL)
	{
		var bl;
		var nextLayer = MAP[parseInt(scene.player.y/(TS*TL))][parseInt((scene.player.x+TS)/(TS*TL))];
		console.log("Player Move Right: " + getNameOfLayer(playerIn) + " to " + getNameOfLayer(nextLayer));
		bl = checkCanMove(getNameOfLayer(playerIn), getNameOfLayer(nextLayer));
		console.log(bl);
		if(bl)
		{
			scene.player.setX(nextLayer.x);
			playerIn = nextLayer;
		}
		else
			scene.player.setX(playerIn.x+TS*TL-TS);
		
	}
	else if(scene.player.x < playerIn.x)
	{
		var bl;
		var nextLayer = MAP[parseInt(scene.player.y/(TS*TL))][parseInt(scene.player.x/(TS*TL))];
		console.log("Player Move Left: " + getNameOfLayer(playerIn) + " to " + getNameOfLayer(nextLayer));
		bl = checkCanMove(getNameOfLayer(nextLayer), getNameOfLayer(playerIn));
		console.log(bl);
		if(bl)
		{
			scene.player.setX(nextLayer.x+TS*TL-TS);
			playerIn = nextLayer;
		}
		else
			scene.player.setX(playerIn.x);
	}
}

function playerJumping(player)
{
	isOnGround = false;
	player.setVelocityY(-500);
}

