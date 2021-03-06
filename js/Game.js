///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

var p1;
var p2;
var platforms;

var scaleCanvas;
var scaleContext;
var renderCanvas;
var renderContext;

var currentTime = 0;

var nativeResolution = new vec2(320, 240);

var gfx = {
	birds: new Image(),
	platforms: new Image()
};

function GameIsLoaded(){
	return (
		gfx.birds.complete &&
		gfx.platforms.complete
	);
}

function LoadGame(){
	renderCanvas = document.createElement("canvas");
	renderCanvas.width = nativeResolution.x;
	renderCanvas.height = nativeResolution.y;
	renderContext = renderCanvas.getContext("2d");
	
	scaleCanvas = document.createElement("canvas");
	scaleCanvas.width = nativeResolution.x * 2;
	scaleCanvas.height = nativeResolution.y * 2;
	scaleContext = scaleCanvas.getContext("2d");
	
	document.body.appendChild(scaleCanvas);
	
	// makes the graphics look pixely instead of blurry
	renderContext.imageSmoothingEnabled = false;
	scaleContext.imageSmoothingEnabled = false;
	
	gfx.birds.src = "./gfx/birds.png";
	gfx.platforms.src = "./gfx/platforms.png";
	
	ContinueLoadingGame();
}
function ContinueLoadingGame(){
	if(!GameIsLoaded()){
		setTimeout(ContinueLoadingGame);
		return;
	}
	StartGame();
	Step();
}

function StartGame(){
	platforms = Platform.createPlatforms();
	
	p1 = new Bird(0, new vec2(50, 10));
	p2 = new Bird(1, new vec2(nativeResolution.x - 50, 10));
	p2.isFlipped = true;
}

function Step(){
	var dt = performance.now() - currentTime;
	currentTime = performance.now();
	
	dt /= 1000;
	Update(dt);
	Render();
	
	requestAnimationFrame(Step);
}

function Update(dt){
	p1.update(dt);
	p2.update(dt);

	p1.checkBirdCollision(p2);
	p2.checkBirdCollision(p1);
}

function Render(){
	renderContext.fillStyle = "#000";
	renderContext.fillRect(0, 0, nativeResolution.x, nativeResolution.y);
	
	p1.draw();
	p2.draw();
	
	for(var platform of platforms)
		platform.draw();
	
	scaleContext.drawImage(renderCanvas, 0, 0, scaleCanvas.width, scaleCanvas.height);
}