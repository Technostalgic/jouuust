///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

class Platform{
	constructor(box){
		this.hitbox = box;
		this.texture = null;
	}
	
	generateTexture(isGround = false){
		var tex = document.createElement("canvas");
		tex.width = this.hitbox.width;
		tex.height = this.hitbox.height;
		var ctx = tex.getContext("2d");
		
		var syOff = isGround ? 12 : 0;
		ctx.drawImage(gfx.platforms, 
			0, syOff, 31, 12, 
			0, 0, 31, 12 );
		ctx.drawImage(gfx.platforms,
			gfx.platforms.width - 31, syOff, 31, 12,
			this.hitbox.width - 31, 0, 31, 12 );
			
		var nx = 31
		for(var nx = 31; nx < this.hitbox.width - 31; nx += 31){
			var width = Math.min(31, this.hitbox.width - 31 - nx);
			var sxOff = 31 + Math.random() * (gfx.platforms.width - 93);
			
		ctx.drawImage(gfx.platforms, 
			sxOff, syOff, width, 12, 
			nx, 0, width, 12 );
		}
			
		this.texture = tex;
	}
	
	draw(){
		if(!this.texture)
			this.hitbox.drawFill("#0F0");
		else 
			renderContext.drawImage(this.texture, this.hitbox.left, this.hitbox.top);
	}
	
	static createPlatforms(){
		var r = [];
		
		var ground = new Platform(
			box.fromSides(-24, nativeResolution.y - 12, nativeResolution.x + 24, nativeResolution.y)
		);
		ground.generateTexture(true);

		var leftPlat = new Platform(
			box.fromSides(-24, 150, 100, 172)
		);
		var rightPlat = new Platform(
			box.fromSides(nativeResolution.x - 100, 150, nativeResolution.x + 24, 172)
		);
		var centerPlat= new Platform(
			box.fromSides(75, 75, nativeResolution.x - 75, 97)
		);
		centerPlat.generateTexture();
		leftPlat.generateTexture();
		rightPlat.generateTexture();
		
		r.push(ground);
		r.push(leftPlat);
		r.push(rightPlat);
		r.push(centerPlat);

		return r;
	}
}