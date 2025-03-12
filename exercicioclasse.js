class Veiculo {
    #velocidade;

    constructor(tipo, marca, cor, velocidade, passageiros) {
        this.tipo = tipo;
        this.marca = marca;
        this.cor = cor;
        this.#velocidade = velocidade;
        this.passageiros = passageiros;
    }

    acelerar() {
        this.#velocidade += 10;
        console.log(`Velocidade: ${this.#velocidade} km/h`);
    }

    freiar() {
        if (this.#velocidade > 0) {
            this.#velocidade -= 5;
            console.log(`Velocidade: ${this.#velocidade} km/h`);
        } else {
            console.log("O veículo já está parado.");
        }
    }

    setVelocidade(valor) {
        this.#velocidade = valor;
    }

    getVelocidade() {
        return this.#velocidade;
    }
}

class Aviao extends Veiculo {
    constructor(tipo, marca, cor, velocidade, passageiros, companhia) {
        super(tipo, marca, cor, velocidade, passageiros);
        this.companhia = companhia;
    }
}

class Barco extends Veiculo {
    constructor(tipo, marca, cor, velocidade, passageiros, pier) {
        super(tipo, marca, cor, velocidade, passageiros);
        this.pier = pier;
    }

    getVelocidadeEmNos() {
        return (this.getVelocidade() / 1.852).toFixed(2);
    }

    acelerar() {
        this.setVelocidade(this.getVelocidade() + 10);
        console.log(`Velocidade: ${this.getVelocidade()} km/h (${this.getVelocidadeEmNos()} nós)`);
    }

    freiar() {
        if (this.getVelocidade() > 0) {
            this.setVelocidade(this.getVelocidade() - 5);
            console.log(`Velocidade: ${this.getVelocidade()} km/h (${this.getVelocidadeEmNos()} nós)`);
        } else {
            console.log("O barco já está parado.");
        }
    }
}

// Testando as classes
const carro = new Veiculo('SUV', 'Renault', 'Cinza', 0, 0);
const outro_carro = new Veiculo('Sedan', 'Fiat', 'Preto', 0, 0);
outro_carro.acelerar();
carro.acelerar();
carro.acelerar();
carro.freiar();
carro.freiar();

const aviao = new Aviao('Comercial', 'Boeing', 'Branco', 0, 0, 'Gol');
aviao.acelerar();
aviao.freiar();
console.log(aviao);

const barco = new Barco('Simples', 'De Pesca', 'Branco', 0, 0, 'Marinha');
barco.acelerar();
barco.freiar();
console.log(barco);

aviao.setVelocidade(50);
console.log(aviao.getVelocidade());