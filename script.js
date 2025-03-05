const canvas = document.getElementById('jogo2D')
const ctx = canvas.getContext('2d')
const gravidade = 1
document.addEventListener('keypress', (e) => {
    if(e.code == 'Space'){
        personagem.velocidY =  15
        console.log("PULOU")
        personagem.pulando = true
    
    }})

const personagem ={
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidY: 0,
    pulando: false
}

function desenharPersonagem(){
    ctx.fillRect(personagem.x, personagem.y, personagem.altura,personagem.largura)
    ctx.fillStyle = 'black'
}
function atualizarPersonagem(){
    if(personagem.pulando == true){
        personagem.velocidY -= gravidade
        personagem.y -= personagem.velocidY
        if(personagem.y >= canvas.height-50){
            personagem.velocidY = 0
            personagem.pulando = false
        }
    }
}

function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    desenharPersonagem()
    atualizarPersonagem()
    
    requestAnimationFrame(loop)
}

loop()