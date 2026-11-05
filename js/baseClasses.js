class MonoBehaivour {
	static #profiles = new Map()
	static #nextId = 1
	
	#components = new WeakMap()

	constructor() {
		this.id = MonoBehaivour.#nextId++
		MonoBehaivour.#profiles.set(this.id, this)

		this.addComponent(new Transform())
	}

	destroy() {
		MonoBehaivour.#profiles.delete(this.id)
	}

	// eu queria que métodos abstract existissem aqui

	update() {
		
	}

	start() {
		
	}

	addComponent(component) {
		component.parent = this

		this.#components.set(component.constructor, component)
	}

	/**
	 * @template T
	 * @param {new (...args: any[]) => T} componentClass - A classe do componente (ex: Physics)
	 * @returns {T | null} - O VS Code infere que o retorno é exatamente o tipo T!
	 */
	getComponent(componentClass) {
		return this.#components.get(componentClass) || null
	}

	static updateAll() {
		for (const obj of MonoBehaivour.#profiles.values()) {
			obj.update()
		}
	}

	static startAll() {
		for (const obj of MonoBehaivour.#profiles.values()) {
			obj.start()
		}
	}
}

class Time {
	static #deltaTime
	static get deltaTime() {
		// também não existe {get; private set;}, e eu quero preservar o encapsulamento.
		return Time.#deltaTime
	}

	static #time
	static get time() {
		return Time.#time
	}

	static update() {
		const currentTime = performance.now()
		Time.#deltaTime = (currentTime - Time.time)
		Time.#time = currentTime
	}
}

// eu queria que existissem structs
class Vector2 {
	#x
	#y

	get x() {
		return this.#x
	}

	get y() {
		return this.#y
	}

	constructor(x, y) {
		this.#x = x
		this.#y = y
	}

	add(other) {
		return new Vector2(this.x + other.x, this.y + other.y)
	}

	subtract(other) {
		return new Vector2(this.x - other.x, this.y - other.y)
	}

	multiply(other) {
		return new Vector2(this.x * other.x, this.y * other.y)
	}

	scale(scalar) {
		return new Vector2(this.x * scalar, this.y * scalar)
	}
}

class Component {
	parent

	constructor(parent) {
		this.parent = parent
	}
}