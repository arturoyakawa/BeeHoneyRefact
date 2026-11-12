class Transform extends Component
{
	position
	scale

	constructor(px = 0, py = 0, sx = 40, sy = 40)
	{
		super()
		this.position = new Vector2(px, py)
		this.scale = new Vector2(sx, sy)
		TransformSystem.register(this)
	}
}

class MonoBehaiovur extends Component
{
	/** @type {Transform} */
	transform

	constructor()
	{
		super()
		BehaivourSystem.register(this)
	}
}

class Renderer extends Component
{
	constructor()
	{
		super()
		RendererSystem.register(this)
	}
}

class SpriteRenderer extends Renderer
{
	image
	constructor(initialImage)
	{
		super()
		this.image = initialImage
	}
}

class TextRenderer extends Renderer
{
	color
	content
	fontFamily
	fontSize
 
	constructor(content, fontSize, fontFamily, color)
	{
		super()
		this.color = color
		this.content = content
		this.fontFamily = fontFamily
		this.fontSize = fontSize
	}
}

class SpriteAnimation extends Component
{
	currentFrame = 0
	getFrameCallback
	
	#timer
	#deltaFrameDuration
	#animationLength
	
	constructor(animationLength = 2, deltaFrameDuration = 1, getFrameCallback)
	{
		super()
		this.#deltaFrameDuration = deltaFrameDuration
		this.getFrameCallback = getFrameCallback
		this.#timer = deltaFrameDuration
		this.#animationLength = animationLength
	}

	update()
	{
		this.#timer += Time.deltaTime
		if (this.#timer >= this.#deltaFrameDuration)
		{
			this.#timer = 0
			this.frameStep()
		}
	}

	frameStep()
	{
		this.currentFrame = this.currentFrame % this.#animationLength + 1
		const spriteRenderer = this.gameObject.getComponent(SpriteRenderer)
		const image = this.getFrameCallback?.(this.currentFrame)
		if (image)
		{
			spriteRenderer.image = image
		}
	}
}

class VerticalScroller extends Component
{
	threshold
	initial

	constructor(threshold, initial)
	{
		super()
		this.threshold = threshold
		this.initial = initial
	}

	update(increment)
	{
		this.transform.position.add(Vector2.up.copy().scale(increment * Time.deltaTime))
		if (this.transform.position.y > this.threshold)
		{
			this.transform.position = new Vector2(Math.random() * (500-this.transform.scale.x), this.initial)
		}
	}
}