/////////////  DEBUG ///////////////////////////

const desiredFps = 30
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

const spider = new GameObject(100,100,100,100)
.append(new Spider())
.append(new SpriteRenderer("img/spider1.png"))
.append(new SpriteAnimation(4, .08, frame => {
	return "img/spider"+frame+".png	"
}))
.append(new VerticalScroller(690, -100))

const flower = new GameObject(0,0,50,50)
.append(new Flower())
.append(new SpriteRenderer("img/florwer1.png"))
.append(new VerticalScroller(690, -100))

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
}

function main() {
	Input.init()
	BehaivourSystem.startAll()
	gameLoop()
}

requestAnimationFrame(main)
// the setInterval function does not wait untill the frame finishes to run again, it will most likely run more times than we need