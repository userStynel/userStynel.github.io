class LEVEL1 extends Phaser.Scene
{
	constructor()
	{
		super('level1');
	}
	preload()
	{
		loading(this, 1);
	}
	create()
	{
		creating(this);
	}		
	update()
	{
		if(spacePressed != 0)
			spacePressed = (spacePressed+1)%25;
		if(this.cursors.space.isDown && spacePressed == 0)
		{
			var modeTeller = document.getElementById("modeteller");
			isPlayMode = !isPlayMode;
			if(isPlayMode)
				modeTeller.textContent = "--플레이모드";
			else{
				this.player.setVelocityX(0);
				this.player.anims.play('idle-right', true);
				modeTeller.textContent = "--퍼즐모드";
			}
			spacePressed++;
		}
				
		if(isPlayMode)
		{
			if(this.cursors.left.isDown)
			{
				isIdle = false;
				nowDirection = LEFT;
				this.player.setVelocityX(-50);
				this.player.anims.play('walking-left', true);
			}
			else if(this.cursors.right.isDown)
			{
				isIdle = false;
				nowDirection = RIGHT;
				this.player.setVelocityX(50);
				this.player.anims.play('walking-right', true);
			}
			else
			{
				if(this.player.body.blocked.down)
					this.player.setVelocity(0,0);
				if(!isIdle)
				{
					isIdle = true;
					this.player.anims.play('idle'+directionSuffix[nowDirection]);
				}
			}
			if(this.cursors.up.isDown && this.player.body.blocked.down)
			{
				this.player.setVelocityY(-300);
			}
			checkPlayerMoveLayer(this);
			if(checkPlayerCollideKey(this.player))
			{
				playerTotalKey++;
			}
			console.log("Door: ", checkPlayerCollideDoor(this.player, doorTile));
			console.log("Key: ", playerTotalKey);
			/*if(checkLevelUp(this))
				levelUp();*/
		}
		else
		{
			if(this.cursors.right.isDown)
			{
				if(blank_pos[0]>0)
				{
					var layer = MAP[blank_pos[1]][blank_pos[0]-1];
					var temp;
					if(playerInLayer(this.player, layer))
						this.player.setPosition(this.player.x+TS*TL, this.player.y);
					layer.setPosition(TS*TL*blank_pos[0], TS*TL*blank_pos[1]);
					temp = MAP[blank_pos[1]][blank_pos[0]];
					MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]][blank_pos[0]-1];
					MAP[blank_pos[1]][blank_pos[0]-1] = temp;
					blank_pos[0]--;
				}
			}
			else if(this.cursors.left.isDown)
			{
				if(blank_pos[0]<MapSquare-1)
				{
					var layer = MAP[blank_pos[1]][blank_pos[0]+1];
					var temp;
					if(playerInLayer(this.player, layer))
						this.player.setPosition(this.player.x-TS*TL, this.player.y);
						layer.setPosition(TS*TL*blank_pos[0], TS*TL*blank_pos[1]);
					temp = MAP[blank_pos[1]][blank_pos[0]];
					MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]][blank_pos[0]+1];
					MAP[blank_pos[1]][blank_pos[0]+1] = temp;
					blank_pos[0]++;
				}
			}
			else if(this.cursors.down.isDown)
			{
				if(blank_pos[1]>0)
				{
					var layer = MAP[blank_pos[1]-1][blank_pos[0]];
					var temp;
					if(playerInLayer(this.player, layer))
						this.player.setPosition(this.player.x, this.player.y+TS*TL);
					layer.setPosition(TS*TL*blank_pos[0], TS*TL*blank_pos[1]);
					temp = MAP[blank_pos[1]][blank_pos[0]];
					MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]-1][blank_pos[0]];
					MAP[blank_pos[1]-1][blank_pos[0]] = temp;
					blank_pos[1]--;
				}
			}
			else if(this.cursors.up.isDown)
			{
				if(blank_pos[1]<MapSquare-1)
				{
					var layer = MAP[blank_pos[1]+1][blank_pos[0]];
					var temp;
					if(playerInLayer(this.player, layer))
						this.player.setPosition(this.player.x, this.player.y-TS*TL);
					layer.setPosition(TS*TL*blank_pos[0], TS*TL*blank_pos[1]);
					temp = MAP[blank_pos[1]][blank_pos[0]];
					MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]+1][blank_pos[0]];
					MAP[blank_pos[1]+1][blank_pos[0]] = temp;
					blank_pos[1]++;
				}
			}
		}
	}
}