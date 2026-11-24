/** @type {CanvasRenderingContext2D} */
const canvas = document.getElementById("palco").getContext("2d")

class System
{
	static register(component)
	{
		this.components.add(component)
	}

	static delete(component)
	{
		this.components.delete(component)
	}

	static forEachComponent(callback)
	{
		for (const component of this.components)
		{
			callback(component)
		}
	}

	static tick()
	{
		this.updateAll()
	}

	static updateAll()
	{
		this.forEachComponent(component => this.update(component))
	}

	static update(component)
	{
		throw new Error("You are suposed to implement your version of void update()")
	}
}

class TransformSystem extends System
{
	static components = new Set()
	/**
	 * @param {Transform} transform 
	 */
	static update(transform)
	{
		
	}
}

class BehaivourSystem extends System
{
	static components = new Set()

	static startAll()
	{
		this.forEachComponent(this.start)
	}

	/**
	 * @param {MonoBehaiovur} transform 
	 */
	static start(behaivour)
	{
		behaivour.start?.()
	}

	/**
	 * @param {MonoBehaiovur} behaivour 
	 */
	static update(behaivour)
	{
		behaivour.update?.()
	}
}

class RendererSystem extends System
{
	static components = new Set()

	static tick()
	{
		canvas.clearRect(0,0,500,690)
		this.forEachComponent(this.update)
	}

	/**
	 * @param {Renderer} renderer 
	 */
	static update(renderer)
	{
		let transform = renderer.gameObject.getComponent(Transform)
		const position = transform.position
		const scale = transform.scale
		switch (renderer.constructor)
		{
			case SpriteRenderer:
				/** @type {SpriteRenderer} */
				const spriteRenderer = renderer
				let img = new Image()
				img.src = spriteRenderer.image

				canvas.drawImage(img,position.x, position.y, scale.x, scale.y)
				break
			case TextRenderer:
				/** @type {TextRenderer} */
				const textRenderer = renderer
				canvas.font = textRenderer.fontSize + "px "+textRenderer.fontFamily
        		canvas.fillStyle = textRenderer.color
        		canvas.fillText(textRenderer.content,position.x,position.y)
				break
		}
	}
}

class PhysicsSystem extends System
{
	/** @type {Collider[]} */
	static components = new Set()

	/** @param {Collider} colliderA */
	static update(colliderA)
	{
		canvas.fillStyle = "red"
		canvas.lineWidth = 2

		//const t = colliderA.getOrigin()
	//	canvas.strokeRect(t.x, t.y, colliderA.size.x,colliderA.size.y)
		//canvas.fillRect(colliderA.getOrigin().x, colliderA.getOrigin().x, colliderA.size.x, colliderA.size.y)

		for (const colliderB of this.components)
        {
            if (colliderA === colliderB || colliderA.gameObject === colliderB.gameObject)
                continue

            if (this.checkCollision(colliderA, colliderB))
            {
				colliderA.OnCollisionEnter.Fire(colliderB)
                colliderB.OnCollisionEnter.Fire(colliderA)
            }
        }
	}

	/**
	 * @param {Collider} a
	 * @param {Collider} b
	 */
	static checkCollision(a, b)
    {
		const ogA = a.getOrigin()
		const ogB = b.getOrigin()
        return (
            ogA.x < ogB.x + b.size.x &&
            ogA.x + a.size.x > ogB.x &&
            ogA.y < ogB.y + b.size.y &&
            ogA.y + a.size.y > ogB.y
        )
    }
}