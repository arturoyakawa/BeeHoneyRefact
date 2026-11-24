class Bee extends MonoBehaiovur
{
	#animation
	speed = 4 * 166
	health = 3
	score = 0

	/** @type {TextRenderer} */
	#healthIndicator
	/** @type {TextRenderer} */
	#scoreIndicator
	#collider

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)

		this.#scoreIndicator = new GameObject(280, 50)
		.append(new TextRenderer(0, 35, "Arial", "white"))
		.getComponent(TextRenderer)

		this.#healthIndicator = new GameObject(140, 50)
		.append(new TextRenderer(3, 35, "Arial", "white"))
		.getComponent(TextRenderer)

		const collider = this.gameObject.getComponent(Collider)
		this.#collider = collider
	}

	update()
	{
		this.#animation.update()
		if (Input.isKeyDown("KeyD"))
		{
			this.transform.position.add(Vector2.right.copy().scale(this.speed * Time.deltaTime))
		}
		else if (Input.isKeyDown("KeyA"))
		{
			this.transform.position.add(Vector2.right.copy().scale(-this.speed * Time.deltaTime))
		}
	}

	GivePoint()
	{
		this.#scoreIndicator.content += 1
	}

	DealDamage()
	{
		this.#healthIndicator.content -= 1
	}
}

class Spider extends MonoBehaiovur
{
	/** @type {SpriteAnimation} */
	#animation
	/** @type {VerticalScroller} */
	#verticalScroller
	#collider

	speed = 3*166

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)	
		this.#verticalScroller = this.gameObject.getComponent(VerticalScroller)

		const collider = this.gameObject.getComponent(Collider)
		this.#collider = collider
		collider.OnCollisionEnter.Connect(this.onCollisionEnter.bind(this))
	}

	update()
	{
		this.#animation.update()
		this.#verticalScroller.update(this.speed)
	}

	/** @param {Collider} other */
	onCollisionEnter(other)
	{
		this.#verticalScroller.reset()
		const bee = other.gameObject.getComponent(Bee)
		bee.DealDamage()
	}
}

class Flower extends MonoBehaiovur
{
	/** @type {VerticalScroller} */
	#verticalScroller
	/** @type {SpriteAnimation} */
	#animation
	#collider

	speed = 3*166

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)	
		this.#verticalScroller = this.gameObject.getComponent(VerticalScroller)

		const collider = this.gameObject.getComponent(Collider)
		this.#collider = collider
		collider.OnCollisionEnter.Connect(this.onCollisionEnter.bind(this))
	}

	update()
	{
		this.#animation.update()
		this.#verticalScroller.update(this.speed)
	}

	/** @param {Collider} other */
	onCollisionEnter(other)
	{
		this.#verticalScroller.reset()
		const bee = other.gameObject.getComponent(Bee)
		bee.GivePoint()
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
		position.add(new Vector2(0, this.speed * Time.deltaTime))
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