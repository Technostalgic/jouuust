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
		this.speed = 100;
		this.controlScheme = 
			this.team == 0 ? 
				ControlScheme.getPlayer1Scheme() : 
				ControlScheme.getPlayer2Scheme() ;
		
		this.frame = 0;
		this.isFlipped = false;
	}
	
	getSprite(){
		var yOff = this.team == 1 ? 16 : 0;
		if(!this.alive) yOff = 32;
		var xOff = this.frame * 16;
		
		var dbox = new box(new vec2(0, 0), new vec2(16));
		dbox.setCenterAt(this.pos);
		dbox.pos.y += 5;
		
		var r = new sprite(
			gfx.birds,
			new box(new vec2(xOff, yOff), new vec2(16)),
			dbox
		);
		
		return r;
	}
	
	checkPlatformCollisions(){
		for(var platform of platforms){
			var hit = box.getIntersect(this.hitbox, platform.hitbox);
			if(!hit) continue;
			
			switch(box.decideCollisionSide(hit)){
				case 0: this.hitSolid_right(platform.hitbox); break;
				case 1: this.hitSolid_left(platfrom.hitbox); break;
				case 2: this.hitSolid_bottom(platform.hitbox); break;
				case 3: this.hitSolid_top(platform.hitbox); break;
			}
		}
	}
	checkBirdCollision(otherBird){
		
	}

	hitSolid_left(solidBox){
		this.vel.x = Math.max(0, this.vel.x);
	}
	hitSolid_right(solidBox){
		this.vel.x = Math.min(0, this.vel.x);
	}
	hitSolid_bottom(solidBox){
		this.vel.y = Math.min(0, this.vel.y);
	}
	hitSolid_top(solidBox){
		this.vel.y = Math.max(0, this.vel.y);
		var dif = this.hitbox.bottom - solidBox.top;

		this.pos.y -= dif;
	}
	
	control(dt){
		if(Input.isLeftPressed(this.controlScheme))
			this.control_moveLeft(dt);
		if(Input.isRightPressed(this.controlScheme))
			this.control_moveRight(dt);
		if(Input.isUpPressed(this.controlScheme))
			this.control_jump(dt);
	}
	control_moveLeft(dt){
		this.vel.x -= dt * this.speed;
	}
	control_moveRight(dt){
		this.vel.x += dt * this.speed;
	}
	control_jump(dt){
		this.vel.y -= 1;
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

		this.control(dt);
		
		if(this.vel.x < 0)
			this.isFlipped = false;
		else if(this.vel.x > 0)
			this.isFlipped = true;	

		this.checkPlatformCollisions();
	}
	
	draw(){
		var sprt = this.getSprite();
		sprt.isFlipped = this.isFlipped;
		
		sprt.draw();
	}
}