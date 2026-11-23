
function editarDados(id, dadosAtualizados) {
    let receitas = buscarBanco();

    receitas = receitas.map(receita => {
        if (receita.id === id) {
            return {
                ...receita,
                ...dadosAtualizados
            };
        }

        return receita;
    });

    salvarBanco(receitas);

    return receitas;
}
