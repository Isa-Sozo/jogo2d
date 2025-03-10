const canvas = document.getElementById('jogo2D');
const ctx = canvas.getContext('2d');
const gravidade = 0.5;
let jogoAtivo = true;

document.addEventListener('keypress', (e) => {
    if (e.code == 'Space' && personagem.pulando == false && jogoAtivo) {
        personagem.velocidadey = 15;
        personagem.pulando = true;
    } else if (e.code == 'Enter' && !jogoAtivo) {
        reiniciarJogo();
    }
});

const personagem = {
    x: 100,
    y: canvas.height - 50,
    altura: 50,
    largura: 50,
    velocidadey: 0,
    pulando: false
};
const imgPersonagem = new Image();
imgPersonagem.src = 'monsterhigh-morcego.png'; 

function desenharPersonagem() {
    const proporcao = imgPersonagem.width / imgPersonagem.height;
    const novaAltura = personagem.altura;
    const novaLargura = novaAltura * proporcao; 

    ctx.drawImage(imgPersonagem, personagem.x, personagem.y, novaLargura, novaAltura);
}

function atualizarPersonagem() {
    if (personagem.pulando) {
        personagem.velocidadey -= gravidade;
        personagem.y -= personagem.velocidadey;
        if (personagem.y >= canvas.height - 50) {
            personagem.velocidadey = 0;
            personagem.pulando = false;
            personagem.y = canvas.height - 50;
        }
    }
}

const obstaculo = {
    x: canvas.width - 50,
    y: canvas.height - 100,
    largura: 50,
    altura: 100,
    velocidadex: 7
};

function desenharObstaculo() {
    ctx.fillStyle = 'rgb(52,42,133)';
    ctx.fillRect(obstaculo.x, obstaculo.y, obstaculo.largura, obstaculo.altura);
}

function atualizarObstaculo() {
    obstaculo.x -= obstaculo.velocidadex;
    if (obstaculo.x <= 0 - obstaculo.largura) {
        obstaculo.x = canvas.width;
        obstaculo.velocidadex += 0.2;
        let nova_altura = (Math.random() * 50) + 100;
        obstaculo.altura = nova_altura;
        obstaculo.y = canvas.height - nova_altura;
    }
}

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
    obstaculo.x = canvas.width - 50;
    obstaculo.velocidadex = 7;
    loop();
}

function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    if (jogoAtivo) {
        desenharPersonagem();
        desenharObstaculo();
        atualizarPersonagem();
        atualizarObstaculo();
        verificarColisao();
        requestAnimationFrame(loop);
    } else {
        exibirGameOver();
    }
}

loop();