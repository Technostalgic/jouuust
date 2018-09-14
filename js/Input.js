///
///	code by Isaiah Smith
///	
///	https://technostalgic.tech	
///	twitter @technostalgicGM
///

class ControlScheme{
    constructor(left, right, up){
        this.left = left;
        this.right = right;
        this.up = up;
    }

    static getPlayer1Scheme(){
        return new ControlScheme(37, 39, 38);
    }
    static getPlayer2Scheme(){
        return new ControlScheme(65, 68, 87);
    }
}

class Input{
    static initialize(){
        Input.keysPressed = [];
    }

    static hookControlsToDocument(){
        Input.initialize();
        document.addEventListener("keydown", Input.listener_keydown);
        document.addEventListener("keyup", Input.listener_keyup);
    }
    static listener_keydown(e){
        //console.log(e.key + ": " + e.keyCode);
        Input.keysPressed[e.keyCode] = true;
    }
    static listener_keyup(e){
        Input.keysPressed[e.keyCode] = false;
    }
    static isKeyPressed(keycode){
        var pressed = Input.keysPressed[keycode];
        return !!pressed;
    }

    static isLeftPressed(controlScheme){
        return Input.isKeyPressed(controlScheme.left);
    }
    static isRightPressed(controlScheme){
        return Input.isKeyPressed(controlScheme.right);
    }
    static isUpPressed(controlScheme){
        return Input.isKeyPressed(controlScheme.up);
    }
}