const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
let gameOver = false;
let pontuacao = 0;
const gravidade = 0.5;

// Evento de pulo com espaço
document.addEventListener('keypress', (e) => {
    if (e.code === 'Space' && personagem.pulando === false) {
        personagem.saltar();
    }
});

// Reiniciar o jogo ao clicar
document.addEventListener('click', () => {
    if (gameOver === true) {
        location.reload();
    }
});

class Entidade {
    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    desenhar(ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }
}

class Personagem extends Entidade {
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.pulando = false;
        this.velocidadey = 0;
        this.imagem = new Image();
        this.imagem.src = 'fundo_carros.png'; // Adicionando a imagem do personagem
    }

    saltar() {
        if (!this.pulando) {
            this.velocidadey = 15;
            this.pulando = true;
        }
    }

    atualizar() {
        if (this.pulando) {
            this.velocidadey -= gravidade;
            this.y -= this.velocidadey;

            if (this.y >= canvas.height - this.altura) {
                this.velocidadey = 0;
                this.pulando = false;
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

    desenhar(ctx) {
        ctx.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    }
}

class Obstaculo extends Entidade {
    constructor(x, y, largura, altura, velocidadex) {
        super(x, y, largura, altura);
        this.velocidadex = velocidadex || 4;
        this.passou = false; // Para contar pontos apenas uma vez por obstáculo
    }

    mover() {
        this.x -= this.velocidadex;

        if (this.x + this.largura < 0) {
            this.x = canvas.width;
            this.velocidadex += 0.2;
            let novaAltura = (Math.random() * 50) + 100;
            this.altura = novaAltura;
            this.y = canvas.height - novaAltura;
            this.passou = false; // Reseta o estado de pontuação
        }

        // Se o personagem passar completamente pelo obstáculo, adiciona ponto
        if (!this.passou && this.x + this.largura < personagem.x) {
            pontuacao += 1;
            this.passou = true;
        }
    }
}

// Criando o personagem
const personagem = new Personagem(100, canvas.height - 50, 50, 50);
const obstaculos = [
    new Obstaculo(500, canvas.height - 50, 50, 50),
    new Obstaculo(800, canvas.height - 100, 50, 100)
];

function exibirGameOver() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText('Game Over!', canvas.width / 2 - 100, canvas.height / 2);
    ctx.fillText(`Pontuação Final: ${pontuacao}`, canvas.width / 2 - 120, canvas.height / 2 + 40);
}

function exibirPontuacao() {
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText(`Pontuação: ${pontuacao}`, 20, 30);
}

let jogoAtivo = true;

function loop() {
    if (!jogoAtivo) {
        exibirGameOver();
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    personagem.atualizar();
    personagem.desenhar(ctx);

    obstaculos.forEach((obstaculo) => {
        obstaculo.mover();
        obstaculo.desenhar(ctx, 'green');
    });

    exibirPontuacao(); // Mostra a pontuação na tela

    if (personagem.verificarColisao(obstaculos)) {
        jogoAtivo = false;
    }

    requestAnimationFrame(loop);
}

loop();