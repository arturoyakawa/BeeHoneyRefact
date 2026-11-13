/////////////  DEBUG ///////////////////////////

const desiredFps = 166
const frameInterval = 1 / desiredFps

///////////////////////////////////////////////

///////////////////////////////////////////////

const background = new GameObject(0,0,500,690)
.append(new Background(3 * 166, 690, 0))
.append(new SpriteRenderer("img/bg.png"))

const background2 = new GameObject(0,-690,500,690)
.append(new Background(3 * 166, 0, -690))
.append(new SpriteRenderer("img/bg.png"))

const bee = new GameObject(200,500,100,100)
.append(new Bee())
.append(new SpriteRenderer("img/bee1.png"))
.append(new SpriteAnimation(4, .08, frame => {
	return "img/bee"+frame+".png"
}))
.append(new Collider(
	new Vector2(25, 10),
	new Vector2(50, 80)
))

const spider = new GameObject(100,100,100,100)
.append(new Spider())
.append(new SpriteRenderer("img/spider1.png"))
.append(new SpriteAnimation(4, .08, frame => {
	return "img/spider"+frame+".png	"
}))
.append(new VerticalScroller(690, -100))
.append(new Collider(
	new Vector2(25, 10),
	new Vector2(50, 80)
))

const flower = new GameObject(0,0,50,50)
.append(new Flower())
.append(new SpriteRenderer("img/florwer1.png"))
.append(new VerticalScroller(690, -100))
.append(new Collider(
	Vector2.zero,
	Vector2.one.scale(50)
))
.append(new SpriteAnimation(2, .08, frame => {
	return "img/florwer"+frame+".png"
}))


///////////////////////////////////////////////

function gameLoop() {
	requestAnimationFrame(gameLoop)
	
	Time.tick()

  	if (Time.time - lastFrame < frameInterval) {
	    return;
  	}

	Time.frameRendered()

	lastFrame = Time.time

	GameObject.destroyPending()
	BehaivourSystem.tick()
	TransformSystem.tick()
	RendererSystem.tick()
	PhysicsSystem.tick()
}

function main() {
	Input.init()
	BehaivourSystem.startAll()
	gameLoop()
}

requestAnimationFrame(main)
// the setInterval function does not wait untill the frame finishes to run again, it will most likely run more times than we need