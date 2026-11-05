let colmeia = document.getElementById("palco").getContext("2d")

/*
let abelha = new obj(50, 100, 30, 30, "abelha.png")
let aranha = new obj(200, 150, 40, 40, "aranha.png")
*/

let bg = new BG(0,0,500,690,"img/bg.png")
let bg2 = new BG(0,-690,500,690,"img/bg.png")
let abelha = new ABELHA(200,500,100,100,"img/bee1.png")
let aranha = new ARANHA(100,100,100,100,"img/spider1.png")

document.addEventListener("keydown",function(e){
    if(e.key == "a"){
        abelha.dir = -1 
        // atribuindo um novo valor para direção da abelha
    }

    if(e.key == "d"){
        abelha.dir = 1
        // atribuindo um novo valor para direção da abelha
    }
})

document.addEventListener("keyup",function(e){
    if(e.key == "a"){
        abelha.dir = 0
    }

    if(e.key == "d"){
        abelha.dir = 0
    }
})

function draw(){ // responsável por desenhar elementos na tela
    bg.desenharObj()
    bg2.desenharObj()
    abelha.desenharObj()
    aranha.desenharObj()   
}

function update(){ //responsável por atualizar os quadros do jogo
    abelha.move()
    abelha.animacao()
    aranha.move()
    aranha.animacao()
    bg.move(3,690,0)
    bg2.move(3,0,-690)   
}

function main(){
    colmeia.clearRect(0,0,500,690)
    update()
    draw()
}   

setInterval(main,10)