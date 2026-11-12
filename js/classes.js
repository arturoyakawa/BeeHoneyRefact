class Bee extends MonoBehaiovur
{
	#animation
	speed = 4
	health = 3
	score = 0

	#healthIndicator
	#scoreIndicator

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)

		this.#scoreIndicator = new GameObject(280, 50)
		.append(new TextRenderer(0, 35, "Arial", "white"))

		this.#healthIndicator = new GameObject(140, 50)
		.append(new TextRenderer(3, 35, "Arial", "white"))
	}

	update()
	{
		this.#animation.update()
		if (Input.isKeyDown("KeyD"))
		{
			this.transform.position.add(Vector2.right.copy().scale(this.speed))
		}
		else if (Input.isKeyDown("KeyA"))
		{
			this.transform.position.add(Vector2.right.copy().scale(-this.speed))
		}
	}
}

class Spider extends MonoBehaiovur
{
	/** @type {SpriteAnimation} */
	#animation
	/** @type {VerticalScroller} */
	#verticalScroller

	speed = 3*166

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)	
		this.#verticalScroller = this.gameObject.getComponent(VerticalScroller)
	}

	update()
	{
		this.#animation.update()
		this.#verticalScroller.update(this.speed)
	}
}

class Background extends MonoBehaiovur
{
	speed
	limit
	startPos
	
	constructor(speed, limit, startPos)
	{
		super()
		this.speed = speed
		this.limit = limit
		this.startPos = startPos
	}

	update()
	{
		const transform = this.gameObject.getComponent(Transform)
		const position = transform.position
		position.add(new Vector2(0, this.speed))
		if (position.y > this.limit)
		{
			transform.position = new Vector2(0, this.startPos)
		}
	}
}

class Indicator extends MonoBehaiovur
{
	/** @type {TextRenderer} */
	#textRenderer

	start()
	{
		this.#textRenderer = this.gameObject.getComponent(TextRenderer)
	}

	setContent(content)
	{
		this.#textRenderer.content = content
	}
}