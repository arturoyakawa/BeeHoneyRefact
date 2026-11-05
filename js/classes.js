class obj{ // aqui estamos criando um molde
    constructor(posx,posy,largura,altura,cor){ // função que fabrica o objeto
        this.posx = posx
        this.posy = posy
        this.largura = largura
        this.altura = altura
        this.cor = cor
    }
    desenharObj(){
        let img = new Image()
        img.src = this.cor
        colmeia.drawImage(img,this.posx,this.posy,this.largura,this.altura)
    }
}

class ABELHA extends obj{
    dir = 0 // definindo a direção como zero 
    quadro = 1 // definindo o quadro da animação como 1
    timer = 0 // definindo o timer da animação como 0
    move(){
        this.posx += this.dir
        // incrementando um novo valor na posx da abelha
    }  
    animacao(){
        this.timer += 1 // adiconando novo valor para timer
        if(this.timer > 10){
            this.timer = 0
            this.quadro += 1
        }
        if(this.quadro > 4){
            this.quadro = 1
        }

        
        this.cor = "img/bee"+this.quadro+".png"
    }
}

class ARANHA extends obj{
    quadro = 1
    timer = 0 
    move(){
        this.posy += 3 // Aranha deverá descer
        if(this.posy > 690){
            this.posy = -100
            this.posx = Math.random() * (500-this.largura)
        }
    }
    animacao(){
        this.timer += 1
        if(this.timer > 10){
            this.timer = 0
            this.quadro += 1
        }
        if(this.quadro > 4){
            this.quadro = 1
        }
         this.cor = "img/spider"+this.quadro+".png"
    }    
}

class BG extends obj{
    move(velocidade,limite,posInicial){
        this.posy +=velocidade
        if(this.posy > limite){
            this.posy = posInicial
        }
    }
}