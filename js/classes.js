class Bee extends MonoBehaivour {
	
	spriteRenderer = this.addComponent(new SpriteRenderer())

	constructor () {
		super()
	}

	update() {
		if (Input.isKeyDown("KeyD")) {
			console.log("go right!")
		}
	}
}

class Background extends MonoBehaivour {
	move(speed, limit, initialPos) {
		
	}
}