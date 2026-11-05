let canvas = document.getElementById("palco").getContext("2d")

function gameLoop() {
	MonoBehaivour.updateAll()
	Time.update()

	requestAnimationFrame(gameLoop)
}

const b = new Bee();

function main() {
	MonoBehaivour.startAll()
	gameLoop()
}

requestAnimationFrame(main)
// ia do google falou que requestAnimationFrame era melhor pq o setInterval não espera o frame terminar, e um gameLoop por definição roda POP FRAME.