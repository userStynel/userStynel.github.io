---
layout: article
title:  "HTML5-RAYCASTER #1"
date:   2021-08-24 19:04:08 +0900
categories: html5-raycaster
tech: [node.js, socket.io, javascript]
---
{% highlight javascript %}
class Vector2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    add(b){ // 두 벡터를 더한 벡터를 반환합니다
        return new Vector2(this.x + b.x, this.y + b.y);
    }
    sub(b){ // 두 벡터를 뺀 벡터를 반환합니다
        return new Vector2(this.x - b.x, this.y - b.y);
    }
    mul(s){
        return new Vector2(s*this.x, s*this.y);
    }
    mag(){ // 벡터의 크기를 반환합니다
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }
    rotate(rad){ // rad 만큼 회전한 벡터를 반환합니다
        return new Vector2(this.x * Math.cos(rad) - this.y * Math.sin(rad), this.x * Math.sin(rad) + this.y * Math.cos(rad));
    }
    dir(){ // 방향벡터를 반환합니다
        return new Vector2(this.x / this.mag(), this.y / this.mag());
    }
}
{% endhighlight %}