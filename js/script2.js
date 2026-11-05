let colmeia = document.getElementById("palco").getContext("2d")

function gameLoop() {
	MonoBehaivour.updateAll()
	console.log("update!")

	requestAnimationFrame(gameLoop)
}

requestAnimationFrame(gameLoop)
// ia do google falou que requestAnimationFrame era melhor pq o setInterval não espera o frame terminar, e isso gera lag.