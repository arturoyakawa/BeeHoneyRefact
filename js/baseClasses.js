class MonoBehaivour {
	static #profiles = new Map()
	static #nextId = 1
	static #toDestroy = new Set() // fila pra destruir no fim do frame
	
	#components = new Map()

	transform = new Transform()

	constructor() {
		this.id = MonoBehaivour.#nextId++
		MonoBehaivour.#profiles.set(this.id, this)

		this.addComponent(this.transform)
	}

	destroy() {
		MonoBehaivour.#toDestroy.add(this)
	}

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
	 * @param {new (...args: any[]) => T} componentClass
	 * @returns {T | null} 
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

	static destroyPending() {
		for (const obj of MonoBehaivour.#toDestroy) {
			MonoBehaivour.#profiles.delete(obj.id)

			for (const component of obj.#components.values()) {
				component.destroy()
			}
		
			obj.#components.clear()
		}
		MonoBehaivour.#toDestroy.clear()
	}
}

class Time {
	static #deltaTime
	static get deltaTime() {
		return Time.#deltaTime
	}

	static #time = performance.now() / 1000
	static get time() {
		return this.#time
	}

	static update() {
		const currentTime = performance.now() / 1000
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
		this.#x += other.x;
		this.#y += other.y;
		return this;
	}

	scale(scalar) {
		this.#x *= scalar;
		this.#y *= scalar;
		return this;
	}

	copy() {
		return new Vector2(this.#x, this.#y);
	}
}

class Input {
	static #keys = new Map();

	static init() {
		window.addEventListener("keydown", (event) => {
			Input.#keys.set(event.code, true);
		});

		window.addEventListener("keyup", (event) => {
			Input.#keys.set(event.code, false);
		});
	}

	/**
	 * @param {string} keyCode)
	 * @returns {boolean}
	 */
	static isKeyDown(keyCode) {
		return Input.#keys.get(keyCode) === true;
	}
}