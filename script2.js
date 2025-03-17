const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let jogoAtivo = true;
let pontuacao = 0;
const gravidade = 0.5;

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
        this.imagem = new Image();
        this.imagem.src = 'monsterhigh-morcego.png'; // Imagem do personagem
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

    atualizar() {
        if (this.#pulando) {
            this.#velocidadey -= gravidade;
            this.y -= this.#velocidadey;

            if (this.y >= canvas.height - this.altura) {
                this.#velocidadey = 0;
                this.#pulando = false;
                this.y = canvas.height - this.altura;
            }
        }
    }

    verificarColisao(obstaculos) {
        for (let obstaculo of obstaculos) {
            if (
                this.x < obstaculo.x + obstaculo.largura &&
                this.x + this.largura > obstaculo.x &&
                this.y < obstaculo.y + obstaculo.altura &&
                this.y + this.altura > obstaculo.y
            ) {
                return true;
            }
        }
        return false;
    }

    desenhar() {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidadex) {
        super(x, y, largura, altura);
        this.velocidadex = velocidadex || 4;
        this.passou = false;
        this.imagem = new Image();
        this.imagem.src = 'caixão.png';  // Imagem do obstáculo
    }

    mover() {
        this.x -= this.velocidadex;

        if (this.x + this.largura < 0) {
            this.x = canvas.width;
            this.velocidadex += 0.2;
            let novaAltura = (Math.random() * 50) + 100;
            this.altura = novaAltura;
            this.y = canvas.height - novaAltura;
            this.passou = false;
        }

        // Se o personagem passar completamente pelo obstáculo, adiciona ponto
        if (!this.passou && this.x + this.largura < personagem.x) {
            pontuacao += 1;
            this.passou = true;
        }
    }

    desenhar(ctx) {
        // Desenha a imagem do obstáculo
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

const personagem = new Personagem(100, canvas.height - 50, 50, 50);
const obstaculos = [
    new Obstaculo(500, canvas.height - 50, 50, 50),
    new Obstaculo(800, canvas.height - 100, 50, 100)
];

function exibirGameOver() {
    ctx.fillStyle = 'hsla(342, 96.90%, 62.50%, 0.70)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'BEIGE';
    ctx.font = 'bold 50px Arial';
    ctx.textAlign = 'center';
    // Sombra para o Game Over
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'white';
    // Removido a sombra
    ctx.shadowColor = 'transparent'; // Sombra desativada aqui
    ctx.fillText('Pressione ENTER para reiniciar', canvas.width / 2, canvas.height / 2 + 40);
}


function reiniciarJogo() {
    jogoAtivo = true;
    pontuacao = 0;
    personagem.y = canvas.height - 50;
    personagem.velocidadey = 0;
    personagem.pulando = false;
    obstaculos[0].x = canvas.width;
    obstaculos[1].x = canvas.width + 300;
    loop();
}

function exibirPontuacao() {
    ctx.fillStyle = 'white'; // Cor da pontuação
    ctx.font = 'bold 30px Arial'; // Usando o mesmo estilo de fonte do "Game Over"
    ctx.textAlign = 'center'; // Alinha o texto no centro
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'transparent'; // Sombra desativada aqui
    ctx.fillText(`Pontuação: ${pontuacao}`, canvas.width / 2, 30); // Exibe no centro superior da tela
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (jogoAtivo) {
        personagem.atualizar();
        personagem.desenhar();

        obstaculos.forEach((obstaculo) => {
            obstaculo.mover();
            obstaculo.desenhar(ctx, "rgb(52,42,133)");
        });

        exibirPontuacao(); // Mostra a pontuação na tela

        if (personagem.verificarColisao(obstaculos)) {
            jogoAtivo = false;
        }

        requestAnimationFrame(loop);
    } else {
        exibirGameOver();
    }
}

loop();
