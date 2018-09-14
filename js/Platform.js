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
		this.hitbox.drawFill("#FFF");
	}
	
	static createPlatforms(){
		var r = [];
		
		var ground = new platform(
			box.fromSides(0, nativeResolution.y - 12, nativeResolution.x, 12);
		);
		
		r.push(ground);
		return r;
	}
}