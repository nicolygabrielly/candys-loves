const CHAVE_RECEITAS = "candyReceitas";

function conectarBanco() {
    return true;
}

function salvarBanco(receitas) {
    localStorage.setItem(
        CHAVE_RECEITAS,
        JSON.stringify(receitas)
    );
}

function buscarBanco() {
    return JSON.parse(
        localStorage.getItem(CHAVE_RECEITAS) || "[]"
    );
}
