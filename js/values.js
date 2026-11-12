class Vector2
{
	#x = 0
	#y = 0

	static right = new Vector2(1,0)
	static up = new Vector2(0,1)

	get x()
	{
		return this.#x
	}

	set x(value)
	{
		throw new Error("Vector2 axis cannot be set")
	}

	set y(value)
	{
		throw new Error("Vector2 axis cannot be set")
	}

	get y()
	{
		return this.#y
	}

	constructor(x,y)
	{
		this.#x = x
		this.#y = y
	}

	add(other)
	{
		this.#x += other.x
		this.#y += other.y
		return this
	}

	scale(factor)
	{
		this.#x *= factor
		this.#y *= factor
		return this
	}

	copy()
	{
		return new Vector2(this.#x, this.#y)
	}

	invert()
	{
		return new Vector2(-this.#x, -this.#y)
	}
}

class Time {
	static #deltaTime = 0
	static get deltaTime() {
		// também não existe {get; private set;}, e eu quero preservar o encapsulamento.
		return this.#deltaTime
	}

	static #time = 0
	static get time() {
		return this.#time
	}

	static update() {
		const currentTime = performance.now() / 1000
		const oldTime = this.#time
		this.#time = currentTime
		this.#deltaTime = (currentTime - oldTime)
	}
}

class Input
{
	static #keys = new Map();

	static init()
	{
		window.addEventListener("keyup", (event) => {
			Input.#keys.set(event.code, false);			Input.#keys.set(event.code, false);
		})
		
		window.addEventListener("keydown", (event) => {
			Input.#keys.set(event.code, true);			Input.#keys.set(event.code, true);
		})
	}

	/**
	 * @param {string} keyCode)
	 * @returns {boolean}
	 */
	static isKeyDown(keyCode)
	{
		return Input.#keys.get(keyCode) === true;
	}
}