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
		this.forEachComponent(this.update)
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