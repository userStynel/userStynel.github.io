function loading(scene, level)
{
	scene.load.spritesheet('player', './images/player.png', {frameWidth: 32, frameHeight: 32});
	scene.load.spritesheet('key', './images/key.png', {frameWidth: 20, frameHeight: 8});
	scene.load.image('tileset', './images/TILES/tileset.png');
	scene.load.tilemapTiledJSON('map', './images/TILES/LEVEL'+level.toString()+'.json');
}

function creating(scene)
{
	scene.player = scene.physics.add.sprite(42, 42, 'player');
	scene.player.setOrigin(0, 0);
				
	scene.key = scene.add.sprite(5, 10, 'key');
	scene.key.setOrigin(0, 0);
	scene.key = scene.add.sprite(30, 10, 'key');
	scene.key.setOrigin(0, 0);
	scene.key = scene.add.sprite(55, 10, 'key');
	scene.key.setOrigin(0, 0);
		
	scene.map = scene.make.tilemap({key:'map'});
	scene.tiles = scene.map.addTilesetImage("tileset");
				
	for(var i = 0; i < MapSquare; i++)
	{
		MAP[i] = [];
		for(var j = 0; j < MapSquare; j++)
		{
			if(i == MapSquare-1 && j == MapSquare -1)
			{
				MAP[i][j] = ' ';
			}
			else
			{
				var layerName = level_design[nowLevel-1][i*MapSquare+j];
				MAP[i][j] = scene.map.createDynamicLayer(layerName, scene.tiles, TS*TL*j, TS*TL*i);
				MAP[i][j].setCollisionByProperty({ collide: true });
				findDoorAndKey(MAP[i][j]);
				scene.physics.add.collider(scene.player, MAP[i][j]);
			}
		}
	}
				
	playerIn = MAP[0][0];
				
	scene.cursors = scene.input.keyboard.createCursorKeys();
	scene.anims.create({
		key: 'idle-right',
		frames: scene.anims.generateFrameNumbers('player', {start: 0, end: 1}),
		frameRate: 5,
		repeat: -1
		});
	scene.anims.create({
		key: 'idle-left',
		frames: scene.anims.generateFrameNumbers('player', {start: 2, end: 3}),
		frameRate: 5,
		repeat: -1
		});
	scene.anims.create({
		key: 'walking-right',
		frames: scene.anims.generateFrameNumbers('player', {start: 4, end: 5}),
		frameRate: 5,
		repeat: -1
		});
	scene.anims.create({
		key: 'walking-left',
		frames: scene.anims.generateFrameNumbers('player', {start: 6, end: 7}),
		frameRate: 5,
		repeat: -1
		});
		
	scene.player.anims.play('idle'+directionSuffix[nowDirection]);
}