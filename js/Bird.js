///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

class Bird{
	constructor(team = 0, pos = new vec2()){
		this.pos = pos;
		this.vel = new vec2();
		this.hitbox = new box(new vec2(), new vec2(8, 10));
		this.alive = true;
		this.team = 0;
		
		this.frame = 0;
		this.isFlipped = false;
	}
	
	getSprite(){
		var yOff = this.team == 1 ? 16 : 0;
		if(!this.alive) yOff = 32;
		var xOff = this.frame * 16;
		
		var dbox = new box(new vec2(), new vec2(16));
		dbox.setCenterAt(this.pos);
		
		var r = new sprite(
			gfx.birds,
			new box(new vec2(xOff, yOff), new vec2(16)),
			dbox
		);
		
		return r;
	}
	
	checkPlatformCollisions(){
		for(var platform of platforms){
			throw new exception();
			if(this.hitbox.overlaps(platform.hitbox)){
				var hit = box.getIntersect();
			}
		}
	}
	checkBirdCollision(otherBird){
		
	}
	
	update(dt){
		var tvel = this.vel.times(dt);
		this.pos = this.pos.plus(tvel);
		this.hitbox.setCenterAt(this.pos);
		
		var gravity = 100;
		this.vel.y += dt * gravity;
		if(this.vel.y > 10){
			this.vel.y = 10;
		}
		
		if(this.vel.x < 0)
			this.isFlipped = true;
		else if(this.vel.x > 0)
			this.isFlipped = false;
	}
	
	draw(){
		var sprt = this.getSprite();
		sprt.isFlipped = this.isFlipped;
		
		sprt.draw();
	}
}