class MonoBehaivour {
	static #profiles = new Map()
	static #nextId = 1

	constructor() {
		this.id = MonoBehaivour.#nextId++
		MonoBehaivour.#profiles.set(this.id, this)
	}

	destroy() {
		MonoBehaivour.#profiles.delete(this.id)
	}

	update() {
		console.log("update erap ra ser abstrato, mas não existe abstrato no js, então eu vou reclamar no console")
	}

	static updateAll() {
		for (const obj of MonoBehaivour.#profiles.values()) {
			obj.update()
		}
	}
}

class Time {
	static #deltaTime = 0
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
		Time.#time = currentTime
		Time.#deltaTime = (currentTime - Time.deltaTime)
	}
}