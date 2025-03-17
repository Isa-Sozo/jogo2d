const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let jogoAtivo = true;

document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && !personagem.pulando && jogoAtivo) {
        personagem.saltar();
    } else if (e.code === 'Enter' && !jogoAtivo) {
        reiniciarJogo();
    }
});

class Entidade {
    #gravidade;
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.#gravidade = 0.5;
    }
    get gravidade() {
        return this.#gravidade;
    }
    desenhar(cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    #pulando;
    #velocidadey;
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#pulando = false;
        this.#velocidadey = 0;
        this.img = new Image();
        this.img.src = 'monsterhigh-morcego.png';
    }

    saltar() {
        if (!this.#pulando) {
            this.#velocidadey = 15;
            this.#pulando = true;
        }
    }

    get pulando() {
        return this.#pulando;
    }

    atualizarPersonagem() {
        if (this.#pulando) {
            this.#velocidadey -= this.gravidade;
            this.y -= this.#velocidadey;
            if (this.y >= canvas.height - this.altura) {
                this.#velocidadey = 0;
                this.#pulando = false;
                this.y = canvas.height - this.altura;
            }
        }
    }

    desenhar() {
        ctx.drawImage(this.img, this.x, this.y, this.largura, this.altura);
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidade) {
        super(x, y, largura, altura);
        this.velocidade = velocidade;
    }

    mover() {
        this.x -= this.velocidade;
        if (this.x + this.largura < 0) {
            this.x = canvas.width;
            this.velocidade += 0.2;
            let nova_altura = (Math.random() * 50) + 100;
            this.altura = nova_altura;
            this.y = canvas.height - nova_altura;
        }
    }
}

const personagem = new Personagem(100, canvas.height - 50, 50, 50);
const obstaculo = new Obstaculo(canvas.width, canvas.height - 100, 50, 100, 7);

function verificarColisao() {
    if (
        personagem.x < obstaculo.x + obstaculo.largura &&
        personagem.x + personagem.largura > obstaculo.x &&
        personagem.y < obstaculo.y + obstaculo.altura &&
        personagem.y + personagem.altura > obstaculo.y
    ) {
        jogoAtivo = false;
    }
}

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

function reiniciarJogo() {
    jogoAtivo = true;
    personagem.y = canvas.height - 50;
    personagem.velocidadey = 0;
    personagem.pulando = false;
    obstaculo.x = canvas.width;
    obstaculo.velocidade = 7;
    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (jogoAtivo) {
        personagem.desenhar();
        personagem.atualizarPersonagem();
        
        obstaculo.desenhar("rgb(52,42,133)");
        obstaculo.mover();
        
        verificarColisao();
        requestAnimationFrame(loop);
    } else {
        exibirGameOver();
    }
}

loop();
