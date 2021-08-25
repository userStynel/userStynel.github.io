function checkInSquare(x, y)
{
	if(x>=0 && x<LENGTH && y>=0 && y<LENGTH)
		return true;
	else
		return false;
}

function swaping(ax, ay, bx, by)
{
	var temp;
	temp = MAP[ay][ax];
	MAP[ay][ax] = MAP[by][bx];
	MAP[by][bx] = temp;
}

function switching_map(blank, direction)
{
	var targetX, targetY;
	switch(direction)
	{
			case UP:
				targetX = blank[0];
				targetY = blank[1]-1;
				if(checkInSquare(targetX, targetY))
					swaping(blank[0], blank[1], targetX, targetY);
			break;
			case DOWN:
				targetX = blank[0];
				targetY = blank[1]+1;
				if(checkInSquare(targetX, targetY))
					swaping(blank[0], blank[1], targetX, targetY);
			break;
			case LEFT:
				targetX = blank[0]-1;
				targetY = blank[1];
				if(checkInSquare(targetX, targetY))
					swaping(blank[0], blank[1], targetX, targetY);
			break;
			case RIGHT:
				targetX = blank[0]+1;
				targetY = blank[1];
				if(checkInSquare(targetX, targetY))
					swaping(blank[0], blank[1], targetX, targetY);
			break;
	}
}

function levelUp(sceneManager)
{
	nowLevel++;
	sceneManager.scene.start('level'+nowLevel.toString());
}
/*
if(checkLevelUp(this))
				levelUp();
var cell;
for(var i = 0; i<LENGTH; i++)
{
	for(var j = 0; j<LENGTH; j++)
	{
		cell = document.getElementById('img-'+j.toString()+'-'+i.toString());
		cell.src = './images/TILES/'+MAP[i][j]+'.png';
	}
}
*/

