let canvas = document.getElementById("palco").getContext("2d")

function gameLoop() {
	MonoBehaivour.updateAll()
	Time.update()

	requestAnimationFrame(gameLoop)
}

const bee = new Bee();

function main() {
	MonoBehaivour.startAll()
	Input.init()
	gameLoop()
}

requestAnimationFrame(main)
// ia do google falou que requestAnimationFrame era melhor pq o setInterval não espera o frame terminar, e um gameLoop por definição roda POP FRAME.