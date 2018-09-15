///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

class vec2{
	constructor(x = 0, y = x){
		this.x = x;
		this.y = y;
	}
	
	plus(vec){
		return new vec2(this.x + vec.x, this.y + vec.y);
	}
	times(multiplier){
		return new vec2(this.x * multiplier, this.y * multiplier);
	}
	
	distance(vec = new vec2()){
		return Math.sqrt(Math.pow(this.x - vec.x, 2) + Math.pow(this.y - vec.y, 2));
	}
	
	inverted(){
		return this.times(-1);
	}
	clone(){
		return new vec2(this.x, this.y);
	}
}

class box{
	constructor(pos = new vec2(), size = new vec2()){
		this.pos = pos;
		this.size = size;
	}
	
	static fromSides(left, top, right, bottom){
		var r = new box();
		
		r.pos = new vec2(left, top);
		r.size = new vec2(right - left, bottom - top);
		
		return r;
	}
	
	get left(){
		return this.pos.x;
	}
	get right(){
		return this.pos.x + this.size.x;
	}
	get top(){
		return this.pos.y;
	}
	get bottom(){
		return this.pos.y + this.size.y;
	}
	
	get width(){
		return this.size.x;
	}
	get height(){
		return this.size.y;
	}
	
	getCenter(){
		return this.pos.plus(this.size.times(0.5));
	}

	setCenterAt(pos){
		this.pos = pos.plus(this.size.times(-0.5));
	}
	isOverlapping(boxB){
		return (
			this.left <= boxB.right &&
			this.right >= boxB.left &&
			this.bottom >= boxB.top &&
			this.top <= boxB.bottom 
		);
	}
	
	drawFill(color = "#FFF"){
		renderContext.fillStyle = color;
		renderContext.fillRect(this.left, this.top, this.width, this.height);
	}
	
	static getIntersect(boxA, boxB){
		if(!boxA.isOverlapping(boxB))
			return null;
		
		var minLeft = Math.min(boxA.left, boxB.left);
		var maxRight = Math.max(boxA.right, boxB.right);
		var minTop = Math.min(boxA.top, boxB.top);
		var maxBottom = Math.max(boxA.bottom, boxB.bottom);
		
		return box.fromSides(minLeft, maxRight, minTop, maxBottom);
	}
	static decideCollisionSide(intersectBox, boxCollision){
		return 3;
	}
}

class sprite{
	constructor(spriteSheet, spriteBox, destinationBox){
		this.spriteSheet = spriteSheet;
		this.spriteBox = spriteBox;
		this.destinationBox = destinationBox;
		this.isFlipped = false;
	}
	
	draw(){
		var tpos = new vec2(this.destinationBox.left, this.destinationBox.top);
		var tscale = new vec2(1);
		if(this.isFlipped) {
			tpos.x += this.destinationBox.width;
			tscale.x = -1;
		}
		
		renderContext.translate(tpos.x, tpos.y);
		renderContext.scale(tscale.x, tscale.y);
		
		renderContext.drawImage(
			this.spriteSheet,
			this.spriteBox.left, this.spriteBox.top,
			this.spriteBox.size.x, this.spriteBox.size.y,
			0, 0,
			this.destinationBox.size.x, this.destinationBox.size.y
		);
			
		renderContext.scale(tscale.x, tscale.y);
		renderContext.translate(-tpos.x, -tpos.y);
	}
}