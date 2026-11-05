class Component {
	parent

	constructor(parent) {
		this.parent = parent
	}

	destroy() {
		this.parent = null
	}
}

class SpriteRenderer extends Component {
	constructor() {
		super()
		console.log("i exist now")
	}
}

class BodyMover extends Component {

}

class Transform extends Component {
	position = new Vector2(0, 0)

	constructor() {
		super()
	}
}