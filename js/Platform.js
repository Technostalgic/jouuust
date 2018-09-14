///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

class Platform{
	constructor(box){
		this.hitbox = box;
		
	}
	
	draw(){
		this.hitbox.drawFill("#0F0");
	}
	
	static createPlatforms(){
		var r = [];
		
		var ground = new Platform(
			box.fromSides(0, nativeResolution.y - 12, nativeResolution.x, nativeResolution.y)
		);
		
		r.push(ground);
		return r;
	}
}