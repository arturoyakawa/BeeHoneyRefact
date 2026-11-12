class Bee extends MonoBehaiovur
{
	#animation
	speed = 4

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)
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
	#animation

	start()
	{
		this.#animation = this.gameObject.getComponent(SpriteAnimation)
	}

	update()
	{
		this.#animation.update()
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