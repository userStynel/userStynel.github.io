---
layout: article
title:  "pharser-continuity"
date:   2021-08-25 00:20:09 +0900
categories: pharser-continuity
tech: [javascript]
---
<hr>
![player](/IMGS/pharser-continuity/player.gif)
[게임하러 가기](/GAME/parser-continuity)
<hr>
저는 군대에서 웹 게임 개발에 대해 관심을 가지기 시작했습니다, 많은 제약이 따르는 사지방 환경 아래서 알고리즘 문제 풀이를 제외하고는 가장 최선의 자기계발이었으니까요. 처음엔 캔버스가 뭔지도 몰라서 이미지 태그를 움직이는 방식으로 만들었지만 웹 게임 엔진에 대해 구글링을 하던 중 [phaser3](https://phaser.io/phaser3){:target="_blank"}라는 자바스크립트 라이브러리를 알게 되었고, 이를 이용해 어렸을때 플레이 해 보고 감탄했던 플래시게임인 [컨티뉴티](https://www.youtube.com/watch?v=hNtBshyWBgc){:target="_blank"}를 html5 버전으로 만들어 보았습니다.

![player](/IMGS/pharser-continuity/player.gif) ![key](/IMGS/pharser-continuity/key.png)

먼저 간단하게, 무료 웹 픽셀 에디터인 [piskel](https://www.piskelapp.com/){:target="_blank"}을 이용해서 간단하게 플레이어와 열쇠를 그려보았습니다

게임 구현의 가장 핵심 부분인 퍼즐 모드에서 방향키를 누르면 빈칸으로 퍼즐이 움직이는 동작에 관한 코드는 아래와 같습니다
<details>
  <summary>코드: 퍼즐모드에서의 맵 이동</summary>
{% highlight javascript %}
if(this.cursors.left.isDown)
{
	if(blank_pos[0]>0)
	{
		var layer = takeAPanorama(MAP[blank_pos[1]][blank_pos[0]-1], this);
		var temp;
		if(playerInLayer(this.player, layer))
			this.player.setPosition(this.player.x+32*8, this.player.y);
		layer.setPosition(32*8*blank_pos[0], 32*8*blank_pos[1]);
		temp = MAP[blank_pos[1]][blank_pos[0]];
		MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]][blank_pos[0]-1];
		MAP[blank_pos[1]][blank_pos[0]-1] = temp;
		blank_pos[0]--;
	}
}
else if(this.cursors.right.isDown)
{
	if(blank_pos[0]<LENGTH-1)
	{
		var layer = takeAPanorama(MAP[blank_pos[1]][blank_pos[0]+1], this);
		var temp;
		if(playerInLayer(this.player, layer))
			this.player.setPosition(this.player.x-32*8, this.player.y);
		layer.setPosition(32*8*blank_pos[0], 32*8*blank_pos[1]);
		temp = MAP[blank_pos[1]][blank_pos[0]];
		MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]][blank_pos[0]+1];
		MAP[blank_pos[1]][blank_pos[0]+1] = temp;
		blank_pos[0]++;
	}
}
else if(this.cursors.up.isDown)
{
	if(blank_pos[1]>0)
	{
		var layer = takeAPanorama(MAP[blank_pos[1]-1][blank_pos[0]], this);
		var temp;
		if(playerInLayer(this.player, layer))
			this.player.setPosition(this.player.x, this.player.y+32*8);
		layer.setPosition(32*8*blank_pos[0], 32*8*blank_pos[1]);
		temp = MAP[blank_pos[1]][blank_pos[0]];
		MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]-1][blank_pos[0]];
		MAP[blank_pos[1]-1][blank_pos[0]] = temp;
		blank_pos[1]--;
	}
}
else if(this.cursors.down.isDown)
{
	if(blank_pos[1]<LENGTH-1)
	{
		var layer = takeAPanorama(MAP[blank_pos[1]+1][blank_pos[0]], this);
		var temp;
		if(playerInLayer(this.player, layer))
			this.player.setPosition(this.player.x, this.player.y-32*8);
		layer.setPosition(32*8*blank_pos[0], 32*8*blank_pos[1]);
		temp = MAP[blank_pos[1]][blank_pos[0]];
		MAP[blank_pos[1]][blank_pos[0]] = MAP[blank_pos[1]+1][blank_pos[0]];
		MAP[blank_pos[1]+1][blank_pos[0]] = temp;
		blank_pos[1]++;
	}
}
{% endhighlight %}
</details>

