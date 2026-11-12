

///////////////////////////////////////////////

const background = new GameObject(0,0,500,690)
.append(new SpriteRenderer("img/bg.png"))
.append(new Background(3, 690, 0))

const background2 = new GameObject(0,-690,500,690)
.append(new SpriteRenderer("img/bg.png"))
.append(new Background(3, 0, -690))

const bee = new GameObject(200,500,100,100)
.append(new SpriteRenderer("img/bee1.png"))
.append(new SpriteAnimation(4, .08, frame => {
	return "img/bee"+frame+".png"
}))
.append(new Bee())

const spider = new GameObject(100,100,100,100)
.append(new SpriteRenderer("img/spider1.png"))
.append(new SpriteAnimation(4, .08, frame => {
	return "img/spider"+frame+".png	"
}))
.append(new Spider())

///////////////////////////////////////////////

function gameLoop() {
	Time.update()
	GameObject.destroyPending()
	BehaivourSystem.tick()
	TransformSystem.tick()
	RendererSystem.tick()

	requestAnimationFrame(gameLoop)
}

function main() {
	Input.init()
	BehaivourSystem.startAll()
	gameLoop()
}

requestAnimationFrame(main)
// the setInterval function does not wait untill the frame finishes to run again, it will most likely run more times than we need