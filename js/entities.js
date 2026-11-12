// GameObjects hold Components
// MonoBehaivours have a lifecycle
// Yeah I changed my mind, it is better to have Systems

class GameObject
{
	static #profiles = new Map()
	static #destroyQueue = []
	static #currentId = 1

	id
	#components = new Map()

	constructor(px,py,sx,sy)
	{
		this.id = GameObject.#currentId
		GameObject.#currentId++

		GameObject.#profiles.set(this.id, this)
		this.append(new Transform(px,py,sx,sy))
	}

	_internalDestroy()
	{
		GameObject.#profiles.delete(this.id)
		for (const comp in this.#components.values())
		{
			comp.destroy()
		}
	}

	destroy()
	{
		GameObject.#destroyQueue.push(this)
	}

	append(component)
	{
		component.setParent(this)
		this.#components.set(component.constructor, component)
		return this
	}

	/**
 	* @template {Component} T
 	* @param {new (...args: any[]) => T} componentClass
 	* @returns {T | undefined}
 	*/
	getComponent(component)
	{
		return this.#components.get(component)
	}

	static destroyPending()
	{
		for (const obj in GameObject.#destroyQueue)
		{
			obj._internalDestroy()	
		}
	}
}

class Component
{
	/** @type {GameObject} */
	gameObject = null

	setParent(parent)
	{
		this.gameObject = parent
		this.transform = this.gameObject.getComponent(Transform)
	}

	destroy()
	{
		// optional function call using the ?. operator
		this.OnDestroy?.()

		this.gameObject = null
	}
}