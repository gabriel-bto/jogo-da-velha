const elementosCelulas = document.querySelectorAll('.grid-celulas')
const grid = document.querySelector('.grid')
const mensagem = document.querySelector('.mensagem')
const texto = document.querySelector('.mensagem-texto')
const reinicia = document.querySelector('.mensagem-button')

let turnoBolinha

const cobinacoesDeVitoria = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
]

const iniciaJogo = () => {
    turnoBolinha = false

    for (const celulas of elementosCelulas) {
        celulas.classList.remove("bolinha")
        celulas.classList.remove("x")
        celulas.removeEventListener("click", pegaClick)
        celulas.addEventListener("click", pegaClick, { once: true })
    }

    trocaClasse()
    mensagem.classList.remove('mostra-mensagem')
}

const finalizaJogo = (empate) => {
    if (empate) {
        texto.innerText = "EMPATE!"
    } else {
        texto.innerText = turnoBolinha ? "O VENCEU!" : "X VENCEU!"
    }
    for (const celulas of elementosCelulas) {
        grid.classList.remove('bolinha')
        grid.classList.remove('x')
        celulas.removeEventListener("click", pegaClick)
    }
    mensagem.classList.add('mostra-mensagem')
}

const verificacaoPorVitoria = (turnoAtual) => {
    return cobinacoesDeVitoria.some((combinacao) => {
        return combinacao.every((index) => {
            return elementosCelulas[index].classList.contains(turnoAtual)
        })
    })
}

const verificacaoPorEmpate = () => {
    return [...elementosCelulas].every((celulas) => {
       return celulas.classList.contains('x') || celulas.classList.contains('bolinha')
    })
}

const adicionaEscolha = (celula, adicionaClasse) => celula.classList.add(adicionaClasse)

const trocaClasse = () => {
    grid.classList.remove('bolinha')
    grid.classList.remove('x')

    if (turnoBolinha) {
        grid.classList.add('bolinha')
    } else {
        grid.classList.add('x')
    }
}

const trocaTurnos = () => {
    turnoBolinha = !turnoBolinha
    trocaClasse()
}

const pegaClick = (e) => {
    const celula = e.target
    const adicionaClasse = turnoBolinha ? "bolinha" : "x"

    adicionaEscolha(celula, adicionaClasse)

    const vencedor = verificacaoPorVitoria(adicionaClasse)
    const empate = verificacaoPorEmpate()

    if (vencedor) {
        finalizaJogo(false)
    } else if (empate) {
        finalizaJogo(true)
    } else {
        trocaTurnos();
    }
}

iniciaJogo()

reinicia.addEventListener('click', iniciaJogo)
