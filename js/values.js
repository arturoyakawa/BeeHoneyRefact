class Vector2
{
	#x = 0
	#y = 0

	static get right()
	{
		return new Vector2(1,0)
	}

	static get up()
	{
		return new Vector2(0,1)
	}

	static get zero()
	{
		return new Vector2(0,0)
	}

	static get one()
	{
		return new Vector2(1,1)
	}

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

let lastFrame = undefined

class Time {
	static #deltaTime = 0
	static get deltaTime() {
		// também não existe {get; private set;}, e eu quero preservar o encapsulamento.
		return this.#deltaTime
	}

	static #time = this.getTime()
	static get time() {
		return this.#time
	}

	static getTime()
	{
		return performance.now() / 1000
	}

	static tick()
	{
		const currentTime = this.getTime()
		this.#time = currentTime
	}

	static frameRendered() {
		if (lastFrame === undefined)
			lastFrame = this.#time
		this.#deltaTime = (this.#time - lastFrame)
		lastFrame = this.#time
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

class Connection
{
	/** @type {Event} */
	event
	method

	constructor(event, method)
	{
		this.method = method
		this.event = event
	}

	Disconnect()
	{
		this.event.Disconnect(this)
		this.event = null
	}
}

class Signal
{
	connections = new Set()

	Connect(method)
	{
		if (!method)
		{
			throw new Error("Tried connecting signal to method that does not exist")
		}
		const conc = new Connection(this, method)
		this.connections.add(conc)
		return conc
	}

	Disconnect(connection)
	{
		this.connections.delete(connection)
	}

	Fire(...args)
	{
		for (const conc of this.connections)
		{
			conc.method(...args)
		}
	}

	DisconnectAll()
	{
		for (const conc of this.connections)
		{
			conc.Disconnect()
		}
	}
}