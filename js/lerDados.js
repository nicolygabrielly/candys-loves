
function lerDados() {
    const receitas = buscarBanco();

    return receitas;
}

function mostrarReceitas() {
    const receitas = lerDados();

    console.log("Receitas cadastradas:", receitas);

    return receitas;
}
