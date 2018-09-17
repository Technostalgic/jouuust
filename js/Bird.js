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
		this.updateHitbox();
		
		this.alive = true;
		this.speed = 100;
		
		this.team = team;
		this.controlScheme = 
			this.team == 0 ?
				ControlScheme.getPlayer1Scheme() :
				ControlScheme.getPlayer2Scheme() ;
		
		this.onGround = false;
		this.isRunning = false;
		this.isFlapping = false;
		this.isFlipped = this.team != 0;
	}
	
	getFrameNumber(){
		if(this.onGround){
			if(Math.abs(this.vel.x) < 10)
				return 0;
			return Math.floor(currentTime / 100) % 2;
		}
		return this.isFlapping ? 3 : 2;
	}
	getSprite(){
		var yOff = this.team == 1 ? 16 : 0;
		if(!this.alive) yOff = 32;
		var xOff = this.getFrameNumber() * 16;
		
		var dbox = new box(new vec2(0, 0), new vec2(16));
		dbox.setCenterAt(this.pos);
		dbox.pos.y -= 3;
		
		var r = new sprite(
			gfx.birds,
			new box(new vec2(xOff, yOff), new vec2(16)),
			dbox
		);
		
		return r;
	}
	
	checkPlatformCollisions(){
		this.onGround = false;
		for(var platform of platforms){
			var hit = box.getIntersect(this.hitbox, platform.hitbox);
			if(!hit) continue;
			
			this.hit = hit;
			
			switch(box.decideCollisionSide(hit, platform.hitbox)){
				case 0: this.hitSolid_left(platform.hitbox); break;
				case 1: this.hitSolid_right(platform.hitbox); break;
				case 2: this.hitSolid_bottom(platform.hitbox); break;
				case 3: this.hitSolid_top(platform.hitbox); break;
			}
		}
	}
	checkBirdCollision(otherBird){
		if(!this.alive || !otherBird.alive) return;
		
		if(this.hitbox.isOverlapping(otherBird.hitbox))
			this.hitBird(otherBird);
	}

	hitSolid_left(solidBox){
		this.vel.x = Math.max(0, this.vel.x);
	}
	hitSolid_right(solidBox){
		this.vel.x = Math.min(0, this.vel.x);
	}
	hitSolid_bottom(solidBox){
		this.vel.y = Math.max(0, this.vel.y);
	}
	hitSolid_top(solidBox){
		this.vel.y = Math.min(0, this.vel.y);
		var dif = this.hitbox.bottom - solidBox.top;

		this.onGround = true;		
		this.pos.y -= dif;
	}
	
	hitBird(birdB){
		var lbird, rbird;
		var lvel, rvel;
		if(this.pos.x < birdB.pos.x){
			lbird = this;
			rbird = birdB;
		}
		else{
			lbird = birdB;
			rbird = this;
		}

		var hit = box.getIntersect(lbird.hitbox, rbird.hitbox);
		var dx = lbird.hitbox.right - rbird.hitbox.left;
		
		lbird.pos.x -= dx / 2 + 0.5;
		rbird.pos.x += dx / 2 + 0.5;

		var lvel = lbird.vel.x;
		var rvel = rbird.vel.x;
		lbird.vel.x = Math.min(lvel, rvel);
		rbird.vel.x = Math.max(lvel, rvel);

		lbird.updateHitbox();
		rbird.updateHitbox();
		
		var killThreshold = 1.5;
		var dif = this.pos.y - birdB.pos.y;
		if(dif < -killThreshold)
			birdB.die();
		else if(dif > killThreshold)
			this.die();
	}
	die(){
		this.alive = false;
	}

	control(dt){
		this.isRunning = false;
		if(Input.isLeftPressed(this.controlScheme))
			this.control_moveLeft(dt);
		if(Input.isRightPressed(this.controlScheme))
			this.control_moveRight(dt);

		if(Input.isUpPressed(this.controlScheme))
			this.control_flap(dt);
		else this.isFlapping = false;
	}
	control_moveLeft(dt){
		this.vel.x -= dt * this.speed;
		
		if(this.vel.x < 0){
			this.isRunning = true;
			this.isFlipped = true;
		}
	}
	control_moveRight(dt){
		this.vel.x += dt * this.speed;
		
		if(this.vel.x > 0){
			this.isRunning = true;
			this.isFlipped = false;
		}
	}
	control_flap(dt){
		if(this.isFlapping)
			return;
		this.isFlapping = true;

		this.vel.y -= 25;
	}
	
	handleWrapAround(){
		var leniency = 8;
		var leftbound = 0 - leniency;
		var rightbound = nativeResolution.x + leniency;

		if(this.pos.x < leftbound)
			this.pos.x = rightbound + (this.pos.x - leftbound);
		if(this.pos.x > rightbound){
			this.pos.x = leftbound + (this.pos.x - rightbound);
		}
	}
	updateHitbox(){
		this.hitbox.setCenterAt(this.pos);
	}

	handleGravity(dt){
		var gravity = 100;

		this.vel.y += dt * gravity;
		if(this.vel.y > 500){
			this.vel.y = 500;
		}
	}
	handleFriction(dt){
		var friction = 0.75;

		if(this.onGround)
			if(!this.isRunning)
				this.vel.x *= ((friction - 1) * (dt * 10)) + 1;
	}

	update(dt){
		var tvel = this.vel.times(dt);
		this.pos = this.pos.plus(tvel);

		this.handleWrapAround();
		this.updateHitbox();
		
		this.handleGravity(dt);
		this.handleFriction(dt);

		this.control(dt);

		this.checkPlatformCollisions();
	}
	
	draw(){
		var sprt = this.getSprite();
		sprt.isFlipped = this.isFlipped;
		
		sprt.draw();
	}
}