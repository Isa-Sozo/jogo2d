const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let jogoAtivo = true;
document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false && jogoAtivo) {
        personagem.velocidadey = 15;
        personagem.pulando = true;
    } else if (e.code == 'Enter' && !jogoAtivo) {
        reiniciarJogo();
    }
});

class Entidade {
    #gravidade
    constructor (x, y, largura, altura){
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5
    }
    get gravidade(){
        return this.#gravidade
    }
    desenhar = function ( cor){
        ctx.fillStyle = cor
        ctx.fillRect(this.x, this.y, this.largura, this.altura)
    }
}
class Personagem extends Entidade{
    constructor(x, y, largura, altura){
        super(x,y, largura, altura)
       
    }
}
class obstaculo extends Entidade{
    constructor (x, y, largura, altura){
        super(x,y, largura, altura)
    }
}
const personagem = new Personagem(100, canvas.height - 50, 50, 50)

function exibirGameOver() {
    ctx.fillStyle = 'hsla(342, 96.90%, 62.50%, 0.70)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'BEIGE';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    ctx.shadowColor = 'PLUM';
    ctx.shadowBlur = 10;
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    ctx.shadowBlur = 0;
    if (Math.floor(Date.now() / 500) % 2 === 0) { 
        ctx.fillText('Pressione ENTER para reiniciar', canvas.width / 2, canvas.height / 2 + 40);
    }

    requestAnimationFrame(exibirGameOver);
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (jogoAtivo) {
        personagem.desenhar("black")
        //desenharObstaculo();
        //atualizarPersonagem();
        //atualizarObstaculo();
        //verificarColisao();
        requestAnimationFrame(loop);
    } else {
        exibirGameOver();
    }
}

loop();
