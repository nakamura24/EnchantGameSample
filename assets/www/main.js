enchant();

//マップの画像
var mapData = [
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 4],
               [4, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
               [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4]
               ];
//マップの障害物
var mapCollisionData = [
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                        ];

//マップサイズ
var mapWidth	= 12;
var mapHeight	= 12;
//柱の数
var maxPillar = 20;
//お宝の数
var maxTreasure = 5;

var setPillar = function(pillar){
	if(pillar == 0) return;
	for(var i=0;i<pillar;){
		x = rand(mapWidth-2) + 1;
		y = rand(mapHeight-2) + 1;
		if(mapCollisionData[x][y] == 0){
			mapCollisionData[x][y] = 1;
			mapData[x][y] = 4;
			i++;
		}
	}
	pillar = checkPillar();
	setPillar(pillar);
}

var checkPillar = function(){
	count = 0;
	for(i=1;i<mapWidth-1;i++){
		for(j=1;j<mapHeight-1;j++){
			if(mapCollisionData[x-1][y] != 0 &&
					mapCollisionData[x+1][y] != 0 &&
					mapCollisionData[x][y-1] != 0 &&
					mapCollisionData[x][y+1] != 0){
				if(x+1<mapWidth-1) {
					mapCollisionData[x+1][y] = 0;
					mapData[x+1][y] = 5;
					count++;
				} else if(y+1<mapHeight-1) {
					mapCollisionData[x][y+1] = 0;
					mapData[x][y+1] = 5;
					count++;
				}
			}
		}
	}
	if(mapCollisionData[1][1] != 0){
		mapCollisionData[1][1] = 0;
		mapData[1][1] = 5;
		count++;
	}
	if(mapCollisionData[2][1] != 0){
		mapCollisionData[2][1] = 0;
		mapData[2][1] = 5;
		count++;
	}
	if(mapCollisionData[1][2] != 0){
		mapCollisionData[1][2] = 0;
		mapData[1][2] = 5;
		count++;
	}
	if(mapCollisionData[mapWidth-2][mapHeight-2] != 0){
		mapCollisionData[mapWidth-2][mapHeight-2] = 0;
		mapData[mapWidth-2][mapHeight-2] = 5;
		count++;
	}
	if(mapCollisionData[mapWidth-3][mapHeight-2] != 0){
		mapCollisionData[mapWidth-3][mapHeight-2] = 0;
		mapData[mapWidth-3][mapHeight-2] = 5;
		count++;
	}
	if(mapCollisionData[mapWidth-2][mapHeight-3] != 0){
		mapCollisionData[mapWidth-2][mapHeight-3] = 0;
		mapData[mapWidth-2][mapHeight-3] = 5;
		count++;
	}
	return count;
}

window.onload = function() {
	var core = new Core(192, 192);
	core.fps = 12;
	core.preload('images/chara0.png', 'images/map0.png', 
			'images/clear.png', 'images/gameover.png');
	core.onload = function() {
		// マップを生成して、rootSceneに配置
		setPillar(maxPillar);
		var map = new Map(16, 16);
		map.image = core.assets['images/map0.png'];
		map.loadData(mapData);
		map.collisionData = mapCollisionData;
		core.rootScene.addChild(map);

		// プレイヤーのSpriteサブクラス
		var Player = Class.create(Sprite, {
			initialize: function(type) {
				Sprite.call(this, 32, 32);
				this.image = core.assets['images/chara0.png']; 
				this.x = 8;
				this.frame = type * 3;
				// キーイベント
				this.addEventListener('enterframe', function() {
					if(core.input.left) {
						if(map.hitTest(this.x - 16 + 8, this.y + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 9 + type * 3;
							this.x -= 16;
						}
					}
					if(core.input.right) {
						if(map.hitTest(this.x + 16 + 8, this.y + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 18 + type * 3;
							this.x += 16;
						}
					}
					if(core.input.up) {
						if(map.hitTest(this.x + 8, this.y - 16 + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 27 + type * 3;
							this.y -= 16;
						}
					}
					if(core.input.down) {
						if(map.hitTest(this.x + 8, this.y + 16 + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += type * 3;
							this.y += 16;
						}
					}
				});
				// フリックイベント
				var x=0;
				var y=0;
				this.addEventListener('touchstart', function(e) {
					x=e.x;
					y=e.y;
				});
				this.addEventListener('touchend', function(e) {
					if(x - e.x > 8){
						if(map.hitTest(this.x - 16 + 8, this.y + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 9 + type * 3;
							this.x -= 16;
						}
						return;
					}
					if(x - e.x < -8){
						if(map.hitTest(this.x + 16 + 8, this.y + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 18 + type * 3;
							this.x += 16;
						}
						return;
					}
					if(y - e.y > 8){
						if(map.hitTest(this.x + 8, this.y - 16 + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += 27 + type * 3;
							this.y -= 16;
						}
						return;
					}
					if(y - e.y < -8){
						if(map.hitTest(this.x + 8, this.y + 16 + 24) == false) {
							this.frame++;
							this.frame %=3;
							this.frame += type * 3;
							this.y += 16;
						}
						return;
					}
				});
			}
		});
		// お宝のSpriteサブクラス
		var Treasure = Class.create(Sprite, {
			initialize: function() {
				Sprite.call(this, 16, 16);
				this.image = core.assets['images/map0.png']; 
				this.frame = 25;
				this.opacity = 0;
				this.x = rand(mapWidth) * 16;
				this.y = rand(mapHeight) * 16 - 1;
				// 障害物がない所に置く
				while(map.hitTest(this.x, this.y) == true) {
					this.x = rand(mapWidth) * 16;
					this.y = rand(mapHeight) * 16;
				}
			}
		});

		// オブジェクトを生成して、rootSceneに配置
		var treasures = [];
		for(var i=0;i < maxTreasure;i++){
			treasures[i] = new Treasure();
			core.rootScene.addChild(treasures[i]);
		}
		//var male = new Player(0);
		var famale = new Player(2);
		core.rootScene.addChild(famale);


		// オブジェクトが衝突したかのチェック
		core.rootScene.addEventListener('enterframe', function() {
			for(var i=0;i < maxTreasure;i++){
				if(famale.within(treasures[i], 9)){
					treasures[i].opacity = 1;
				}
			}
		});
	};
	core.start();
};

function rand(n){
	return Math.floor(Math.random() * n);
}
