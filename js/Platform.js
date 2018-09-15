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
			box.fromSides(-24, nativeResolution.y - 12, nativeResolution.x + 24, nativeResolution.y)
		);

		var leftPlat = new Platform(
			box.fromSides(-24, 100, 75, 112)
		);
		var rightPlat = new Platform(
			box.fromSides(nativeResolution.x - 75, 100, nativeResolution.x + 24, 112)
		);
		
		r.push(ground);
		r.push(leftPlat);
		r.push(rightPlat);

		return r;
	}
}